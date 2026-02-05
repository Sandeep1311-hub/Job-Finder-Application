import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password, role) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password, role });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const updateUserProfile = async (profileData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const { data } = await axios.put('/api/auth/profile', profileData, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
