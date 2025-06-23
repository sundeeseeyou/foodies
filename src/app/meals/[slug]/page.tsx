import pool from "../../../../lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// type Props = {
//   params: {
//     slug: string;
//   };
// };

// ✅ 1. Generate metadata per slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await pool.query<{ title: string; summary: string }>(
    "SELECT title, summary FROM meals WHERE slug = $1",
    [params.slug]
  );

  const recipe = result.rows[0];
  if (!recipe) return {};

  return {
    title: recipe.title,
    description: recipe.summary,
  };
}

// ✅ 2. Generate all possible slug routes (optional but recommended)
export async function generateStaticParams() {
  const result = await pool.query<{ slug: string }>("SELECT slug FROM meals");
  return result.rows.map((recipe) => ({ slug: recipe.slug }));
}

// ✅ 3. Page component
export default async function SinglePageRecipe({ params }: Props) {
  const result = await pool.query<{
    slug: string;
    title: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  }>("SELECT * FROM meals WHERE slug = $1", [params.slug]);

  const recipe = result.rows[0];

  if (!recipe) return notFound();

  return (
    <main className="flex flex-col justify-start items-center gap-8 px-4 py-16 w-full max-w-screen-xl mx-auto">
      <article className="flex flex-col justify-around w-full gap-8">
        <header className="flex flex-col justify-start gap-4">
          <h1 className="text-5xl text-green-700 font-bold">{recipe.title}</h1>
        </header>
        <div className="relative w-full max-w-full h-[40rem]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover w-full rounded-xl"
          />
        </div>
        <section>
          <p className="text-gray-400 text-md">{recipe.summary}</p>
          <p className="text-gray-600 text-sm">
            By{" "}
            <Link
              href={`mailto:${recipe.creator_email}`}
              className="text-green-700"
            >
              {recipe.creator}
            </Link>{" "}
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">Instructions</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: recipe.instructions.replace(/\\n/g, "<br />"),
            }}
          />
        </section>
      </article>
    </main>
  );
}
