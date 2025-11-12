import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const NoProperties = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
      {/* Animated Icon */}
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
        className="text-2xl md:text-3xl font-semibold text-gray-200 mb-3"
      >
        No Properties Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-gray-400 max-w-md mb-8"
      >
        You haven’t listed any properties yet.  
        Start adding your first one and showcase it beautifully!
      </motion.p>

      {/* Add Property Button */}
      <Link to="/add-property">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="slice"
        >
          <span className="text">
            Add Property Now
          </span>
        </motion.button>
      </Link>
    </div>
  );
};

export default NoProperties;
