import Link from "next/link";
import Image from "next/image";
import { RecipeCard } from "../types";

export default function MealsItem({
  title,
  slug,
  image,
  summary,
  user,
}: RecipeCard) {
  return (
    <section className="flex flex-col justify-start h-full bg-white shadow-md rounded-xl overflow-hidden">
      <div className="relative w-full h-64 mb-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col p-8 gap-2">
        <h4 className="text-2xl font-semibold line-clamp-2">{title}</h4>
        <p className="text-xs text-gray-400">By {user}</p>
        <p className="text-md text-gray-800 line-clamp-2">{summary}</p>
        <Link
          href={`/meals/${slug}`}
          className="w-42 mt-4 rounded-full text-center px-4 py-2 font-sm bg-green-700 text-white hover:opacity-70"
        >
          See the recipe →
        </Link>
      </div>
    </section>
  );
}
