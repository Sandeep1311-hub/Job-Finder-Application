import React, { useState, useEffect, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MyApplications.css';

const MyApplications = () => {
  const { getMyApplications } = useContext(JobContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      case 'shortlisted':
        return 'status-shortlisted';
      case 'reviewing':
        return 'status-reviewing';
      default:
        return 'status-pending';
    }
  };

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  return (
    <div className="applications-page">
      <div className="container">
        <h1 className="page-title">My Applications</h1>

        {applications.length === 0 ? (
          <div className="no-applications">
            <h3>No applications yet</h3>
            <p>Start applying for jobs to see your applications here</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-header">
                  <div>
                    <h3>{application.job?.title}</h3>
                    <p className="company">{application.job?.company}</p>
                  </div>
                  <span className={`status-badge ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>

                <div className="application-details">
                  <div className="detail-item">
                    <strong>📍 Location:</strong> {application.job?.location}
                  </div>
                  <div className="detail-item">
                    <strong>💼 Job Type:</strong> {application.job?.jobType}
                  </div>
                  <div className="detail-item">
                    <strong>💰 Salary:</strong> ${application.job?.salary?.min.toLocaleString()} -{' '}
                    ${application.job?.salary?.max.toLocaleString()}
                  </div>
                  <div className="detail-item">
                    <strong>📅 Applied:</strong>{' '}
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="cover-letter">
                    <strong>Cover Letter:</strong>
                    <p>{application.coverLetter}</p>
                  </div>
                )}

                <div className="application-footer">
                  <Link to={`/jobs/${application.job?._id}`} className="btn btn-primary btn-small">
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
