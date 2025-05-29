import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  selectMovieById, 
  selectMoviesStatus, 
  fetchMovies 
} from '../features/movies/moviesSlice';
import MovieDetail from '../components/movies/MovieDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Convert id to number to match the movie.id type in state
  const numericId = Number(id);

  // Debug logs
  console.log('id from URL:', id, typeof id);
  console.log('numericId:', numericId);

  const status = useAppSelector(selectMoviesStatus);
  const movie = useAppSelector(state => selectMovieById(state, numericId));
  
  console.log('movie from selector:', movie);

  const error = useAppSelector(state => state.movies.error);
  
  useEffect(() => {
    // Only fetch movies if status is 'idle' (not loaded yet)
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load movie details'} />;
  }
  
  if (!movie && status === 'succeeded') {
    return (
      <div className="not-found">
        <h2>Movie Not Found</h2>
        <p>The movie you're looking for doesn't exist or may have been deleted.</p>
        <button onClick={() => navigate('/movies')} className="back-btn">
          Back to Collection
        </button>
      </div>
    );
  }
  
  return (
    <div className="movie-detail-page">
      <MovieDetail movieId={numericId} />
    </div>
  );
};

export default MovieDetailPage;
