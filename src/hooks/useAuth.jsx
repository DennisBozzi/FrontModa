import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { bouncy } from 'ldrs';

const AuthContext = createContext();

bouncy.register();
export const useAuth = () => useContext(AuthContext);
const url = 'https://backmoda.onrender.com/';

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }
  try {
    const response = await axios.get(url + 'Auth/Teste', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao verificar o token', error);
    localStorage.removeItem('authToken');
    return false;
  }
};

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
      const response = await axios.post(url + 'Auth/Login', { email, password });
      const token = response.data;
      const status = response.status
      if (status !== 200) {
        throw new Error('Login ou senha incorretos');
      }
      localStorage.setItem('authToken', token);
      setUser({ email });
    } catch (error) {
      <Navigate to="/" replace />;
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const checkToken = async () => {
    if (!localStorage.getItem('authToken')) {
      return false;
    }

    const isValid = await verifyToken();

    if (!isValid) {
      setUser(null);
      localStorage.removeItem('authToken');
      throw new Error('Login ou senha incorretos');
    }

    return isValid;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyToken, checkToken, loading }}>
      {children}
      {loading && <div className='fixed right-2/4 top-2/4'><l-bouncy size="60" color="green" /></div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;