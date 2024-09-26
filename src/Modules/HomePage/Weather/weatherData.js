// src/data/weatherData.js
import { FaThermometerHalf, FaCity, FaWind, FaCloudRain } from "react-icons/fa";
import { FaMaskVentilator } from "react-icons/fa6";
import { GiRaining } from "react-icons/gi";

export const weatherData = (current) => [
  {
    id: 1,
    label: "Temperature",
    value: `${current.temp_c}°C`,
    icon: FaThermometerHalf, // Importing icon
  },
  {
    id: 2,
    label: "Feels Like",
    value: `${current.feelslike_c}°C`,
    icon: FaCity, // Importing icon
  },
  {
    id: 3,
    label: "Wind",
    value: `${current.wind_kph} km/h`,
    icon: FaWind, // Importing icon
  },
  {
    id: 4,
    label: "Humidity",
    value: `${current.humidity}%`,
    icon: FaCloudRain, // Importing icon
  },
  {
    id: 5,
    label: "AQI",
    value: `${current.air_quality["us-epa-index"]}`,
    icon: FaMaskVentilator, // Importing icon
  },
  {
    id: 6,
    label: "Precipitation",
    value: `${current.precip_mm}mm`,
    icon: GiRaining, // Importing icon
  },
];
