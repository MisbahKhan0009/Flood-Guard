import React from "react";
import Donation from "./Donation/Donation";
import Stats from "./Stats/Stats";
import LatestNewsSection from "./News/LatestNewsSection";
import PrecautionSection from "./Precaution/PrecautionSection";
import WeatherDashboard from "./Weather/WeatherDashboard";
import WeatherForecastComponent from "./Weather/WeatherForecastComponent";

const HomePage = () => {
  return (
    <section className="w-10/12 mx-auto ">
      <WeatherDashboard />
      <WeatherForecastComponent />
      <Stats />
      <Donation />
      <LatestNewsSection />
      <PrecautionSection />
    </section>
  );
};

export default HomePage;
