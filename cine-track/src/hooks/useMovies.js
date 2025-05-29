import { useState } from "react";

const API_URL = "http://localhost:6543/api";

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📥 Get All Movies
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/media`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors || "Failed to fetch movies");
      }

      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Get Movie by ID
  const fetchMovieById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/media/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors || "Movie not found");
      }

      setMovieDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create New Movie
  const createMovie = async (movie) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(JSON.stringify(data.errors));
      }

      await fetchMovies(); // refresh list
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Update Movie by ID
  const updateMovie = async (id, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/media/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(JSON.stringify(data.errors));
      }

      await fetchMovies(); // refresh list
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Movie by ID
  const deleteMovie = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/media/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors || "Failed to delete");
      }

      await fetchMovies(); // refresh list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    movieDetail,
    loading,
    error,
    fetchMovies,
    fetchMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
  };
}