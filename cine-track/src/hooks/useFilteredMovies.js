import { useAppSelector } from '../app/hooks';
import { selectFilteredMovies, selectMoviesStatus, selectMoviesError } from '../features/movies/moviesSlice';

/**
 * Custom hook to get filtered movies, loading status, and error.
 * Returns: { movies, status, error }
 */
const useFilteredMovies = () => {
  const movies = useAppSelector(selectFilteredMovies);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);

  return { movies, status, error };
};

export default useFilteredMovies;