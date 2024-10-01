// src/components/LatestNewsSection.jsx
// @ts-ignore
import React from "react";
import { newsData } from "./newsData";

const LatestNewsSection = () => {
  return (
    <section className="bg-primary bg-opacity-15 py-12 my-12 rounded-lg">
      <h1 className="text-5xl font-museo text-center mb-8 text-primary">
        Latest News
      </h1>
      <div className="w-9/12 mx-auto space-y-8">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row items-center bg-primary shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl"
          >
            <div className="md:w-1/3">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-fill md:h-full"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-4 text-secondary">
                {news.title}
              </h2>
              <p className="text-gray-600 ">{news.description}</p>
              <a href={news.link} className="text-secondary underline text-sm">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNewsSection;
