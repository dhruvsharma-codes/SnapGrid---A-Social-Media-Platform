import { Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  Home,
  Explore,
  Search,
  Notifications,
  Messages,
  Profile,
  Settings,
  NotFound,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import LayoutMain from "../components/layout/LayoutMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
  );
};

export default AppRoutes;
