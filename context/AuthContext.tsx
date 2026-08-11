'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  industry: string;
  skills: string[];
  image?: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, imageUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateCredits: (newCredits: number) => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to safely parse JSON response without crashing on HTML error pages
const safeJsonParse = async (res: Response) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Received non-JSON response from server:", text);
    return { message: "Server communication error. Please try again." };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await safeJsonParse(res);
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await safeJsonParse(res);
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      const meRes = await fetch('/api/auth/me');
      if (meRes.ok) {
        const meData = await safeJsonParse(meRes);
        if (meData.user) {
          setUser(meData.user);
        }
      }
      toast.success('Logged in successfully!');
      router.push('/roadmap');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, imageUrl?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, imageUrl }),
      });
      const data = await safeJsonParse(res);
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      const meRes = await fetch('/api/auth/me');
      if (meRes.ok) {
        const meData = await safeJsonParse(meRes);
        if (meData.user) {
          setUser(meData.user);
          toast.success('Account created successfully!');
          router.push('/onboarding');
          return;
        }
      }
      toast.success('Account created successfully! Please log in.');
      router.push('/auth');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCredits = (newCredits: number) => {
    if (user) {
      setUser({ ...user, credits: newCredits });
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout, updateCredits, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};