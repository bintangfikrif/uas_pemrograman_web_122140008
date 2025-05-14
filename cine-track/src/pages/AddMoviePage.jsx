import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addMovie } from '../features/movies/moviesSlice';
import MovieForm from '../components/movies/MovieForm';

const AddMoviePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (movieData) => {
    try {
      setIsSubmitting(true);
      await dispatch(addMovie(movieData)).unwrap();
      navigate('/movies');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="add-movie-page">
      <div className="page-header">
        <h1>Add New Movie/Series</h1>
        <p>Add a new title to your collection</p>
      </div>
      
      <MovieForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddMoviePage;