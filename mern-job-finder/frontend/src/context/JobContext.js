import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/jobs?${params}`);
      setJobs(data.jobs);
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  };

  const createJob = async (jobData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.post('/api/jobs', jobData, config);
    return data;
  };

  const updateJob = async (id, jobData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.put(`/api/jobs/${id}`, jobData, config);
    return data;
  };

  const deleteJob = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    await axios.delete(`/api/jobs/${id}`, config);
  };

  const getMyJobs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.get('/api/jobs/my-jobs', config);
    return data;
  };

  const applyForJob = async (applicationData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.post('/api/applications', applicationData, config);
    return data;
  };

  const getMyApplications = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.get('/api/applications/my-applications', config);
    return data;
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        fetchJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        getMyJobs,
        applyForJob,
        getMyApplications
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
