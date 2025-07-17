import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/lib/_meals";

export default async function Meals() {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Artificial delay
  const meals = await getMeals();
  return <MealsGrid foods={meals} />;
}

// /* without delay*/
// export default function Meals() {
//   const meals = getMeals();
//   return <MealsGrid foods={meals} />;
// }
