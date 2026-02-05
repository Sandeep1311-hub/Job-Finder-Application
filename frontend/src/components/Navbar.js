import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>💼 Job Finder</h2>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          {user ? (
            <>
              {(user.role === 'employer' || user.role === 'admin') && (
                <li><Link to="/create-job">Post Job</Link></li>
              )}
              <li><Link to="/my-applications">My Applications</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
