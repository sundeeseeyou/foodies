import Link from "next/link";
import Image from "next/image";
import { RecipeCard } from "./MealsGrid";

export default function MealsItem({
  title,
  slug,
  image,
  summary,
  user,
}: RecipeCard) {
  return (
    <section className="flex flex-col justify-start p-6 bg-white shadow-md rounded-xl overflow-hidden">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">By {user}</p>
        <p className="text-sm text-gray-800">{summary}</p>
        <Link
          href={`/meals/${slug}`}
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          See the recipe →
        </Link>
      </div>
    </section>
  );
}
