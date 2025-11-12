import React, { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AuthContext } from "../context/AuthContext"
import Swal from "sweetalert2"
import { useNavigate, useLocation, Link } from "react-router"
import homebg from "../assets/add-home-bg.jpg"

const AddProperties = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [propertyData, setPropertyData] = useState({
    name: "",
    imgURL: "",
    description: "",
    price: "",
    location: "",
    category: "Villa",
  })

  const editingProperty = location.state?.property

  useEffect(() => {
    if (editingProperty) {
      setPropertyData({
        name: editingProperty.propertyName,
        imgURL: editingProperty.image,
        description: editingProperty.description,
        price: editingProperty.price,
        location: editingProperty.location,
        category: editingProperty.category,
      })
    }
  }, [editingProperty])

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = {
    propertyName: propertyData.name,
    image: propertyData.imgURL,
    description: propertyData.description,
    price: propertyData.price,
    location: propertyData.location,
    category: propertyData.category,
    postedDate: new Date().toISOString().split("T")[0],
    postedBy: {
      name: user?.displayName || "Anonymous",
      email: user?.email || "noemail@example.com",
      profilePhoto: user?.photoURL || "",
    },
  };

  const url = editingProperty
    ? `http://localhost:5000/propertis/${editingProperty.mainId || editingProperty._id}`
    : "http://localhost:5000/propertis";

  const method = editingProperty ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({
        title: editingProperty ? "Property updated!" : "Property added!",
        icon: "success",
      }).then(() => {
        if (editingProperty) {
          // Navigate to single-property page after update
          const propertyId = editingProperty._id || editingProperty.mainId;
          navigate(`/single-property/${propertyId}`);
        } else {
          // Navigate to my-properties page after adding new property
          navigate("/my-properties");
        }
      });
    })
    .catch((err) => {
      console.error(err);
      Swal.fire({ title: "Error!", text: "Something went wrong", icon: "error" });
    });
};


  return (
    <motion.div className="relative min-h-screen p-8">
      <div className="absolute inset-0">
        <img src={homebg} alt="bg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto bg-[#F3F4F6] px-4 py-8 rounded-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#EC6325] mb-10">
          {editingProperty ? "Update Property" : "Add New Property"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="name"
            placeholder="Property Name"
            value={propertyData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-black focus:ring-2 focus:ring-[#EC6325]"
          />
          <input
            required
            type="text"
            name="imgURL"
            placeholder="Image URL"
            value={propertyData.imgURL}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-black focus:ring-2 focus:ring-[#EC6325]"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            rows={4}
            value={propertyData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-black focus:ring-2 focus:ring-[#EC6325]"
          />
          <input
            required
            type="number"
            name="price"
            placeholder="Price"
            value={propertyData.price}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-black focus:ring-2 focus:ring-[#EC6325]"
          />
          <input
            required
            type="text"
            name="location"
            placeholder="Location"
            value={propertyData.location}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-black focus:ring-2 focus:ring-[#EC6325]"
          />
          <select
            required
            name="category"
            value={propertyData.category}
            onChange={handleChange}
            className="w-full p-4 border-2 border-black rounded-xl focus:ring-2 focus:ring-[#EC6325]"
          >
            <option>Villa</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Cottage</option>
            <option>Studio</option>
            <option>Rent</option>
            <option>Sell</option>
            <option>Commercial</option>
          </select>

          <button type="submit" className="slice w-full h-16 mt-4">
              <span className="text">{editingProperty ? "Update Property" : "Add Property"}</span>
         </button>
          {/* {editingProperty ? "Update Property" : "Add Property"} */}
        </form>
      </div>
    </motion.div>
  )
}

export default AddProperties
