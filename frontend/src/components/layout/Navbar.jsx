// import { useAuth } from "../../context/AuthContext";
// import { useSocket } from "../../context/SocketContext";
// // import { Sun, Moon } from "lucide-react";
// // import { useTheme } from "../../context/ThemeContext.jsx";

// import {
//   Link,
//   useNavigate,
// } from "react-router-dom";

// import {
//   useEffect,
//   useState,
// } from "react";

// import { searchUsers } from "../../services/userService.js";

// import {
//   getUnreadNotificationCount,
// } from "../../services/notificationService.js";

// import {
//   Bell,
//   MessageCircle,
//   Search,
// } from "lucide-react";


// const getInitials = (fullName) => {
//   if (!fullName) return "";

//   const names =
//     fullName.trim().split(/\s+/);

//   if (names.length === 1) {
//     return names[0]
//       .charAt(0)
//       .toUpperCase();
//   }

//   return (
//     names[0].charAt(0) +
//     names[names.length - 1].charAt(0)
//   ).toUpperCase();
// };


// const Navbar = () => {
//   const { user } = useAuth();
//   const socket = useSocket();
// //   const { theme, toggleTheme } = useTheme();
// // const isDark = theme === "dark";

//   const navigate = useNavigate();

//   const [search, setSearch] =
//     useState("");

//   const [searchUsersList, setSearchUsersList] =
//     useState([]);

//   const [searchLoading, setSearchLoading] =
//     useState(false);

//   const [notificationCount, setNotificationCount] =
//     useState(0);


//   // ==========================================
//   // SEARCH
//   // ==========================================

//   useEffect(() => {
//     const value = search.trim();

//     if (!value) {
//       setSearchUsersList([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setSearchLoading(true);

//         const response =
//           await searchUsers(value);

//         setSearchUsersList(
//           response.data.users || []
//         );
//       } catch (error) {
//         console.error(
//           "Navbar Search Error:",
//           error
//         );

//         setSearchUsersList([]);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search]);


//   const handleSearchUser = (username) => {
//     setSearch("");
//     setSearchUsersList([]);

//     navigate(`/profile/${username}`);
//   };


//   // ==========================================
//   // NOTIFICATION COUNT
//   // ==========================================

//   const fetchNotificationCount =
//     async () => {
//       try {
//         const response =
//           await getUnreadNotificationCount();

//         setNotificationCount(
//           response.data.count || 0
//         );
//       } catch (error) {
//         console.error(
//           "Notification Count Error:",
//           error
//         );
//       }
//     };


//   // useEffect(() => {
//   //   fetchNotificationCount();

//   //   const interval = setInterval(
//   //     fetchNotificationCount,
//   //     5000
//   //   );

//   //   const handleNotificationChange =
//   //     () => {
//   //       fetchNotificationCount();
//   //     };

//   //   window.addEventListener(
//   //     "notifications:changed",
//   //     handleNotificationChange
//   //   );

//   //   return () => {
//   //     clearInterval(interval);

//   //     window.removeEventListener(
//   //       "notifications:changed",
//   //       handleNotificationChange
//   //     );
//   //   };
//   // }, []);

// useEffect(() => {
//   // Initial count
//   fetchNotificationCount();

//   if (!socket) {
//     return;
//   }

//   const handleNewNotification = (
//     notification
//   ) => {
//     console.log(
//       "🔔 New notification:",
//       notification
//     );

//     // DB ko source of truth rakho
//     fetchNotificationCount();
//   };

//   const handleNotificationChange = () => {
//     console.log(
//       "🔄 Notifications changed"
//     );

//     fetchNotificationCount();
//   };

//   socket.on(
//     "new_notification",
//     handleNewNotification
//   );

//   socket.on(
//     "notifications:changed",
//     handleNotificationChange
//   );

//   return () => {
//     socket.off(
//       "new_notification",
//       handleNewNotification
//     );

//     socket.off(
//       "notifications:changed",
//       handleNotificationChange
//     );
//   };
// }, [socket]);
//   return (
//     <nav className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-(--border) bg-(--background-secondary)/95 backdrop-blur-md">

//       {/* <div className="flex h-full items-center justify-between px-6"> */}
//       <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-4 md:px-6">

//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2"
//         >
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary)">
//             <span className="text-lg font-bold text-white">
//               S
//             </span>
//           </div>
// {/* 
//           <span className="text-xl font-bold text-white">
//             SnapGrid
//           </span> */}
//           <span className="hidden text-xl font-bold text-white sm:block">
//   SnapGrid
// </span>
//         </Link>


//         {/* Mobile Search */}
//         {/* <div className="relative flex w-48 sm:w-64 md:hidden"> */}
//         <div className="relative hidden w-64 md:flex">

