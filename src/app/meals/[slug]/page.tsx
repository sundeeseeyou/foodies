import pool from "../../../../lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

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

  if (!recipe) {
    notFound();
  }
  return (
    <main className="flex flex-col justify-center items-start gap-4 my-8 p-4 max-w-screen-xl h-full w-full mx-auto">
      <section className="relative w-full min-h-[35rem]">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover rounded-2xl border-1 border-gray-400"
          sizes="(max-width: 768px) 100%, 50vw"
        />
      </section>

      <section className="flex flex-col gap-4 justify-start items-start w-full">
        <header className="flex flex-col justify-start w-full gap-4 mx-auto py-8 border-b-1 border-gray-400">
          <h1 className="text-5xl text-green-700 font-bold">{recipe.title}</h1>
          <p className="text-sm text-gray-500 italic">{recipe.summary}</p>
          <p>
            Recipe by:{" "}
            <Link
              href={`mailto: ${recipe.creator_email}`}
              target="blank"
              className="text-md text-green-600 font-normal italic hover:text-green-400"
            >
              {" "}
              {recipe.creator}
            </Link>
          </p>
        </header>
        <h2 className="text-2xl text-gray-800 font-semibold">Instructions</h2>
        <div className=" border-gray-500 min-w-full max-h-fit p-4 bg-gray-200 rounded-xl">
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
  //   <main className="flex flex-col justify-start items-center gap-8 px-4 py-16 w-full max-w-screen-xl mx-auto">
  //     <article className="flex flex-col justify-around w-full gap-8">
  //       <header className="flex flex-col justify-start gap-4">
  //         <h1 className="text-5xl text-green-700 font-bold">{recipe.title}</h1>
  //       </header>
  //       <div className="relative w-full max-w-full h-[40rem]">
  //         <Image
  //           src={recipe.image}
  //           alt={recipe.title}
  //           fill
  //           className="object-cover w-full rounded-xl"
  //         />
  //       </div>
  //       <section>
  //         <p className="text-gray-400 text-md">{recipe.summary}</p>
  //         <p className="text-gray-600 text-sm">
  //           By{" "}
  //           <Link
  //             href={`mailto:${recipe.creator_email}`}
  //             className="text-green-700"
  //           >
  //             {recipe.creator}
  //           </Link>{" "}
  //         </p>
  //       </section>
  //       <section className="flex flex-col gap-4">
  //         <h2 className="text-4xl font-semibold">Instructions</h2>
  //         <div
  //           dangerouslySetInnerHTML={{
  //             __html: recipe.instructions.replace(/\\n/g, "<br />"),
  //           }}
  //         />
  //       </section>
  //     </article>
  //   </main>
  // );
}
