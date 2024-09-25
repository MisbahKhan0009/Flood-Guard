import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";

const WeatherForecastComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "http://api.weatherapi.com/v1/forecast.json?key=d709d5a8324946adadf203737242109&q=Dhaka&days=5"
        ); // Replace with your actual API URL
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="container mx-auto">
      <WeatherForecast weatherData={weatherData} />
    </div>
  );
};

export default WeatherForecastComponent;
