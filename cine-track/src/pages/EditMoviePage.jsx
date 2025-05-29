import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovie } from '../hooks/useMovies';  // Your custom hook

import MovieForm from '../components/movies/MovieForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    movieDetail, 
    loading, 
    error, 
    fetchMovieById, 
    updateMovie 
  } = useMovie();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch movie detail only if not loaded or id mismatched
  useEffect(() => {
    if (!movieDetail || movieDetail.id !== id) {
      fetchMovieById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (movieData) => {
    try {
      setIsSubmitting(true);
      const result = await updateMovie(id, movieData);
      if (result.success) {
        navigate(`/movies/${id}`);
      } else {
        alert('Failed to update movie. Please try again.');
      }
    } catch (err) {
      console.error('Failed to update movie:', err);
      alert('Failed to update movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movieDetail) {
    return (
      <div className="not-found">
        <h2>Movie Not Found</h2>
        <p>The movie you're trying to edit doesn't exist or may have been deleted.</p>
        <button onClick={() => navigate('/movies')} className="back-btn">
          Back to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="edit-movie-page">
      <div className="page-header">
        <h1>Edit Movie</h1>
        <p>Update information for {movieDetail.title}</p>
      </div>

      <MovieForm
        movie={movieDetail}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditMoviePage;
