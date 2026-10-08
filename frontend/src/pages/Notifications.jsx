import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService.js";

import {
  followBack,
  rejectFollowRequest,
} from "../services/followService.js";
import { useSocket } from "../context/SocketContext.jsx";

// const API_URL = "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
   const socket = useSocket();

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  // FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.error(
        "Notification Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  useEffect(() => {
  fetchNotifications();

  if (!socket) {
    return;
  }

  const handleNewNotification = (
    notification
  ) => {
    console.log(
      "🔔 New notification received:",
      notification
    );

    setNotifications((current) => {
      // Duplicate notification prevent
      const alreadyExists =
        current.some(
          (item) =>
            item.id === notification.id
        );

      if (alreadyExists) {
        return current;
      }

      return [
        notification,
        ...current,
      ];
    });
  };

  const handleNotificationChange = () => {
    console.log(
      "🔄 Notification list changed"
    );

    fetchNotifications();
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

  // MARK NOTIFICATION AS READ
  const handleNotificationRead = async (
    notification
  ) => {
    // Already read
    if (notification.isRead) {
      return;
    }

    try {
      await markNotificationAsRead(
        notification.id
      );

      // Update UI
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );

      // Refresh Navbar unread count
      window.dispatchEvent(
        new Event("notifications:changed")
      );
    } catch (error) {
      console.error(
        "Mark Notification Read Error:",
        error
      );
    }
  };

  // FOLLOW BACK
  const handleFollowBack = async (
    notification
  ) => {
    if (!notification.followRequestId) {
      console.error(
        "Follow request ID missing"
      );

      return;
    }

    try {
      setActionLoading(notification.id);

      await followBack(
        notification.followRequestId
      );

      // Remove request notification
      setNotifications((current) =>
        current.filter(
          (item) =>
            item.id !== notification.id
        )
      );

      // Refresh Navbar count
      window.dispatchEvent(
        new Event("notifications:changed")
      );
    } catch (error) {
      console.error(
        "Follow Back Error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  // REJECT
  const handleReject = async (
    notification
  ) => {
    if (!notification.followRequestId) {
      console.error(
        "Follow request ID missing"
      );

      return;
    }

    try {
      setActionLoading(notification.id);

      await rejectFollowRequest(
        notification.followRequestId
      );

      // Remove notification from UI
      setNotifications((current) =>
        current.filter(
          (item) =>
            item.id !== notification.id
        )
      );

      // Refresh Navbar count
      window.dispatchEvent(
        new Event("notifications:changed")
      );
    } catch (error) {
      console.error(
        "Reject Request Error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

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
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-white">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-(--text-secondary)">
            No notifications yet
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(
            (notification) => {
              const isActionLoading =
                actionLoading ===
                notification.id;

              return (
                <div
                  key={notification.id}
                  onClick={() =>
                    handleNotificationRead(
                      notification
                    )
                  }
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                    notification.isRead
                      ? "border-(--border) bg-(--card)"
                      : "border-(--primary) bg-(--card-hover)"
                  }`}
                >
                  {/* Avatar */}

                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--primary)">
                    {notification.sender
                      ?.profileImage ? (
                      <img
                        src={`${API_URL}${notification.sender.profileImage}`}
                        alt={
                          notification.sender
                            .username
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-semibold text-white">
                          {notification.sender?.fullName
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text */}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white">
                      <span className="font-semibold">
                        {
                          notification.sender
                            ?.fullName
                        }
                      </span>{" "}
                      {notification.message}
                    </p>

                    <p className="mt-1 text-xs text-(--text-muted)">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* Follow Request Actions */}

                  {notification.type ===
                    "follow_request" && (
                    <div
                      className="flex shrink-0 items-center gap-2"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      <button
                        type="button"
                        disabled={
                          isActionLoading
                        }
                        onClick={() =>
                          handleFollowBack(
                            notification
                          )
                        }
                        className="rounded-lg bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isActionLoading
                          ? "..."
                          : "Follow Back"}
                      </button>

                      <button
                        type="button"
                        disabled={
                          isActionLoading
                        }
                        onClick={() =>
                          handleReject(
                            notification
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Reject request"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;