import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/_meals";
import RecipeDetail from "@/components/meals/_RecipeDetails";

type Props = {
  params: { slug: string };
};

export default async function SinglePageRecipe({ params }: Props) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
}
