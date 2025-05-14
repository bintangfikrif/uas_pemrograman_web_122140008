import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from '../../services/movieServices';

// Status constants
export const WATCH_STATUS = {
  WATCHING: 'Watching',
  COMPLETED: 'Completed',
  PLANNED: 'Planned',
};

const initialState = {
  movies: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  activeFilter: 'all',
};

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    return await movieService.getAll();
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movie) => {
    return await movieService.create(movie);
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async (movie) => {
    return await movieService.update(movie.id, movie);
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id) => {
    await movieService.remove(id);
    return id;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    updateRating: (state, action) => {
      const { id, rating } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.rating = rating;
      }
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add new movie
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      // Update movie
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      // Delete movie
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      });
  }
});

export const { setFilter, updateRating, updateStatus } = moviesSlice.actions;

// Selectors
export const selectAllMovies = state => state.movies.movies;
export const selectFilteredMovies = state => {
  const { movies, activeFilter } = state.movies;
  if (activeFilter === 'all') {
    return movies;
  }
  return movies.filter(movie => movie.status === activeFilter);
};
export const selectMovieById = (state, movieId) => 
  state.movies.movies.find(movie => movie.id === movieId);
export const selectActiveFilter = state => state.movies.activeFilter;
export const selectMoviesStatus = state => state.movies.status;
export const selectMoviesError = state => state.movies.error;

export default moviesSlice.reducer;