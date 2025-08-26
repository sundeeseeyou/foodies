import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/_meals";
import RecipeDetail from "@/components/meals/_RecipeDetails";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
      description:
        "The recipe you’re looking for doesn’t exist or was removed.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { default: recipe.title, template: "%s | Foodies" },
    description: recipe.summary,
  };
}

export default async function SinglePageRecipe({ params }: { params: Params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
}

// // (jika ada)
// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = await params; // ⬅️ juga di-await
//   // ...
// }
