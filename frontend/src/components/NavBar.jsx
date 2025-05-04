import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Resource Platform</h1>
      </div>
      <div className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/upload" className="nav-link">Upload</a>
        <a href="/profile" className="nav-link">Profile</a>
        <a href="/search" className="nav-link">Search</a>
        {isAuthenticated ? (
          <a href="#" onClick={handleLogout} className="nav-link">Logout</a>
        ) : (
          <>
            <a href="/login" className="nav-link">Login</a>
            <a href="/register" className="nav-link">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;