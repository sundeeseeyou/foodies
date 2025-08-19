// src/app/meals/[slug]/_RecipeDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../types";

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <main className="flex flex-col justify-center items-start gap-4 my-8 p-4 max-w-screen-xl h-full w-full mx-auto">
      <section className="relative w-2xl min-h-[30rem]">
        <Image
          src={`${process.env.R2_PUBLIC_URL}/${recipe.image}`}
          alt={recipe.title}
          fill
          className="object-cover rounded-4xl border-1 border-black"
          sizes="(max-width: 768px) 100%, 50vw"
        />
      </section>

      <section className="flex flex-col gap-4 justify-start items-start w-full">
        <header className="flex flex-col justify-start w-full gap-4 mx-auto py-8 border-b-1 border-gray-400">
          <h1 className="text-5xl text-green-700 font-bold">{recipe.title}</h1>
          <p className="text-md text-gray-500 italic">{recipe.summary}</p>
          <p>
            Recipe by:{" "}
            <Link
              href={`mailto:${recipe.creator_email}`}
              target="_blank"
              className="text-md text-green-600 font-normal italic hover:text-green-400"
            >
              {recipe.creator}
            </Link>
          </p>
        </header>
        <h2 className="text-2xl text-gray-800 font-semibold">Instructions</h2>
        <div className="border-gray-500 min-w-full max-h-fit p-8 bg-gray-200 rounded-xl">
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: recipe.instructions.replace(/\\n/g, "<br />"),
            }}
          />
        </div>
      </section>
    </main>
  );
}
