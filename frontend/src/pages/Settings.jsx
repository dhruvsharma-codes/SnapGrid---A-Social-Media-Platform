import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getUserProfile } from "../services/userService.js";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";
import { getSavedPosts } from "../services/savedPostService.js";
import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
import PostModal from "../components/profile/PostModal.jsx";
import {
  UserRound,
  Bell,
  Bookmark,
  Users,
  UserCircle,
  LockKeyhole,
  ChevronRight,
    UserPlus,
    User,
  Mail,
  AtSign,
  FileText,
  Image,
  ShieldCheck,
  Hash,
  EyeOff,
  Eye,
  LogOut

} from "lucide-react";
import {
  getFollowers,
  getFollowing,
    unfollowUser,
} from "../services/followService.js";
import { changePassword } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate();
  const [activeSection, setActiveSection] =
    useState("edit-profile");
    const { user: loggedInUser, setUser, Logout } = useAuth();

const [profile, setProfile] = useState(null);
const [showEditProfile, setShowEditProfile] =
  useState(false);
const [profileLoading, setProfileLoading] =
  useState(true);

  const [savedPosts, setSavedPosts] = useState([]);
const [savedLoading, setSavedLoading] = useState(false);
const [selectedSavedPost, setSelectedSavedPost] =
  useState(null);

  const [followTab, setFollowTab] = useState("followers");

const [followers, setFollowers] = useState([]);
const [following, setFollowing] = useState([]);

const [followersLoading, setFollowersLoading] = useState(false);
const [followingLoading, setFollowingLoading] = useState(false);
const [unfollowLoading, setUnfollowLoading] =
  useState(null);

  const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");

const [passwordLoading, setPasswordLoading] =
  useState(false);

const [passwordError, setPasswordError] =
  useState("");

const [passwordSuccess, setPasswordSuccess] =
  useState("");

const [showCurrentPassword, setShowCurrentPassword] =
  useState(false);

const [showNewPassword, setShowNewPassword] =
  useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);

  const settingsOptions = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      icon: UserRound,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "saved",
      label: "Saved Posts",
      icon: Bookmark,
    },
    {
      id: "followers",
      label: "Followers & Following",
      icon: Users,
    },
    {
      id: "profile-details",
      label: "Profile Details",
      icon: UserCircle,
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: LockKeyhole,
    },
  ];

  useEffect(() => {
  const loadProfile = async () => {
    if (!loggedInUser?.username) {
      return;
    }

    try {
      setProfileLoading(true);

      const response = await getUserProfile(
        loggedInUser.username
      );

      setProfile(response.data.user);
    } catch (error) {
      console.error(
        "Settings Profile Error:",
        error
      );
    } finally {
      setProfileLoading(false);
    }
  };

  loadProfile();
}, [loggedInUser?.username]);

const handleProfileUpdated = (updatedUser) => {
  setProfile(updatedUser);
  setUser(updatedUser);
  setShowEditProfile(false);
};

const loadSavedPosts = async () => {
  try {
    setSavedLoading(true);

    const response = await getSavedPosts();

    setSavedPosts(
      response.data?.posts || []
    );
  } catch (error) {
    console.error(
      "Settings Saved Posts Error:",
      error
    );
  } finally {
    setSavedLoading(false);
  }
};

const loadFollowers = async () => {
  try {
    setFollowersLoading(true);

    const response = await getFollowers();

    setFollowers(response.data?.users || []);
  } catch (error) {
    console.error("Followers Error:", error);
  } finally {
    setFollowersLoading(false);
  }
};

const loadFollowing = async () => {
  try {
    setFollowingLoading(true);

    const response = await getFollowing();

    setFollowing(response.data?.users || []);
  } catch (error) {
    console.error("Following Error:", error);
  } finally {
    setFollowingLoading(false);
  }
};

const handleUnfollow = async (userId) => {
  if (unfollowLoading === userId) {
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to unfollow this user?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setUnfollowLoading(userId);

    await unfollowUser(userId);

    // Remove user from following list
    setFollowing((currentFollowing) =>
      currentFollowing.filter(
        (user) => Number(user.id) !== Number(userId)
      )
    );
  } catch (error) {
    console.error(
      "Unfollow Error:",
      error
    );
  } finally {
    setUnfollowLoading(null);
  }
};

