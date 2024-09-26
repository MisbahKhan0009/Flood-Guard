import React from "react";
import { emergencyContacts } from "./EmergencyInfo";

const EmergencyContactSection = () => {
  return (
    <section className="bg-primary bg-opacity-15 p-12 rounded-lg mx-auto ">
      <h2 className="text-4xl  text-primary text-center font-museo my-6 mb-12">
        Emergency Contact Information
      </h2>
      <div className="grid grid-cols-1 text-center w-10/12 mx-auto sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="text-secondary p-4 rounded-lg shadow-md bg-primary"
          >
            <h3 className="font-thin mb-6 text-2xl">{contact.name}</h3>
            <p className="mt-2 font-light">{contact.number}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencyContactSection;
