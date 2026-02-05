import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Dream Job Today
            </h1>
            <p className="hero-subtitle">
              Connecting talented professionals with amazing opportunities
            </p>
            <div className="hero-buttons">
              {user ? (
                <button
                  onClick={() => navigate('/jobs')}
                  className="btn btn-hero"
                >
                  Browse Jobs
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/register')}
                    className="btn btn-hero"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate('/jobs')}
                    className="btn btn-hero-outline"
                  >
                    Browse Jobs
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Job Finder?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Advanced filters to find the perfect job match</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with one click</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>Monitor your application status in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Top Companies</h3>
              <p>Get hired by leading companies worldwide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of job seekers finding their dream careers</p>
          <button
            onClick={() => navigate(user ? '/jobs' : '/register')}
            className="btn btn-cta"
          >
            {user ? 'Explore Jobs Now' : 'Sign Up Free'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
