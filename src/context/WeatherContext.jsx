// src/context/WeatherContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
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
        const locationName = await getLocationFromCoordinates(
          latitude,
          longitude
        );
        setLocation(locationName);

        // Fetch weather data
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${WaetherApiKey}&q=${locationName}&days=1`
        );
        const weatherData = await response.json();

        if (!weatherData || weatherData.error) {
          throw new Error(weatherData.error.message);
        }

        setWeatherData(weatherData);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [WaetherApiKey, openCageApiKey]);

  return (
    <WeatherContext.Provider value={{ location, weatherData, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};
