import {
  useEffect,
  useState,
} from "react";

import {
  getSuggestedUsers,
} from "../../services/userService.js";
import { sendFollowRequest } from "../../services/followService.js";
const API_URL = "http://localhost:5000";

const SuggestedUsers = () => {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    const [followLoading, setFollowLoading] = useState(null);
const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const loadSuggestions =
      async () => {
        try {
          const response =
            await getSuggestedUsers();

        //   setUsers(
        //     response.users || []
        //   );
        setUsers(response.data?.users || []);
        } catch (error) {
          console.error(
            "Suggestions Error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    loadSuggestions();
  }, []);

  const handleFollow = async (userId) => {
  if (followLoading === userId) return;

  try {
    setFollowLoading(userId);

    await sendFollowRequest(userId);

    setFollowedUsers((current) => [
      ...current,
      userId,
    ]);
  } catch (error) {
    console.error("Follow Error:", error);
  } finally {
    setFollowLoading(null);
  }
};

  if (loading) {
    return (
      <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
        <p className="text-sm text-(--text-secondary)">
          Loading suggestions...
        </p>
      </div>
    );
  }

  if (!users.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-white">
          Suggested for you
        </h2>

        <button className="text-xs font-semibold text-(--primary)">
          See all
        </button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3"
          >
            {/* Avatar */}
            {user.profileImage ? (
              <img
                // src={user.profileImage}
                    src={`${API_URL}${user.profileImage}`}

                alt={user.username}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--primary) font-bold text-white">
                {(
                  user.fullName ||
                  user.username ||
                  "?"
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            {/* User info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user.fullName}
              </p>

              <p className="truncate text-xs text-(--text-secondary)">
                @{user.username}
              </p>

              <p className="text-[11px] text-(--text-muted)">
                {user.followersCount || 0} followers
              </p>
            </div>

            {/* Follow */}
            {/* <button
              className="rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-(--primary-hover)"
            >
              Follow
            </button> */}
            <button
  type="button"
  disabled={followLoading === user.id}
  onClick={() => handleFollow(user.id)}
  className="rounded-lg bg-(--primary) px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
>
  {followLoading === user.id
    ? "..."
    : followedUsers.includes(user.id)
      ? "Requested"
      : "Follow"}
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;