"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: LinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`text-black hover:text-lime-800 ${
        path.startsWith(href) ? "text-lime-800" : ""
      }`}
    >
      {children}
    </Link>
  );
}
