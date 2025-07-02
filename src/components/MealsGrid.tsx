import MealsItem from "./MealsItem";
import { RecipeCard } from "./types";

export default function MealsGrid({ foods }: { foods: RecipeCard[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {foods.map((item) => (
        <li key={item.slug}>
          <MealsItem {...item} />
        </li>
      ))}
    </ul>
  );
}
