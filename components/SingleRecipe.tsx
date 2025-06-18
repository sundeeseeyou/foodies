import Link from "next/link";
import Image from "next/image";
import { RecipeCard } from "./types";

export default function SingleRecipe({ title, image, slug, user }: RecipeCard) {
  return (
    <section className="flex flex-row justify-between min-h-96 overflow-hidden">
      <div className="flex flex-col gap-2 text-2xl text-shadow-green-700">
        <h1>{title}</h1>
        <p>Recipe by:{user}</p>
      </div>
      <div className="relative w-full h-64 mb-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <Link href={`/meals/${slug}`}>Go home</Link>
      </div>
    </section>
  );
}
