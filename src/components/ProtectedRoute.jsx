import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { bouncy } from 'ldrs';

export const IsLoggedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkToken } = useAuth();
  bouncy.register();

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkToken();
      setIsAuthenticated(result);
    };
    verifyAuth();
  }, [checkToken]);

  if (isAuthenticated === null) {
    return <div className='fixed right-2/4 top-2/4'><l-bouncy size="60" color="green" /></div>
  }

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export const LoginRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkToken } = useAuth();

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkToken();
      setIsAuthenticated(result);
    };
    verifyAuth();
  }, [checkToken]);

  if (isAuthenticated === null) {
    return <div className='fixed right-2/4 top-2/4'><l-bouncy size="60" color="green" /></div>
  }

  if (isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  return children;
};