import type { Metadata } from "next";
import { BLOG_DISCRIPTION, BLOG_TITLE } from "./constants/constans";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${BLOG_TITLE}`,
    default: BLOG_TITLE,
  },
  description: BLOG_DISCRIPTION,
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_PROJECT_URL}`),
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
