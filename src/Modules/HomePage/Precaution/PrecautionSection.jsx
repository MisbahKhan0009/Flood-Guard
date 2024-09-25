// src/components/PrecautionSection.jsx
import React from "react";
import { precautionData } from "./precautionData";

const PrecautionSection = () => {
  return (
    <section className="bg-primary bg-opacity-15 rounded-lg py-12">
      <h1 className="text-4xl font-museo text-center mb-8 text-primary ">
        Precautions for Flood
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 mx-auto text-center">
        {precautionData.map((precaution) => (
          <div
            key={precaution.id}
            className={`p-6 bg-gradient-to-r ${precaution.gradient} rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300`}
          >
            <div className="text-5xl mb-4">{precaution.icon}</div>
            <p
              className={`text-2xl font-extrabold ${precaution.color || "text-secondary"}`}
            >
              {precaution.title}
            </p>
            <p className="text-md text-gray-500 mt-2">
              {precaution.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrecautionSection;
