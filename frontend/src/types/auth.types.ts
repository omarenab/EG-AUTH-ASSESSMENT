import type { Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  email: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}

export interface IAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsAuthLoading: Dispatch<SetStateAction<boolean>>;
  login: (credentials: SignInCredentials) => Promise<void>;
  signup: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
export interface IAuthResponse {
  message: string;
  user: User;
}
