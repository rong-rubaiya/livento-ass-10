import React, { use } from 'react';
import { motion } from 'framer-motion';
import homebg from '../assets/add-home-bg.jpg'
import { AuthContext } from '../context/AuthContext';

const AddProperties = () => {
   const {user}=use(AuthContext)
   console.log(user);

   const handleSubmit=(e)=>{
    e.preventDefault();

    const formData = {
       propertyName: e.target.name.value,
  category: e.target.category.value,
  description: e.target.description.value,
  image: e.target.imgURL.value,
  price: e.target.price.value,
  location: e.target.location.value,
 postedDate: new Date().toISOString().split("T")[0],
 
  created_by: user?.email || "Anonymous"
      
    }

    fetch('http://localhost:5000/propertis', {
     method:"POST",
     headers:{
      'Content-Type':'application/json'
     },
     body: JSON.stringify(formData)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    })
   }

  return  (
    <motion.div
      
      className="  p-8 shadow-2xl relative min-h-screen"
    >
       
      {/* Background Image with Opacity Overlay */}
      <div className="absolute inset-0">
        <img
          src={homebg}
          alt="Background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/60 "></div> {/* opacity overlay */}
      </div>

      {/* Form content */}
      <div  className="relative z-10 max-w-3xl mx-auto bg-[#F3F4F6] px-4 py-8 rounded-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#EC6325] mb-10">
          Add New Property
        </h2>

        <form onSubmit={handleSubmit}
         className="space-y-4 ">
          {/* Property Name */}
          <div>
            <label className="block mb-2 text-gray-800  font-semibold ">
              Property Name 
            </label>
            <input
              type="text"
              name='name'
              placeholder="Enter property name"
              className="w-full p-4 rounded-xl border-2   placeholder:text-gray-400 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]  l"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-gray-800  font-semibold">Image URL</label>
            <input
              type="text"
              name='imgURL'
              placeholder="Enter image URL"
              className="w-full p-4 rounded-xl border-2 placeholder:text-gray-400 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]   "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-gray-800  font-semibold">
              Description
            </label>
            <textarea
              placeholder="Enter property description"
              rows={4}
              name='description'
              className="w-full p-4 rounded-xl border-2 placeholder:text-gray-400 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]    resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-gray-800  font-semibold">Price ($)</label>
            <input
              type="number"
              name='price'
              placeholder="Enter price"
              className="w-full p-4 rounded-xl border-2 placeholder:text-gray-400 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]   "
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-gray-800  font-semibold">Location</label>
            <input
              type="text"
              name='location'
              placeholder="Enter location"
              className="w-full p-4 rounded-xl border-2 placeholder:text-gray-400 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]   "
            />
          </div>

          {/* Category */}
          <div className=''>
            <label className="block mb-2 rounded-3xl text-gray-800  font-semibold ">Category</label>
            <select
            name='category'
            className="w-full p-4   placeholder:text-gray-400  border-2 border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-[#EC6325]  rounded-xl">
              <option className='text-gray-400'>Select Category</option>
              <option className='text-gray-400'>Villa</option>
              <option className='text-gray-400'>Apartment</option>
              <option className='text-gray-400'>House</option>
              <option className='text-gray-400'>Cottage</option>
              <option className='text-gray-400'>Studio</option>
            </select>
          </div>

          {/* Submit Button */}
         <div className='flex justify-center'>
           <button
            type="submit"
            className="slice w-1/2 h-16"
          >
           <span className='text'> Add Property</span>
          </button>
         </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProperties;
