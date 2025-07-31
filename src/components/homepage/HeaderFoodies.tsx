import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default function HeaderFoodies() {
  return (
    <>
      <header className="flex flex-row w-full bg-white shadow justify-center items-center max-h-[5rem]">
        <div className="flex flex-row justify-between px-4 items-center py-4 w-full mx-auto">
          <Link href="/">
            <div className="relative w-36 aspect-[3/1]">
              <Image
                src="/foodies.webp"
                alt="icon logo"
                className="object-contain"
                priority
                fill
              />
            </div>
          </Link>
          <nav className="hidden sm:block">
            <ul className="flex flex-row gap-8">
              <li>
                <NavLink href="/meals"> Browse Meals</NavLink>
              </li>
              <li>
                <NavLink href="/community"> Browse Community</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
