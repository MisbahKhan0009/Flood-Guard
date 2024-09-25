// src/components/WeatherDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCloudRain, FaWind, FaThermometerHalf, FaEye } from "react-icons/fa";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const WaetherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const openCageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const getLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const city =
          data.results[0].components.city || data.results[0].components.country;
        return city || "Location not found";
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      throw new Error("Geocoding error: " + error.message);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError("");
      try {
        const { latitude, longitude } = await getUserLocation();
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Log coordinates
        const location = await getLocationFromCoordinates(latitude, longitude);

        // Now you can use the location to fetch weather data
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${WaetherApiKey}&q=${location}&days=1`
        );
        const weatherData = await response.json();

        if (!weatherData || weatherData.error) {
          throw new Error(weatherData.error.message);
        }

        setWeather(weatherData);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-primary bg-opacity-15 shadow-lg rounded-lg p-6 max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Weather Dashboard</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">{weather.location.name}</h2>
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
          className="my-2"
        />
        <p className="text-lg">{weather.current.condition.text}</p>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="flex items-center">
            <FaThermometerHalf className="text-red-500" />
            <span className="ml-2">{weather.current.temp_c}°C</span>
          </div>
          <div className="flex items-center">
            <FaWind className="text-blue-500" />
            <span className="ml-2">Wind: {weather.current.wind_kph} km/h</span>
          </div>
          <div className="flex items-center">
            <FaCloudRain className="text-gray-500" />
            <span className="ml-2">Humidity: {weather.current.humidity}%</span>
          </div>
          <div className="flex items-center">
            <FaEye className="text-yellow-500" />
            <span className="ml-2">
              Visibility: {weather.current.vis_km} km
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
