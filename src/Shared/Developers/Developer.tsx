// @ts-ignore
import { section } from "framer-motion/client";
import React from "react";

const developers = [
  {
    id: 1,
    name: "Misbah Khan",
    devId: "2132089642",
    image: "https://avatars.githubusercontent.com/u/96840923?v=4",
    contribution:
      "Developed and optimized frontend components using modern JavaScript frameworks, ensuring responsive and user-friendly interfaces. Integrated RESTful APIs to enable seamless data exchange between the frontend and backend systems. ",
  },
  {
    id: 2,
    name: "Sabbir Hossain",
    devId: "2131272042",
    image: "https://avatars.githubusercontent.com/u/175347762?v=4",
    contribution:
      "Spearheaded the end-to-end machine learning operations, from data preprocessing to model deployment. Built and fine-tuned a flood prediction model using advanced algorithms, leveraging historical weather and environmental data. ",
  },
  {
    id: 3,
    name: "Aritra Islam Saswato",
    devId: "2132629642",
    image: "https://via.placeholder.com/150",
    contribution:
      "Led the design and optimization of database structures, ensuring efficient storage, retrieval, and management of data. Developed normalized schemas, implemented indexing strategies, and optimized queries for faster performance. ",
  },
];

const DeveloperCard = ({ developer }) => {
  return (
    <div className="bg-primary bg-opacity-15 text-primary shadow-lg rounded-lg p-6">
      <img
        src={developer.image}
        alt={`${developer.name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h3 className="text-2xl font-light mt-4 text-center">
        {developer.name}
      </h3>
      <p className="text text-center">ID: {developer.devId}</p>
      <div className="mt-4 text-center">
        <p className="text-lg font-bold">Contribution:</p>
        <p className="text-balance">{developer.contribution}</p>
      </div>
    </div>
  );
};

const DeveloperPage = () => {
  return (
    <section className="w-10/12 min-h-screen flex items-center justify-center flex-col mx-auto py-8">
      <h2 className="text-4xl font-semibold text-primary mb-12 text-center">
        Meet the Developers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {developers.map((developer) => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
    </section>
  );
};

export default DeveloperPage;
