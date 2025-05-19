import MealsItem from "./MealsItem";
import { RecipeCard } from "./MealsItem";

export default function MealsGrid({
  foods,
}: Readonly<{
  foods: RecipeCard[];
}>) {
  return (
    <ul>
      {foods.map((item) => (
        <li key={item.slug}>
          <MealsItem {...item} />
        </li>
      ))}
    </ul>
  );
}
