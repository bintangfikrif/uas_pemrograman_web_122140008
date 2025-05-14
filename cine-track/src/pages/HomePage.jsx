import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectAllMovies, selectMoviesStatus, WATCH_STATUS } from '../features/movies/moviesSlice';

const HomePage = () => {
  const movies = useAppSelector(selectAllMovies);
  const status = useAppSelector(selectMoviesStatus);
  
  // Count movies by status
  const watchingCount = movies.filter(movie => movie.status === WATCH_STATUS.WATCHING).length;
  const completedCount = movies.filter(movie => movie.status === WATCH_STATUS.COMPLETED).length;
  const plannedCount = movies.filter(movie => movie.status === WATCH_STATUS.PLANNED).length;
  const totalCount = movies.length;
  
  // Get recently added movies (up to 3)
  const recentMovies = [...movies]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Cine-Track</h1>
          <p>Track your movie and series collection all in one place</p>
          
          <div className="hero-buttons">
            <Link to="/movies" className="btn btn-primary">View Collection</Link>
            <Link to="/movies/add" className="btn btn-secondary">Add New</Link>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <h2>Your Collection Stats</h2>
        
        {status === 'loading' ? (
          <p>Loading stats...</p>
        ) : totalCount === 0 ? (
          <div className="empty-collection">
            <p>Your collection is empty. Start by adding your first movie or series!</p>
            <Link to="/movies/add" className="btn btn-primary">Add Your First Title</Link>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{totalCount}</div>
                <div className="stat-label">Total Titles</div>
              </div>
              
              <div className="stat-card watching">
                <div className="stat-number">{watchingCount}</div>
                <div className="stat-label">Watching</div>
              </div>
              
              <div className="stat-card completed">
                <div className="stat-number">{completedCount}</div>
                <div className="stat-label">Completed</div>
              </div>
              
              <div className="stat-card planned">
                <div className="stat-number">{plannedCount}</div>
                <div className="stat-label">Planned</div>
              </div>
            </div>
            
            {recentMovies.length > 0 && (
              <div className="recent-additions">
                <h3>Recently Added</h3>
                <ul className="recent-list">
                  {recentMovies.map(movie => (
                    <li key={movie.id} className="recent-item">
                      <Link to={`/movies/${movie.id}`}>
                        {movie.title} ({movie.year})
                      </Link>
                      <span className={`status-badge ${movie.status.toLowerCase()}`}>
                        {movie.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </section>
      
      <section className="features-section">
        <h2>Features</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Track Your Collection</h3>
            <p>Keep a detailed record of all your favorite movies and series.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎬</div>
            <h3>Manage Watch Status</h3>
            <p>Mark titles as "Watching", "Completed", or "Planned".</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Rate Your Favorites</h3>
            <p>Give ratings to the titles you've watched.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Access Anywhere</h3>
            <p>Your collection is available on any device with a browser.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;