//           <div className="flex w-full items-center gap-2 rounded-xl border border-(--border) bg-(--input) px-3 py-2">

//             <Search
//               size={17}
//               className="shrink-0 text-(--text-muted)"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search"
//               className="w-full bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
//             />

//           </div>


//           {search.trim() && (
//             <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">

//               {searchUsersList.length > 0 ? (
//                 searchUsersList.map((searchUser) => (

//                   <button
//                     key={searchUser.id}
//                     type="button"
//                     onClick={() =>
//                       handleSearchUser(
//                         searchUser.username
//                       )
//                     }
//                     className="flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover)"
//                   >

//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">

//                       {searchUser.profileImage ? (
//                         // <img
//                         //   src={`http://localhost:5000${searchUser.profileImage}`}
//                         //   alt={searchUser.username}
//                         //   className="h-full w-full object-cover"
//                         // />
//                         <img
//   src={`${import.meta.env.VITE_API_URL}${searchUser.profileImage}`}
//   alt={searchUser.username}
//   className="h-full w-full object-cover"
// />
//                       ) : (
//                         <span className="text-sm font-semibold text-white">
//                           {searchUser.fullName
//                             ?.charAt(0)
//                             .toUpperCase()}
//                         </span>
//                       )}

//                     </div>


//                     <div className="min-w-0">

//                       <p className="truncate text-sm font-semibold text-white">
//                         {searchUser.fullName}
//                       </p>

//                       <p className="truncate text-xs text-(--text-secondary)">
//                         @{searchUser.username}
//                       </p>

//                     </div>

//                   </button>

//                 ))
//               ) : (
//                 !searchLoading && (
//                   <p className="px-4 py-4 text-center text-xs text-(--text-secondary)">
//                     No users found
//                   </p>
//                 )
//               )}

//             </div>
//           )}

//         </div>


//         {/* Right Side */}
//         <div className="flex items-center gap-2">

//           {/* Notifications */}
//           <Link
//             to="/notifications"
//             className="relative rounded-full p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//           >

//             <Bell size={21} />

//             {notificationCount > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
//                 {notificationCount > 99
//                   ? "99+"
//                   : notificationCount}
//               </span>
//             )}

//           </Link>

          
// {/* <button
//   type="button"
//   onClick={toggleTheme}
//   aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//   title={`Switch to ${isDark ? "light" : "dark"} mode`}
//   className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--card) text-(--text-primary) transition hover:bg-(--card-hover) active:scale-95"
// >
//   {isDark ? <Sun size={20} /> : <Moon size={20} />}
// </button> */}



//           {/* Messages */}
//           {/* <Link
//             to="/messages"
//             className="rounded-xl p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//           >
//             <MessageCircle size={21} />
//           </Link> */}
//           <Link
//   to="/messages"
//   className="
//     hidden
//     rounded-xl
//     p-2.5
//     text-(--text-secondary)
//     transition
//     hover:bg-(--card-hover)
//     hover:text-white

//     sm:flex
//   "
// >
//   <MessageCircle size={21} />
// </Link>


//           {/* Profile */}
//           {user && (
//             // <Link
//             //   to={`/profile/${user.username}`}
//             //   className="ml-2"
//             // >
//              <Link
//     to={`/profile/${user.username}`}
//     className="ml-2 hidden sm:block"
//   >
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary)">
//                 <span className="text-sm font-semibold text-white">
//                   {getInitials(
//                     user.fullName
//                   )}
//                 </span>
//               </div>
//             </Link>
//           )}

//         </div>

//       </div>
//     </nav>
//   );
// };


// export default Navbar;














































import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Search } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { useSocket } from "../../context/SocketContext.jsx";
import { searchUsers } from "../../services/userService.js";
import { getUnreadNotificationCount } from "../../services/notificationService.js";

const API_URL = import.meta.env.VITE_API_URL;
const DEBOUNCE_MS = 300;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const getInitials = (fullName) => {
  if (!fullName) return "?";

  const names = fullName.trim().split(/\s+/);
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return (
    names[0].charAt(0) + names[names.length - 1].charAt(0)
  ).toUpperCase();
};

