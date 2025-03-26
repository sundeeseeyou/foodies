import Link from "next/link";

export default function MealsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-auto gap-16 px-4 py-16 sm:p-20">
      <h1 className="text-8xl">Meals</h1>
      <Link href="/meals/meals-1">Recipe 1</Link>
      <Link href="/meals/meals-2">Recipe 2</Link>
      <Link href="/meals/meals-3">Recipe 3</Link>
      <Link href="../">Back to Top</Link>
    </main>
  );
}
