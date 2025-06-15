import HeadingText from "../../../components/HeadingText";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";

export default function MealsPage() {
  return (
    <main className="flex flex-col items-start min-w-96 justify-center gap-2 min-h-full px-4 py-16 w-[1440px]">
      <h1>Find your favorite meals</h1>
      <p>We offer amazing cuisine for you from different nations</p>
      <Link href={`/share`}>
        <Button className="flex items-center gap-2 rounded-4xl bg-black text-white py-4 px-12 text-sm hover:bg-gray-700 active:bg-gray-700 hover:cursor-pointer">
          <IoIosShareAlt />
          Share
        </Button>
      </Link>
    </main>
  );
}
