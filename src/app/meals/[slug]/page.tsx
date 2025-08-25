import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/_meals";
import RecipeDetail from "@/components/meals/_RecipeDetails";

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
