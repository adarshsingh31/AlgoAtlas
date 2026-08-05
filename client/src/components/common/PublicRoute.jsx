/**
 * PublicRoute.jsx — Wrapper for public routes (e.g., Login, Signup, Landing).
 *
 * If the user is authenticated, it redirects them to the questions dashboard.
 * Otherwise, it renders the provided child components.
 */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const redirectTarget = (location.state?.from && location.state?.from !== '/') 
    ? location.state.from 
    : '/questions';

  if (isAuthenticated) {
    return <Navigate to={redirectTarget} replace />;
  }

  return children;
}
