import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const directions = [
  { x: -100, y: 0 }, // from left
  { x: 100, y: 0 },  // from right
  { x: 0, y: -100 }, // from top
  { x: 0, y: 100 },  // from bottom
];

const RealState = () => {
  const [properties, SetProperties] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5000/propertis/featured")
      .then((res) => res.json())
      .then((data) => SetProperties(data))
      .catch((err) => console.error(err));
  }, []);

  
  return (
    <motion.section
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-10 px-4 md:px-8 lg:px-16 bg-[#0E243B]"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
         Newest Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((item, index) => {
          
          const dir = directions[index % directions.length];

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: dir.x, y: dir.y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.15 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transform transition duration-300 text-black"
            >
              <img
                src={item.image}
                alt={item.propertyName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 bg-gray-200">
                <h3 className="text-xl text-[#EC6325] font-semibold mb-1">{item.propertyName}</h3>
                <p className="text-sm text-black font-bold mb-2">{item.category}</p>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                <p className="text-gray-600 font-semibold text-sm mb-2">{item.location}</p>
                <p className="text-[#EC6325] font-bold text-lg mb-4">${item.price.toLocaleString()}</p>
                {/* btn */}

                
                <Link to={`/single-property/${item._id}`}>
                <button
                
                
                  className="w-full bg-[#EC6325] hover:bg-[#d15c20] text-white font-semibold py-2 rounded-full transition duration-300 slice"
                >
                  <span className='text'> View Details</span>
                </button>
                </Link>
                


              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default RealState;
