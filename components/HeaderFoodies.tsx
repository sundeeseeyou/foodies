import Image from "next/image";
import foodies from "../public/foodies.webp";
import Link from "next/link";

export default function HeaderFoodies() {
  return (
    <>
      <header className="flex flex-row w-full bg-white shadow justify-center fixed items-center py-4 px-6 max-h-[5rem] lg:px-0">
        <div className="w-[1440px] flex flex-row justify-between items-center">
          <Link href="/">
            <Image
              src={foodies}
              alt="icon logo"
              className="object-contain max-w-24"
              priority
            />
          </Link>
          <nav className="hidden sm:block">
            <ul className="flex flex-row gap-8">
              <li>
                <Link href="/meals">Browse Meals</Link>
              </li>
              <li>
                <Link href="/community">Browse Community</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
