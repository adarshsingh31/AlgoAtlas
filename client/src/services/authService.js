/**
 * authService.js — Pure async functions for all auth API calls.
 *
 * All functions use the shared Axios instance (with auth interceptors).
 * Token storage/retrieval is handled here so the context stays clean.
 */

import api from "../utils/api.js";

// ─── Token helpers ─────────────────────────────────────────────────────────────

export const saveAuthData = ({ token, user }) => {
  localStorage.setItem("aa_token", token);
  localStorage.setItem("aa_user", JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem("aa_token");
  localStorage.removeItem("aa_user");
};

export const getStoredToken = () => localStorage.getItem("aa_token");

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("aa_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// ─── API calls ─────────────────────────────────────────────────────────────────

/**
 * Register a new user with email + password.
 * Returns { token, user } on success.
 */
export const register = async ({ name, email, password }) => {
  const { data } = await api.post("/api/auth/signup", { name, email, password });
  if (data.success) saveAuthData(data);
  return data;
};

/**
 * Login with email + password.
 * Returns { token, user } on success.
 */
export const login = async ({ email, password }) => {
  const { data } = await api.post("/api/auth/login", { email, password });
  if (data.success) saveAuthData(data);
  return data;
};

/**
 * Authenticate with a Google ID token (credential).
 * The credential comes from @react-oauth/google's <GoogleLogin> component.
 * Returns { token, user } on success.
 */
export const googleLogin = async (credential) => {
  const { data } = await api.post("/api/auth/google", { credential });
  if (data.success) saveAuthData(data);
  return data;
};

/**
 * Fetch current user profile using the stored JWT.
 * Called on page load to restore session.
 */
export const getMe = async () => {
  const { data } = await api.get("/api/auth/me");
  return data;
};

/**
 * Set password for Google-only user.
 * Body: { password, confirmPassword }
 */
export const setPassword = async ({ password, confirmPassword }) => {
  const { data } = await api.post("/api/auth/set-password", { password, confirmPassword });
  return data;
};

/**
 * Change password for existing user.
 * Body: { currentPassword, newPassword, confirmPassword }
 */
export const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
  const { data } = await api.put("/api/auth/change-password", { currentPassword, newPassword, confirmPassword });
  return data;
};

/**
 * Logout — client-side only (clears localStorage).
 */
export const logout = () => {
  clearAuthData();
};

