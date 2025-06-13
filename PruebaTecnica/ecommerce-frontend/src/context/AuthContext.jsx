'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwt_decode(storedToken);
      setUser({ id: decoded.id, role: decoded.role, email: decoded.email });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    const decoded = jwt_decode(token);
    setUser({ id: decoded.id, role: decoded.role, email: decoded.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
