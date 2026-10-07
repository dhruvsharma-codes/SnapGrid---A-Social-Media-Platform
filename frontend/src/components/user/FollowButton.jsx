






import { useEffect, useState } from "react";

import {
  sendFollowRequest,
  getFollowStatus,
} from "../../services/followService.js";

const FollowButton = ({
  userId,
  onFollowChange,
}) => {
  const [status, setStatus] = useState("follow");
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    if (!userId) return;

    try {
      const response = await getFollowStatus(userId);

      setStatus(response.data.status);
    } catch (error) {
      console.error("Follow Status Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, [userId]);

  const handleFollow = async () => {
    try {
      setLoading(true);

      const response = await sendFollowRequest(userId);

      setStatus(response.data.status);

      // Request bhejne par count change nahi hoga
      if (response.data.status === "following") {
        onFollowChange?.(response.data);
      }
    } catch (error) {
      console.error("Follow Request Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "self") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleFollow}
      disabled={
        loading ||
        status === "requested" ||
        status === "following"
      }
      className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
        status === "following"
          ? "border border-(--border) bg-(--card) text-white"
          : status === "requested"
          ? "border border-(--border) bg-(--card) text-(--text-secondary)"
          : "bg-(--primary) text-white hover:bg-(--primary-hover)"
      }`}
    >
      {loading
        ? "..."
        : status === "following"
        ? "Following"
        : status === "requested"
        ? "Requested"
        : "Follow"}
    </button>
  );
};

export default FollowButton;