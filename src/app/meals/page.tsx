import Link from "next/link";
import { Suspense } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Meals from "@/components/_Meals";
import Loading from "./FoodLoading";

export default async function MealsPage() {
  return (
    <main className="flex flex-col gap-8 px-4 py-16 w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">Find your favorite meals</h1>
          <p className="text-gray-500">
            We offer amazing cuisine from different nations.
          </p>
        </div>
        <Link
          href={`meals/share`}
          className="flex items-center text-xl gap-2 rounded-full bg-green-700 text-white py-2 px-8 hover:opacity-80 active:bg-gray-700"
        >
          <IoIosAddCircle />
          New Recipe
        </Link>
      </div>
      <section className="mt-8">
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </section>
    </main>
  );
}
