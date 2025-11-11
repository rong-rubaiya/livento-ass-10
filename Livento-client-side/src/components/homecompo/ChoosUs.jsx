import React from 'react';
import { FaRegThumbsUp, FaDollarSign, FaShieldAlt } from 'react-icons/fa';

const ChoosUs = () => {
  const features = [
    {
      icon: <FaRegThumbsUp className="w-8 h-8 text-[#EC6325]" />,
      title: 'Trusted Service',
      description: 'We provide reliable and transparent real estate services for all our clients.',
    },
    {
      icon: <FaDollarSign className="w-8 h-8 text-[#EC6325]" />,
      title: 'Best Prices',
      description: 'Competitive pricing on all properties with no hidden fees.',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-[#EC6325]" />,
      title: 'Secure Transactions',
      description: 'Your investments are safe with our verified listings and secure processes.',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-12 lg:px-20 bg-[#EAF0F5]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We stand out in the real estate industry because of our dedication, transparency, and client-first approach.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChoosUs;
