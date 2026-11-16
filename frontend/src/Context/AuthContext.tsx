import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import authService from "../services/auth.service";
import type {
  User,
  SignInCredentials,
  SignUpCredentials,
  IAuthContextType,
} from "../types/auth.types";

export const AuthContext = createContext<IAuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          const currentUser = await authService.getProfile();
          setUser(currentUser);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  const login = async (credentials: SignInCredentials) => {
    const authenticatedUser = await authService.signin(credentials);
    setUser(authenticatedUser);
  };

  const signup = async (credentials: SignUpCredentials) => {
    const authenticatedUser = await authService.signup(credentials);
    setUser(authenticatedUser);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        isAuthenticated,
        signup,
        setIsLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
