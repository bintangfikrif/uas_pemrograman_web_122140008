import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
import { useMovie } from "../../hooks/useMovies";

const MovieDetail = ({ movieId }) => {
  const navigate = useNavigate();
  const {
    movieDetail,
    loading,
    error,
    fetchMovieById,
    updateMovie,
    deleteMovie,
  } = useMovie();

  useEffect(() => {
    fetchMovieById(movieId);
  }, [movieId]);

  if (loading) return <div>Loading movie...</div>;
  if (error) return (
    <div className="movie-not-found">
      <h2>Movie Not Found</h2>
      <p>{error}</p>
      <Link to="/movies" className="back-link">Back to Collection</Link>
    </div>
  );
  if (!movieDetail) return null;

  const handleStatusChange = async (e) => {
    await updateMovie(movieDetail.id, { status: e.target.value });
    await fetchMovieById(movieId); // refresh after update
  };

  const handleRatingChange = async (newRating) => {
    await updateMovie(movieDetail.id, { rating: newRating });
    await fetchMovieById(movieId); // refresh after update
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie from your collection?")) {
      await deleteMovie(movieDetail.id);
      // Navigate back to movies list and pass a flag to refresh the list
      navigate("/movies", { state: { refresh: true } });
    }
  };

  const movie = movieDetail;

  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <div className="movie-poster-container">
          {movie.poster ? (
            <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
          ) : (
            <div className="placeholder-poster large">{movie.title.charAt(0)}</div>
          )}
        </div>

        <div className="movie-header-info">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-type">{movie.type}</span>
            {movie.genre && <span className="movie-genre">{movie.genre}</span>}
          </div>

          {movie.director && (
            <div className="movie-director">
              <strong>Director/Creator:</strong> {movie.director}
            </div>
          )}

          <div className="movie-status-container">
            <strong>Status:</strong>
            <select value={movie.status} onChange={handleStatusChange} className="status-select">
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>
          </div>

          <div className="movie-rating-container">
            <strong>Your Rating:</strong>
            <RatingStars rating={movie.rating} onChange={handleRatingChange} />
          </div>

          <div className="movie-actions">
            <Link to={`/movies/edit/${movie.id}`} className="edit-btn">
              Edit
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>

      {movie.synopsis && (
        <div className="movie-synopsis">
          <h2>Synopsis</h2>
          <p>{movie.synopsis}</p>
        </div>
      )}

      {movie.notes && (
        <div className="movie-notes">
          <h2>Your Notes</h2>
          <p>{movie.notes}</p>
        </div>
      )}

      <div className="back-link-container">
        <Link to="/movies" className="back-link">
          Back to Collection
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;
