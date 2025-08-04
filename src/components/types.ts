import { ReactNode } from "react";

export type RecipeCard = {
  title: string;
  slug: string;
  image: string;
  summary: string;
  user: string;
};

export type StringType = {
  string: string;
  children: ReactNode;
};

export type LinkType = {
  href: string;
  children: ReactNode;
};

export type Strings = {
  label: string;
  name: string;
};

export type Meal = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  user: string;
};

export type Recipe = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type ToastProps = {
  message: string;
  onClose: () => void;
  duration: number;
};

export type AddMealResult =
  | { success: true; slug: string }
  | { success: false; errors: Record<string, string[]> };
