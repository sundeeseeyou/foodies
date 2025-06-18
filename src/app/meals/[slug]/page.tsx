// import pool from "../../../lib/db";
import SingleRecipe from "../../../../components/SingleRecipe";
import { RecipeCard } from "../../../../components/types";

export default function RecipeMeals({ foods }: { foods: RecipeCard[] }) {
  const [title, name, test, tost] = foods;

  return (
    <main className="flex flex-col gap-8 px-4 py-16 w-full max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            <SingleRecipe>
              {title}
              {name}
              {test}
              {tost}
            </SingleRecipe>
          </h1>
        </div>
      </div>
    </main>
  );
}
