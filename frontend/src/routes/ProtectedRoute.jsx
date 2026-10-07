import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log("ProtectedRoute:", {
    isAuthenticated,
    loading,
  });

  // Authentication check hone tk wait
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--background) text-(--text-primary)">
        Loading...
      </div>
    );
  }

  // User Logged in nahi hai
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  // User Autheticated hai
  return <Outlet />;
};

export default ProtectedRoute;
