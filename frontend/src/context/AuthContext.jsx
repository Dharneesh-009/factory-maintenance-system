import { createContext, useContext, useState } from "react";
import authService from "../services/authService";
import {
  saveAuthData,
  getToken,
  getRole,
  clearAuthData,
} from "../utils/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getRole());

  const login = async (email, password) => {
    const data = await authService.login(email, password);

    saveAuthData(data.token, data.role);

    setToken(data.token);
    setRole(data.role);

    return data;
  };

  const logout = () => {
    clearAuthData();

    setToken(null);
    setRole(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};