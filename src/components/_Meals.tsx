import MealsGrid from "@/components/MealsGrid";
import { getMeals } from "@/lib/_meals";

export default async function Meals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Artificial delay
  const meals = await getMeals();
  return <MealsGrid foods={meals} />;
}
