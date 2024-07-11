import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig'; 
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setCustomer(null);
    navigate('/');
  }, [navigate]);

  const login = async (phone_num, password) => {
    try {
      const response = await axiosInstance.post('customers/login', { phone_num, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchCustomerProfile(token);
      navigate('/payment');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const fetchCustomerProfile = useCallback(async (token) => {
    try {
      const decoded = jwtDecode(token);
      const response = await axiosInstance.get(`customers/${decoded.customer_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomer(response.data);
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCustomerProfile(token);
    }
  }, [fetchCustomerProfile]);

  return (
    <AuthContext.Provider value={{ customer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
