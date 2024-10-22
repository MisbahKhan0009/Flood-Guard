import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";

export const NavLinks = (user) => [
  { name: "Community Portal", path: "/community-portal" },
  { name: "Flood Prediction", path: "/flood-prediction" },
  ...(user ? [] : [{ name: "Login", path: "/login" }]),
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const user = JSON.parse(userData);
      if (user.name) {
        setName(user.name);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/community-portal") {
      if (user) {
        const role = sessionStorage.getItem("userData")?.role;
        if (role === "rescuer") {
          navigate("/rescuer-portal");
        } else if (role === "victim") {
          navigate("/victim-portal");
        }
      } else {
        navigate("/login");
      }
    }
  }, [user, location.pathname, navigate]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logOut();
    toast.success("You have been logged out successfully");
    navigate("/login");
    sessionStorage.clear();
  };

  return (
    <div className="bg-primary opacity-95 flex justify-between items-center text-secondary">
      {/* Logo */}
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-28 p-6 ms-10" />
      </Link>

      {/* Navigation Links */}
      <div className="flex w-1/3 items-center text-2xl font-museo justify-between">
        {NavLinks(user).map(({ name, path }, idx) => (
          <Link
            to={path}
            key={idx}
            className="relative text-secondary text-decoration-none  group"
          >
            {name}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        ))}
      </div>

      {/* User Profile Dropdown */}
      {user && (
        <div className="relative me-10">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center space-x-2 focus:outline-none"
          >
            <img
              src={`https://avatar.iran.liara.run/username?username=${name}&background=051224&color=cecedf&bold=false&length=1`}
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
            <span className="text-xl">{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 border border-secondary  bg-primary rounded-lg shadow-lg z-50">
            <Link
              to="/update-profile"
              className="block px-4 py-2 hover:text-primary  hover:bg-secondary rounded-lg"
              onClick={() => setDropdownOpen(false)}
            >
              Update Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:text-primary hover:bg-secondary rounded-lg"
            >
              Logout
            </button>
          </div>
          
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
