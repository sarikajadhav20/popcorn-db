import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function MovieRating({ movieId, initialRating = 0, onRatingUpdate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [pendingRating, setPendingRating] = useState(initialRating);


  const saveRating = async () => {
    try {
      await axios.put(`http://localhost:8080/movies/${movieId}/rating`, {
        rating: pendingRating,
      });

      setRating(pendingRating); 
      toast.success("Rating updated");

      
      if (onRatingUpdate) {
        onRatingUpdate(movieId, pendingRating);
      }
    } catch (error) {
      toast.success("Rating updated");
    }
  };

  return (
    <div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`cursor-pointer w-6 h-6 transition-colors ${
              (hover || pendingRating) >= star
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            fill={(hover || pendingRating) >= star ? "currentColor" : "none"}
            stroke="currentColor"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setPendingRating(star)} 
          />
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={saveRating}
        className="mt-2 px-3 py-1 cursor-pointer bg-blue-400 text-white rounded hover:bg-blue-700 transition"
      >
        Save Rating
      </button>
    </div>
  );
}

export default MovieRating;
