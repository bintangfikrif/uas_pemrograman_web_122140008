import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  selectMovieById, 
  updateMovie, 
  fetchMovies, 
  selectMoviesStatus 
} from '../features/movies/moviesSlice';
import MovieForm from '../components/movies/MovieForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const EditMoviePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const movie = useAppSelector(state => selectMovieById(state, id));
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(state => state.movies.error);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);
  
  const handleSubmit = async (movieData) => {
    try {
      setIsSubmitting(true);
      await dispatch(updateMovie({ id, ...movieData })).unwrap();
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error('Failed to update movie:', error);
      alert('Failed to update movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load movie data'} />;
  }
  
  if (!movie && status === 'succeeded') {
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
        <p>Update information for {movie?.title}</p>
      </div>
      
      <MovieForm 
        movie={movie}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditMoviePage;