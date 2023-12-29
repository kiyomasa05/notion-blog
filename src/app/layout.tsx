import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { BLOG_DISCRIPTION, BLOG_TITLE } from "./constants/constans";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DISCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
