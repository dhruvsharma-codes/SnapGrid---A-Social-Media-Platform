// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   Bell,
//   Compass,
//   Home,
//   LogOut,
//   MessageCircle,
//   PlusSquare,
//   Search,
//   Settings,
//   User,
// } from "lucide-react";

// const Sidebar = ({ onCreatePost }) => {
//   // Generate initials from full name
//   const getInitials = (fullName) => {
//     if (!fullName) return "";

//     const names = fullName.trim().split(/\s+/);

//     // Single name
//     if (names.length === 1) {
//       return names[0].charAt(0).toUpperCase();
//     }

//     // First name + last name
//     return (
//       names[0].charAt(0) + names[names.length - 1].charAt(0)
//     ).toUpperCase();
//   };
//   const { user, Logout } = useAuth();

//   const navItems = [
//     {
//       name: "Home",
//       path: "/",
//       icon: Home,
//     },
//     {
//       name: "Reels",
//       path: "/explore",
//       icon: Compass,
//     },
//     {
//       name: "Search",
//       path: "/search",
//       icon: Search,
//     },
//     {
//       name: "Notifications",
//       path: "/notifications",
//       icon: Bell,
//     },
//     {
//       name: "Messages",
//       path: "/messages",
//       icon: MessageCircle,
//     },
//   ];
//   return (
//     <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-(--border) bg-(--background-secondary)">
//       <div className="h-full flex flex-col p-4">
//         {/* Navigation */}
//         <nav className="space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
//                     isActive
//                       ? "bg-(--primary) text-white"
//                       : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//                   }`
//                 }
//               >
//                 <Icon size={21} />

//                 <span className="font-medium">{item.name}</span>
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* Create Post */}
//         <button
//           type="button"
//           onClick={onCreatePost}
//           className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-(--primary) hover:bg-(--primary-hover) text-white font-semibold transition"
//         >
//           <PlusSquare size={20} />
//           Create Post
//         </button>

//         {/* Bottom Section */}
//         <div className="mt-auto space-y-2">
//           {/* Profile */}
//           {user && (
//             <Link
//               to={`/profile/${user.username}`}
//               className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-(--card-hover) transition"
//             >
//               <div className="w-9 h-9 rounded-full overflow-hidden bg-(--primary) flex items-center justify-center">
//                 <span className="text-sm font-semibold text-white">
//                   {getInitials(user.fullName)}
//                 </span>
//               </div>

//               <div className="min-w-0">
//                 <p className="text-sm font-semibold text-white truncate">
//                   {user.fullName}
//                 </p>

//                 <p className="text-xs text-(--text-muted) truncate">
//                   @{user.username}
//                 </p>
//               </div>

//               <User size={18} className="ml-auto text-(--text-muted)" />
//             </Link>
//           )}

//           {/* Settings */}
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
//                 isActive
//                   ? "bg-(--primary) text-white"
//                   : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//               }`
//             }
//           >
//             <Settings size={21} />

//             <span className="font-medium">Settings</span>
//           </NavLink>

//           {/* Logout */}
//           <button
//             onClick={Logout}
//             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-(--text-secondary) hover:bg-red-500/10 hover:text-red-400 transition"
//           >
//             <LogOut size={21} />

//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;









// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   Bell,
//   Compass,
//   Home,
//   LogOut,
//   MessageCircle,
//   PlusSquare,
//   Search,
//   Settings,
//   User,
// } from "lucide-react";

// const Sidebar = ({ onCreatePost }) => {
//   const { user, Logout } = useAuth();

//   // =========================================================
//   // GENERATE INITIALS
//   // =========================================================

//   const getInitials = (fullName) => {
//     if (!fullName) return "";

//     const names = fullName.trim().split(/\s+/);

//     if (names.length === 1) {
//       return names[0].charAt(0).toUpperCase();
//     }

//     return (
//       names[0].charAt(0) +
//       names[names.length - 1].charAt(0)
//     ).toUpperCase();
//   };

//   // =========================================================
//   // NAVIGATION ITEMS
//   // =========================================================

//   const navItems = [
//     {
//       name: "Home",
//       path: "/",
//       icon: Home,
//     },
//     {
//       name: "Reels",
//       path: "/explore",
//       icon: Compass,
//     },
//     {
//       name: "Search",
//       path: "/search",
//       icon: Search,
//     },
//     {
//       name: "Notifications",
//       path: "/notifications",
//       icon: Bell,
//     },
//     {
//       name: "Messages",
//       path: "/messages",
//       icon: MessageCircle,
//     },
//   ];

//   return (
//     <aside
//       className="
//         fixed z-40
//         border-(--border)
//         bg-(--background-secondary)

//         /* Mobile */
//         bottom-0 left-0 right-0
//         h-16
//         border-t

