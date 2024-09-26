import React from "react";
import Donation from "./Donation/Donation";
import Stats from "./Stats/Stats";
import LatestNewsSection from "./News/LatestNewsSection";
import PrecautionSection from "./Precaution/PrecautionSection";
import WeatherDashboard from "./Weather/WeatherDashboard";
import FAQSection from "./FAQ/FAQSection";

const HomePage = () => {
  return (
    <section className="w-10/12 mx-auto ">
      <WeatherDashboard />
      <Stats />
      <Donation />
      <LatestNewsSection />
      <PrecautionSection />
      <FAQSection />
    </section>
  );
};

export default HomePage;
