import type { Metadata } from "next";
import { Nunito_Sans, Fira_Mono } from "next/font/google";
import "./globals.css";
import HeaderFoodies from "@/../components/HeaderFoodies";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${firaMono.variable} flex flex-col font-[family-name:var(--font-nunito-sans)] antialiased`}
      >
        <HeaderFoodies />
        {children}
      </body>
    </html>
  );
}
