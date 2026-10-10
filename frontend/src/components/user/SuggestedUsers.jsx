// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getSuggestedUsers,
// } from "../../services/userService.js";
// import { sendFollowRequest } from "../../services/followService.js";
// const API_URL = "http://localhost:5000";

// const SuggestedUsers = () => {
//   const [users, setUsers] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);
//     const [followLoading, setFollowLoading] = useState(null);
// const [followedUsers, setFollowedUsers] = useState([]);

//   useEffect(() => {
//     const loadSuggestions =
//       async () => {
//         try {
//           const response =
//             await getSuggestedUsers();

//         //   setUsers(
//         //     response.users || []
//         //   );
//         setUsers(response.data?.users || []);
//         } catch (error) {
//           console.error(
//             "Suggestions Error:",
//             error
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//     loadSuggestions();
//   }, []);

//   const handleFollow = async (userId) => {
//   if (followLoading === userId) return;

//   try {
//     setFollowLoading(userId);

//     await sendFollowRequest(userId);

//     setFollowedUsers((current) => [
//       ...current,
//       userId,
//     ]);
//   } catch (error) {
//     console.error("Follow Error:", error);
//   } finally {
//     setFollowLoading(null);
//   }
// };

//   if (loading) {
//     return (
//       <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
//         <p className="text-sm text-(--text-secondary)">
//           Loading suggestions...
//         </p>
//       </div>
//     );
//   }

//   if (!users.length) {
//     return null;
//   }

//   return (
//     <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-sm font-bold text-white">
//           Suggested for you
//         </h2>

//         <button className="text-xs font-semibold text-(--primary)">
//           See all
//         </button>
//       </div>

//       <div className="space-y-4">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="flex items-center gap-3"
//           >
//             {/* Avatar */}
//             {user.profileImage ? (
//               <img
//                 // src={user.profileImage}
//                     src={`${API_URL}${user.profileImage}`}

//                 alt={user.username}
//                 className="h-11 w-11 rounded-full object-cover"
//               />
//             ) : (
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--primary) font-bold text-white">
//                 {(
//                   user.fullName ||
//                   user.username ||
//                   "?"
//                 )
//                   .charAt(0)
//                   .toUpperCase()}
//               </div>
//             )}

//             {/* User info */}
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold text-white">
//                 {user.fullName}
//               </p>

//               <p className="truncate text-xs text-(--text-secondary)">
//                 @{user.username}
//               </p>

//               <p className="text-[11px] text-(--text-muted)">
//                 {user.followersCount || 0} followers
//               </p>
//             </div>

//             {/* Follow */}
//             {/* <button
//               className="rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-(--primary-hover)"
//             >
//               Follow
//             </button> */}
//             <button
//   type="button"
//   disabled={followLoading === user.id}
//   onClick={() => handleFollow(user.id)}
//   className="rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
// >
//   {followLoading === user.id
//     ? "..."
//     : followedUsers.includes(user.id)
//       ? "Requested"
//       : "Follow"}
// </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuggestedUsers;













// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getSuggestedUsers,
// } from "../../services/userService.js";

// import {
//   sendFollowRequest,
// } from "../../services/followService.js";

// const SuggestedUsers = () => {
//   const [users, setUsers] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [followLoading, setFollowLoading] =
//     useState(null);

//   const [followedUsers, setFollowedUsers] =
//     useState([]);

//   useEffect(() => {
//     const loadSuggestions =
//       async () => {
//         try {
//           const response =
//             await getSuggestedUsers();

//           setUsers(
//             response.data?.users || []
//           );
//         } catch (error) {
//           console.error(
//             "Suggestions Error:",
//             error
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//     loadSuggestions();
//   }, []);

//   const handleFollow = async (userId) => {
//     if (followLoading === userId) {
//       return;
//     }

//     try {
//       setFollowLoading(userId);

//       await sendFollowRequest(userId);

//       setFollowedUsers(
//         (current) => [
//           ...current,
//           userId,
//         ]
//       );
//     } catch (error) {
//       console.error(
//         "Follow Error:",
//         error
//       );
//     } finally {
//       setFollowLoading(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="
//           rounded-2xl
//           border
//           border-(--border)
//           bg-(--card)
//           p-4
//           sm:p-5
//         "
//       >
//         <p className="text-sm text-(--text-secondary)">
//           Loading suggestions...
//         </p>
//       </div>
//     );
//   }

//   if (!users.length) {
//     return null;
//   }

//   return (
//     <div
//       className="
//         rounded-2xl
//         border
//         border-(--border)
//         bg-(--card)
//         p-4
//         sm:p-5
//       "
//     >
//       <div
//         className="
//           mb-4
//           flex
//           items-center
//           justify-between
//           gap-3
//         "
//       >
//         <h2 className="text-sm font-bold text-white">
//           Suggested for you
//         </h2>

//         <button
//           type="button"
//           className="
//             shrink-0
//             text-xs
//             font-semibold
//             text-(--primary)
//           "
//         >
//           See all
//         </button>
//       </div>

