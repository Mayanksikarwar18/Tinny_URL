import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-evenly items-center text-white h-[10vh] bg-linear-to-r/hsl from-[#0c7390] to-[#002544]">
      <img src="/Logo.png" alt="Logo" className="h-20 w-80" />
      <ul className="flex items-center justify-center h-full gap-30 font-extrabold text-lg">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/">Contact</Link>
        </li>
        <li className="hover:underline">
          <Link href="/">Shorten</Link>
        </li>
        <li className="hover:underline">
          <Link href="/">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
