"use client";

import { StringType } from "../types";

export default function HeadingText({ string, children }: StringType) {
  return (
    <div className="flex-column justify-start w-full min-h-full px-4 py-16">
      <h1>{string}</h1>
      <p>{children}</p>
    </div>
  );
}
