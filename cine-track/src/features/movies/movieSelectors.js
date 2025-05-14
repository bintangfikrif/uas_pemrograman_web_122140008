// Select all movies from state
export const selectAllMovies = state => state.movies.movies;

// Select a movie by its ID
export const selectMovieById = (state, movieId) =>
  state.movies.movies.find(movie => movie.id === movieId);

// Select movies filtered by active status filter
export const selectFilteredMovies = state => {
  const { movies, activeFilter } = state.movies;
  if (activeFilter === 'all') {
    return movies;
  }
  return movies.filter(movie => movie.status === activeFilter);
};

// Select the current active filter
export const selectActiveFilter = state => state.movies.activeFilter;

// Select the loading status
export const selectMoviesStatus = state => state.movies.status;

// Select the error message
export const selectMoviesError = state => state.movies.error;