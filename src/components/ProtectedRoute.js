import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ roles }) => {
    const user = authService.getCurrentUser();
    const userRole = authService.getUserRole();

    if (!user) {
        return <Navigate to="/login" />;
      }
    
      if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />;
      }
    
      return <Outlet />;
    
};

export default ProtectedRoute;
