/**
 * useAuth.js — Convenience hook for consuming the AuthContext.
 *
 * Usage:
 *   const { user, login, logout, loading, isAuthenticated } = useAuth();
 */

import { useAuthContext } from "../context/AuthContext.jsx";

const useAuth = () => useAuthContext();

export default useAuth;
