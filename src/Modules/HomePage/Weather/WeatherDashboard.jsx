// src/components/WeatherDashboard.jsx
import React from "react";
import { FaCloudRain, FaWind, FaThermometerHalf, FaEye } from "react-icons/fa";
import { CirclesWithBar } from "react-loader-spinner"; // Import the ColorRing loader
import { useWeather } from "../../../context/WeatherContext";

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

  return (
    <div
      className="relative rounded-lg  mt-12 flex bg-cover bg-center h-80vh"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp2027011.jpg')`,
      }}
    >
      <div className="grid grid-cols-1 py-2 bg-black bg-opacity-35 md:grid-cols-3 w-full">
        {/* Current Weather Section */}
        <div className="md:col-span-1 flex justify-center items-center">
          <div className="bg-primary bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl text-secondary">
                {currentWeatherData.location.name}
              </h2>
              <h2 className="text-xl font-light text-secondary">Today</h2>
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                className="my-2 w-16 h-16"
              />
              <p className="text-lg text-secondary mb-4">
                {current.condition.text}
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                <div className="flex items-center p-4 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105">
                  <FaThermometerHalf className="text-red-500 text-2xl" />
                  <span className="ml-2 text-lg font-light">
                    Temperature: {current.temp_c}°C
                  </span>
                </div>
                <div className="flex items-center p-4 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105">
                  <FaWind className="text-blue-500 text-2xl" />
                  <span className="ml-2 text-lg font-light">
                    Wind: {current.wind_kph} km/h
                  </span>
                </div>
                <div className="flex items-center p-4 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105">
                  <FaCloudRain className="text-gray-500 text-2xl" />
                  <span className="ml-2 text-lg font-light">
                    Humidity: {current.humidity}%
                  </span>
                </div>
                <div className="flex items-center p-4 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105">
                  <FaEye className="text-yellow-500 text-2xl" />
                  <span className="ml-2 text-lg font-light">
                    Feels Like: {current.feelslike_c}°C
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Forecast Section */}
        <div className="md:col-span-2 container mx-auto py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecastday.map((day) => (
              <div
                key={day.date_epoch}
                className="bg-primary bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold">{day.date}</h3>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="my-2"
                />
                <p className="text-start">{day.day.condition.text}</p>
                <p className="text-start">Max Temp: {day.day.maxtemp_c}°C</p>
                <p className="text-start">Min Temp: {day.day.mintemp_c}°C</p>
                <p className="text-start">
                  Chance of Rain: {day.day.daily_chance_of_rain}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
