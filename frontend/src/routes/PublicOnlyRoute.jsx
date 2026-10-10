import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FullScreenLoader } from "./RouteFallback.jsx";

// Login / Register: a logged-in user has no reason to see these.
const PublicOnlyRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated) {
    // Honour the page they originally wanted. Without this, the redirect
    // that fires the moment login succeeds would always dump them on "/".
    const destination = location.state?.from?.pathname || "/";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;