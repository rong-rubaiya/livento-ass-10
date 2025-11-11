import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import faqIllustration from '../../assets/faq-questions-pic.avif'; 

const faqData = [
  { question: "How do I buy a property?", answer: "You can browse our listings, select a property, and schedule a visit. Our team will guide you through the buying process." },
  { question: "What documents are required?", answer: "Typically, ID proof, income proof, and financial documents. Our team will provide a checklist for smooth processing." },
  { question: "Can I sell my property through you?", answer: "Yes! List your property with us, and we’ll help you reach potential buyers and manage the selling process." },
  { question: "Is online booking available?", answer: "Absolutely! You can book visits, request virtual tours, and contact agents directly from our platform." },
  { question: "Do you provide rental services?", answer: "Yes, we assist with rentals, short-term leases, and property management services." },
];

const floatingVariants = {
  animate: {
    y: ["0%", "20%", "0%", "-20%", "0%"], // vertical float
    x: ["0%", "10%", "-10%", "5%", "0%"], // horizontal float
    rotate: [0, 10, -10, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative py-16 px-4 md:px-12 lg:px-20 bg-gray-50 overflow-hidden"
    >
      {/* Floating Question Marks */}
      <motion.span
        className="absolute top-10 text-blue-800 left-300 text-6xl   select-none"
        variants={floatingVariants}
        animate="animate"
      >
        ?
      </motion.span>
      <motion.span
        className="absolute top-1/3 right-8 text-9xl text-red-800 select-none"
        variants={floatingVariants}
        animate="animate"
      >
        ?
      </motion.span>

      <motion.span
        className="absolute top-1/3 right-150 text-9xl text-green-800 select-none"
        variants={floatingVariants}
        animate="animate"
      >
        ?
      </motion.span>
      <motion.span
        className="absolute bottom-20 left-1/2 text-6xl text-yellow-600  select-none"
        variants={floatingVariants}
        animate="animate"
      >
        ?
      </motion.span>

      {/* Section Heading */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Answers to common questions about buying, selling, or renting properties.
        </p>
      </div>

      {/* FAQ + Illustration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition hover:shadow-xl"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-[#EC6325]">{faq.question}</h3>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'inline-block', originX: 0.5, originY: 0.5 }}
                  className="text-gray-500"
                >
                  <FaChevronDown size={20} />
                </motion.span>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-gray-600 text-sm md:text-base overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Illustration / Image */}
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
