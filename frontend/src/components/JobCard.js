import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className={`job-type ${job.jobType.toLowerCase().replace('-', '')}`}>
          {job.jobType}
        </span>
      </div>
      <div className="job-card-body">
        <p className="company">
          <strong>🏢 {job.company}</strong>
        </p>
        <p className="location">📍 {job.location}</p>
        <p className="salary">
          💰 ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
        </p>
        <p className="category">
          <span className="badge">{job.category}</span>
          <span className="badge">{job.experienceLevel}</span>
        </p>
        <p className="description">
          {job.description.substring(0, 150)}...
        </p>
      </div>
      <div className="job-card-footer">
        <Link to={`/jobs/${job._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
