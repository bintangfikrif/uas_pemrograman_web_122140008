import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
  selectMovieById, 
  updateStatus, 
  updateRating, 
  deleteMovie,
  WATCH_STATUS
} from '../../features/movies/moviesSlice';
import RatingStars from './RatingStars';
import { useNavigate } from 'react-router-dom';

const MovieDetail = ({ movieId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const movie = useAppSelector(state => selectMovieById(state, movieId));
  
  if (!movie) {
    return (
      <div className="movie-not-found">
        <h2>Movie Not Found</h2>
        <p>Sorry, the movie you're looking for doesn't exist or has been removed.</p>
        <Link to="/movies" className="back-link">Back to Collection</Link>
      </div>
    );
  }
  
  const handleStatusChange = (e) => {
    dispatch(updateStatus({
      id: movie.id,
      status: e.target.value
    }));
  };
  
  const handleRatingChange = (newRating) => {
    dispatch(updateRating({
      id: movie.id,
      rating: newRating
    }));
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie from your collection?')) {
      dispatch(deleteMovie(movie.id));
      navigate('/movies');
    }
  };
  
  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <div className="movie-poster-container">
          {movie.poster ? (
            <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
          ) : (
            <div className="placeholder-poster large">
              {movie.title.charAt(0)}
            </div>
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
            <select
              value={movie.status}
              onChange={handleStatusChange}
              className="status-select"
            >
              <option value={WATCH_STATUS.WATCHING}>Watching</option>
              <option value={WATCH_STATUS.COMPLETED}>Completed</option>
              <option value={WATCH_STATUS.PLANNED}>Planned</option>
            </select>
          </div>
          
          <div className="movie-rating-container">
            <strong>Your Rating:</strong>
            <RatingStars 
              rating={movie.rating} 
              onChange={handleRatingChange} 
            />
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
        <Link to="/movies" className="back-link">Back to Collection</Link>
      </div>
    </div>
  );
};

export default MovieDetail;