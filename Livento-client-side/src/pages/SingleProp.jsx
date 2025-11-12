import React from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const SingleProp = () => {
  const data = useLoaderData();
  const property = data.result;

  return (
    <div className="min-h-screen bg-[#3e4049] py-10 px-4 md:px-20">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl"
      >
        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-10">
          <div className="flex justify-between gap-32">
            <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
          >
            {property.propertyName}
          </motion.h1>

          <button className="bg-amber-700 p-3 cursor-pointer rounded-3xl text-white"><span className="">See More Photo</span></button>
          </div>
        </div>
      </motion.div>

      {/* Property Details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 bg-gray-200 p-8 rounded-3xl shadow-lg space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-[#EC6325]">{property.category}</h2>
          <span className="text-3xl font-extrabold text-[#EC6325]">
            ${property.price}
          </span>
        </div>

        <div className="flex items-center text-gray-600 gap-2">
          <FaMapMarkerAlt className="text-[#EC6325]" />
          <p>{property.location}</p>
        </div>

        <div className="text-gray-700 text-lg leading-relaxed">
          {property.description}
        </div>

        <div className="flex items-center gap-3 text-gray-500">
          <FaCalendarAlt className="text-[#EC6325]" />
          <p>Posted on: {property.postedDate}</p>
        </div>
      </motion.div>

      {/* Seller Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 bg-gray-200 p-6 rounded-3xl shadow-lg flex items-center gap-5"
      >
        <img
          src={property.postedBy.profilePhoto}
          alt={property.postedBy.name}
          className="w-20 h-20 rounded-full border-4 border-[#EC6325]"
        />
        <div className="relative">
          <h3 className="text-lg font-semibold text-gray-800">
            Posted by {' '}
            <br className="sm:hidden" />{property.postedBy.name}
          </h3>
          <p className="text-gray-500 text-sm  absolute -left-7 sm:-left-0">{property.postedBy.email}</p>
        </div>
      </motion.div>

      {/* Ratings Section */}
      {property.ratings && property.ratings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 bg-gray-200 p-8 rounded-3xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Review</h2>
          {property.ratings.map((rating, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="border-b border-gray-200 pb-5 mb-5"
            >
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-3xl text-gray-400" />
                <div>
                  <h4 className="text-lg font-semibold">{rating.reviewerName}</h4>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(rating.starRating)].map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{rating.reviewText}</p>
              <p className="text-sm text-gray-400 mt-1">Reviewed on {rating.reviewDate}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="items-center flex justify-center w-full ">
        <Link to='/properties'><button className="slice mt-6 "><span className="text">Go back</span></button></Link>
      </div>
    </div>
  );
};

export default SingleProp;