const Navbar = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ query: "", users: [] });
  const [searching, setSearching] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const searchBoxRef = useRef(null);
  const cacheRef = useRef(new Map());
  const mountedRef = useRef(true);

  const trimmed = search.trim();

  // =========================================================
  // SEARCH (debounced, race-safe, cached)
  // =========================================================

  useEffect(() => {
    if (!trimmed) {
      setSearching(false);
      setResults({ query: "", users: [] });
      return;
    }

    const key = trimmed.toLowerCase();
    const cached = cacheRef.current.get(key);

    if (cached) {
      setResults({ query: trimmed, users: cached });
      setSearching(false);
      return;
    }

    let cancelled = false;
    setSearching(true);

    const timer = setTimeout(async () => {
      try {
        const response = await searchUsers(trimmed);
        const users = response?.data?.users || [];

        if (cancelled) return;

        cacheRef.current.set(key, users);
        setResults({ query: trimmed, users });
      } catch (error) {
        if (cancelled) return;
        console.error("Navbar Search Error:", error);
        setResults({ query: trimmed, users: [] });
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed]);

  // the dropdown used to stay open until you picked something;
  // now it closes on outside click and Escape
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleMouseDown = (event) => {
      if (!searchBoxRef.current?.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleSearchUser = (username) => {
    setSearch("");
    setDropdownOpen(false);
    navigate(`/profile/${username}`);
  };

  // =========================================================
  // NOTIFICATION BADGE
  // =========================================================

  const fetchNotificationCount = useCallback(async () => {
    try {
      const response = await getUnreadNotificationCount();
      if (mountedRef.current) {
        setNotificationCount(response?.data?.count || 0);
      }
    } catch (error) {
      console.error("Notification Count Error:", error);
    }
  }, []);

  // Initial count + the window event the Notifications page dispatches after
  // marking items read. This listener had been removed, so the badge never
  // went down after reading.
  useEffect(() => {
    mountedRef.current = true;
    fetchNotificationCount();

    window.addEventListener("notifications:changed", fetchNotificationCount);

    return () => {
      mountedRef.current = false;
      window.removeEventListener(
        "notifications:changed",
        fetchNotificationCount
      );
    };
  }, [fetchNotificationCount]);

  useEffect(() => {
    if (!socket) return;

    // bump instantly instead of waiting for a network round trip
    const handleNewNotification = () => setNotificationCount((c) => c + 1);

    // authoritative refresh (also covers events missed while disconnected)
    const handleResync = () => fetchNotificationCount();

    socket.on("new_notification", handleNewNotification);
    socket.on("notifications:changed", handleResync);
    socket.on("connect", handleResync);

    return () => {
      socket.off("new_notification", handleNewNotification);
      socket.off("notifications:changed", handleResync);
      socket.off("connect", handleResync);
    };
  }, [socket, fetchNotificationCount]);

  useEffect(() => {
    setAvatarFailed(false);
  }, [user?.profileImage]);

  const isCurrent = results.query === trimmed;
  const showDropdown = dropdownOpen && !!trimmed;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-(--border) bg-(--background-secondary)/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary)">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          <span className="hidden text-xl font-bold text-white sm:block">
            SnapGrid
          </span>
        </Link>

        {/* Search (tablet+) */}
        <div ref={searchBoxRef} className="relative hidden w-64 md:flex">
          <div className="flex w-full items-center gap-2 rounded-xl border border-(--border) bg-(--input) px-3 py-2 focus-within:border-(--primary)">
            <Search size={17} className="shrink-0 text-(--text-muted)" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              placeholder="Search"
              aria-label="Search users"
              autoComplete="off"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
            />
          </div>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">
              {results.users.length > 0 ? (
                <div
                  className={
                    isCurrent && !searching ? "opacity-100" : "opacity-60"
                  }
                >
                  {results.users.map((searchUser) => (
                    <button
                      key={searchUser.id}
                      type="button"
                      onClick={() => handleSearchUser(searchUser.username)}
                      className="flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover)"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
                        {searchUser.profileImage ? (
                          <img
                            src={assetUrl(searchUser.profileImage)}
                            alt={searchUser.username}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-white">
                            {(searchUser.fullName || searchUser.username || "?")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {searchUser.fullName || searchUser.username}
                        </p>
                        <p className="truncate text-xs text-(--text-secondary)">
                          @{searchUser.username}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : isCurrent && !searching ? (
                // only after THIS query finished (no flicker while typing)
                <p className="px-4 py-4 text-center text-xs text-(--text-secondary)">
                  No users found
                </p>
              ) : (
                <p className="px-4 py-4 text-center text-xs text-(--text-muted)">
                  Searching...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative rounded-full p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
          >
            <Bell size={21} />

            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Link>

          <Link
            to="/messages"
            aria-label="Messages"
            className="hidden rounded-xl p-2.5 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white sm:flex"
          >
            <MessageCircle size={21} />
          </Link>

          {user && (
            <Link
              to={`/profile/${user.username}`}
              aria-label="Profile"
              className="ml-2 hidden sm:block"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
                {/* previously always initials, ignoring the profile photo */}
                {user.profileImage && !avatarFailed ? (
                  <img
                    src={assetUrl(user.profileImage)}
                    alt={user.username}
                    onError={() => setAvatarFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {getInitials(user.fullName || user.username)}
                  </span>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;