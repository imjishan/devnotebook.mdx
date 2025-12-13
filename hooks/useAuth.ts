import { useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../constants';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAdmin');
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('isAdmin');
  }

  return { isAuthenticated, login, logout };
};
