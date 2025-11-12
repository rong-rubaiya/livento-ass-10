import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const NoRatings = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
      
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="mb-6"
      >
        <FaHome className="text-6xl text-[#EC6325]" />
      </motion.div>

      {/* Message */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-semibold  mb-3"
      >
        No Ratings Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-400 max-w-md mb-8"
      >
        You haven’t rating any properties yet.  
        
      </motion.p>

      
    </div>
  );
};

export default NoRatings;
