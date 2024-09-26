import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "./FAQs";

const FAQSection = () => {
  return (
    <section className="w-full bg-primary bg-opacity-15 my-16 rounded-lg">
      <section className="w-full max-w-xl mx-auto py-12">
        <h2 className="text-4xl text-primary font-museo text-center mb-6">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="text-primary ">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </section>
  );
};

export default FAQSection;
