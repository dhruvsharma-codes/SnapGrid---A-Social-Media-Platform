import { createContext, useContext, useEffect, useState } from "react";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../services/authService.js";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user when app starts
  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      // No token meaning user is not logged in
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await currentUser();
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.error("Auth check error", error);

        // Token Invalid/ Expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login
  const login = async ({ email, password }) => {
    const response = await loginUser({
      email,
      password,
    });

    const { token, user } = response.data;

    // Remove old auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return response;
  };

  // Register
  const register = async (userData) => {
    const response = await registerUser(userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return response;
  };

  // Logout
  const Logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // value
  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    Logout,
    isAuthenticated: !!user,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

// Custome Hook
export const useAuth = () => {
  return useContext(authContext);
};
