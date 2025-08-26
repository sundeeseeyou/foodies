import type { Metadata } from "next";
import "./globals.css";
import HeaderFoodies from "@/components/homepage/HeaderFoodies";
import Footer from "../components/homepage/Footer";

export const metadata: Metadata = {
  title: {
    default: "Find and Share Recipes",
    template: "%s | Foodies",
  },
  description: "Browse and discover great recipes.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full min-h-screen min-w-full mx-auto items-center antialiased font-display">
        <HeaderFoodies />
        {children}
        <Footer />
      </body>
    </html>
  );
}
