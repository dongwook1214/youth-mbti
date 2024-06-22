import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "청춘 MBTI",
  description: "FORIG 해커톤 청춘 MBTI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <div className="w-[1440px] flex flex-col items-center justify-start bg-[#fff]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
