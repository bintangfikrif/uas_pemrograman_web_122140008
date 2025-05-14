import React from 'react';

const RatingStars = ({ rating, onChange, readOnly = false }) => {
  const maxRating = 5;
  
  const handleClick = (selectedRating) => {
    if (readOnly) return;
    
    // If user clicks on already selected rating, reset to 0
    if (selectedRating === rating) {
      onChange(0);
    } else {
      onChange(selectedRating);
    }
  };
  
  return (
    <div className={`rating-stars ${readOnly ? 'read-only' : ''}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= rating ? 'filled' : 'empty'}`}
            onClick={() => handleClick(starValue)}
            aria-label={`Rate ${starValue} of ${maxRating}`}
          >
            ★
          </span>
        );
      })}
      <span className="rating-text">{rating > 0 ? `${rating}/${maxRating}` : 'Not rated'}</span>
    </div>
  );
};

export default RatingStars;