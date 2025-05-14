import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Cine-Track</h1>
        </Link>
        <p className="tagline">Track your movie and series collection easily</p>
      </div>
    </header>
  );
};

export default Header;