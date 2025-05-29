import axios from 'axios';

// For simplicity, we'll use localStorage as our mock backend.
// In a real application, this would point to an actual API.

const BASE_URL = 'http://localhost:6543/api'; 

const api = {
  // Wrapper around axios with common configuration
  client: axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  // Mock implementation for local storage
  // In a real app, these would use the axios client above
  
  async getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  async saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },
};

export default api;