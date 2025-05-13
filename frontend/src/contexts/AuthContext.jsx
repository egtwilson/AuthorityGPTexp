import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const { data } = await api.get('/auth/profile');
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        localStorage.removeItem('authToken'); // Invalid token
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('authToken', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data); // The user object from backend might include name, email, _id, token
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : new Error('Login failed');
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('authToken', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
