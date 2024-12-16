"use client";

import { useState } from "react";

export default function RatingFilter() {
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = [5, 4, 3, 2, 1]; // Ratings to display

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    console.log(`Selected Rating: ${rating} and up`);
    // Add filtering logic here
  };

  return (
    <div className="p-4 w-full border-b">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
      <div className="space-y-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    index < rating
                      ? "gold"
                      : "lightgray"
                  }
                  className={`w-5 h-5 ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  } group-hover:scale-110 transition-transform`}
                >
                  <path
                    d="M12 2l2.09 6.26H21l-5.19 3.76 1.98 6.26L12 15.51 7.21 18.28l1.98-6.26L4 8.26h6.91L12 2z"
                  />
                </svg>
              ))}
            </div>
            <span
              className={`text-sm text-gray-600 group-hover:text-blue-600 ${
                selectedRating === rating
                  ? "text-blue-600 font-medium"
                  : ""
              }`}
            >
              And Up
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
