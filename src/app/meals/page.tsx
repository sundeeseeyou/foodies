import MealsGrid from "../../../components/MealsGrid";
import { Suspense } from "react";
import pool from "../../../lib/db";
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";
import Loading from "./FoodLoading";

// This is the main page for meals, which fetches data from the database and displays it.
// It uses server-side rendering to fetch the meals data and display it in a grid format.

async function Meals() {
  // Artificial delay: 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //Artificial error to try error handling
  // throw new Error("Unable to load data");

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

  return <MealsGrid foods={meals} />;
}

export default async function MealsPage() {
  return (
    <main className="flex flex-col gap-8 px-4 py-16 w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Find your favorite meals</h1>
          <p className="text-gray-500">
            We offer amazing cuisine from different nations.
          </p>
        </div>
        <Link
          href="/share"
          className="flex items-center text-xl gap-2 rounded-full bg-green-700 text-white py-2 px-8 hover:opacity-80 active:bg-gray-700"
        >
          <IoIosShareAlt />
          Share
        </Link>
      </div>
      <section className="food-grid mt-8">
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </section>
    </main>
  );
}
