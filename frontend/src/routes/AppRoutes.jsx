// import { Routes, Route } from "react-router-dom";
// import {
//   Login,
//   Register,
//   ForgotPassword,
//   Home,
//   Explore,
//   Search,
//   Notifications,
//   Messages,
//   Profile,
//   Settings,
//   NotFound,
// } from "../pages";
// import ProtectedRoute from "./ProtectedRoute";
// import LayoutMain from "../components/layout/LayoutMain";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       <Route element={<ProtectedRoute />}>
//         <Route element={<LayoutMain />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/profile/:username" element={<Profile />} />
//           <Route path="/settings" element={<Settings />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;



































import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicOnlyRoute from "./PublicOnlyRoute.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { FullScreenLoader } from "./RouteFallback.jsx";
import LayoutMain from "../components/layout/LayoutMain.jsx";

// Each page is its own chunk, downloaded only when first visited.
// (Importing them through the "../pages" barrel pulled every page into
// the first download.)
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Explore = lazy(() => import("../pages/Explore.jsx"));
const Search = lazy(() => import("../pages/Search.jsx"));
const Notifications = lazy(() => import("../pages/Notifications.jsx"));
const Messages = lazy(() => import("../pages/Messages.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Settings = lazy(() => import("../pages/Settings.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// React Router keeps the old scroll position between pages
// (e.g. open a profile from halfway down the feed). Reset it.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <ScrollToTop />

      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          {/* Logged-in users are sent away from these */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutMain />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;