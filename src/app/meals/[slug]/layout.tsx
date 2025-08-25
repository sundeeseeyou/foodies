import { getRecipe } from "@/lib/_meals";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.title,
    description: recipe.summary,
  };
}

export default function MealsSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
