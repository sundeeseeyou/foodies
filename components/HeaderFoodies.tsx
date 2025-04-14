import Image from "next/image";
import foodies from "../public/foodies.webp";
import Link from "next/link";
import NavLink from "./NavLink";

export default function HeaderFoodies() {
  return (
    <>
      <header className="flex flex-row w-full bg-white shadow justify-center fixed items-center max-h-[5rem]">
        <div className="w-[1440px] flex flex-row justify-between items-center py-4">
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
                <NavLink href="/meals">Browse Meals</NavLink>
              </li>
              <li>
                <NavLink href="/community">Browse Community</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
