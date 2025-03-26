import { Button } from "@headlessui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import bannerImage from "../public/salad-bowl.jpg";
import Image from "next/image";
import Link from "next/link";
export default function HeroesImage() {
  return (
    <>
      <div className="flex flex-row justify-between gap-8 w-[1440px] bg-lime-900 h-auto rounded-4xl p-16 mt-8 min-h-128">
        {/* left area banner */}
        <div className="flex flex-col justify-center gap-4 items-start font-bold text-white w-1/2">
          <h1 className="text-6xl">Best Veggie Food in Jakarta</h1>
          <p className="text-md font-light">
            You won't believe you have some greens
          </p>
          <div className="flex flex-row flex-nowrap gap-4 mt-4">
            <Link href="/meals">
              <Button className="flex items-center gap-2 rounded-4xl bg-white text-[#2d2d2d] py-4 px-12 text-sm hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer">
                <MdFastfood />
                Browser Meals
              </Button>
            </Link>
            <Link href="/community">
              <Button className="flex items-center gap-2 rounded-4xl bg-black text-white py-4 px-12 text-sm hover:opacity-70 active:bg-black hover:cursor-pointer">
                <BsPeopleFill />
                Browser Community
              </Button>
            </Link>
          </div>
        </div>
        {/* right area banner */}
        <div className="w-1/2">
          <Image
            src={bannerImage}
            alt="vegetable banner"
            className="object-contain min-w-128 rounded-4xl"
            priority
          />
        </div>
      </div>
    </>
  );
}
