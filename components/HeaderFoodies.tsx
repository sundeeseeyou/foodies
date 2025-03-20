import Image from "next/image";
import foodies from "../public/foodies.webp";
import Link from "next/link";

export default function HeaderFoodies() {
  return (
    <>
      <header className="flex flex-row min-w-[1440px] bg-white shadow fixed justify-between items-center py-8 px-16">
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
      </header>
    </>
  );
}
