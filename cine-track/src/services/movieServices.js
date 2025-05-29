import api from './api'; // Your configured axios client

// The base URL for media is now 'http://localhost:6543/api' (from api.js)
// The specific path is '/media'
const MEDIA_ENDPOINT = '/media';

const movieService = {
  async getAll() {
    try {
      const response = await api.client.get(MEDIA_ENDPOINT, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error.response?.data || error.message);
      throw error.response?.data || new Error('Failed to fetch movies');
    }
  },

  async getById(id) {
    try {
      const response = await api.client.get(`<span class="math-inline">\{MEDIA\_ENDPOINT\}/</span>{id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error.response?.data || error.message);
      throw error.response?.data || new Error(`Failed to fetch movie ${id}`);
    }
  },

  async create(movieData) {
    try {
      // The backend MediaCreateSchema expects specific fields.
      // Ensure movieData matches this schema.
      const response = await api.client.post(MEDIA_ENDPOINT, movieData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error.response?.data || error.message);
      throw error.response?.data || new Error('Failed to create movie');
    }
  },

  async update(id, updatedMovieData) {
    try {
      // The backend MediaUpdateSchema expects specific fields.
      const response = await api.client.put(`<span class="math-inline">\{MEDIA\_ENDPOINT\}/</span>{id}`, updatedMovieData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(`Error updating movie with id ${id}:`, error.response?.data || error.message);
      throw error.response?.data || new Error(`Failed to update movie ${id}`);
    }
  },

  async remove(id) {
    try {
      await api.client.delete(`<span class="math-inline">\{MEDIA\_ENDPOINT\}/</span>{id}`, { withCredentials: true });
      return id; // On success, typically no content is returned, just status 204
    } catch (error) {
      console.error(`Error deleting movie with id ${id}:`, error.response?.data || error.message);
      throw error.response?.data || new Error(`Failed to delete movie ${id}`);
    }
  }
};

export default movieService;