import React from "react";

const WeatherForecast = ({ weatherData }) => {
  if (!weatherData) return <div>Loading...</div>;

  const { location, current, forecast } = weatherData;
  const { forecastday } = forecast;

  return (
    <div className="p-4 bg-gray-800  text-white rounded-lg">
      <div className="flex">
        {forecastday.map((day) => (
          <div
            key={day.date_epoch}
            className="mb-4 border-b border-gray-600 pb-4"
          >
            <h3 className="text-lg">{day.date}</h3>
            <p>
              Max Temp: {day.day.maxtemp_c}°C ({day.day.maxtemp_f}°F)
            </p>
            <p>
              Min Temp: {day.day.mintemp_c}°C ({day.day.mintemp_f}°F)
            </p>
            <p>Condition: {day.day.condition.text}</p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
            />
            <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
            <p>Total Precipitation: {day.day.totalprecip_mm} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
