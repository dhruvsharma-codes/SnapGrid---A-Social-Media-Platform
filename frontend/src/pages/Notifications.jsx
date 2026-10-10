// import { useEffect, useState } from "react";
// import { X } from "lucide-react";

// import {
//   getNotifications,
//   markNotificationAsRead,
// } from "../services/notificationService.js";

// import {
//   followBack,
//   rejectFollowRequest,
// } from "../services/followService.js";
// import { useSocket } from "../context/SocketContext.jsx";

// // const API_URL = "http://localhost:5000";
// const API_URL = import.meta.env.VITE_API_URL;

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//    const socket = useSocket();

//   const [loading, setLoading] = useState(true);

//   const [actionLoading, setActionLoading] = useState(null);

//   // FETCH NOTIFICATIONS
//   const fetchNotifications = async () => {
//     try {
//       const response = await getNotifications();

//       setNotifications(
//         response.data.notifications || []
//       );
//     } catch (error) {
//       console.error(
//         "Notification Error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchNotifications();
//   // }, []);

//   useEffect(() => {
//   fetchNotifications();

//   if (!socket) {
//     return;
//   }

//   const handleNewNotification = (
//     notification
//   ) => {
//     console.log(
//       "🔔 New notification received:",
//       notification
//     );

//     setNotifications((current) => {
//       // Duplicate notification prevent
//       const alreadyExists =
//         current.some(
//           (item) =>
//             item.id === notification.id
//         );

//       if (alreadyExists) {
//         return current;
//       }

//       return [
//         notification,
//         ...current,
//       ];
//     });
//   };

//   const handleNotificationChange = () => {
//     console.log(
//       "🔄 Notification list changed"
//     );

//     fetchNotifications();
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

//   // MARK NOTIFICATION AS READ
//   const handleNotificationRead = async (
//     notification
//   ) => {
//     // Already read
//     if (notification.isRead) {
//       return;
//     }

//     try {
//       await markNotificationAsRead(
//         notification.id
//       );

//       // Update UI
//       setNotifications((current) =>
//         current.map((item) =>
//           item.id === notification.id
//             ? {
//                 ...item,
//                 isRead: true,
//               }
//             : item
//         )
//       );

//       // Refresh Navbar unread count
//       window.dispatchEvent(
//         new Event("notifications:changed")
//       );
//     } catch (error) {
//       console.error(
//         "Mark Notification Read Error:",
//         error
//       );
//     }
//   };

//   // FOLLOW BACK
//   const handleFollowBack = async (
//     notification
//   ) => {
//     if (!notification.followRequestId) {
//       console.error(
//         "Follow request ID missing"
//       );

//       return;
//     }

//     try {
//       setActionLoading(notification.id);

//       await followBack(
//         notification.followRequestId
//       );

//       // Remove request notification
//       setNotifications((current) =>
//         current.filter(
//           (item) =>
//             item.id !== notification.id
//         )
//       );

//       // Refresh Navbar count
//       window.dispatchEvent(
//         new Event("notifications:changed")
//       );
//     } catch (error) {
//       console.error(
//         "Follow Back Error:",
//         error
//       );
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // REJECT
//   const handleReject = async (
//     notification
//   ) => {
//     if (!notification.followRequestId) {
//       console.error(
//         "Follow request ID missing"
//       );

//       return;
//     }

//     try {
//       setActionLoading(notification.id);

//       await rejectFollowRequest(
//         notification.followRequestId
//       );

//       // Remove notification from UI
//       setNotifications((current) =>
//         current.filter(
//           (item) =>
//             item.id !== notification.id
//         )
//       );

//       // Refresh Navbar count
//       window.dispatchEvent(
//         new Event("notifications:changed")
//       );
//     } catch (error) {
//       console.error(
//         "Reject Request Error:",
//         error
//       );
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <div className="py-10 text-center text-sm text-(--text-secondary)">
//         Loading notifications...
//       </div>
//     );
//   }

//   // PAGE
//   return (
//     // <div className="mx-auto max-w-2xl">
//     <div className="mx-auto w-full max-w-2xl">
//       <h1 className="sm:mb-6 sm:text-2xl font-bold text-white mb-4 text-xl">
//         Notifications
//       </h1>

