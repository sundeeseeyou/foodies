import Link from "next/link";
import Image from "next/image";
import { Button } from "@headlessui/react";

type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export default function MealsItem({
  title,
  slug,
  image,
  summary,
  user,
}: RecipeCard) {
  return (
    <>
      <section className="flex flex-col justtify-start p-8 bg-white gap-4">
        <Image src={image} alt={title} fill></Image>
        <div className="flex flex-col gap-4">
          <div className="">
            <h4>{title}</h4>
            <p>By {user}</p>
            <p>{summary}</p>
          </div>
          <div className="">
            <Link href={`/meals/${slug}`}>
              <Button>See the recipe</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
