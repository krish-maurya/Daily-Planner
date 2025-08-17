import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type User = { id: string; email: string } | null;

interface AuthContextType {
  user: User;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !isTokenExpired(token)) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.id, email: decoded.email });
      } catch {
        Cookies.remove("token");
      }
    } else {
      Cookies.remove("token");
    }
    setLoading(false); // ✅ finished checking
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token, { secure: true, sameSite: "Strict" });
    const decoded: any = jwtDecode(token);
    setUser({ id: decoded.id, email: decoded.email });
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
