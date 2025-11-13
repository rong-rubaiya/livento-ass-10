import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import RatingInput from "../components/RatingInput";
import Swal from "sweetalert2";
import Loading from './../components/Loading';

const SingleProp = () => {
   const { user } = useContext(AuthContext);

  const {id}=useParams()
  const [property,SetProperty]=useState({})
  const[loading,setLoading]=useState(true)
 useEffect(() => {
    fetch(`https://livento-server.vercel.app/propertis/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        SetProperty(data.result)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }, [id]);
 
  const [ratings, setRatings] = useState(property.ratings || []);

  const pathname=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Refresh ratings after adding a new review
  const addNewRating = (newRating) => {
    setRatings([newRating, ...ratings]);
  };

  const handleSubmitReview = ({ starRating, reviewText }) => {
  if (!user) return alert("Please login to submit review.");

  const reviewData = {
    reviewerName: user.displayName || "Anonymous",
    reviewerEmail: user.email,
    starRating,
    reviewText,
    reviewDate: new Date().toISOString().split("T")[0],
    propertyId: property._id,
    propertyName: property.propertyName,
    propertyThumbnail: property.image
  };

  fetch(`https://livento-server.vercel.app/propertis/${property._id}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  })
    .then(res => res.json())
    .then(() => {
      Swal.fire("Success", "Review submitted!", "success");
      setRatings([reviewData, ...ratings]); // show immediately
    })
    .catch(err => {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    });
};

if(loading){
  return <Loading/>
}
  return (
   <div className="min-h-screen bg-[#3e4049] py-10 px-4 md:px-20">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl mt-20"
      >
        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-10">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
          >
            {property.propertyName}
          </motion.h1>
        </div>
      </motion.div>

      {/* Property Details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 bg-gray-200 p-8 rounded-3xl shadow-lg space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-[#EC6325]">{property.category}</h2>
          <span className="text-3xl font-extrabold text-[#EC6325]">${property.price}</span>
        </div>
        <div className="flex items-center text-gray-600 gap-2">
          <FaMapMarkerAlt className="text-[#EC6325]" />
          <p>{property.location}</p>
        </div>
        <div className="text-gray-700 text-lg leading-relaxed">{property.description}</div>
        <div className="flex items-center gap-3 text-gray-500">
          <FaCalendarAlt className="text-[#EC6325]" />
          <p>Posted on: {property.postedDate}</p>
        </div>
      </motion.div>

      {/* Seller Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 bg-gray-200 p-6 rounded-3xl shadow-lg flex items-center gap-5"
      >
        <img
          src={property.postedBy.profilePhoto}
          alt={property.postedBy.name}
          className="w-20 h-20 rounded-full border-4 border-[#EC6325]"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Posted by {property.postedBy.name}
          </h3>
          <p className="text-gray-500 text-sm">{property.postedBy.email}</p>
        </div>
      </motion.div>

      {/* Ratings Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-10 bg-gray-100 p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Ratings & Reviews
        </h2>

        {ratings.length > 0 ? (
          <div className="flex flex-col gap-6">
            {ratings.map((rating, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row md:items-start gap-4 hover:shadow-lg transition-shadow"
              >
                <FaUserCircle className="text-4xl text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{rating.reviewerName}</h4>
                  <p className="text-sm text-gray-500 mt-1">Property: {rating.propertyName}</p>
                  <div className="flex items-center text-yellow-400 mt-2">
                    {[...Array(rating.starRating)].map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700 line-clamp-3">{rating.reviewText}</p>
                  <p className="text-sm text-gray-400 mt-1">Reviewed on {rating.reviewDate}</p>
                </div>
                {rating.propertyThumbnail && (
                  <img
                    src={rating.propertyThumbnail}
                    alt={rating.propertyName}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No reviews yet for this property.</p>
        )}

        {/* Add Review */}
        <div className="mt-6">
          {user ? (
            <RatingInput onSubmit={handleSubmitReview} />
          ) : (
            <p className="text-center text-red-500">
              Please login to submit a review.
            </p>
          )}
        </div>
      </motion.div>

      <div className="items-center flex justify-center w-full mt-6">
        <Link to="/properties">
          <button className="slice">
            <span className="text">View All Properties</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProp;
