// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { customer } = useAuth();  
  return customer ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