//       <div className="space-y-4">
//         {users.map((user) => {
//           const imageUrl =
//             user.profileImage
//               ? user.profileImage.startsWith(
//                   "http"
//                 )
//                 ? user.profileImage
//                 : `${import.meta.env.VITE_API_URL}${user.profileImage}`
//               : null;

//           return (
//             <div
//               key={user.id}
//               className="
//                 flex
//                 min-w-0
//                 items-center
//                 gap-3
//               "
//             >
//               {/* Avatar */}
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={user.username}
//                   className="
//                     h-10
//                     w-10
//                     shrink-0
//                     rounded-full
//                     object-cover
//                     sm:h-11
//                     sm:w-11
//                   "
//                 />
//               ) : (
//                 <div
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-(--primary)
//                     text-sm
//                     font-bold
//                     text-white
//                     sm:h-11
//                     sm:w-11
//                   "
//                 >
//                   {(
//                     user.fullName ||
//                     user.username ||
//                     "?"
//                   )
//                     .charAt(0)
//                     .toUpperCase()}
//                 </div>
//               )}

//               {/* User Info */}
//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-sm font-semibold text-white">
//                   {user.fullName}
//                 </p>

//                 <p className="truncate text-xs text-(--text-secondary)">
//                   @{user.username}
//                 </p>

//                 <p className="truncate text-[11px] text-(--text-muted)">
//                   {user.followersCount || 0}{" "}
//                   followers
//                 </p>
//               </div>

//               {/* Follow */}
//               <button
//                 type="button"
//                 disabled={
//                   followLoading === user.id
//                 }
//                 onClick={() =>
//                   handleFollow(user.id)
//                 }
//                 className="
//                   min-h-9
//                   shrink-0
//                   rounded-lg
//                   bg-(--primary)
//                   px-3
//                   py-1.5
//                   text-xs
//                   font-semibold
//                   text-white
//                   transition
//                   hover:bg-(--primary-hover)
//                   active:scale-95
//                   disabled:cursor-not-allowed
//                   disabled:opacity-50
//                 "
//               >
//                 {followLoading === user.id
//                   ? "..."
//                   : followedUsers.includes(
//                         user.id
//                       )
//                     ? "Requested"
//                     : "Follow"}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SuggestedUsers;




























import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getSuggestedUsers } from "../../services/userService.js";
import { sendFollowRequest } from "../../services/followService.js";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const cardClass = "rounded-2xl border border-(--border) bg-(--card) p-4 sm:p-5";

const SuggestedRow = memo(function SuggestedRow({
  user,
  status,
  busy,
  onFollow,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const profilePath = `/profile/${user.username}`;

  const label = busy
    ? "..."
    : status === "following"
      ? "Following"
      : status === "requested"
        ? "Requested"
        : "Follow";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link to={profilePath} className="shrink-0" aria-label={user.username}>
        {user.profileImage && !imageFailed ? (
          <img
            src={assetUrl(user.profileImage)}
            alt={user.username}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white sm:h-11 sm:w-11">
            {(user.fullName || user.username || "?").charAt(0).toUpperCase()}
          </div>
        )}
      </Link>

      <Link to={profilePath} className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {user.fullName || user.username}
        </p>
        <p className="truncate text-xs text-(--text-secondary)">
          @{user.username}
        </p>
        <p className="truncate text-[11px] text-(--text-muted)">
          {user.followersCount || 0} followers
        </p>
      </Link>

      <button
        type="button"
        disabled={busy || !!status}
        onClick={() => onFollow(user.id)}
        className="min-h-9 shrink-0 rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-(--primary-hover) active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
      </button>
    </div>
  );
});

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(null);
  // userId -> "requested" | "following"
  const [statuses, setStatuses] = useState({});

  const busyRef = useRef(new Set());

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await getSuggestedUsers();
        if (!cancelled) setUsers(response?.data?.users || []);
      } catch (error) {
        console.error("Suggestions Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleFollow = useCallback(async (userId) => {
    if (busyRef.current.has(userId)) return;
    busyRef.current.add(userId);
    setFollowLoading(userId);

    try {
      const response = await sendFollowRequest(userId);

      // public accounts return "following", private ones "requested";
      // this used to always show "Requested"
      const status = response?.data?.status || "requested";
      setStatuses((current) => ({ ...current, [userId]: status }));
    } catch (error) {
      console.error("Follow Error:", error);
    } finally {
      busyRef.current.delete(userId);
      setFollowLoading((current) => (current === userId ? null : current));
    }
  }, []);

  if (loading) {
    return (
      <div className={cardClass}>
        <p className="text-sm text-(--text-secondary)">
          Loading suggestions...
        </p>
      </div>
    );
  }

  if (!users.length) return null;

  return (
    <div className={cardClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-white">Suggested for you</h2>

        <Link
          to="/search"
          className="shrink-0 text-xs font-semibold text-(--primary)"
        >
          See all
        </Link>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <SuggestedRow
            key={user.id}
            user={user}
            status={statuses[user.id]}
            busy={followLoading === user.id}
            onFollow={handleFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;