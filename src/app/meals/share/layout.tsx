import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Share Your Own Recipes",
    template: "%s | Foodies",
  },
  description: "Browse and discover great recipes.",
};

export default function MealsSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
