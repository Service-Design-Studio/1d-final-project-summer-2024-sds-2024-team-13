import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig'; 
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setLoading(false); 
  }, [navigate]);  

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserProfile(token);
      navigate('/home');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const decoded = jwtDecode(token);
      const response = await axiosInstance.get(`users/${decoded.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      logout();
    } finally {
      setLoading(false); 
    }
  }, [logout]);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false); 
    }
  }, [fetchUserProfile]); 

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
