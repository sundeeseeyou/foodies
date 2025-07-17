import type { Metadata } from "next";
// import { Nunito_Sans, Fira_Mono } from "next/font/google";
import "./globals.css";
import HeaderFoodies from "@/components/homepage/HeaderFoodies";
import Footer from "../components/homepage/Footer";

// const nunitoSans = Nunito_Sans({
//   variable: "--font-nunito-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const firaMono = Fira_Mono({
//   variable: "--font-fira-mono",
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
// });

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
      {/* <body
        className={`${nunitoSans.variable} ${firaMono.variable} flex flex-col h-full min-h-screen mx-auto items-center font-[family-name:var(--font-nunito-sans)] antialiased`}
      > */}
      <body className="flex flex-col h-full min-h-screen mx-auto items-center antialiased font-display ">
        <HeaderFoodies />
        {children}
        <Footer />
      </body>
    </html>
  );
}
