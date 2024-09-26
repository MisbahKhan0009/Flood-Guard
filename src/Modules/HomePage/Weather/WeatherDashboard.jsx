// src/components/WeatherDashboard.jsx
import React from "react";
import { FaCloudRain, FaWind, FaThermometerHalf, FaEye } from "react-icons/fa";
import { useWeather } from "../../../context/WeatherContext";

const WeatherDashboard = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-primary bg-opacity-15 shadow-lg rounded-lg p-6 max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Weather Dashboard</h1>
      {weatherData && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">{weatherData.location.name}</h2>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="my-2"
          />
          <p className="text-lg">{weatherData.current.condition.text}</p>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="flex items-center">
              <FaThermometerHalf className="text-red-500" />
              <span className="ml-2">{weatherData.current.temp_c}°C</span>
            </div>
            <div className="flex items-center">
              <FaWind className="text-blue-500" />
              <span className="ml-2">
                Wind: {weatherData.current.wind_kph} km/h
              </span>
            </div>
            <div className="flex items-center">
              <FaCloudRain className="text-gray-500" />
              <span className="ml-2">
                Humidity: {weatherData.current.humidity}%
              </span>
            </div>
            <div className="flex items-center">
              <FaEye className="text-yellow-500" />
              <span className="ml-2">
                Visibility: {weatherData.current.vis_km} km
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
