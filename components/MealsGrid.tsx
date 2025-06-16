import MealsItem from "./MealsItem";

export type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export default function MealsGrid({ foods }: { foods: RecipeCard[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((item) => (
        <li key={item.slug}>
          <MealsItem {...item} />
        </li>
      ))}
    </ul>
  );
}
