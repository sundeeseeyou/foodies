"use client";
import { TbError404 } from "react-icons/tb";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center min-h-[80svh]">
      <TbError404 className="text-red-600 text-6xl" />
      <h1 className="text-6xl text-black font-bold">RECIPE IS NOT FOUND</h1>
      <p>Oops. Please try another query.</p>
      <Link href={".."} className="text-gray-600 text-sm hover:underline">
        Back
      </Link>
    </main>
  );
}
