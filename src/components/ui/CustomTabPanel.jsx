import React from "react";
import { cn } from "@/lib/utils";

const CustomTabPanel = ({ children, value, index, className }) => {
  return (
    <div className={cn(className)} role="tabpanel" hidden={value !== index}>
      {value === index && <div className="p-4">{children}</div>}
    </div>
  );
};

export default CustomTabPanel;
