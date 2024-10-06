// src/context/WeatherContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
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

  // First useEffect to get user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        const locationName = await getLocationFromCoordinates(
          latitude,
          longitude
        );
        setLocation(locationName);
      } catch (error) {
        setError("Error fetching location: " + error.message);
      }
    };
    fetchLocation();
  }, [openCageApiKey]);

  // Second useEffect to fetch weather data after location is set
  useEffect(() => {
    if (!location) return; // Prevent fetching weather data without a location

    const fetchWeatherData = async () => {
      setLoading(true);
      setError("");
      try {
        const weatherResponse = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=6&aqi=yes`
        );
        const weatherData = await weatherResponse.json();

        if (!weatherData || weatherData.error) {
          throw new Error(weatherData.error.message);
        }

        setCurrentWeatherData(weatherData);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, weatherApiKey]);

  const weatherData = { location, currentWeatherData, loading, error };

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};
