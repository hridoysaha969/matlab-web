"use client";
import React, { useState } from "react";
import Stars from "./Star";
import classes from "@/styles/starRating.module.css";

function StarRating({
  totalStar = 5,
  initialRating = 0,
  readOnly = false,
  onRating,
}) {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    if (!readOnly) {
      const newRating = index + 1;
      setRating(newRating);
      onRating(newRating);
    }
  };
  return (
    <div className={`${classes.star_rating} ${readOnly && classes.small_star}`}>
      {[...Array(totalStar)].map((_, index) => (
        <Stars
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index)}
        />
      ))}
      <p>
        Rating : {rating} / {totalStar}
      </p>
    </div>
  );
}

export default StarRating;
