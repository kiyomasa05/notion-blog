import Link from "next/link";
import React from "react";
import { FaGithub, FaHome } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BLOG_TITLE } from "@/app/constants/constans";

const Footer = () => {
  return (
    <nav className="w-full bg-rose-700 text-slate-50">
      <div className="mx-3 pt-1">
        <Link
          href="/"
          className="text-base font-medium whitespace-nowrap text-slate-50"
        >
          {BLOG_TITLE}
        </Link>
        <p className="text-sm">Notion APIとNEXT.jsで作成したブログです。</p>
      </div>

      <div className="border border-slate-200"></div>
      <p className="text-center p-0 m-0 text-xs">Made by kiyoma @ 2024</p>
      <div className="container flex justify-center mx-auto">
        <ul className="flex items-center text-sm list-none">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 text-slate-50 hover:bg-rose-900 transition-all duration-300"
            >
              <FaHome size="20px" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://twitter.com/kiyoma_try"
              className="block px-4 py-2 text-slate-50 hover:bg-rose-900 transition-all duration-300"
            >
              <FaXTwitter size="20px" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://github.com/kiyomasa05"
              className="block px-4 py-2 text-slate-50 hover:bg-rose-900 transition-all duration-300"
            >
              <FaGithub size="20px" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
