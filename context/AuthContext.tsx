
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = window.localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Could not parse user data from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<User | null> => {
    // Mock authentication with a slight delay
    await new Promise(res => setTimeout(res, 500));

    if (email === 'admin@urbanthreads.com' && password === 'admin123') {
      const adminUser: User = { email, name: 'Admin User', role: 'admin' };
      setUser(adminUser);
      return adminUser;
    }
    if (email === 'user@urbanthreads.com' && password === 'user123') {
      const regularUser: User = { email, name: 'Regular User', role: 'user' };
      setUser(regularUser);
      return regularUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
