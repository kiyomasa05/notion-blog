import Link from "next/link";
import React from "react";
import { BLOG_TITLE } from "@/app/constants/constans";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 bg-sky-200">
      <div className="mx-auto text-center">
        <Link href="/" className="text-xl font-medium whitespace-nowrap">
          {BLOG_TITLE}
        </Link>
      </div>

      <div className="container flex justify-center mx-auto">
        <ul className="flex items-center text-sm list-none">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://twitter.com/kiyoma_try"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              X(旧Twitter)
            </Link>
          </li>
          <li>
            <Link
              href="https://qiita.com/kiyomasa05"
              target="_blank"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Qiita
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://github.com/kiyomasa05"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
