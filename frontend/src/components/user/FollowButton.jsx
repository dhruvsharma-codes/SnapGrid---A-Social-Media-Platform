






// import { useEffect, useState } from "react";

// import {
//   sendFollowRequest,
//   getFollowStatus,
// } from "../../services/followService.js";

// const FollowButton = ({
//   userId,
//   onFollowChange,
// }) => {
//   const [status, setStatus] = useState("follow");
//   const [loading, setLoading] = useState(true);

//   const loadStatus = async () => {
//     if (!userId) return;

//     try {
//       const response = await getFollowStatus(userId);

//       setStatus(response.data.status);
//     } catch (error) {
//       console.error("Follow Status Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStatus();
//   }, [userId]);

//   const handleFollow = async () => {
//     try {
//       setLoading(true);

//       const response = await sendFollowRequest(userId);

//       setStatus(response.data.status);

//       // Request bhejne par count change nahi hoga
//       if (response.data.status === "following") {
//         onFollowChange?.(response.data);
//       }
//     } catch (error) {
//       console.error("Follow Request Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === "self") {
//     return null;
//   }

//   return (
//     <button
//       type="button"
//       onClick={handleFollow}
//       disabled={
//         loading ||
//         status === "requested" ||
//         status === "following"
//       }
//       className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
//         status === "following"
//           ? "border border-(--border) bg-(--card) text-white"
//           : status === "requested"
//           ? "border border-(--border) bg-(--card) text-(--text-secondary)"
//           : "bg-(--primary) text-white hover:bg-(--primary-hover)"
//       }`}
//     >
//       {loading
//         ? "..."
//         : status === "following"
//         ? "Following"
//         : status === "requested"
//         ? "Requested"
//         : "Follow"}
//     </button>
//   );
// };

// export default FollowButton;















// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   sendFollowRequest,
//   getFollowStatus,
// } from "../../services/followService.js";

// const FollowButton = ({
//   userId,
//   onFollowChange,
// }) => {
//   const [status, setStatus] =
//     useState("follow");

//   const [loading, setLoading] =
//     useState(true);

//   const loadStatus = async () => {
//     if (!userId) return;

//     try {
//       const response =
//         await getFollowStatus(userId);

//       setStatus(
//         response.data.status
//       );
//     } catch (error) {
//       console.error(
//         "Follow Status Error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStatus();
//   }, [userId]);

//   const handleFollow = async () => {
//     if (loading) return;

//     try {
//       setLoading(true);

//       const response =
//         await sendFollowRequest(userId);

//       setStatus(
//         response.data.status
//       );

//       if (
//         response.data.status ===
//         "following"
//       ) {
//         onFollowChange?.(
//           response.data
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Follow Request Error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === "self") {
//     return null;
//   }

//   return (
//     <button
//       type="button"
//       onClick={handleFollow}
//       disabled={
//         loading ||
//         status === "requested" ||
//         status === "following"
//       }
//       className={`
//         min-h-10
//         rounded-lg
//         px-4
//         py-2
//         text-xs
//         font-semibold
//         transition
//         sm:px-5
//         sm:text-sm
//         ${
//           status === "following"
//             ? "border border-(--border) bg-(--card) text-white"
//             : status === "requested"
//               ? "border border-(--border) bg-(--card) text-(--text-secondary)"
//               : "bg-(--primary) text-white hover:bg-(--primary-hover)"
//         }
//         disabled:cursor-not-allowed
//         disabled:opacity-70
//       `}
//     >
//       {loading
//         ? "..."
//         : status === "following"
//           ? "Following"
//           : status === "requested"
//             ? "Requested"
//             : "Follow"}
//     </button>
//   );
// };

// export default FollowButton;





























import { useEffect, useState } from "react";

import {
  sendFollowRequest,
  getFollowStatus,
  unfollowUser,
} from "../../services/followService.js";

const FollowButton = ({ userId, onFollowChange }) => {
  const [status, setStatus] = useState("follow");
  const [loading, setLoading] = useState(true);

  // Load the status for THIS user. Resets first, so navigating from one
  // profile to another never shows the previous user's "Following" state.
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    setLoading(true);
    setStatus("follow");

    (async () => {
      try {
        const response = await getFollowStatus(userId);
        if (!cancelled) setStatus(response?.data?.status || "follow");
      } catch (error) {
        console.error("Follow Status Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleClick = async () => {
    if (loading) return;

    try {
      if (status === "following") {
        // "Following" was a dead, disabled button: there was no way to unfollow here
        if (!window.confirm("Unfollow this user?")) return;

        setLoading(true);
        const response = await unfollowUser(userId);

        setStatus("follow");
        onFollowChange?.(response?.data);
      } else if (status === "follow") {
        setLoading(true);
        const response = await sendFollowRequest(userId);

        const nextStatus = response?.data?.status || "requested";
        setStatus(nextStatus);

        if (nextStatus === "following") {
          onFollowChange?.(response.data);
        }
      }
    } catch (error) {
      console.error("Follow Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "self") return null;

  const label = loading
    ? "..."
    : status === "following"
      ? "Following"
      : status === "requested"
        ? "Requested"
        : "Follow";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || status === "requested"}
      className={`min-h-10 rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:text-sm ${
        status === "following"
          ? "border border-(--border) bg-(--card) text-white hover:border-red-500/40 hover:text-red-400"
          : status === "requested"
            ? "border border-(--border) bg-(--card) text-(--text-secondary)"
            : "bg-(--primary) text-white hover:bg-(--primary-hover)"
      }`}
    >
      {label}
    </button>
  );
};

export default FollowButton;