// src/components/WeatherDashboard.jsx
// @ts-ignore
import React from "react";
import { FaThermometerHalf, FaCloudSunRain } from "react-icons/fa";
import { CirclesWithBar } from "react-loader-spinner";
import { useWeather } from "../../../context/WeatherProvider";
import { weatherData } from "./weatherData";

const WeatherDashboard = () => {
  const { currentWeatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full py-4">
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
    return <div className="text-center py-4 text-secondary">{error}</div>;
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

  const currentWeatherInfo = weatherData(current);

  return (
    <section className="my-6 ">
      <h1 className="text-5xl text-primary font-museo text-center py-4">
        Weather Dashboard
      </h1>
      <div className="relative rounded-lg mt-12 flex h-[90vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/BgVideo/BG-Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-secondary bg-opacity-20"></div>
        <div className="grid grid-cols-1 py-2  md:grid-cols-3 w-full">
          {/* Current Weather Section */}
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="bg-secondary bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <h2 className="text-6xl font-thin text-primary">
                  {currentWeatherData.location.name}
                </h2>
                <h2 className="text-xl font-light text-primary">Today</h2>
                <img
                  src={`https:${current.condition.icon}`}
                  alt={current.condition.text}
                  className="mt-2 w-16 h-16"
                />
                <p className="text-lg text-primary mb-4">
                  {current.condition.text}
                </p>
                <div className="grid grid-cols-1 gap-2  w-full">
                  {currentWeatherInfo.map((info) => (
                    <div
                      key={info.id}
                      className="flex items-center px-4 py-2 bg-primary text-secondary shadow-md rounded-lg transition-transform transform hover:scale-105"
                    >
                      <info.icon className="text-2xl mr-2" />
                      <span className="ml-2 text-lg">
                        {info.label}: {info.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Forecast Section */}
          <div className="md:col-span-2 flex justify-center items-center container mx-auto py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forecastday.map((day) => {
                const date = new Date(day.date);
                const options = { weekday: "long" };
                const dayName = date.toLocaleDateString("en-US", options);

                return (
                  <div
                    key={day.date_epoch}
                    className="bg-secondary bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-20"
                  >
                    <h3 className="text-2xl text-primary font-thin mb-2">
                      {dayName}
                    </h3>
                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day.condition.text}
                      className="w-16 h-16"
                    />
                    <p className="text-lg text-primary font-light mb-2">
                      {day.day.condition.text}
                    </p>
                    <div className="text-primary">
                      <p className="flex justify-center font-thin items-center">
                        <FaThermometerHalf className="text-primary  me-2" /> Max
                        Temp: {day.day.maxtemp_c}°C
                      </p>
                      <p className="flex justify-center font-thin items-center">
                        <FaThermometerHalf className="text-primary me-2" /> Min
                        Temp: {day.day.mintemp_c}°C
                      </p>
                      <p className="flex justify-center font-thin items-center">
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
    </section>
  );
};

export default WeatherDashboard;
