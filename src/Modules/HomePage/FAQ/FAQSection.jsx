// src/FAQ/FAQSection.jsx
import React, { useState } from "react";
import FAQData from "./FAQs";

const FAQSection = () => {
  return (
    <div className="faq-section my-10">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item border border-gray-300 rounded-md p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleFAQ}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
};

export default FAQSection;
