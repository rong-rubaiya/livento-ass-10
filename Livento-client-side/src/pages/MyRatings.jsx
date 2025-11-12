import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import NoRatings from "../components/NoRatings";
import Swal from "sweetalert2";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Load user reviews
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/userReviews?email=${user.email}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Delete review from both collections
  const handleDelete = (reviewId, propertyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all([
          fetch(`http://localhost:5000/userReviews/${reviewId}`, { method: "DELETE" }),
          fetch(`http://localhost:5000/propertis/${propertyId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ $pull: { ratings: { _id: reviewId } } })
          })
        ])
          .then(() => {
            setReviews(reviews.filter(r => r._id !== reviewId));
            Swal.fire("Deleted!", "Your review has been removed.", "success");
          })
          .catch(err => console.error(err));
      }
    });
  };

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Please login to see your reviews.</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-[#EC6325] mb-10">My Ratings</h2>

      {reviews.length === 0 ? (
        <NoRatings />
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Property Thumbnail */}
              <img
                src={review.propertyThumbnail}
                alt={review.propertyName}
                className="w-full sm:w-48 h-48 object-cover"
              />

              {/* Review Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#EC6325]">{review.propertyName}</h3>
                  <p className="text-gray-600 text-sm mb-2">By: {review.reviewerName}</p>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(review.starRating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2 line-clamp-4">{review.reviewText}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Reviewed on {review.reviewDate}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="slice"
                      onClick={() => navigate(`/property/${review.propertyId}`)}
                    >
                      <span className="text">View</span>
                    </button>
                    <button
                      className="slice bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(review._id, review.propertyId)}
                    >
                      <span className="text">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
