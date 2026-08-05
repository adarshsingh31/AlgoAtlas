/**
 * ProtectedRoute.jsx — Guards private routes.
 *
 * If the auth check is still loading → shows a centered spinner.
 * If the user is NOT authenticated → redirects to /login.
 * If the user IS authenticated → renders the wrapped component.
 */

import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
