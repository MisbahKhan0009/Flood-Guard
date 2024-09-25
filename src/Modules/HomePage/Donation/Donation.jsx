// CardContainer.jsx
import React from "react";
import { DonationSites } from "./DonationSites";
import ImageCard from "../../../components/ui/ImageCard";

const Donation = () => {
  return (
    <div className="grid place-content-center bg-primary rounded-lg bg-opacity-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-10/12 mx-auto min-h-screen items-center justify-center">
      {DonationSites.map((item, index) => (
        <div key={index} className="p-2 ">
          <ImageCard
            imgUrl={item.imgUrl}
            title={item.title}
            donationLink={item.donationLink}
          />
        </div>
      ))}
    </div>
  );
};

export default Donation;
