import React from "react";
import { emergencyContacts } from "./EmergencyInfo";
import { Phone } from "lucide-react";

const EmergencyContactSection = () => {
  return (
    <section className="bg-primary bg-opacity-15 p-12 rounded-lg mx-auto ">
      <h2 className="text-4xl  text-primary text-center font-museo my-6 mb-12">
        Emergency Contact Information
      </h2>
      <div className="grid grid-cols-1 text-center w-11/12 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="text-secondary p-4 rounded-lg shadow-md bg-primary"
          >
            <contact.icon className="text-6xl mx-auto my-6 text-secondary" />
            <h3 className="font-thin mb-6 text-4xl">{contact.name}</h3>
            <p className="my-2 font-light flex items-center justify-center">
              <Phone className="me-2 font-light" /> {contact.number}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencyContactSection;
