import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/movies" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              My Collection
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/movies/add" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Add New
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;