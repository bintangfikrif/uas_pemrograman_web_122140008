import api from './api'; // Assuming api.js is configured
import Cookies from 'js-cookie'; // You're already using js-cookie

const API_AUTH_URL = 'http://localhost:6543/api/v1'; // Backend auth URL

const authService = {
  register: async ({ username, password, email }) => { // Add email if your backend expects it
    // Ensure your backend /api/v1/register expects 'email' if you send it
    // The backend UserCreateSchema only has username and password.
    // The backend User model doesn't have an email field.
    // Adjust payload according to your backend schema.
    const response = await api.client.post(`${API_AUTH_URL}/register`, {
      username,
      password,
      role: 'user' // The backend auth.py sets this, but your schema might require it
    });
    if (response.data && response.data.username) {
      // Backend login remembers user.id in auth_tkt cookie
      // Frontend currently stores user object in Cookies.
      // You might want to fetch user details separately or rely on backend session.
      // For now, let's assume the login response is what's needed.
      // Your backend register returns the new user object.
      Cookies.set('user', JSON.stringify(response.data), { expires: 1 });
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  },

  login: async ({ username, password }) => {
    const response = await api.client.post(`${API_AUTH_URL}/login`, {
      username,
      password,
    }, { withCredentials: true }); // Necessary for cookies

    if (response.data && response.data.user) {
      Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
      // The auth_tkt cookie is set by the backend automatically (HttpOnly)
      return response.data; // Contains user object and message
    }
    // Use error message from backend if available
    throw new Error(response.data.message || 'Invalid username or password.');
  },

  logout: async () => {
    try {
      await api.client.post(`${API_AUTH_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout failed on server, clearing client-side session.', error);
      // Still proceed to clear client-side session even if server call fails
    }
    Cookies.remove('user');
    Cookies.remove('auth_tkt'); // Though HttpOnly, try to clear if it was somehow set accessible
  },

  getCurrentUser: () => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  }
};

export default authService;