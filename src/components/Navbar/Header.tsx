import Link from "next/link";
import React from "react";
import { BLOG_TITLE } from "@/app/constants/constans";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-5 bg-slate-100">
      <div className="mx-auto text-center">
        <Link
          href="/"
          className="text-xl lg:text-2xl font-medium whitespace-nowrap text-sky-800 hover:opacity-50  transition-all duration-300"
        >
          {BLOG_TITLE}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
