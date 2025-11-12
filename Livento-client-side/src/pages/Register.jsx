import React from 'react';
import { motion } from 'framer-motion';
import homebg from '../assets/add-home-bg.jpg';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddProperties = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Login required",
        text: "You must be logged in to add a property.",
      });
      return;
    }

    const formData = {
      propertyName: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.imgURL.value,
      price: e.target.price.value,
      location: e.target.location.value,
      postedDate: new Date().toISOString().split("T")[0],
      postedBy: {
        name: user.displayName || "Anonymous",
        email: user.email,
        profilePhoto: user.photoURL || "https://randomuser.me/api/portraits/lego/1.jpg",
      },
    };

    // Save in main properties collection
    fetch('http://localhost:5000/propertis', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        // Save in my-properties collection
        return fetch('http://localhost:5000/my-properties', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      })
      .then(res => res.json())
      .then(() => {
        Swal.fire({
          title: "Property added successfully!",
          icon: "success",
        });
        navigate('/my-properties'); // redirect to user properties page
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while adding property.",
          icon: "error",
        });
      });
  };

  return (
    <motion.div className="p-8 shadow-2xl relative min-h-screen">
      <div className="absolute inset-0">
        <img src={homebg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto bg-[#F3F4F6] px-4 py-8 rounded-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#EC6325] mb-10">
          Add New Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Property Name" required className="w-full p-4 rounded-xl border-2 border-black" />
          <input name="imgURL" type="text" placeholder="Image URL" required className="w-full p-4 rounded-xl border-2 border-black" />
          <textarea name="description" rows={4} placeholder="Description" required className="w-full p-4 rounded-xl border-2 border-black"></textarea>
          <input name="price" type="number" placeholder="Price" required className="w-full p-4 rounded-xl border-2 border-black" />
          <input name="location" type="text" placeholder="Location" required className="w-full p-4 rounded-xl border-2 border-black" />
          <select name="category" required className="w-full p-4 rounded-xl border-2 border-black">
            <option value="">Select Category</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Cottage">Cottage</option>
            <option value="Studio">Studio</option>
            <option value="Rent">Rent</option>
            <option value="Sell">Sell</option>
            <option value="Commercial">Commercial</option>
          </select>
          <button type="submit" className="w-full h-16 bg-[#EC6325] text-white rounded-xl">Add Property</button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProperties;
