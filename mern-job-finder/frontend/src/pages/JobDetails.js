import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const { getJobById, applyForJob } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: '',
    coverLetter: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (error) {
      toast.error('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    try {
      await applyForJob({
        jobId: id,
        resume: applicationData.resume,
        coverLetter: applicationData.coverLetter
      });
      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      setApplicationData({ resume: '', coverLetter: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Application failed');
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return <div className="container"><h2>Job not found</h2></div>;
  }

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="job-details-card">
          <div className="job-header">
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
            </div>
            <span className={`job-type ${job.jobType.toLowerCase().replace('-', '')}`}>
              {job.jobType}
            </span>
          </div>

          <div className="job-meta">
            <div className="meta-item">
              <strong>📍 Location:</strong> {job.location}
            </div>
            <div className="meta-item">
              <strong>💰 Salary:</strong> ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
            </div>
            <div className="meta-item">
              <strong>📂 Category:</strong> {job.category}
            </div>
            <div className="meta-item">
              <strong>📊 Experience:</strong> {job.experienceLevel} Level
            </div>
          </div>

          <div className="job-section">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="job-section">
              <h3>Requirements</h3>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="job-section">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {user && user.role === 'user' && (
            <div className="apply-section">
              {!showApplicationForm ? (
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="btn btn-primary btn-large"
                >
                  Apply for this Job
                </button>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="application-form">
                  <h3>Submit Your Application</h3>
                  <div className="form-group">
                    <label>Resume URL</label>
                    <input
                      type="url"
                      value={applicationData.resume}
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, resume: e.target.value })
                      }
                      placeholder="https://yourresume.com/resume.pdf"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea
                      value={applicationData.coverLetter}
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, coverLetter: e.target.value })
                      }
                      placeholder="Tell us why you're a great fit for this position..."
                      rows="6"
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
