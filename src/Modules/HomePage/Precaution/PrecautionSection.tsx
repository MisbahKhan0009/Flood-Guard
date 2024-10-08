// src/components/PrecautionSection.jsx
// @ts-ignore

import React from "react";
import { precautionData } from "./precautionData";

const PrecautionSection = () => {
  return (
    <section className="bg-primary bg-opacity-15  rounded-lg py-12 my-12">
      <h1 className="text-5xl font-museo text-center mb-8 text-primary ">
        Precautions for Flood
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 mx-auto text-center">
        {precautionData.map((precaution) => (
          <div
            key={precaution.id}
            className={`p-6 bg-gradient-to-r ${precaution.gradient}  rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300`}
          >
            <precaution.icon
              className={`text-5xl mb-4 ${precaution.text || "text-secondary"} mx-auto`}
            />
            <p
              className={`text-2xl font-muse ${precaution.text || "text-secondary"}`}
            >
              {precaution.title}
            </p>
            <p
              className={`text-md ${precaution.text || "text-secondary"}  mt-2`}
            >
              {precaution.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrecautionSection;
