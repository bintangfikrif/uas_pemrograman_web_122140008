import { useState } from "react";
import Cookies from "js-cookie";

const API_URL = "http://localhost:6543/api/v1";

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = Cookies.get("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Login Function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data.message || "Login failed";
        setError(message);
        setLoading(false);
        return { success: false, message };
      }

      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
      setUser(data.user);
      setLoading(false);

      return {
        success: true,
        user: data.user,
        role: data.user.role,
      };
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  };


  // 📝 Register Function
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return false;
      }

      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
      return false;
    }
  };

  // 🚪 Logout Function
  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("auth_tkt");
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}