import { ReactNode } from "react";

export type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export interface headingSet {
  heading: string;
  children: ReactNode;
}
