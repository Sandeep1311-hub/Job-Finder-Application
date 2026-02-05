import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    bio: '',
    skills: '',
    experience: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills ? user.skills.join(', ') : '',
        experience: user.experience || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
        experience: Number(formData.experience)
      };

      await updateUserProfile(profileData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
              <span className="role-badge">{user?.role}</span>
            </div>
          </div>

          {!isEditing ? (
            <div className="profile-details">
              <div className="detail-section">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <strong>Phone:</strong> {user?.phone || 'Not provided'}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {user?.location || 'Not provided'}
                </div>
              </div>

              <div className="detail-section">
                <h3>About Me</h3>
                <p>{user?.bio || 'No bio added yet.'}</p>
              </div>

              {user?.role === 'user' && (
                <>
                  <div className="detail-section">
                    <h3>Skills</h3>
                    {user?.skills && user.skills.length > 0 ? (
                      <div className="skills-display">
                        {user.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    ) : (
                      <p>No skills added yet.</p>
                    )}
                  </div>

                  <div className="detail-section">
                    <h3>Experience</h3>
                    <p>{user?.experience || 0} years</p>
                  </div>
                </>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +1234567890"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
              </div>

              {user?.role === 'user' && (
                <>
                  <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., React, Node.js, Python"
                    />
                  </div>

                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
