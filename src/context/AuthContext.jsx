import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

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
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Helper function to create a mock JWT token
  const createMockJWT = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa("mock-signature");
    return `${header}.${encodedPayload}.${signature}`;
  };

  useEffect(() => {
    if (token) {
      try {
        // Check if it's a valid JWT format (has 3 parts)
        if (token.split(".").length === 3) {
          const decoded = jwtDecode(token);
          setUser(decoded);
        } else {
          // If it's an old format token, clear it
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // For demo purposes, create a mock token
      if (email && password) {
        const payload = {
          id: Date.now(),
          email,
          role: email.includes("admin") ? "admin" : "candidate",
          exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours in seconds
        };
        const mockToken = createMockJWT(payload);

        localStorage.setItem("token", mockToken);
        setToken(mockToken);
        const decoded = jwtDecode(mockToken);
        setUser(decoded);
        toast.success("Login successful!");
        return { success: true };
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call - replace with actual API endpoint
      const payload = {
        id: Date.now(),
        email: userData.email,
        role: userData.role || "candidate",
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours in seconds
      };
      const mockToken = createMockJWT(payload);

      localStorage.setItem("token", mockToken);
      setToken(mockToken);
      const decoded = jwtDecode(mockToken);
      setUser(decoded);
      toast.success("Signup successful!");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Signup failed");
      return { success: false, error: error.message };
    }
  };

  const socialLogin = async (provider) => {
    try {
      // Simulate social login - replace with actual OAuth implementation
      toast.success(`Logging in with ${provider}...`);
      const payload = {
        id: Date.now(),
        email: `user@${provider}.com`,
        role: "candidate",
        exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours in seconds
      };
      const mockToken = createMockJWT(payload);

      localStorage.setItem("token", mockToken);
      setToken(mockToken);
      const decoded = jwtDecode(mockToken);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      toast.error("Social login failed");
      return { success: false, error: error.message };
    }
  };

  const otpLogin = async (phone, otp) => {
    try {
      // Simulate OTP verification - replace with actual OTP service
      if (otp === "123456") {
        const payload = {
          id: Date.now(),
          phone,
          role: "candidate",
          exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours in seconds
        };
        const mockToken = createMockJWT(payload);

        localStorage.setItem("token", mockToken);
        setToken(mockToken);
        const decoded = jwtDecode(mockToken);
        setUser(decoded);
        toast.success("OTP verified successfully!");
        return { success: true };
      }
      throw new Error("Invalid OTP");
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    token,
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