//         /* Tablet + Desktop */
//         sm:bottom-0
//         sm:left-0
//         sm:top-16
//         sm:right-auto
//         sm:h-auto
//         sm:w-20
//         sm:border-t-0
//         sm:border-r

//         /* Desktop */
//         lg:w-64
//       "
//     >
//       <div
//         className="
//           flex h-full flex-col

//           /* Mobile */
//           px-2 py-2

//           /* Tablet */
//           sm:px-2 sm:py-4

//           /* Desktop */
//           lg:p-4
//         "
//       >
//         {/* =====================================================
//             NAVIGATION
//         ====================================================== */}

//         <nav
//           className="
//             flex h-full items-center justify-around gap-1

//             sm:h-auto
//             sm:flex-col
//             sm:justify-start
//             sm:gap-2
//           "
//         >
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 title={item.name}
//                 className={({ isActive }) =>
//                   `
//                     flex items-center justify-center
//                     rounded-xl
//                     transition

//                     /* Mobile */
//                     h-11 w-11
//                     text-(--text-secondary)

//                     ${
//                       isActive
//                         ? "bg-(--primary) text-white"
//                         : "hover:bg-(--card-hover) hover:text-white"
//                     }

//                     /* Tablet */
//                     sm:h-11
//                     sm:w-11

//                     /* Desktop */
//                     lg:w-full
//                     lg:justify-start
//                     lg:gap-4
//                     lg:px-4
//                     lg:py-3
//                   `
//                 }
//               >
//                 <Icon size={21} />

//                 {/* Hide text below desktop */}
//                 <span className="hidden lg:block font-medium">
//                   {item.name}
//                 </span>
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* =====================================================
//             DESKTOP / TABLET SECTION
//         ====================================================== */}

//         <div
//           className="
//             flex items-center justify-center

//             /* Mobile */
//             hidden

//             /* Tablet */
//             sm:mt-6
//             sm:flex
//             sm:flex-col
//             sm:gap-2

//             /* Desktop */
//             lg:mt-6
//           "
//         >
//           {/* =================================================
//               CREATE POST
//           ================================================= */}

//           <button
//             type="button"
//             onClick={onCreatePost}
//             title="Create Post"
//             className="
//               flex items-center justify-center
//               rounded-xl
//               bg-(--primary)
//               text-white
//               transition
//               hover:bg-(--primary-hover)

//               /* Tablet */
//               h-11
//               w-11

//               /* Desktop */
//               lg:h-auto
//               lg:w-full
//               lg:gap-2
//               lg:px-4
//               lg:py-3
//               lg:font-semibold
//             "
//           >
//             <PlusSquare size={20} />

//             <span className="hidden lg:block">
//               Create Post
//             </span>
//           </button>
//         </div>

//         {/* =====================================================
//             BOTTOM SECTION
//         ====================================================== */}

//         <div
//           className="
//             hidden

//             /* Tablet */
//             sm:mt-auto
//             sm:flex
//             sm:flex-col
//             sm:gap-2
//           "
//         >
//           {/* =================================================
//               PROFILE
//           ================================================= */}

//           {user && (
//             <Link
//               to={`/profile/${user.username}`}
//               title="Profile"
//               className="
//                 flex items-center
//                 justify-center
//                 rounded-xl
//                 transition
//                 hover:bg-(--card-hover)

//                 /* Tablet */
//                 h-11
//                 w-11

//                 /* Desktop */
//                 lg:h-auto
//                 lg:w-full
//                 lg:justify-start
//                 lg:gap-3
//                 lg:px-4
//                 lg:py-3
//               "
//             >
//               {/* Profile Avatar */}

//               <div
//                 className="
//                   flex
//                   h-9
//                   w-9
//                   shrink-0
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-full
//                   bg-(--primary)
//                 "
//               >
//                 {user.profileImage ? (
//                   <img
//                     src={
//                       user.profileImage.startsWith("http")
//                         ? user.profileImage
//                         : `http://localhost:5000${user.profileImage}`
//                     }
//                     alt={user.fullName || user.username}
//                     className="h-full w-full object-cover"
//                     onError={(event) => {
//                       event.currentTarget.style.display =
//                         "none";
//                     }}
//                   />
//                 ) : (
//                   <span className="text-sm font-semibold text-white">
//                     {getInitials(user.fullName)}
//                   </span>
//                 )}
//               </div>

//               {/* Profile Info - Desktop only */}

//               <div className="hidden min-w-0 lg:block">
//                 <p className="truncate text-sm font-semibold text-white">
//                   {user.fullName}
//                 </p>

//                 <p className="truncate text-xs text-(--text-muted)">
//                   @{user.username}
//                 </p>
//               </div>

