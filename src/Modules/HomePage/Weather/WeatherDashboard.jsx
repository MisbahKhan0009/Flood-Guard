// src/components/WeatherDashboard.jsx
import React from "react";
import {
  FaCloudRain,
  FaWind,
  FaThermometerHalf,
  FaCity,
  FaCloudSunRain,
} from "react-icons/fa";
import { FaMaskVentilator } from "react-icons/fa6";
import { GiRaining } from "react-icons/gi";
import { CirclesWithBar } from "react-loader-spinner";
import { useWeather } from "../../../context/WeatherContext";
import { weatherData } from "./weatherData";

const WeatherDashboard = () => {
  const { currentWeatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="text-center mx-auto w-full py-4">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#C4C4D5"
          innerCircleColor="#C4C4D5"
          barColor="#C4C4D5"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!currentWeatherData) {
    return (
      <div className="text-center text-primary py-4">
        No weather data available.
      </div>
    );
  }

  const { current, forecast } = currentWeatherData;
  const { forecastday } = forecast;

  // Call weatherData with current weather information
  const currentWeatherInfo = weatherData(current);

  return (
    <div
      className="relative rounded-lg mt-12 flex bg-cover bg-center h-80vh"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp2027011.jpg')`,
      }}
    >
      <div className="grid grid-cols-1 py-2 bg-black bg-opacity-35 md:grid-cols-3 w-full">
        {/* Current Weather Section */}
        <div className="md:col-span-1 flex justify-center items-center">
          <div className="bg-primary bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl text-white">
                {currentWeatherData.location.name}
              </h2>
              <h2 className="text-xl font-light text-white">Today</h2>
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                className="my-2 w-16 h-16"
              />
              <p className="text-lg text-white mb-4">
                {current.condition.text}
              </p>
              <div className="grid grid-cols-1 gap-1 mt-4 w-full">
                {currentWeatherInfo.map((info) => (
                  <div
                    key={info.id}
                    className="flex items-center px-4 py-2 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105"
                  >
                    <info.icon className="text-2xl mr-2" />
                    <span className="ml-2">
                      {info.label}: {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Forecast Section */}
        <div className="md:col-span-2 container mx-auto py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastday.map((day) => {
              // Convert the date to the day of the week
              const date = new Date(day.date);
              const options = { weekday: "long" }; // full day name like 'Sunday'
              const dayName = date.toLocaleDateString("en-US", options);

              return (
                <div
                  key={day.date_epoch}
                  className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-20"
                >
                  <h3 className="text-xl text-white font-light mb-2">
                    {dayName}
                  </h3>
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    className="w-16 h-16"
                  />
                  <p className="text-lg text-white mb-2">
                    {day.day.condition.text}
                  </p>
                  <div className="text-white">
                    <p className="flex justify-center items-center">
                      <FaThermometerHalf className="text-red-500 me-2" /> Max
                      Temp: {day.day.maxtemp_c}°C
                    </p>
                    <p className="flex justify-center items-center">
                      <FaThermometerHalf className="text-red-500 me-2" /> Min
                      Temp: {day.day.mintemp_c}°C
                    </p>
                    <p className="flex justify-center items-center">
                      <FaCloudSunRain className="text-primary me-2" />
                      Chance of Rain: {day.day.daily_chance_of_rain}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
