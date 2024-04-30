import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iOS Weather App",
  description: "A weather app based on the iOS weather app design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={` ${inter.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
