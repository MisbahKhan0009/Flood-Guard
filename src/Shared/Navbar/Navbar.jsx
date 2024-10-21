// @ts-ignore
import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLinks } from "./navLinks"; // Assuming NavLinks is an array of {name, path}
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/community-portal") {
    if (user) {
      // Redrect based on user role

      if (sessionStorage.getItem("userData").role === "rescuer") {
        navigate("/rescuer-portal");
      } else if (sessionStorage.getItem("userData").role === "victim") {
        navigate("/victim-poral");
      }
    } else {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }

  return (
    <div className="bg-primary opacity-95 flex justify-between text-secondary">
      {/* Logo */}
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-28 p-6 ms-10" />
      </Link>

      {/* Navigation Links */}
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
