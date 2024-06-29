import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }
  try {
    const response = await axios.get('http://localhost:55000/Auth/Teste', {
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

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:55000/Auth/Login', { email, password });
      const token = response.data;
      const status = response.status
      if (status !== 200) {
        throw new Error('Login ou senha incorretos.');
      }
      localStorage.setItem('authToken', token);
      setUser({ email });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const checkToken = async () => {
    
    if (!localStorage.getItem('authToken')) {
      return false;
    }

    const isValid = await verifyToken();

    if (!isValid) {
      setUser(null);
      localStorage.removeItem('authToken');
      console.log(1)
      throw(new Error('Login ou senha incorretos'));
    }
    return isValid;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyToken, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;