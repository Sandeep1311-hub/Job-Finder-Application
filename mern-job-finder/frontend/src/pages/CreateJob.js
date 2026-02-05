import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import { toast } from 'react-toastify';
import './CreateJob.css';

const CreateJob = () => {
  const { createJob } = useContext(JobContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    location: '',
    jobType: 'Full-time',
    minSalary: '',
    maxSalary: '',
    category: 'Technology',
    experienceLevel: 'Mid',
    skills: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        title: formData.title,
        company: formData.company,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(req => req.trim() !== ''),
        location: formData.location,
        jobType: formData.jobType,
        salary: {
          min: Number(formData.minSalary),
          max: Number(formData.maxSalary)
        },
        category: formData.category,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
        deadline: formData.deadline || undefined
      };

      await createJob(jobData);
      toast.success('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="create-job-page">
      <div className="container">
        <div className="create-job-card">
          <h1>Post a New Job</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp Inc."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the job role..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Requirements (one per line)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience&#10;Strong knowledge of React"
                rows="5"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., New York, NY"
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Type *</label>
                <select name="jobType" value={formData.jobType} onChange={handleChange} required>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Minimum Salary ($) *</label>
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="e.g., 80000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Maximum Salary ($) *</label>
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="e.g., 120000"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Experience Level *</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Required Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB, JavaScript"
              />
            </div>

            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large">
                Post Job
              </button>
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
