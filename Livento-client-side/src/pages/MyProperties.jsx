import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import bgphoto from "../assets/my-proper-bg.jpg";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import NoProperties from "../components/ProProperties";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load user's properties
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myproperties?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setProperties(data);
          else setProperties([]);
        })
        .catch((err) => console.error("Error fetching properties:", err));
    }
  }, [user]);

  // Delete property
  const handleDelete = (id, mainId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all([
          fetch(`http://localhost:5000/myproperties/${id}`, {
            method: "DELETE",
          }),
          fetch(`http://localhost:5000/propertis/${mainId}`, {
            method: "DELETE",
          }),
        ])
          .then(() => {
            setProperties(properties.filter((p) => p._id !== id));
            Swal.fire("Deleted!", "Your property has been removed.", "success");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to see your properties.
      </p>
    );
  }

  return (
    <div className="relative min-h-screen py-10 px-4 md:px-10 overflow-hidden">
      {/* 🔹 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgphoto})` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 🔹 Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
          My Properties
        </h2>
        <p className="text-gray-200 text-lg">
          Manage and explore your listed properties beautifully.
        </p>
      </div>

      {/* 🔹 Property Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {properties.length === 0 ? (
          <NoProperties/>
        ) : (
          properties.map((item) => (
            <motion.div
              key={item._id}
              className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-500 border h-auto"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* 🖼️ Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.propertyName}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white">
                  <h3 className="text-2xl text-[#EC6325] font-bold">
                    {item.propertyName}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {item.category} • {item.location}
                  </p>
                </div>
              </div>

              {/* 🔹 Info Section */}
              <div className="p-5 bg-white flex flex-col gap-3 text-left h-full">
                <p className="text-lg text-[#EC6325] font-semibold">
                  ${item.price}
                </p>
                <p className="text-sm">Posted: {item.postedDate}</p>
                <p className="line-clamp-3 text-gray-600 text-sm">
                  {item.description}
                </p>

                {/* 🔹 Action Buttons */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {/* ✏️ Update */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="slice"
                    onClick={() =>
                      navigate("/add-property", { state: { property: item } })
                    }
                  >
                    <span className="text">Update</span>
                  </motion.button>

                  {/* 🗑️ Delete */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="slice"
                    onClick={() => handleDelete(item._id, item.mainId)}
                  >
                    <span className="text">Delete</span>
                  </motion.button>

                  {/* 👁️ View */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="slice"
                    onClick={() => navigate(`/property/${item.mainId}`)}
                  >
                    <span className="text">View</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}

        
      </div>

      {/* 🔹 Add More */}
      {properties.length === 0 ?
      "":
      <div className="flex justify-center mt-8">
        <Link to="/add-property">
          <button className="slice w-[600px]">
            <span className="text">Add More</span>
          </button>
        </Link>
      </div>}
      
    </div>
  );
};

export default MyProperties;
