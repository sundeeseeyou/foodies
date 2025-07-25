import SectionImage from "./SectionImage";
import SectionText from "./SectionText";
import Link from "next/link";

export default function SectionFeaturesLeft() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto">
      <div className="flex flex-row justify-between items-center max-w-screen-xl my-8 min-h-64 gap-16 rounded-xl ">
        <SectionImage url="/delivery.jpg" alt="delivery guy" />
        <SectionText>
          <h2 className="text-4xl text-gray-700 font-bold">
            Hidup tak mau rugi
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, quisquam, mollitia aliquam esse amet facilis, earum
            iusto non ratione natus aliquid harum fugit accusamus modi? Quae
            doloremque commodi asperiores pariatur!
          </p>

          <Link
            href="/community"
            className="mt-4 w-1/3 gap-2 rounded-full font-bold bg-transparent text-gray-950 border-2 border-gray-950 py-4 px-12 text-center text-sm hover:bg-gray-800 hover:text-white active:bg-black hover:cursor-pointer"
          >
            Read More
          </Link>
        </SectionText>
      </div>
    </section>
  );
}
