"use client";
import { ReactNode } from "react";

interface headingSet {
  heading: string;
  children: ReactNode;
}

export default function HeadingText({ heading, children }: headingSet) {
  return (
    <div className="flex-column justify-start w-full min-h-full px-4 py-16">
      <h1>{heading}</h1>
      <p>{children}</p>
    </div>
  );
}
