import pool from "@/lib/db";
import slugify from "slugify";
import xss from "xss";

export type Meal = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  user: string;
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

export type Recipe = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export async function getRecipe(slug: string): Promise<Recipe | null> {
  const result = await pool.query<Recipe>(
    "SELECT * FROM meals WHERE slug = $1",
    [slug]
  );

  return result.rows[0] || null;
}

export async function saveMeals(recipe: Meal) {
  const slug = slugify(recipe.title, { lower: true });
}
