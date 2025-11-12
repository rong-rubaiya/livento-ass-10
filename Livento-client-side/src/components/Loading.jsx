// LoadingWithHome.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500">
      <h1 className="text-5xl font-bold text-white animate-pulse">
        Welcome Home!
      </h1>
    </div>
  );
};

const Loading = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate 3.5 sec loading
    const timer = setTimeout(() => setLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
        animate={{
          scale: [1, 1.3, 1],       // pulsate effect
          rotate: [0, 10, -10, 0], // small rotate
          opacity: [0.5, 1, 0.5],  // fade in/out
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          
        }}
      >
        <FaHome className="text-9xl text-[#EC6325] mb-10" />
      </motion.div>
            {/* Animated bouncing dots */}
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-5 h-5 bg-orange-500 rounded-full"
                  animate={{ y: ["0%", "-50%", "0%"] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.1,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
           
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show home after loaded */}
      {loaded && <Home />}
    </div>
  );
};

export default Loading;
