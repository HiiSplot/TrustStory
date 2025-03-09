import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  isUserConnected: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUserConnected, setIsUserConnected] = useState(!!localStorage.getItem("authToken"));

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsUserConnected(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsUserConnected(false);
  };

  return (
    <AuthContext.Provider value={{ isUserConnected, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
