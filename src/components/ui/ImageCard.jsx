// ImageCard.jsx
import React from "react";

const ImageCard = ({ imgUrl, title, donationLink }) => {
  return (
    <div className="border mx-auto bg-primary text-secondary w-9/12 rounded-lg shadow-lg overflow-hidden">
      <a href={donationLink} target="_blank" rel="noopener noreferrer">
        <img src={imgUrl} alt={title} className="w-auto mx-auto pt-4 h-48 object-fit" />
        <div className="p-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="pt-2  text-secondary">Donate now</div>
        </div>
        
      </a>
    </div>
  );
};

export default ImageCard;
