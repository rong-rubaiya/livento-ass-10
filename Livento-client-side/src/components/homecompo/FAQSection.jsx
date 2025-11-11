import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import faqIllustration from '../../assets/faq-questions-pic.avif'; 
const faqData = [
  {
    question: "How do I buy a property?",
    answer: "You can browse our listings, select a property, and schedule a visit. Our team will guide you through the buying process."
  },
  {
    question: "What documents are required?",
    answer: "Typically, ID proof, income proof, and financial documents. Our team will provide a checklist for smooth processing."
  },
  {
    question: "Can I sell my property through you?",
    answer: "Yes! List your property with us, and we’ll help you reach potential buyers and manage the selling process."
  },
  {
    question: "Is online booking available?",
    answer: "Absolutely! You can book visits, request virtual tours, and contact agents directly from our platform."
  },
  {
    question: "Do you provide rental services?",
    answer: "Yes, we assist with rentals, short-term leases, and property management services."
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section 
    initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8 }}
    className="py-16 px-4 md:px-12 lg:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Answers to common questions about buying, selling, or renting properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition hover:shadow-xl"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#EC6325]">{faq.question}</h3>
                <span className="text-gray-500">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600 text-sm md:text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/*image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={faqIllustration}
            alt="FAQ Illustration"
            className="w-full rounded-4xl max-w-md object-contain"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
