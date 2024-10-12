import React from "react";
import { IoIosClose } from "react-icons/io";

// Modal Component to display content (in this case the map)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur">
      <div className="bg-white text-black text-2xl p-6 rounded-lg shadow-lg w-3/4  relative">
        {/* Close button positioned absolutely to the top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black"
        >
          <IoIosClose className="size-5"/>
        </button>
        {children} {/* Modal content */}
      </div>
    </div>
  );
};

export default Modal;
