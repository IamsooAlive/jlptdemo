import { useState, useEffect, useCallback } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/user';

// Mock authentication service - replace with real API calls
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
    studyStreak: 7,
    totalQuizzesTaken: 25,
    averageAccuracy: 78
  }
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('jlpt_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('jlpt_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === 'demo123') {
      const updatedUser = { ...user, lastLoginAt: new Date() };
      localStorage.setItem('jlpt_user', JSON.stringify(updatedUser));
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });
      return { success: true };
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Invalid email or password' };
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.password !== credentials.confirmPassword) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Passwords do not match' };
    }
    
    if (mockUsers.find(u => u.email === credentials.email)) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      studyStreak: 0,
      totalQuizzesTaken: 0,
      averageAccuracy: 0
    };
    
    mockUsers.push(newUser);
    localStorage.setItem('jlpt_user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    });
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jlpt_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return {
    ...authState,
    login,
    register,
    logout
  };
};