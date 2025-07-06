import { ReactNode } from "react";

export type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export interface StringType {
  string: string;
  children: ReactNode;
}

export type LinkType = {
  href: string;
  children: ReactNode;
}

export type Strings = {
  label: string;
  name: string;
}
