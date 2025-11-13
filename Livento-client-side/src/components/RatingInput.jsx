import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingInput = ({ onSubmit }) => {
  const [starRating, setStarRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (!starRating || !reviewText) return;
    onSubmit({ starRating, reviewText });
    setStarRating(0);
    setReviewText("");
    
  };

  return (
    <div className="bg-white dark:text-black p-4 rounded-3xl shadow-md ">
      <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>

      {/* Star Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={24}
            className={`cursor-pointer ${
              i < starRating ? "text-[#EC6325]" : "text-gray-300"
            }`}
            onClick={() => setStarRating(i + 1)}
          />
        ))}
      </div>

      {/* Review Text */}
      <textarea
        rows={3}
        placeholder="Write your review..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC6325]"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="slice"
      >
        <span className="text">
          Submit
        </span>
      </button>
    </div>
  );
};

export default RatingInput;
