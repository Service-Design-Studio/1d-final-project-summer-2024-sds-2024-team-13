import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;