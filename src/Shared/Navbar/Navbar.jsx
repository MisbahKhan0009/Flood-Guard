import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "sonner";

// Dynamic NavLinks based on authentication status
export const NavLinks = (user) => [
  { name: "Community Portal", path: "/community-portal" },
  { name: "Flood Prediction", path: "/flood-prediction" },
  ...(user ? [] : [{ name: "Login", path: "/login" }]), // Show Login link if user is not authenticated
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle role-based redirection in /community-portal
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
        navigate("/login"); // Redirect to login if not authenticated
      }
    }
  }, [user, location.pathname, navigate]);

  // Toggle dropdown menu
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle logout
  const handleLogout = () => {
    logOut();
    toast.success("You have been logged out successfully");
    navigate("/login");
    sessionStorage.clear();
  };

  return (
    <div className="bg-primary opacity-95 flex justify-between text-secondary">
      {/* Logo */}
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-28 p-6 ms-10" />
      </Link>

      {/* Navigation Links */}
      <div className="flex w-1/3 items-center text-2xl font-museo justify-between me-20">
        {NavLinks(user).map(({ name, path }, idx) => (
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

      {/* User Profile Dropdown */}
      {user && (
        <div className="relative me-10">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={
                user.profilePicture ||
                "https://ui-avatars.com/api/?name=John+Doe"
              } // Use user's profile picture or a default one
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
            <span className="text-xl">{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <Link
                to="/update-profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Update Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
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
