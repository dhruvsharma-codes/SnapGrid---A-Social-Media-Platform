import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { searchUsers } from "../../services/userService.js";

import {
  getUnreadNotificationCount,
} from "../../services/notificationService.js";

import {
  Bell,
  MessageCircle,
  Search,
} from "lucide-react";


const getInitials = (fullName) => {
  if (!fullName) return "";

  const names =
    fullName.trim().split(/\s+/);

  if (names.length === 1) {
    return names[0]
      .charAt(0)
      .toUpperCase();
  }

  return (
    names[0].charAt(0) +
    names[names.length - 1].charAt(0)
  ).toUpperCase();
};


const Navbar = () => {
  const { user } = useAuth();
  const socket = useSocket();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [searchUsersList, setSearchUsersList] =
    useState([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [notificationCount, setNotificationCount] =
    useState(0);


  // ==========================================
  // SEARCH
  // ==========================================

  useEffect(() => {
    const value = search.trim();

    if (!value) {
      setSearchUsersList([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const response =
          await searchUsers(value);

        setSearchUsersList(
          response.data.users || []
        );
      } catch (error) {
        console.error(
          "Navbar Search Error:",
          error
        );

        setSearchUsersList([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);


  const handleSearchUser = (username) => {
    setSearch("");
    setSearchUsersList([]);

    navigate(`/profile/${username}`);
  };


  // ==========================================
  // NOTIFICATION COUNT
  // ==========================================

  const fetchNotificationCount =
    async () => {
      try {
        const response =
          await getUnreadNotificationCount();

        setNotificationCount(
          response.data.count || 0
        );
      } catch (error) {
        console.error(
          "Notification Count Error:",
          error
        );
      }
    };


  // useEffect(() => {
  //   fetchNotificationCount();

  //   const interval = setInterval(
  //     fetchNotificationCount,
  //     5000
  //   );

  //   const handleNotificationChange =
  //     () => {
  //       fetchNotificationCount();
  //     };

  //   window.addEventListener(
  //     "notifications:changed",
  //     handleNotificationChange
  //   );

  //   return () => {
  //     clearInterval(interval);

  //     window.removeEventListener(
  //       "notifications:changed",
  //       handleNotificationChange
  //     );
  //   };
  // }, []);

useEffect(() => {
  // Initial count
  fetchNotificationCount();

  if (!socket) {
    return;
  }

  const handleNewNotification = (
    notification
  ) => {
    console.log(
      "🔔 New notification:",
      notification
    );

    // DB ko source of truth rakho
    fetchNotificationCount();
  };

  const handleNotificationChange = () => {
    console.log(
      "🔄 Notifications changed"
    );

    fetchNotificationCount();
  };

  socket.on(
    "new_notification",
    handleNewNotification
  );

  socket.on(
    "notifications:changed",
    handleNotificationChange
  );

  return () => {
    socket.off(
      "new_notification",
      handleNewNotification
    );

    socket.off(
      "notifications:changed",
      handleNotificationChange
    );
  };
}, [socket]);
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-(--border) bg-(--background-secondary)/95 backdrop-blur-md">

      <div className="flex h-full items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary)">
            <span className="text-lg font-bold text-white">
              S
            </span>
          </div>

          <span className="text-xl font-bold text-white">
            SnapGrid
          </span>
        </Link>


        {/* Mobile Search */}
        <div className="relative flex w-48 sm:w-64 md:hidden">

          <div className="flex w-full items-center gap-2 rounded-xl border border-(--border) bg-(--input) px-3 py-2">

            <Search
              size={17}
              className="shrink-0 text-(--text-muted)"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
            />

          </div>


          {search.trim() && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">

              {searchUsersList.length > 0 ? (
                searchUsersList.map((searchUser) => (

                  <button
                    key={searchUser.id}
                    type="button"
                    onClick={() =>
                      handleSearchUser(
                        searchUser.username
                      )
                    }
                    className="flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover)"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">

                      {searchUser.profileImage ? (
                        <img
                          src={`http://localhost:5000${searchUser.profileImage}`}
                          alt={searchUser.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-white">
                          {searchUser.fullName
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      )}

                    </div>


                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-white">
                        {searchUser.fullName}
                      </p>

                      <p className="truncate text-xs text-(--text-secondary)">
                        @{searchUser.username}
                      </p>

                    </div>

                  </button>

                ))
              ) : (
                !searchLoading && (
                  <p className="px-4 py-4 text-center text-xs text-(--text-secondary)">
                    No users found
                  </p>
                )
              )}

            </div>
          )}

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative rounded-full p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
          >

            <Bell size={21} />

            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notificationCount > 99
                  ? "99+"
                  : notificationCount}
              </span>
            )}

          </Link>


          {/* Messages */}
          <Link
            to="/messages"
            className="rounded-xl p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
          >
            <MessageCircle size={21} />
          </Link>


          {/* Profile */}
          {user && (
            <Link
              to={`/profile/${user.username}`}
              className="ml-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary)">
                <span className="text-sm font-semibold text-white">
                  {getInitials(
                    user.fullName
                  )}
                </span>
              </div>
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
};


export default Navbar;