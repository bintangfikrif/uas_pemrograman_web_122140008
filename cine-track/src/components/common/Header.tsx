import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={'/cinetrack.png'} alt="Cine-Track Logo" className="logo-img" />
          <h1>Cine-Track</h1>
        </Link>
        <p className="tagline">Track your movie and series collection easily</p>
      </div>
    </header>
  );
};

export default Header;