// @ts-ignore
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center max-w-2xl mx-auto h-screen bg-secondary text-primary">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
        {/* Left part - Big 404 */}
        <div className="text-8xl font-thin font-museo">404</div>

        {/* Vertical line */}
        <div className="h-44 w-px bg-primary mx-4"></div>

        {/* Right part - Description */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-semibold font-museo mb-2">
            Page Not Found
          </h1>
          <p className="text-lg my-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="bg-secondary text-primary  underline">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
