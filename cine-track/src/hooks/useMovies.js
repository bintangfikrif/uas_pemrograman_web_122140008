import { useAppSelector } from '../app/hooks';
import { 
  selectAllMovies, 
  selectMoviesStatus, 
  selectMoviesError 
} from '../features/movies/moviesSlice';

/**
 * Custom hook to get all movies, loading status, and error.
 * Returns: { movies, status, error }
 */
const useMovies = () => {
  const movies = useAppSelector(selectAllMovies);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);

  return { movies, status, error };
};

export default useMovies;