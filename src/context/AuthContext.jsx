import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import * as api from "../api/client";

// AuthContext manages authentication state and actions for the app

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Only use access_token for security; fallback to token if needed
  const token = localStorage.getItem("access_token") || localStorage.getItem("token");

  useEffect(() => {
    // Validate token and decode user info
    if (token) {
      try {
        if (token.split(".").length === 3) {
          const decoded = jwtDecode(token);
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            // Token expired, clear all
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("token");
            setUser(null);
          } else {
            setUser({
              id: decoded.user_id,
              email: decoded.email,
              role: decoded.role,
            });
          }
        } else {
          // Invalid token format
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (e) {
        // Decoding failed
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  // Login with email/password
  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      const access = data.access_token;
      const refresh = data.refresh_token;
      localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("token", access);
      const decoded = jwtDecode(access);
      setUser({
        id: decoded.user_id,
        email: decoded.email,
        role: decoded.role,
      });
      toast.success("Login successful!");
      return { success: true, user: { role: decoded.role } };
    } catch (err) {
      // Improved error handling
      const isNetwork = err.code === "ERR_NETWORK" || err.message?.includes("Network");
      const is503 = err.response?.status === 503;
      const msg = isNetwork
        ? "Cannot reach API. Is the backend running at " + (import.meta.env.VITE_API_URL || "http://localhost:8000") + "?"
        : is503
          ? (err.response?.data?.detail || "Backend database is unavailable. Check MongoDB connection.")
          : err.response?.data?.detail || err.message || "Login failed";
      toast.error(Array.isArray(msg) ? msg[0]?.msg || msg : msg);
      return { success: false, error: msg };
    }
  };

  // Signup/register new user
  const signup = async (userData) => {
    try {
      const nameParts = (userData.name || "").trim().split(" ");
      const first_name = nameParts[0] || userData.email?.split("@")[0] || "User";
      const last_name = nameParts.slice(1).join(" ") || ".";
      const role =
        userData.role === "recruiter" ? "recruiter" : "job_seeker";
      const data = await api.register({
        email: userData.email,
        password: userData.password,
        first_name,
        last_name,
        role,
      });
      const access = data.access_token;
      const refresh = data.refresh_token;
      localStorage.setItem("access_token", access);
      if (refresh) localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("token", access);
      const decoded = jwtDecode(access);
      setUser({
        id: decoded.user_id,
        email: decoded.email,
        role: decoded.role,
      });
      toast.success("Signup successful!");
      return { success: true, user: { role: decoded.role } };
    } catch (err) {
      // Improved error handling
      const isNetwork = err.code === "ERR_NETWORK" || err.message?.includes("Network");
      const is503 = err.response?.status === 503;
      const msg = isNetwork
        ? "Cannot reach API. Is the backend running?"
        : is503
          ? (err.response?.data?.detail || "Backend database is unavailable. Check MongoDB connection.")
          : err.response?.data?.detail || err.message || "Signup failed";
      toast.error(Array.isArray(msg) ? msg[0]?.msg || msg : msg);
      return { success: false, error: msg };
    }
  };

  // Social login placeholder
  const socialLogin = async (provider) => {
    toast.success(`Logging in with ${provider} is not connected to the API yet.`);
    return { success: false, error: "Use email/password to sign in." };
  };

  // OTP login placeholder
  const otpLogin = async (phone, otp) => {
    toast.error("OTP login is not connected to the API. Use email/password.");
    return { success: false, error: "Use email/password to sign in." };
  };

  // Logout user and clear tokens
  const logout = () => {
    api.clearTokens();
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Context value for consumers
  const value = {
    user,
    token: localStorage.getItem("access_token") || localStorage.getItem("token"),
    login,
    signup,
    socialLogin,
    otpLogin,
    logout,
    loading,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
