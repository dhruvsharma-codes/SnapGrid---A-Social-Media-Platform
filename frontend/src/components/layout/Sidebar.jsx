import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Bell,
  Compass,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  Settings,
  User,
} from "lucide-react";

const Sidebar = ({ onCreatePost }) => {
  // Generate initials from full name
  const getInitials = (fullName) => {
    if (!fullName) return "";

    const names = fullName.trim().split(/\s+/);

    // Single name
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    // First name + last name
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };
  const { user, Logout } = useAuth();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Reels",
      path: "/explore",
      icon: Compass,
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: MessageCircle,
    },
  ];
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-(--border) bg-(--background-secondary)">
      <div className="h-full flex flex-col p-4">
        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-(--primary) text-white"
                      : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
                  }`
                }
              >
                <Icon size={21} />

                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Create Post */}
        <button
          type="button"
          onClick={onCreatePost}
          className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-(--primary) hover:bg-(--primary-hover) text-white font-semibold transition"
        >
          <PlusSquare size={20} />
          Create Post
        </button>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          {/* Profile */}
          {user && (
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-(--card-hover) transition"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-(--primary) flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {getInitials(user.fullName)}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.fullName}
                </p>

                <p className="text-xs text-(--text-muted) truncate">
                  @{user.username}
                </p>
              </div>

              <User size={18} className="ml-auto text-(--text-muted)" />
            </Link>
          )}

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-(--primary) text-white"
                  : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
              }`
            }
          >
            <Settings size={21} />

            <span className="font-medium">Settings</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={Logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-(--text-secondary) hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={21} />

            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
