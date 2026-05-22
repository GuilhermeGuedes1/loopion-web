import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
