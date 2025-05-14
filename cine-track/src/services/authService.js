const USERS_KEY = 'cine-track-users';
const AUTH_KEY = 'cine-track-auth';

const authService = {
  register: async ({ username, password }) => {
    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    if (users.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
    return { username };
  },

  login: async ({ username, password }) => {
    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid username or password');
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
    return { username };
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  }
};

export default authService;