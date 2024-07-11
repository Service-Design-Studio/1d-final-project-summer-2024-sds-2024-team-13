import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { customer, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return customer ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;