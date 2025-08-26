import { TbError404 } from "react-icons/tb";
import Link from "next/link";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Recipe Not Found",
  description: "The recipe you’re looking for doesn’t exist or was removed.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center min-h-[80svh]">
      <TbError404 className="text-red-600 text-9xl" />
      <h1 className="text-6xl text-black font-bold">RECIPE IS NOT FOUND</h1>
      <p>Please try another recipe.</p>
      <Link href={"/meals"} className="text-gray-600 text-sm hover:underline">
        Back
      </Link>
    </main>
  );
}
