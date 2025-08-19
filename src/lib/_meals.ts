"use server";

import pool from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
// import fs from "node:fs/promises";
import { Meal, Recipe } from "@/components/types";
import { formValidation } from "./_meal-schema";
import { AddMealResult } from "@/components/types";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Add checks to ensure environment variables are defined
if (
  !process.env.CLOUDFLARE_ACCESS_KEY_ID ||
  !process.env.CLOUDFLARE_SECRET_ACCESS_KEY
) {
  throw new Error(
    "Cloudflare R2 credentials are not set in environment variables."
  );
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export async function getMeals(): Promise<Meal[]> {
  const result = await pool.query<{
    slug: string;
    title: string;
    image: string;
    summary: string;
    creator: string;
  }>("SELECT slug, title, image, summary, creator FROM meals ORDER BY id DESC");

  return result.rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    image: row.image,
    summary: row.summary,
    user: row.creator,
  }));
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
  const result = await pool.query<Recipe>(
    "SELECT * FROM meals WHERE slug = $1",
    [slug]
  );

  return result.rows[0] || null;
}

export async function addMeal(formData: FormData): Promise<AddMealResult> {
  const imageFile = formData.get("image");
  if (!(imageFile instanceof File)) {
    return {
      success: false,
      errors: { image: ["Please upload an image file."] },
    };
  }

  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    summary: formData.get("summary")?.toString() ?? "",
    instructions: formData.get("instructions")?.toString() ?? "",
    creator: formData.get("creator")?.toString() ?? "",
    creator_email: formData.get("creator_email")?.toString() ?? "",
  };

  const resultParse = formValidation.safeParse(rawData);

  if (!resultParse.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of resultParse.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(issue.message);
    }

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  const recipe = {
    ...resultParse.data,
    instructions: xss(resultParse.data.instructions),
  };

  const slug = slugify(recipe.title, { lower: true });
  const ext = imageFile.name.split(".").pop();
  const fileName = `${slug}.${ext}`;
  const bufferedImage = Buffer.from(await imageFile.arrayBuffer());
  // await fs.writeFile(`public/images/${fileName}`, bufferedImage); <-- Getting disabled if you want to use S3 AWS system

  // Upload image to S3
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME, // Replace with your S3 bucket name
      Key: fileName,
      Body: bufferedImage,
      ContentType: imageFile.type,
    })
  );

  await pool.query(
    "INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      slug,
      recipe.title,
      // `/images/${fileName}` <-- this is for local only,
      fileName,
      recipe.summary,
      recipe.instructions,
      recipe.creator,
      recipe.creator_email,
    ]
  );

  revalidatePath("/", "layout");
  return { success: true, slug };
}
