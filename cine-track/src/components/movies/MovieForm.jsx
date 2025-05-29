import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WATCH_STATUS } from '../../features/movies/moviesSlice';
import RatingStars from './RatingStars';

const MovieForm = ({ movie = null, onSubmit, isSubmitting }) => {
  const navigate = useNavigate();
  const isEditMode = !!movie;
  
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    director: '',
    genre: '',
    type: 'Movie', // Default to 'movie'
    status: WATCH_STATUS.PLANNED, // Default to 'Planned'
    rating: 0,
    synopsis: '',
    poster: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // If we're in edit mode, populate the form with movie data
  useEffect(() => {
    if (isEditMode && movie) {
      setFormData(prevState => ({
        ...prevState,
        ...movie
      }));
    }
  }, [isEditMode, movie]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field if exists
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  const handleRatingChange = (newRating) => {
    setFormData(prevState => ({
      ...prevState,
      rating: newRating
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Title is required
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    // Year must be a valid year
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(formData.year);
    if (isNaN(yearNum) || yearNum < 1888 || yearNum > currentYear + 5) {
      newErrors.year = `Year must be between 1888 and ${currentYear + 5}`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter movie or series title"
          required
        />
        {errors.title && <div className="error-text">{errors.title}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">Year*</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={errors.year ? 'error' : ''}
            min="1888"
            max={new Date().getFullYear() + 5}
            required
          />
          {errors.year && <div className="error-text">{errors.year}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
            <option value="Documentary">Documentary</option>
            <option value="Anime">Anime</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="director">Director/Creator</label>
        <input
          type="text"
          id="director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Enter director or creator"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="E.g., Action, Drama, Sci-Fi"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Watch Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={WATCH_STATUS.PLANNED}>Planned</option>
          <option value={WATCH_STATUS.WATCHING}>Watching</option>
          <option value={WATCH_STATUS.COMPLETED}>Completed</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <RatingStars 
          rating={formData.rating} 
          onChange={handleRatingChange} 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="poster">Poster URL</label>
        <input
          type="url"
          id="poster"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          placeholder="Enter URL for movie poster"
        />
        {formData.poster && (
          <div className="poster-preview">
            <img src={formData.poster} alt="Poster preview" />
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="synopsis">Synopsis</label>
        <textarea
          id="synopsis"
          name="synopsis"
          value={formData.synopsis}
          onChange={handleChange}
          rows="4"
          placeholder="Enter a brief synopsis"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Personal Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Add your personal thoughts or notes"
        ></textarea>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Movie' : 'Add Movie'}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;