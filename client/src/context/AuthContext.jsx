import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tfv_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user || res.data))
      .catch(() => localStorage.removeItem("tfv_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("tfv_token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, username, email, password) => {
    const res = await api.post("/auth/register", { name, username, email, password });
    localStorage.setItem("tfv_token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // 🚀 Added for Google OAuth Callback Handling
  const setUserFromToken = async (token) => {
    localStorage.setItem("tfv_token", token);
    try {
      const res = await api.get("/auth/me");
      const userData = res.data.user || res.data;
      setUser(userData);
      return userData;
    } catch (error) {
      localStorage.removeItem("tfv_token");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("tfv_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUserFromToken, // Exposing function to consumer components
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);