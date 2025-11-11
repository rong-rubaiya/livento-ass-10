import React from 'react';

const agents = [
  {
    name: "Jinnat Ara",
    role: "Senior Property Agent",
    image: "https://media.istockphoto.com/id/994751270/photo/portrait-young-asian-businesswoman-holding-tablet-smartphone-in-formal-suit-in-office-with.jpg?s=612x612&w=0&k=20&c=EaYoCuTyMKl2_U6z5oFoT0j1U3xj1ZHA9mew2G6_WSs=",
    email: "rubaiya@realestate.com",
    phone: "+880 1234 567890",
  },
  {
    name: "Sadia Rahman",
    role: "Property Consultant",
    image: "https://img.freepik.com/free-photo/businesswoman-posing_23-2148142829.jpg?semt=ais_hybrid&w=740&q=80",
    email: "sadia@realestate.com",
    phone: "+880 9876 543210",
  },
  {
    name: "Jahidul Islam",
    role: "Real Estate Advisor",
    image: "https://img.freepik.com/free-photo/ambitious-businessman-standing-street_1262-3451.jpg?semt=ais_hybrid&w=740&q=80",
    email: "jahidul@realestate.com",
    phone: "+880 1122 334455",
  },
  {
    name: "Farhana Akter",
    role: "Property Manager",
    image: "https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.jpg?s=612x612&w=0&k=20&c=n9yulMNKdIYIQC-Qns8agFj6GBDbiKyPRruaUTh4MKs=",
    email: "farhana@realestate.com",
    phone: "+880 6677 889900",
  },
  {
    name: "Rashed Khan",
    role: "Junior Property Agent",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80",
    email: "rashed@realestate.com",
    phone: "+880 5566 778899",
  },
];

const Agent = () => {
  return (
    <section className="py-12 px-4 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Meet Our Agents
      </h2>

      <div className="space-y-6">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Agent Photo */}
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover mb-3 sm:mb-0 sm:mr-4"
            />

            {/* Agent Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-[#EC6325] mb-1">{agent.name}</h3>
              <p className="text-gray-600 mb-1">{agent.role}</p>
              <p className="text-gray-500 text-sm mb-1">{agent.email}</p>
              <p className="text-gray-500 text-sm">{agent.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agent;
