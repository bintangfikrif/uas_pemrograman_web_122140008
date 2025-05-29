import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import StatusFilter from './StatusFilter';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
  selectFilteredMovies, 
  selectMoviesStatus, 
  selectMoviesError,
  fetchMovies
} from '../../features/movies/moviesSlice';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredMovies = useAppSelector(selectFilteredMovies);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);

  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (location.state?.refresh && !hasRefreshed) {
      dispatch(fetchMovies());
      setHasRefreshed(true);

      // Clear the refresh flag from the history state
      // This prevents useEffect from running again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, hasRefreshed, dispatch, navigate]);

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