useEffect(() => {
  if (activeSection === "saved") {
    loadSavedPosts();
  }
}, [activeSection]);

useEffect(() => {
  if (activeSection !== "followers") {
    return;
  }

  loadFollowers();
  loadFollowing();
}, [activeSection]);

const handleChangePassword = async (e) => {
  e.preventDefault();

  setPasswordError("");
  setPasswordSuccess("");

  // Validation
  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    setPasswordError(
      "Please fill all password fields."
    );
    return;
  }

  if (newPassword.length < 6) {
    setPasswordError(
      "New password must be at least 6 characters."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError(
      "New password and confirm password do not match."
    );
    return;
  }

  try {
    setPasswordLoading(true);

    const response = await changePassword({
      currentPassword,
      newPassword,
    });

    setPasswordSuccess(
      response.message ||
        "Password changed successfully."
    );

    // Clear form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    setPasswordError(
      error.message ||
        "Unable to change password."
    );
  } finally {
    setPasswordLoading(false);
  }
};

const renderForgotPassword = () => {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)/10">
          <LockKeyhole
            size={22}
            className="text-(--primary)"
          />
        </div>

        <h2 className="text-xl font-semibold text-white">
          Change Password
        </h2>

        <p className="mt-1 text-sm text-(--text-secondary)">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleChangePassword}
        className="rounded-2xl border border-(--border) bg-(--card) p-6"
      >
        {/* Current Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-white">
            Current Password
          </label>

          <div className="relative">
            <input
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              placeholder="Enter current password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(
                  (value) => !value
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
            >
              {showCurrentPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-white">
            New Password
          </label>

          <div className="relative">
            <input
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(
                  (value) => !value
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
            >
              {showNewPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs text-(--text-muted)">
            Password must be at least 6 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white">
            Confirm New Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (value) => !value
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {passwordError && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {passwordError}
          </div>
        )}

        {/* Success */}
        {passwordSuccess && (
          <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {passwordSuccess}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={passwordLoading}
          className="w-full rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {passwordLoading
            ? "Updating Password..."
            : "Update Password"}
        </button>
      </form>

      {/* Security Information */}
      <div className="mt-4 flex gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-(--success)"
        />

        <div>
          <p className="text-sm font-medium text-white">
            Keep your account secure
          </p>

          <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
            Use a strong password that you don't use
            on other websites.
          </p>
        </div>
      </div>
    </div>
  );
};

