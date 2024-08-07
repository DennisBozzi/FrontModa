import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { Navigate } from 'react-router-dom';
import { bouncy } from 'ldrs';

bouncy.register();

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkToken();
      setLoading(false);
    }
    initializeAuth();
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/Auth/Login', { email, password });
      const token = response.data;
      const status = response.status

      if (status !== 200) {
        throw new Error('Login ou senha incorretos');
      }

      localStorage.setItem('authToken', token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ email });

    } catch (error) {
      <Navigate to="/" replace />;
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    axiosInstance.defaults.headers.Authorization = null;
    setUser(null);
    window.location.reload();
  };

  const checkToken = async () => {
    if (!localStorage.getItem('authToken')) {
      return false;
    }

    const isValid = await verifyToken();
    if (!isValid) {
      setUser(null);
      throw new Error('Login ou senha incorretos');
    }

    return isValid;
  };

  const verifyToken = async () => {
    try {
      const response = await axiosInstance.get('Auth/CheckToken');
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      if (error.response.status === 401) {
        window.location.reload();
      }
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyToken, checkToken, loading }}>
      {children}
      {loading && <div className='flex items-center justify-center h-screen w-screen'>
        <l-bouncy size="60" color="green" />
      </div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;