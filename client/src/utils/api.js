/**
 * api.js — Shared Axios instance for all AlgoAtlas API calls.
 *
 * Request interceptor: automatically injects the stored JWT into every
 * outgoing request as:  Authorization: Bearer <token>
 *
 * Response interceptor: if the server returns 401 (token expired / invalid),
 * clears localStorage and redirects the user to /login.
 *
 * Token key: 'aa_token'  (AlgoAtlas-specific, avoids collision with other projects)
 */

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5001"),
});

// ─── Request Interceptor ───────────────────────────────────────────────────────
// Runs before every request. Reads the JWT from localStorage and attaches it.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("aa_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────────────────────────
// On 401, clears auth data and redirects to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("aa_token");
      localStorage.removeItem("aa_user");
      const publicPaths = ["/login", "/signup", "/"];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
