import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const user = useSelector((state: { auth: { user: { username: string } | null } }) => state.auth.user);
  const dispatch = useDispatch();

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
          {!user ? (
            <>
              <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
            </>
          ) : (
            <>
              <li className="nav-item">Hello, {user.username}</li>
              <li className="nav-item">
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;