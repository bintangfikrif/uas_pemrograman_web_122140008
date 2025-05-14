import React from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import StatusFilter from './StatusFilter';
import { useAppSelector } from '../../app/hooks';
import { 
  selectFilteredMovies, 
  selectMoviesStatus, 
  selectMoviesError 
} from '../../features/movies/moviesSlice';

const MovieList = () => {
  const filteredMovies = useAppSelector(selectFilteredMovies);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <div className="movie-list-container">
      <StatusFilter />
      
      {filteredMovies.length === 0 ? (
        <div className="empty-list">
          <p>No movies found matching your filter criteria.</p>
        </div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;