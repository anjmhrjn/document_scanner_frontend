"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { getCurrentUser } from "../lib/user";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
    }
    setLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
