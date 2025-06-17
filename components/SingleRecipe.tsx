import MealsItem from "./MealsItem";

export type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export default function SingleRecipe() {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-4"></div>
    </>
  );
}
