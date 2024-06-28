import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const IsLoggedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkToken } = useAuth();

  const verifyAuth = async () => {
    const result = await checkToken();
    setIsAuthenticated(result);
  };
  verifyAuth();

  if (isAuthenticated === null) {
    // Colocar componente de loading
    return null;
  }

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export const LoginRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkToken } = useAuth();

  const verifyAuth = async () => {
    const result = await checkToken();
    setIsAuthenticated(result);
  };
  verifyAuth();

  if (isAuthenticated === null) {
    // Colocar componente de loading    
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  return children;
};