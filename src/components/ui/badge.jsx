import { DotIcon } from "lucide-react";
import React from "react";

const Badge = ({ variant, children }) => {
  const variantClasses = {
    destructive: "bg-red-500 text-red-500 border-red-500 ",
    warning: "bg-yellow-500 text-yellow-500 border-yellow-500 ",
    success: "bg-green-500 text-green-500 border-green-500 ",
    default: "bg-blue-500 text-blue-500 border-blue-500 ",
  };

  return (
    <span
      className={`w-24 px-2 my-1 bg-opacity-25 border rounded-xl  text-sm text-center inline-block ${variantClasses[variant]}`}
    >
   
       {children}
    </span>
  );
};

export default Badge;