//               {/* User Icon - Desktop */}

//               <User
//                 size={18}
//                 className="
//                   hidden
//                   lg:ml-auto
//                   lg:block
//                   text-(--text-muted)
//                 "
//               />
//             </Link>
//           )}

//           {/* =================================================
//               SETTINGS
//           ================================================= */}

//           <NavLink
//             to="/settings"
//             title="Settings"
//             className={({ isActive }) =>
//               `
//                 flex items-center justify-center
//                 rounded-xl
//                 transition

//                 h-11
//                 w-11

//                 ${
//                   isActive
//                     ? "bg-(--primary) text-white"
//                     : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//                 }

//                 lg:w-full
//                 lg:justify-start
//                 lg:gap-4
//                 lg:px-4
//                 lg:py-3
//               `
//             }
//           >
//             <Settings size={21} />

//             <span className="hidden lg:block font-medium">
//               Settings
//             </span>
//           </NavLink>

//           {/* =================================================
//               LOGOUT
//           ================================================= */}

//           <button
//             type="button"
//             onClick={Logout}
//             title="Logout"
//             className="
//               flex items-center justify-center
//               rounded-xl
//               text-(--text-secondary)
//               transition
//               hover:bg-red-500/10
//               hover:text-red-400

//               h-11
//               w-11

//               lg:w-full
//               lg:justify-start
//               lg:gap-4
//               lg:px-4
//               lg:py-3
//             "
//           >
//             <LogOut size={21} />

//             <span className="hidden lg:block font-medium">
//               Logout
//             </span>
//           </button>
//         </div>

//         {/* =====================================================
//             MOBILE BOTTOM ACTIONS
//         ====================================================== */}

//         <div
//           className="
//             absolute
//             bottom-0
//             left-0
//             right-0

//             flex
//             h-16
//             items-center
//             justify-around
//             bg-(--background-secondary)

//             /* Desktop hide */
//             lg:hidden
//           "
//         >
//           {/* Profile */}

//           {user && (
//             <Link
//               to={`/profile/${user.username}`}
//               title="Profile"
//               className="
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-xl
//                 transition
//                 hover:bg-(--card-hover)
//               "
//             >
//               <div
//                 className="
//                   flex
//                   h-8
//                   w-8
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-full
//                   bg-(--primary)
//                 "
//               >
//                 {user.profileImage ? (
//                   <img
//                     src={
//                       user.profileImage.startsWith("http")
//                         ? user.profileImage
//                         : `http://localhost:5000${user.profileImage}`
//                     }
//                     alt={user.fullName || user.username}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-xs font-semibold text-white">
//                     {getInitials(user.fullName)}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           )}

//           {/* Settings */}

//           <NavLink
//             to="/settings"
//             title="Settings"
//             className={({ isActive }) =>
//               `
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-xl
//                 transition

//                 ${
//                   isActive
//                     ? "bg-(--primary) text-white"
//                     : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//                 }
//               `
//             }
//           >
//             <Settings size={21} />
//           </NavLink>

//           {/* Logout */}

//           <button
//             type="button"
//             onClick={Logout}
//             title="Logout"
//             className="
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-xl
//               text-(--text-secondary)
//               transition
//               hover:bg-red-500/10
//               hover:text-red-400
//             "
//           >
//             <LogOut size={21} />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
















import {
  Link,
  NavLink,
} from "react-router-dom";

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

