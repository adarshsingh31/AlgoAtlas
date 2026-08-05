/**
 * AuthContext.jsx — Global authentication state for AlgoAtlas.
 *
 * Provides: { user, token, loading, login, register, googleLogin, logout }
 *
 * On mount: reads token from localStorage, calls /api/auth/me to verify it
 * and restore the full user object. This ensures the session persists on refresh.
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(() => authService.getStoredUser());
  const [token, setToken]     = useState(() => authService.getStoredToken());
  const [loading, setLoading] = useState(false);

  // ── Restore session on page load ─────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = authService.getStoredToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Verify the stored token by fetching the current user profile
        const data = await authService.getMe();
        if (data.success) {
          setUser(data.user);
          setToken(storedToken);
          authService.saveAuthData({ token: storedToken, user: data.user });
        } else {
          // Token is invalid / expired — clear it
          authService.clearAuthData();
          setToken(null);
          setUser(null);
        }
      } catch {
        // Network error or 401 — clear auth data
        authService.clearAuthData();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ── Auth actions ──────────────────────────────────────────────────────────

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  }, []);

  const register = useCallback(async (credentials) => {
    const data = await authService.register(credentials);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  }, []);

  const googleLogin = useCallback(async (credential) => {
    const data = await authService.googleLogin(credential);
    if (data.success) {
      setUser(data.user);
      setToken(data.token);
    }
    return data;
  }, []);

  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => {
      const nextUser = { ...prev, ...updatedFields };
      localStorage.setItem("aa_user", JSON.stringify(nextUser));
      return nextUser;
    });
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    googleLogin,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>");
  return ctx;
};

export default AuthContext;
