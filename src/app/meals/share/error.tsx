"use client";
import { RiEmotionSadFill } from "react-icons/ri";

export default function Error() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center min-h-[80svh]">
      <RiEmotionSadFill className="text-green-700 text-5xl" />
      <h1 className="text-5xl text-green-700 font-bold">
        Oops. Something went wrong.
      </h1>
      <p>Please try again later</p>
    </main>
  );
}
