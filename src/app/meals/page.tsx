import Link from "next/link";

export default function MealsPage() {
  return (
    <>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-8xl">Meals</h1>
        <Link href="/meals/meals-1">Recipe 1</Link>
        <Link href="/meals/meals-2">Recipe 2</Link>
        <Link href="/meals/meals-3">Recipe 3</Link>
        <Link href="../">Back to Top</Link>
      </main>

      <Link className="fixed top-1 right-5" href="/meals/share">
        Share →
      </Link>
    </>
  );
}
