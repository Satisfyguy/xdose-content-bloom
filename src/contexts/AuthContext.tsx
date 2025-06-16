import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'viewer' | 'creator';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on load
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Here we should validate the token with the API
      // For now, we simulate with localStorage data
      const userData = localStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Try real API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { token, user: apiUser } = await res.json();
        // Normalize role to lowercase for frontend
        const normalizedUser = { ...apiUser, role: apiUser.role.toLowerCase() };
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        return true;
      }
      // No fallback mock
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Try real API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      if (res.ok) {
        const { token, user: apiUser } = await res.json();
        // Normalize role to lowercase for frontend
        const normalizedUser = { ...apiUser, role: apiUser.role.toLowerCase() };
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        return true;
      }
      // No fallback mock
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
