import type { Metadata } from "next";
import "./globals.css";
import HeaderFoodies from "@/components/homepage/HeaderFoodies";
import Footer from "../components/homepage/Footer";

export const metadata: Metadata = {
  title: "Food Network",
  description: "Online Recipe Book you can cook at home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full min-h-screen mx-auto items-center antialiased font-display ">
        <HeaderFoodies />
        {children}
        <Footer />
      </body>
    </html>
  );
}
