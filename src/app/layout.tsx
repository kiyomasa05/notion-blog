import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { BLOG_DISCRIPTION, BLOG_TITLE } from "./constants/constans";
import Header from "@/components/Navbar/Header";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

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
    <html lang="ja" className={`${notoSansJP.className} bg-slate-100`}>
      <body>
        <Header />
        {children}
      </body>
      <GoogleAnalytics gaId="G-84KEZ5MRPH" />
    </html>
  );
}