const renderFollowersFollowing = () => {
  const users =
    followTab === "followers"
      ? followers
      : following;

  const loading =
    followTab === "followers"
      ? followersLoading
      : followingLoading;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Followers & Following
        </h2>

        <p className="mt-1 text-sm text-(--text-secondary)">
          Manage your followers and the people you follow.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex border-b border-(--border)">
        <button
          type="button"
          onClick={() => setFollowTab("followers")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
            followTab === "followers"
              ? "border-b-2 border-(--primary) text-white"
              : "text-(--text-secondary) hover:text-white"
          }`}
        >
          <Users size={17} />

          Followers

          <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
            {followers.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFollowTab("following")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
            followTab === "following"
              ? "border-b-2 border-(--primary) text-white"
              : "text-(--text-secondary) hover:text-white"
          }`}
        >
          <UserPlus size={17} />

          Following

          <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
            {following.length}
          </span>
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-60 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex min-h-60 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--card)">
            <UserRound
              size={28}
              className="text-(--text-muted)"
            />
          </div>

          <h3 className="text-lg font-semibold text-white">
            {followTab === "followers"
              ? "No Followers Yet"
              : "Not Following Anyone"}
          </h3>

          <p className="mt-1 text-sm text-(--text-secondary)">
            {followTab === "followers"
              ? "When people follow you, they will appear here."
              : "People you follow will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4 transition hover:bg-(--card-hover)"
            >
              {/* User */}
              <div className="flex min-w-0 items-center gap-3">
                {user.profileImage ? (
                  <img
                    src={
                      user.profileImage.startsWith("http")
                        ? user.profileImage
                        // : `http://localhost:5000${user.profileImage}`
                        : `${import.meta.env.VITE_API_URL}${user.profileImage}`
                    }
                    alt={user.username}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary)">
                    <span className="font-semibold text-white">
                      {user.username
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {user.fullName || user.username}
                  </p>

                  <p className="truncate text-sm text-(--text-secondary)">
                    @{user.username}
                  </p>

                  {user.bio && (
                    <p className="mt-1 line-clamp-1 text-xs text-(--text-muted)">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Action */}
              {/* <button
                type="button"
                className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
              >
                {followTab === "followers"
                  ? "View Profile"
                  : "Following"}
              </button> */}
              {/* <button
  type="button"
  onClick={() => {
    navigate(`/profile/${user.username}`);
  }}
  className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
>
  View Profile
</button> */}

{/* Action */}
{followTab === "followers" ? (
  <button
    type="button"
    onClick={() => {
      navigate(`/profile/${user.username}`);
    }}
    className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
  >
    View Profile
  </button>
) : (
  <button
    type="button"
    disabled={unfollowLoading === user.id}
    onClick={() => handleUnfollow(user.id)}
    className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
  >
    {unfollowLoading === user.id
      ? "Unfollowing..."
      : "Following"}
  </button>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const renderProfileDetails = () => {
  if (profileLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-60 items-center justify-center text-sm text-(--text-secondary)">
        Unable to load profile details.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Profile Details
        </h2>

        <p className="mt-1 text-sm text-(--text-secondary)">
          View your complete profile and account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        
        {/* Cover */}
        <div className="relative h-36 bg-(--background-secondary)">
          {profile.coverImage ? (
            <img
              src={
                profile.coverImage.startsWith("http")
                  ? profile.coverImage
                  // : `http://localhost:5000${profile.coverImage}`
                  : `${import.meta.env.VITE_API_URL}${profile.coverImage}`
              }
              alt="Cover"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)" />
          )}

          {/* Profile Image */}
          <div className="absolute -bottom-12 left-6">
            {profile.profileImage ? (
              <img
                src={
                  profile.profileImage.startsWith("http")
                    ? profile.profileImage
                    // : `http://localhost:5000${profile.profileImage}`
                    : `${import.meta.env.VITE_API_URL}${profile.profileImage}`
                }
                alt={profile.username}
                className="h-24 w-24 rounded-full border-4 border-(--card) object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-(--card) bg-(--primary)">
                <span className="text-3xl font-bold text-white">
                  {profile.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Name */}
        <div className="px-6 pb-6 pt-16">
          <h3 className="text-xl font-semibold text-white">
            {profile.fullName || profile.username}
          </h3>

          <p className="mt-1 text-sm text-(--text-secondary)">
            @{profile.username}
          </p>

          {profile.bio && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-(--text-secondary)">
              {profile.bio}
            </p>
          )}
        </div>
      </div>


      {/* Personal Information */}
      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Personal Information
        </h3>

        <div className="grid gap-3 md:grid-cols-2">

          {/* Full Name */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
                <User
                  size={18}
                  className="text-(--text-secondary)"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-(--text-muted)">
                  Full Name
                </p>

                <p className="mt-1 truncate text-sm font-medium text-white">
                  {profile.fullName || "Not provided"}
                </p>
              </div>
            </div>
          </div>


          {/* Username */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
                <AtSign
                  size={18}
                  className="text-(--text-secondary)"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-(--text-muted)">
                  Username
                </p>

                <p className="mt-1 truncate text-sm font-medium text-white">
                  @{profile.username}
                </p>
              </div>
            </div>
          </div>


          {/* Email */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
                <Mail
                  size={18}
                  className="text-(--text-secondary)"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-(--text-muted)">
                  Email Address
                </p>

                <p className="mt-1 truncate text-sm font-medium text-white">
                  {profile.email || "Not provided"}
                </p>
              </div>
            </div>
          </div>


          {/* Bio */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
                <FileText
                  size={18}
                  className="text-(--text-secondary)"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-(--text-muted)">
                  Bio
                </p>

                <p className="mt-1 line-clamp-2 text-sm font-medium text-white">
                  {profile.bio || "No bio added"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Account Statistics */}
      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Account Statistics
        </h3>

        <div className="grid grid-cols-3 gap-3">

          {/* Posts */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
            <Image
              size={20}
              className="mx-auto text-(--text-secondary)"
            />

            <p className="mt-2 text-xl font-bold text-white">
              {profile.postsCount ?? 0}
            </p>

            <p className="text-xs text-(--text-muted)">
              Posts
            </p>
          </div>


          {/* Followers */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
            <Users
              size={20}
              className="mx-auto text-(--text-secondary)"
            />

            <p className="mt-2 text-xl font-bold text-white">
              {profile.followersCount ?? 0}
            </p>

            <p className="text-xs text-(--text-muted)">
              Followers
            </p>
          </div>


          {/* Following */}
          <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
            <UserPlus
              size={20}
              className="mx-auto text-(--text-secondary)"
            />

            <p className="mt-2 text-xl font-bold text-white">
              {profile.followingCount ?? 0}
            </p>

            <p className="text-xs text-(--text-muted)">
              Following
            </p>
          </div>

        </div>
      </div>


      {/* Account Information */}
      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Account Information
        </h3>

        <div className="space-y-3">

          {/* User ID */}
          <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <Hash
                size={18}
                className="text-(--text-secondary)"
              />

              <span className="text-sm text-(--text-secondary)">
                User ID
              </span>
            </div>

            <span className="text-sm font-medium text-white">
              #{profile.id}
            </span>
          </div>


          {/* Account Status */}
          <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="text-(--text-secondary)"
              />

              <span className="text-sm text-(--text-secondary)">
                Account Status
              </span>
            </div>

            <span className="rounded-full bg-(--success)/10 px-3 py-1 text-xs font-medium text-(--success)">
              Active
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

  const renderContent = () => {
    switch (activeSection) {
      case "edit-profile":
        // return (
        //   <div>
        //     <h2 className="text-xl font-semibold text-white">
        //       Edit Profile
        //     </h2>

        //     <p className="mt-1 text-sm text-(--text-secondary)">
        //       Update your profile information and profile picture.
        //     </p>

        //     <div className="mt-8">
        //       <p className="text-sm text-(--text-secondary)">
        //         Edit Profile content will appear here.
        //       </p>
        //     </div>
        //   </div>
        // );
         return (
    <div>
      <h2 className="text-xl font-semibold text-white">
        Edit Profile
      </h2>

      <p className="mt-1 text-sm text-(--text-secondary)">
        Update your profile information and profile picture.
      </p>

      {profileLoading ? (
        <div className="mt-8">
          <p className="text-sm text-(--text-secondary)">
            Loading profile...
          </p>
        </div>
      ) : profile ? (
        <div className="mt-8 max-w-2xl">

          {/* PROFILE PREVIEW */}
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-(--border) bg-(--background-secondary) p-4">

            <div className="h-16 w-16 overflow-hidden rounded-full bg-(--primary)">
              {profile.profileImage ? (
                <img
                  // src={`http://localhost:5000${profile.profileImage}`}
                  src={`${import.meta.env.VITE_API_URL}${profile.profileImage}`}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {profile.fullName
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-white">
                {profile.fullName}
              </p>

              <p className="text-sm text-(--text-secondary)">
                @{profile.username}
              </p>

              <p className="mt-1 text-xs text-(--text-muted)">
                {profile.email}
              </p>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button
            type="button"
            onClick={() =>
              setShowEditProfile(true)
            }
            className="rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-sm text-(--danger)">
            Unable to load profile.
          </p>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEditProfile && profile && (
        <EditProfileModal
          user={profile}
          onClose={() =>
            setShowEditProfile(false)
          }
          onUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );

      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold text-white">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-(--text-secondary)">
              Manage your notification preferences.
            </p>

            <div className="mt-8">
              <p className="text-sm text-(--text-secondary)">
                Notification settings will appear here.
              </p>
            </div>
          </div>
        );

      case "saved":
        // return (
        //   <div>
        //     <h2 className="text-xl font-semibold text-white">
        //       Saved Posts
        //     </h2>

        //     <p className="mt-1 text-sm text-(--text-secondary)">
        //       View all posts you have saved.
        //     </p>

        //     <div className="mt-8">
        //       <p className="text-sm text-(--text-secondary)">
        //         Saved posts will appear here.
        //       </p>
        //     </div>
        //   </div>
        // );
         return (
    <div>
      <h2 className="text-xl font-semibold text-white">
        Saved Posts
      </h2>

      <p className="mt-1 text-sm text-(--text-secondary)">
        Posts you have saved.
      </p>

      {savedLoading ? (
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-sm text-(--text-secondary)">
            Loading saved posts...
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <ProfilePostGrid
            posts={savedPosts
              .filter((item) => item.post)
              .map((item) => ({
                ...item.post,
                isSaved: true,
              }))}
            onPostClick={(post) =>
              setSelectedSavedPost(post)
            }
          />
        </div>
      )}

      {selectedSavedPost && (
        <PostModal
          post={selectedSavedPost}
          onClose={() =>
            setSelectedSavedPost(null)
          }
        />
      )}
    </div>
  );

      case "followers":
        // return (
        //   <div>
        //     <h2 className="text-xl font-semibold text-white">
        //       Followers & Following
        //     </h2>

        //     <p className="mt-1 text-sm text-(--text-secondary)">
        //       Manage your followers and following list.
        //     </p>

        //     <div className="mt-8">
        //       <div className="flex border-b border-(--border)">
        //         <button
        //           type="button"
        //           className="border-b-2 border-(--primary) px-5 py-3 text-sm font-medium text-white"
        //         >
        //           Followers
        //         </button>

        //         <button
        //           type="button"
        //           className="px-5 py-3 text-sm font-medium text-(--text-secondary) transition hover:text-white"
        //         >
        //           Following
        //         </button>
        //       </div>

        //       <div className="py-8 text-center">
        //         <p className="text-sm text-(--text-secondary)">
        //           Followers and following will appear here.
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // );
        return renderFollowersFollowing();

      case "profile-details":
  return renderProfileDetails();
        // return (
        //   <div>
        //     <h2 className="text-xl font-semibold text-white">
        //       Profile Details
        //     </h2>

        //     <p className="mt-1 text-sm text-(--text-secondary)">
        //       View your complete account and profile information.
        //     </p>

        //     <div className="mt-8">
        //       <p className="text-sm text-(--text-secondary)">
        //         Profile details will appear here.
        //       </p>
        //     </div>
        //   </div>
        // );

      case "change-password":
         return renderForgotPassword();
        // return (
        //   <div>
        //     <h2 className="text-xl font-semibold text-white">
        //       Forgot Password
        //     </h2>

        //     <p className="mt-1 text-sm text-(--text-secondary)">
        //       Reset or change your account password.
        //     </p>

        //     <div className="mt-8">
        //       <p className="text-sm text-(--text-secondary)">
        //         Password reset form will appear here.
        //       </p>
        //     </div>
        //   </div>
        // );

      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 py-6 md:px-8">
      {/* PAGE HEADER */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-1 text-sm text-(--text-secondary)">
            Manage your SnapGrid account and preferences.
          </p>
        </div>

        {/* SETTINGS CONTAINER */}
        <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
          <div className="flex min-h-[calc(100vh-180px)] flex-col md:flex-row">

            {/* SIDEBAR */}
            <aside className="w-full shrink-0 border-b border-(--border) md:w-64 md:border-b-0 md:border-r">

              <div className="p-3 md:sticky md:top-0">

                <div className="mb-3 px-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
                    Account Settings
                  </p>
                </div>

                <div className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-1">

                  {settingsOptions.map((option) => {
                    const Icon = option.icon;

                    const isActive =
                      activeSection === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setActiveSection(option.id)
                        }
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                          isActive
                            ? "bg-(--primary)/15 text-white"
                            : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-(--primary)"
                              : "text-(--text-secondary) group-hover:text-white"
                          }
                        />

                        <span className="flex-1">
                          {option.label}
                        </span>

                        <ChevronRight
                          size={16}
                          className={`transition ${
                            isActive
                              ? "text-(--primary)"
                              : "text-transparent group-hover:text-(--text-muted)"
                          }`}
                        />
                      </button>



                    );
                  })}

                </div>

                {/* LOGOUT */}
                <button
  type="button"
  onClick={Logout}
  className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 md:hidden"
>
  <LogOut size={17} />
  <span>Logout</span>
</button>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <main className="min-w-0 flex-1">
              <div className="h-full overflow-y-auto p-5 md:p-8">
                {renderContent()}
              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;