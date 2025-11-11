import React from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const Properties = () => {
  const properties = useLoaderData();
  console.log(properties);

  return (
    <div className="py-10 px-4 md:px-12 lg:px-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Available Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
          >
            {/* image wrapper */}
            <div className="relative group cursor-pointer">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-64 object-cover"
              />

              {/* hover overlay with ratings */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {property.ratings && property.ratings.length > 0 ? (
                  <div className="flex items-center gap-1 text-yellow-400 text-lg bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    {[...Array(property.ratings[0].starRating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-white ml-2">
                      {property.ratings[0].starRating}.0
                    </span>
                  </div>
                ) : (
                  <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                    No ratings yet
                  </span>
                )}
              </div>
            </div>

            {/* text details */}
            <div className="p-6">
              <h3 className="text-xl text-[#EC6325] font-semibold mb-2">
                {property.propertyName}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{property.description}</p>

              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#EC6325]">
                  ${property.price.toLocaleString()}
                </span>
                <span className="badge badge-outline">{property.category}</span>
              </div>

              <p className="text-gray-500 text-sm mb-4">{property.location}</p>

              {/* btn details */}

             <Link to={`/single-property/${property._id}`}>
              <button className="btn w-full slice">
                <span className="text">More Details</span>
              </button>
             </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
