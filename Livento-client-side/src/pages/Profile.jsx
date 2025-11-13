import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import bgphoto from "../assets/my-proper-bg.jpg";
import { useLocation } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const pathname=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Default user info from Firebase
  const [profile, setProfile] = useState({
    displayName: user?.displayName || "Unknown User",
    email: user?.email || "",
    photoURL: user?.photoURL || "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    phone: "",
    address: "",
    nid: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // console.log("Updated Profile:", profile);
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen text-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <title>My-profile</title>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgphoto})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 m" />

      {/* Profile Card */}
      <motion.div
        className="relative z-10 bg-gray-200/90 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-300 mt-28 mb-9"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-[#EC6325] shadow-md object-cover"
          />
          <h2 className="text-2xl font-semibold mt-3">{profile.displayName}</h2>
          <p className="text-gray-700">{profile.email}</p>
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              📞 Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your phone number"
              className={`w-full border rounded-md px-3 py-2 ${
                isEditing ? "border-[#EC6325] bg-white" : "border-gray-400 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              🏠 Address
            </label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your address"
              className={`w-full border rounded-md px-3 py-2 ${
                isEditing ? "border-[#EC6325] bg-white" : "border-gray-400 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              🆔 NID Card
            </label>
            <input
              type="text"
              name="nid"
              value={profile.nid}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your NID card number"
              className={`w-full border rounded-md px-3 py-2 ${
                isEditing ? "border-[#EC6325] bg-white" : "border-gray-400 bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <motion.button
              onClick={handleSave}
              className="bg-[#EC6325] text-white px-5 py-2 rounded-md shadow hover:bg-[#ff7a3c]"
              whileTap={{ scale: 0.95 }}
            >
              💾 Save
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="slice"
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex  justify-center items-center gap-2">
                <FaEdit /> <span className="text hover:text-white">Update</span>
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
