// CardContainer.jsx
import React from "react";
import { DonationSites } from "./DonationSites";
import ImageCard from "../../../components/ui/ImageCard";

const Donation = () => {
  return (
    <section className="bg-primary rounded-lg w-10/12 bg-opacity-10 mx-auto ">
      <h1 className="text-4xl font-museo text-center pt-12 pb-6">Donate Now</h1>
      <p className="text-center w-2/4  mx-auto pb-6">Donating during floods can provide essential resources such as food, shelter, and medical aid to those affected by the disaster. Your contribution helps save lives, rebuild communities, and offer hope in times of crisis.</p>
      <div className="grid place-content-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full mx-auto min-h-screen items-center justify-center">
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
    </section>
  );
};

export default Donation;
