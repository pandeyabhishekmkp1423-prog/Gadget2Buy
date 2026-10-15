import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminCheckMe, adminLogin as apiLogin, adminLogout as apiLogout } from '../api/admin';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const user = await adminCheckMe();
      setAdminUser(user);
    } catch {
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username, password) => {
    const user = await apiLogin(username, password);
    setAdminUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setAdminUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        isAdmin: !!adminUser,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
