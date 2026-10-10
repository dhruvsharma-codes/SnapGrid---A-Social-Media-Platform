// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = () => {
//   const { isAuthenticated, loading } = useAuth();
//   console.log("ProtectedRoute:", {
//     isAuthenticated,
//     loading,
//   });

//   // Authentication check hone tk wait
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-(--background) text-(--text-primary)">
//         Loading...
//       </div>
//     );
//   }

//   // User Logged in nahi hai
//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} replace />;
//   }

//   // User Autheticated hai
//   return <Outlet />;
// };

// export default ProtectedRoute;





















import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FullScreenLoader } from "./RouteFallback.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // (removed a console.log that printed the auth state on every render)

  // wait until the auth check has finished
  if (loading) {
    return <FullScreenLoader />;
  }

  // not logged in: remember where they were going, so Login can send them
  // back there afterwards (Login already reads location.state.from)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;