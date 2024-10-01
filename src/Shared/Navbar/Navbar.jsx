// @ts-ignore
import React from "react";
import { Link } from "react-router-dom";
import { NavLinks } from "./NavLinks";


const Navbar = () => {
  return (
    <div className="bg-primary opacity-95 flex justify-between text-secondary">
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-28 p-6 ms-10" />
      </Link>
      <div className="flex w-1/3 items-center text-2xl font-museo justify-between me-20">
        {NavLinks.map(({ name, path }, idx) => (
          <Link
            to={path}
            key={idx}
            className="relative text-secondary text-decoration-none fs-4 group"
          >
            {name}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
