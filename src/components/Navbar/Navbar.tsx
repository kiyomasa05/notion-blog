import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-medium">
          ブログタイトル
        </Link>
        <ul className="flex items-center text-sm py-4">
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
              href="https://twitter.com/kiyoma_try"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              X(旧Twitter)
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
            >
              Qiita
            </Link>
          </li>
          <li>
            <Link
              href="#"
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