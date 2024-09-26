import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import { useWeather } from "../../../context/WeatherContext";
// Adjust the path as necessary

const WeatherForecastComponent = () => {
  const { location } = useWeather();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (location) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=d709d5a8324946adadf203737242109&q=${location}&days=5`
        );
        setWeatherData(response.data);
      } catch (err) {
        console.error("Error fetching weather data", err);
        setError("Could not fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData(location);
  }, [location]);

  if (loading) {
    return <div className="text-center text-primary py-4">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-4 px-4  bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-museo text-secondary text-center mb-4">
        5-Day Weather Forecast
      </h2>
      {weatherData && <WeatherForecast weatherData={weatherData} />}
    </div>
  );
};

export default WeatherForecastComponent;
