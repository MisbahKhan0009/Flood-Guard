import React from "react";
import Donation from "./Donation/Donation";
import Stats from "./Stats/Stats";

const HomePage = () => {
  return (
    <section className="w-10/12 mx-auto ">
      <Stats />
      <Donation />
    </section>
  );
};

export default HomePage;
