import React from 'react';
import { RouteProps, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const ProtectedRoute: React.FC<RouteProps> = () => {
  const { user, token } = useAuthContext();

  if (user?.role === 'guest' && !user?.company) {
    return <Navigate to="/initial-user" replace />;
  }

  if (user?.role === 'admin' && !user?.company) {
    return <Navigate to="/initial-admin" replace />;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
