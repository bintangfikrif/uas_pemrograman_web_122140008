import api from './api';

const STORAGE_KEY = 'cine-track-movies';

// Mock movie service that uses localStorage
// In a real application, these would call an actual API
const movieService = {
  async getAll() {
    try {
      const movies = await api.getFromStorage(STORAGE_KEY);
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const movies = await api.getFromStorage(STORAGE_KEY);
      return movies.find(movie => movie.id === id);
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      throw error;
    }
  },

  async create(movie) {
    try {
      const movies = await api.getFromStorage(STORAGE_KEY);
      // Create a new movie with a unique ID
      const newMovie = {
        ...movie,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      movies.push(newMovie);
      await api.saveToStorage(STORAGE_KEY, movies);
      return newMovie;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  },

  async update(id, updatedMovie) {
    try {
      const movies = await api.getFromStorage(STORAGE_KEY);
      const index = movies.findIndex(movie => movie.id === id);
      
      if (index !== -1) {
        movies[index] = {
          ...movies[index],
          ...updatedMovie,
          updatedAt: new Date().toISOString(),
        };
        
        await api.saveToStorage(STORAGE_KEY, movies);
        return movies[index];
      }
      
      throw new Error(`Movie with id ${id} not found`);
    } catch (error) {
      console.error(`Error updating movie with id ${id}:`, error);
      throw error;
    }
  },

  async remove(id) {
    try {
      const movies = await api.getFromStorage(STORAGE_KEY);
      const filteredMovies = movies.filter(movie => movie.id !== id);
      
      await api.saveToStorage(STORAGE_KEY, filteredMovies);
      return id;
    } catch (error) {
      console.error(`Error deleting movie with id ${id}:`, error);
      throw error;
    }
  }
};

export default movieService;