//       {notifications.length === 0 ? (
//         <div className="py-12 text-center">
//           <p className="text-sm text-(--text-secondary)">
//             No notifications yet
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {notifications.map(
//             (notification) => {
//               const isActionLoading =
//                 actionLoading ===
//                 notification.id;

//               return (
//                 <div
//                   key={notification.id}
//                   onClick={() =>
//                     handleNotificationRead(
//                       notification
//                     )
//                   }
//                   // className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
//                   className={`flex cursor-pointer flex-col gap-3 rounded-xl border p-3 transition sm:flex-row sm:items-center sm:gap-4 sm:p-4 ${
//                     notification.isRead
//                       ? "border-(--border) bg-(--card)"
//                       : "border-(--primary) bg-(--card-hover)"
//                   }`}
//                 >
//                   {/* Avatar */}

//                   {/* <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--primary)"> */}
//                   <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-(--primary) sm:h-11 sm:w-11">
//                     {notification.sender
//                       ?.profileImage ? (
//                       <img
//                         src={`${API_URL}${notification.sender.profileImage}`}
//                         alt={
//                           notification.sender
//                             .username
//                         }
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center">
//                         <span className="font-semibold text-white">
//                           {notification.sender?.fullName
//                             ?.charAt(0)
//                             .toUpperCase()}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Text */}

//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm text-white leading-5 wrap-break-word">
//                       <span className="font-semibold">
//                         {
//                           notification.sender
//                             ?.fullName
//                         }
//                       </span>{" "}
//                       {notification.message}
//                     </p>

//                     <p className="mt-1 text-xs text-(--text-muted)">
//                       {new Date(
//                         notification.createdAt
//                       ).toLocaleString()}
//                     </p>
//                   </div>

//                   {/* Follow Request Actions */}

//                   {notification.type ===
//                     "follow_request" && (
//                     <div
//                       className="flex shrink-0 items-center gap-2 w-full sm:w-auto"
//                       onClick={(event) =>
//                         event.stopPropagation()
//                       }
//                     >
//                       <button
//                         type="button"
//                         disabled={
//                           isActionLoading
//                         }
//                         onClick={() =>
//                           handleFollowBack(
//                             notification
//                           )
//                         }
//                         className=" flex-1 rounded-lg bg-(--primary) px-3 py-2 text-xs font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm"
//                       >
//                         {isActionLoading
//                           ? "..."
//                           : "Follow Back"}
//                       </button>

//                       <button
//                         type="button"
//                         disabled={
//                           isActionLoading
//                         }
//                         onClick={() =>
//                           handleReject(
//                             notification
//                           )
//                         }
//                         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
//                         title="Reject request"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;














import { memo, useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService.js";

import { followBack, rejectFollowRequest } from "../services/followService.js";
import { useSocket } from "../context/SocketContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

// tell the navbar to refresh its unread badge
const notifyNavbar = () =>
  window.dispatchEvent(new Event("notifications:changed"));

// =============================================================
// SINGLE ROW (memoized: only re-renders when its own data changes)
// =============================================================

const NotificationItem = memo(function NotificationItem({
  notification,
  busy,
  onRead,
  onFollowBack,
  onReject,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const sender = notification.sender;
  const initial = (sender?.fullName || sender?.username || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onRead(notification)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && event.target === event.currentTarget) {
          onRead(notification);
        }
      }}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border p-3 transition sm:flex-row sm:items-center sm:gap-4 sm:p-4 ${
        notification.isRead
          ? "border-(--border) bg-(--card)"
          : "border-(--primary) bg-(--card-hover)"
      }`}
    >
      {/* Avatar */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-(--primary) sm:h-11 sm:w-11">
        {sender?.profileImage && !imageFailed ? (
          <img
            src={assetUrl(sender.profileImage)}
            alt={sender.username || "User"}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-semibold text-white">{initial}</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word text-sm leading-5 text-white">
          <span className="font-semibold">
            {sender?.fullName || sender?.username}
          </span>{" "}
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-(--text-muted)">
          {notification.createdAt
            ? new Date(notification.createdAt).toLocaleString()
            : ""}
        </p>
      </div>

      {/* Follow request actions */}
      {notification.type === "follow_request" && (
        <div
          className="flex w-full shrink-0 items-center gap-2 sm:w-auto"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            disabled={busy}
            onClick={() => onFollowBack(notification)}
            className="flex-1 rounded-lg bg-(--primary) px-3 py-2 text-xs font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm"
          >
            {busy ? "..." : "Follow Back"}
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => onReject(notification)}
            title="Reject request"
            aria-label="Reject request"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
});

// =============================================================
// PAGE
// =============================================================

const Notifications = () => {
  const socket = useSocket();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const mountedRef = useRef(true);
  const fetchSeqRef = useRef(0); // ignore out-of-order responses

  // FETCH
  const fetchNotifications = useCallback(async () => {
    const seq = ++fetchSeqRef.current;

    try {
      const response = await getNotifications();

      if (!mountedRef.current || seq !== fetchSeqRef.current) return;

      setNotifications(response?.data?.notifications || []);
      setError("");
    } catch (err) {
      console.error("Notification Error:", err);
      if (mountedRef.current && seq === fetchSeqRef.current) {
        setError("Failed to load notifications");
      }
    } finally {
      if (mountedRef.current && seq === fetchSeqRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // INITIAL LOAD + REAL-TIME UPDATES
  useEffect(() => {
    mountedRef.current = true;
    fetchNotifications();

    if (!socket) {
      return () => {
        mountedRef.current = false;
      };
    }

    const handleNewNotification = (notification) => {
      if (!notification) return;

      setNotifications((current) =>
        current.some((item) => String(item.id) === String(notification.id))
          ? current
          : [notification, ...current]
      );
    };

    const handleNotificationChange = () => {
      fetchNotifications();
    };

    socket.on("new_notification", handleNewNotification);
    socket.on("notifications:changed", handleNotificationChange);

    return () => {
      mountedRef.current = false;
      socket.off("new_notification", handleNewNotification);
      socket.off("notifications:changed", handleNotificationChange);
    };
  }, [socket, fetchNotifications]);

  // MARK AS READ (optimistic: UI updates instantly, rolls back on failure)
  const handleNotificationRead = useCallback(async (notification) => {
    if (notification.isRead) return;

    const setRead = (isRead) =>
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id ? { ...item, isRead } : item
        )
      );

    setRead(true);

    try {
      await markNotificationAsRead(notification.id);
      notifyNavbar();
    } catch (err) {
      console.error("Mark Notification Read Error:", err);
      setRead(false);
      setError("Could not mark notification as read");
    }
  }, []);

  // FOLLOW BACK / REJECT share one flow
  const runFollowAction = useCallback(async (notification, action, label) => {
    if (!notification.followRequestId) {
      console.error("Follow request ID missing");
      return;
    }

    try {
      setActionLoading(notification.id);
      setError("");

      await action(notification.followRequestId);

      setNotifications((current) =>
        current.filter((item) => item.id !== notification.id)
      );
      notifyNavbar();
    } catch (err) {
      console.error(`${label} Error:`, err);
      setError(err.message || `${label} failed`);
    } finally {
      setActionLoading(null);
    }
  }, []);

  const handleFollowBack = useCallback(
    (notification) => runFollowAction(notification, followBack, "Follow back"),
    [runFollowAction]
  );

  const handleReject = useCallback(
    (notification) =>
      runFollowAction(notification, rejectFollowRequest, "Reject request"),
    [runFollowAction]
  );

  // LOADING
  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-(--text-secondary)">
        Loading notifications...
      </div>
    );
  }

  // PAGE
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl">
        Notifications
      </h1>

      {error && (
        <div
          role="alert"
          className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
            className="shrink-0 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-(--text-secondary)">
            No notifications yet
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              busy={actionLoading === notification.id}
              onRead={handleNotificationRead}
              onFollowBack={handleFollowBack}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;