import React from "react";
import Donation from "./Donation/Donation";
import Stats from "./Stats/Stats";
import LatestNewsSection from "./News/LatestNewsSection";
import PrecautionSection from "./Precaution/PrecautionSection";
import WeatherDashboard from "./Weather/WeatherDashboard";
import FAQSection from "./FAQ/FAQSection";
import EmergencyContactSection from "./EmergencyContact/EmergencyContactSection";

const HomePage = () => {
  return (
    <section className="w-10/12 mx-auto ">
      <WeatherDashboard />
      <Stats />
      <Donation />
      <LatestNewsSection />
      <PrecautionSection />
      <EmergencyContactSection />
      <FAQSection />
    </section>
  );
};

export default HomePage;
