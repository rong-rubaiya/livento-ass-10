import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router";
import { FaHome } from "react-icons/fa";

const Error = () => {
  const pathname=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="flex flex-col  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative pb-20">
      <title>Error page</title>
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 relative mt-16 mb-6">
        {/* Floating Emojis */}
        <motion.div
          className="absolute text-6xl left-10 top-20 "
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          💫
        </motion.div>
        <motion.div
          className="absolute text-7xl right-16 bottom-28"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          🚀
        </motion.div>
        <motion.div
          className="absolute text-6xl left-1/2 bottom-16 transform -translate-x-1/2 opacity-60"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          🌌
        </motion.div>

        {/* Error Code */}
        <motion.h1
          className="text-[110px] sm:text-[150px] font-extrabold bg-[#EC6325] text-transparent bg-clip-text my-16"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Oops! Page Lost in Space 🚀
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Seems like you’ve drifted away into the cosmos 🌠  
          The page you’re looking for doesn’t exist — or maybe it’s hiding behind a black hole 🕳️
        </motion.p>

        {/* Button */}
        <Link
            to="/"
            
          >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
          className="slice"
        >
          
            <span className="text text-center flex justify-center items-center gap-4">
              <FaHome/> <span>Take Me Home</span>
            </span>
        
        </motion.div>
          </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Error;
