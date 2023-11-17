import type { Metadata } from "next";
import "./globals.css";

import { Outfit } from "next/font/google";
import Image from "next/image";

import bgImage from "@/public/bg-guess-the-word.png";
import classNames from "classnames";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess The Word Game by Artur Michalak",
  description: "simple scrabble based game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames('flex items-center justify-center', outfit.className)}>
        <Image className="absolute" src={bgImage} alt="" aria-hidden />
        {children}
      </body>
    </html>
  );
}
