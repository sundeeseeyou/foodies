import Image from "next/image";
import pool from "../../../../lib/db";

export default function SinglePageRecipe() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 px-4 py-16 w-full max-w-screen-2xl mx-auto">
      <section className="flex justify-around min-w-full p-4">
        <Image src={``} alt={``} fill />
        <header>
          <h1 className="text-5xl text-green-700 font-bold">TITLE</h1>
          <p>By Creator</p>
        </header>
      </section>
      <section>
        <p>Instruction</p>
      </section>
    </main>
  );
}
