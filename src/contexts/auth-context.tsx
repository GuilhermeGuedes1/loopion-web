import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { saveToken } from "../utils/storage";

import { me } from "../services/authApi";

import { getToken, removeToken } from "../utils/storage";

import type { MeResponse } from "../types/auth";

type AuthContextType = {
  user: MeResponse | null;
  loading: boolean;
  logout: () => void;
  login: (token: string) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<MeResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await me();
        console.log("User data loaded:", userData);

        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);

        removeToken();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(token: string) {
    saveToken(token);

    const userData = await me();

    setUser(userData);
  }
  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        login,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
