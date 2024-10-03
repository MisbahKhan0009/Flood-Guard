// CardContainer.jsx
// @ts-ignore
import React from "react";
import { DonationSites } from "./DonationSites";
import ImageCard from "../../../components/ui/ImageCard";

const Donation = () => {
  return (
    <section className="bg-primary rounded-lg   bg-opacity-15 flex flex-col justify-center items-center pb-6 my-12">
      <h1 className="text-5xl text-primary font-museo text-center pt-12 pb-6">Donate Now</h1>

      <div className="grid place-content-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3  mx-auto min-h-screen items-center justify-center pb-6 w-10/12">
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