const Sidebar = ({
  onCreatePost,
}) => {
  const { user, Logout } = useAuth();

  // =========================================================
  // INITIALS
  // =========================================================

  const getInitials = (
    fullName
  ) => {
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
      names[
        names.length - 1
      ].charAt(0)
    ).toUpperCase();
  };

  // =========================================================
  // NAV ITEMS
  // =========================================================

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

  // =========================================================
  // MOBILE NAVIGATION
  // =========================================================

  const mobileNavItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
      {
    name: "Search",
    path: "/search",
    icon: Search,
  },
    {
      name: "Reels",
      path: "/explore",
      icon: Compass,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: MessageCircle,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50

          flex
          h-16
          items-center
          justify-around

          border-t
          border-(--border)

          bg-(--background-secondary)/95
          px-2
          backdrop-blur-md

          sm:hidden
        "
      >
        {/* Mobile normal nav */}

        {mobileNavItems.map(
          (item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.name}
                className={({
                  isActive,
                }) =>
                  `
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    transition

                    ${
                      isActive
                        ? "bg-(--primary) text-white"
                        : "text-(--text-secondary)"
                    }
                  `
                }
              >
                <Icon size={22} />
              </NavLink>
            );
          }
        )}

        {/* Create Post */}

        <button
          type="button"
          onClick={
            onCreatePost
          }
          title="Create Post"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-(--primary)
            text-white
            transition
            active:scale-95
          "
        >
          <PlusSquare
            size={22}
          />
        </button>

        {/* Profile */}

        {user && (
          <Link
            to={`/profile/${user.username}`}
            title="Profile"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-(--primary)
              "
            >
              {user.profileImage ? (
                <img
                  src={
                    user.profileImage.startsWith(
                      "http"
                    )
                      ? user.profileImage
                      : `${import.meta.env.VITE_API_URL}${user.profileImage}`
                  }
                  alt={
                    user.username
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-white">
                  {getInitials(
                    user.fullName
                  )}
                </span>
              )}
            </div>
          </Link>
        )}
      </nav>

      {/* =====================================================
          TABLET + DESKTOP SIDEBAR
      ====================================================== */}

      <aside
        className="
          fixed
          bottom-0
          left-0
          top-16
          z-40

          hidden
          w-20

          border-r
          border-(--border)

          bg-(--background-secondary)

          sm:block
          lg:w-64
        "
      >
        <div
          className="
            flex
            h-full
            flex-col
            p-3

            lg:p-4
          "
        >
          {/* ===============================================
              NAVIGATION
          ================================================ */}

          <nav className="space-y-2">
            {navItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <NavLink
                    key={
                      item.path
                    }
                    to={item.path}
                    title={
                      item.name
                    }
                    className={({
                      isActive,
                    }) =>
                      `
                        flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        transition

                        lg:justify-start
                        lg:gap-4
                        lg:px-4

                        ${
                          isActive
                            ? "bg-(--primary) text-white"
                            : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
                        }
                      `
                    }
                  >
                    <Icon
                      size={21}
                      className="shrink-0"
                    />

                    <span
                      className="
                        hidden
                        font-medium
                        lg:block
                      "
                    >
                      {item.name}
                    </span>
                  </NavLink>
                );
              }
            )}
          </nav>

          {/* ===============================================
              CREATE POST
          ================================================ */}

          <button
            type="button"
            onClick={
              onCreatePost
            }
            title="Create Post"
            className="
              mt-6

              flex
              h-12
              w-full
              items-center
              justify-center

              rounded-xl

              bg-(--primary)
              text-white

              transition
              hover:bg-(--primary-hover)

              lg:gap-2
              lg:px-4
              lg:font-semibold
            "
          >
            <PlusSquare
              size={20}
              className="shrink-0"
            />

            <span className="hidden lg:block">
              Create Post
            </span>
          </button>

          {/* ===============================================
              BOTTOM SECTION
          ================================================ */}

          <div className="mt-auto space-y-2">

            {/* Profile */}

            {user && (
              <Link
                to={`/profile/${user.username}`}
                title="Profile"
                className="
                  flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-xl

                  transition
                  hover:bg-(--card-hover)

                  lg:justify-start
                  lg:gap-3
                  lg:px-4
                  lg:py-2
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-(--primary)
                  "
                >
                  {user.profileImage ? (
                    <img
                      src={
                        user.profileImage.startsWith(
                          "http"
                        )
                          ? user.profileImage
                          : `${import.meta.env.VITE_API_URL}${user.profileImage}`
                      }
                      alt={
                        user.username
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {getInitials(
                        user.fullName
                      )}
                    </span>
                  )}
                </div>

                <div
                  className="
                    hidden
                    min-w-0
                    flex-1
                    lg:block
                  "
                >
                  <p className="truncate text-sm font-semibold text-white">
                    {user.fullName}
                  </p>

                  <p className="truncate text-xs text-(--text-muted)">
                    @{user.username}
                  </p>
                </div>

                <User
                  size={18}
                  className="
                    ml-auto
                    hidden
                    shrink-0
                    text-(--text-muted)
                    lg:block
                  "
                />
              </Link>
            )}

            {/* Settings */}

            <NavLink
              to="/settings"
              title="Settings"
              className={({
                isActive,
              }) =>
                `
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  transition

                  lg:justify-start
                  lg:gap-4
                  lg:px-4

                  ${
                    isActive
                      ? "bg-(--primary) text-white"
                      : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
                  }
                `
              }
            >
              <Settings
                size={21}
                className="shrink-0"
              />

              <span className="hidden font-medium lg:block">
                Settings
              </span>
            </NavLink>

            {/* Logout */}

            <button
              type="button"
              onClick={Logout}
              title="Logout"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl

                text-(--text-secondary)

                transition

                hover:bg-red-500/10
                hover:text-red-400

                lg:justify-start
                lg:gap-4
                lg:px-4
              "
            >
              <LogOut
                size={21}
                className="shrink-0"
              />

              <span className="hidden font-medium lg:block">
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;