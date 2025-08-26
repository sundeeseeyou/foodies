import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/_meals";
import RecipeDetail from "@/components/meals/_RecipeDetails";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
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
