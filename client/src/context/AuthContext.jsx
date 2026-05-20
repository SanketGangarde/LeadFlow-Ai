import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'https://leadflow-ai-03sa.onrender.com/api';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in on application mount
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/status`);
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        setAdminUser(response.data.admin);
      } else {
        setIsAuthenticated(false);
        setAdminUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle Login
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      setIsAuthenticated(true);
      setAdminUser(response.data.admin);
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      setAdminUser(null);
      throw error.response?.data?.error || 'Login failed';
    }
  };

  // Handle Logout
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error on server:', error);
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, loading, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
