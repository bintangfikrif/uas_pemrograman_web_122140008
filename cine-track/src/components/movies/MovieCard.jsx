import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { updateStatus, updateRating, WATCH_STATUS } from '../../features/movies/moviesSlice';
import RatingStars from './RatingStars';

const MovieCard = ({ movie }) => {
  const dispatch = useAppDispatch();
  
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
  
  // Determine badge color based on status
  const getBadgeClass = () => {
    switch (movie.status) {
      case WATCH_STATUS.WATCHING:
        return 'badge-watching';
      case WATCH_STATUS.COMPLETED:
        return 'badge-completed';
      case WATCH_STATUS.PLANNED:
        return 'badge-planned';
      default:
        return '';
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster ? (
          <img src={movie.poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="placeholder-poster">
            {movie.title.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </h3>
        
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-type">{movie.type}</span>
        </div>
        
        <div className="movie-status">
          <span className={`status-badge ${getBadgeClass()}`}>
            {movie.status}
          </span>
        </div>
        
        <div className="movie-rating">
          <RatingStars 
            rating={movie.rating} 
            onChange={handleRatingChange} 
          />
        </div>
        
        <div className="movie-actions">
          <select
            value={movie.status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value={WATCH_STATUS.WATCHING}>Sedang</option>
            <option value={WATCH_STATUS.COMPLETED}>Selesai</option>
            <option value={WATCH_STATUS.PLANNED}>Rencana</option>
          </select>
          
          <Link to={`/movies/edit/${movie.id}`} className="edit-btn">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;