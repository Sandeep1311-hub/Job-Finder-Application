import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import CreateJob from './pages/CreateJob';
import Profile from './pages/Profile';
import MyApplications from './pages/MyApplications';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route
                path="/create-job"
                element={
                  <PrivateRoute>
                    <CreateJob />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-applications"
                element={
                  <PrivateRoute>
                    <MyApplications />
                  </PrivateRoute>
                }
              />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
