import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaSearch } from "react-icons/fa";
import bgphoto from "../assets/my-proper-bg.jpg";

const Properties = () => {
  const loaderData = useLoaderData();
  const [properties, SetProperties] = useState(loaderData || []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim(' ');
    if (!search_text) return;

    fetch(`https://livento-server.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetProperties(data);
      })
      .catch((err) => console.error(err));
  };

  const handleSort=(e)=>{
    
    const text=e.target.value
    console.log(text);
    if(text==="low"){
      fetch('https://livento-server.vercel.app/propertis/low-high')
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      SetProperties(data)
    })
    .catch((err)=>console.log(err))
    }

    if(text==='high'){
      fetch("https://livento-server.vercel.app/high-low")
      .then((res) => res.json())
      .then((data) => SetProperties(data))
      .catch((err) => console.error(err));
    }

    if (text === "all") {
    fetch("https://livento-server.vercel.app/propertis")
      .then((res) => res.json())
      .then((data) => SetProperties(data))
      .catch((err) => console.error(err));
  }
    
  }

  return (
    <div className="min-h-screen p-8 relative flex flex-col items-center">
      <title>All Properties</title>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{ backgroundImage: `url(${bgphoto})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-200/60 dark:bg-black/60 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <h2 className="text-4xl font-bold text-black dark:text-white text-center mt-24 mb-20">
          Available Properties ({properties.length})
        </h2>

        {/* Sort & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 p-4 rounded-2xl mb-8">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm sm:text-xl text-black dark:text-[#EC6325] font-bold">
              Sort by:
            </label>
            <select 
            
            name='sort'
            onChange={handleSort}
            className="px-3 py-2 rounded-xl border-2 border-[#EC6325] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EC6325]">
              <option value="all">All properties</option>
              <option value="low">Price (Low → High)</option>
              <option value="high">Price (High → Low)</option>
            </select>
          </div>

          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            className="relative w-full sm:w-72 mt-3 sm:mt-0"
          >
            <FaSearch className="absolute left-3 top-3 text-[#EC6325]" size={16} />
            <input
              name="search"
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-[#EC6325] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EC6325]"
            />
            <button
              type="submit"
              className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#EC6325] text-white rounded-lg text-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {properties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image wrapper */}
              <div className="relative group cursor-pointer">
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="w-full h-64 object-cover"
                />

                {/* Hover overlay with ratings */}
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

              {/* Text details */}
              <div className="p-6">
                <h3 className="text-xl text-[#EC6325] font-semibold mb-2">
                  {property.propertyName}
                </h3>
                <h3 className="text-sm font-semibold mb-2 dark:text-black">
                  Posted by: {property.postedBy?.name || "Unknown"}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{property.description}</p>

                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[#EC6325]">
                    ${property.price}
                  </span>
                  <span className="badge badge-outline">{property.category}</span>
                </div>

                <p className="text-gray-500 text-sm mb-4">{property.location}</p>

                {/* Button */}
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
    </div>
  );
};

export default Properties;
