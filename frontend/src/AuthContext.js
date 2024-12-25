// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const adminCredentials = {
  id: 'admin',
  password: 'admin123'
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = (id, password) => {
    if (id === adminCredentials.id && password === adminCredentials.password) {
      setIsAdmin(true);
    } else {
      alert('Incorrect ID or password');
    }
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
