"use server";

import pool from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs/promises";
import { Meal, Recipe } from "@/components/types";
import { formValidation } from "./_meal-schema";

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

export async function addMeal(formData: FormData) {
  /* Validate image wheter the image is in file format*/
  const imageFile = formData.get("image");
  if (!(imageFile instanceof File)) {
    throw new Error("Please Upload an Image File");
  }

  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    summary: formData.get("summary")?.toString() ?? "",
    instructions: formData.get("instructions")?.toString() ?? "",
    creator: formData.get("name")?.toString() ?? "",
    creator_email: formData.get("email")?.toString() ?? "",
  };

  //validating using zod
  const result = formValidation.safeParse(rawData);

  if (!result.success) {
    // Optionally: format or log errors
    const errors = result.error.flatten();
    throw new Error("Validation failed: " + JSON.stringify(errors));
  }

  const recipe = {
    ...result.data,
    instructions: xss(result.data.instructions),
  };

  const slug = slugify(recipe.title, { lower: true });
  const ext = imageFile.name.split(".").pop(); //extensions
  const fileName = `${slug}.${ext}`;
  const bufferedImage = Buffer.from(await imageFile.arrayBuffer());
  await fs.writeFile(`public/images/${fileName}`, bufferedImage);

  await pool.query(
    "INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      slug,
      recipe.title,
      `/images/${fileName}`,
      recipe.summary,
      recipe.instructions,
      recipe.creator,
      recipe.creator_email,
    ]
  );
  return slug;
}
