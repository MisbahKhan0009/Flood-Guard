// @ts-ignore
import React from "react";

const developers = [
  {
    id: 1,
    name: "John Doe",
    devId: "DEV001",
    image: "https://via.placeholder.com/150", // You can replace this with actual images
    contribution: "Worked on the API integration and backend services.",
  },
  {
    id: 2,
    name: "Jane Smith",
    devId: "DEV002",
    image: "https://via.placeholder.com/150",
    contribution: "Led the frontend design and user interface improvements.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    devId: "DEV003",
    image: "https://via.placeholder.com/150",
    contribution: "Handled database design and optimization.",
  },
  // Add more developers here
];

const DeveloperCard = ({ developer }) => {
  return (
    <div className="bg-primary bg-opacity-50 text-secondary shadow-lg rounded-lg p-6">
      <img
        src={developer.image}
        alt={`${developer.name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h3 className="text-xl font-semibold mt-4 text-center">
        {developer.name}
      </h3>
      <p className="text-sm text-center">ID: {developer.devId}</p>
      <div className="mt-4 text-center">
        <p className="text-base font-light">Contribution:</p>
        <p className="text-sm">{developer.contribution}</p>
      </div>
    </div>
  );
};

const DeveloperPage = () => {
  return (
    <section className="w-10/12 mx-auto py-8">
      <h2 className="text-4xl font-semibold text-primary mb-8 text-center">
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
