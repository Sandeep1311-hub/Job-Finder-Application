import React, { useState, useEffect, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import './Jobs.css';

const Jobs = () => {
  const { jobs, loading, fetchJobs } = useContext(JobContext);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    category: '',
    experienceLevel: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(filters);
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: '',
      category: '',
      experienceLevel: ''
    });
    fetchJobs();
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <h1 className="page-title">Browse Jobs</h1>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-grid">
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleFilterChange}
                placeholder="Job title, keywords..."
                className="search-input"
              />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="search-input"
              />
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="search-select"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="search-select"
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="experienceLevel"
                value={filters.experienceLevel}
                onChange={handleFilterChange}
                className="search-select"
              >
                <option value="">All Levels</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
            <div className="search-buttons">
              <button type="submit" className="btn btn-primary">
                Search Jobs
              </button>
              <button type="button" onClick={handleReset} className="btn btn-secondary">
                Reset Filters
              </button>
            </div>
          </form>
        </div>

        <div className="jobs-list">
          {loading ? (
            <div className="loading">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="no-jobs">
              <h3>No jobs found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
