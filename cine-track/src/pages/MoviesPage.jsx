import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMovies, selectMoviesStatus } from '../features/movies/moviesSlice';
import MovieList from '../components/movies/MovieList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(state => state.movies.error);
  
  useEffect(() => {
    // Only fetch if we haven't already
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <ErrorMessage message={error || 'Failed to load movies'} />;
  }
  
  return (
    <div className="movies-page">
      <div className="page-header">
        <h1>My Collection</h1>
        <p>Manage and organize all your movies and series</p>
      </div>
      
      <MovieList />
    </div>
  );
};

export default MoviesPage;