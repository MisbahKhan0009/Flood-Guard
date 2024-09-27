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
    <section className="w-10/12 mx-auto  ">
      <WeatherDashboard className="backdrop-blur-md" />
      <Stats className="backdrop-blur-md" />
      <LatestNewsSection className="backdrop-blur-md" />
      <PrecautionSection className="backdrop-blur-md" />
      <Donation className="backdrop-blur-md" />
      <EmergencyContactSection className="backdrop-blur-md" />
      <FAQSection className="backdrop-blur-md" />
    </section>
  );
};

export default HomePage;
