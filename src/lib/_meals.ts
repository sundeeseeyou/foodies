"use server";

import pool from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs/promises";

export type Meal = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  user: string;
};

export type Recipe = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export async function getMeals(): Promise<Meal[]> {
  const result = await pool.query<{
    slug: string;
    title: string;
    image: string;
    summary: string;
    creator: string;
  }>("SELECT slug, title, image, summary, creator FROM meals ORDER BY id");

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
  const recipe = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  console.log(recipe);
}

export async function saveMeals(recipe: Recipe) {
  recipe.slug = slugify(recipe.title, { lower: true });
  recipe.instructions = xss(recipe.instructions);

  const ext = recipe.image.name.split(".").pop();
  const fileName = `${recipe.slug}.${ext}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await recipe.image();

  stream.write();
}
