"use server";

import pool from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs/promises";
import { Meal, Recipe } from "@/components/types";

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

  const recipe = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: xss(formData.get("instructions") as string),
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
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
