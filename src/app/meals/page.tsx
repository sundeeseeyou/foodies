import MealsGrid from "../../../components/MealsGrid";
import pool from "../../../lib/db";
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";

export default async function MealsPage() {
  const result = await pool.query<{
    slug: string;
    title: string;
    image: string;
    summary: string;
    creator: string;
  }>("SELECT slug, title, image, summary, creator FROM meals ORDER BY id");

  const meals = result.rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    image: row.image,
    summary: row.summary,
    user: row.creator,
  }));

  return (
    <main className="flex flex-col gap-8 px-4 py-16 w-full max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Find your favorite meals</h1>
          <p className="text-gray-500">
            We offer amazing cuisine from different nations.
          </p>
        </div>
        <Link
          href="/share"
          className="flex items-center gap-2 rounded-full bg-black text-white py-2 px-6 text-sm hover:bg-gray-700 active:bg-gray-700"
        >
          <IoIosShareAlt />
          Share
        </Link>
      </div>

      <MealsGrid foods={meals} />
    </main>
  );
}
