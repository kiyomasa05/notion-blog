import Link from "next/link";
import React from "react";
import { FaGithub, FaHome } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
              className="block px-4 py-2 hover:text-sky-900 hover:bg-sky-500 transition-all duration-300"
            >
              <FaHome size="20px" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://twitter.com/kiyoma_try"
              className="block px-4 py-2 hover:text-sky-900 hover:bg-sky-500 transition-all duration-300"
            >
              <FaXTwitter size="20px" />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://github.com/kiyomasa05"
              className="block px-4 py-2 hover:text-sky-900 hover:bg-sky-500 transition-all duration-300"
            >
              <FaGithub size="20px" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
