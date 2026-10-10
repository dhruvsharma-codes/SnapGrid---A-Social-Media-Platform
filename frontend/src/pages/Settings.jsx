// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
// import { getUserProfile } from "../services/userService.js";
// import EditProfileModal from "../components/profile/EditProfileModal.jsx";
// import { getSavedPosts } from "../services/savedPostService.js";
// import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
// import PostModal from "../components/profile/PostModal.jsx";
// import {
//   UserRound,
//   Bell,
//   Bookmark,
//   Users,
//   UserCircle,
//   LockKeyhole,
//   ChevronRight,
//     UserPlus,
//     User,
//   Mail,
//   AtSign,
//   FileText,
//   Image,
//   ShieldCheck,
//   Hash,
//   EyeOff,
//   Eye,
//   LogOut

// } from "lucide-react";
// import {
//   getFollowers,
//   getFollowing,
//     unfollowUser,
// } from "../services/followService.js";
// import { changePassword } from "../services/authService.js";
// import { useNavigate } from "react-router-dom";

// const Settings = () => {

//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] =
//     useState("edit-profile");
//     const { user: loggedInUser, setUser, Logout } = useAuth();

// const [profile, setProfile] = useState(null);
// const [showEditProfile, setShowEditProfile] =
//   useState(false);
// const [profileLoading, setProfileLoading] =
//   useState(true);

//   const [savedPosts, setSavedPosts] = useState([]);
// const [savedLoading, setSavedLoading] = useState(false);
// const [selectedSavedPost, setSelectedSavedPost] =
//   useState(null);

//   const [followTab, setFollowTab] = useState("followers");

// const [followers, setFollowers] = useState([]);
// const [following, setFollowing] = useState([]);

// const [followersLoading, setFollowersLoading] = useState(false);
// const [followingLoading, setFollowingLoading] = useState(false);
// const [unfollowLoading, setUnfollowLoading] =
//   useState(null);

//   const [currentPassword, setCurrentPassword] =
//   useState("");

// const [newPassword, setNewPassword] =
//   useState("");

// const [confirmPassword, setConfirmPassword] =
//   useState("");

// const [passwordLoading, setPasswordLoading] =
//   useState(false);

// const [passwordError, setPasswordError] =
//   useState("");

// const [passwordSuccess, setPasswordSuccess] =
//   useState("");

// const [showCurrentPassword, setShowCurrentPassword] =
//   useState(false);

// const [showNewPassword, setShowNewPassword] =
//   useState(false);

// const [showConfirmPassword, setShowConfirmPassword] =
//   useState(false);

//   const settingsOptions = [
//     {
//       id: "edit-profile",
//       label: "Edit Profile",
//       icon: UserRound,
//     },
//     {
//       id: "notifications",
//       label: "Notifications",
//       icon: Bell,
//     },
//     {
//       id: "saved",
//       label: "Saved Posts",
//       icon: Bookmark,
//     },
//     {
//       id: "followers",
//       label: "Followers & Following",
//       icon: Users,
//     },
//     {
//       id: "profile-details",
//       label: "Profile Details",
//       icon: UserCircle,
//     },
//     {
//       id: "change-password",
//       label: "Change Password",
//       icon: LockKeyhole,
//     },
//   ];

//   useEffect(() => {
//   const loadProfile = async () => {
//     if (!loggedInUser?.username) {
//       return;
//     }

//     try {
//       setProfileLoading(true);

//       const response = await getUserProfile(
//         loggedInUser.username
//       );

//       setProfile(response.data.user);
//     } catch (error) {
//       console.error(
//         "Settings Profile Error:",
//         error
//       );
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   loadProfile();
// }, [loggedInUser?.username]);

// const handleProfileUpdated = (updatedUser) => {
//   setProfile(updatedUser);
//   setUser(updatedUser);
//   setShowEditProfile(false);
// };

// const loadSavedPosts = async () => {
//   try {
//     setSavedLoading(true);

//     const response = await getSavedPosts();

//     setSavedPosts(
//       response.data?.posts || []
//     );
//   } catch (error) {
//     console.error(
//       "Settings Saved Posts Error:",
//       error
//     );
//   } finally {
//     setSavedLoading(false);
//   }
// };

// const loadFollowers = async () => {
//   try {
//     setFollowersLoading(true);

//     const response = await getFollowers();

//     setFollowers(response.data?.users || []);
//   } catch (error) {
//     console.error("Followers Error:", error);
//   } finally {
//     setFollowersLoading(false);
//   }
// };

// const loadFollowing = async () => {
//   try {
//     setFollowingLoading(true);

//     const response = await getFollowing();

//     setFollowing(response.data?.users || []);
//   } catch (error) {
//     console.error("Following Error:", error);
//   } finally {
//     setFollowingLoading(false);
//   }
// };

// const handleUnfollow = async (userId) => {
//   if (unfollowLoading === userId) {
//     return;
//   }

//   const confirmed = window.confirm(
//     "Are you sure you want to unfollow this user?"
//   );

//   if (!confirmed) {
//     return;
//   }

//   try {
//     setUnfollowLoading(userId);

//     await unfollowUser(userId);

//     // Remove user from following list
//     setFollowing((currentFollowing) =>
//       currentFollowing.filter(
//         (user) => Number(user.id) !== Number(userId)
//       )
//     );
//   } catch (error) {
//     console.error(
//       "Unfollow Error:",
//       error
//     );
//   } finally {
//     setUnfollowLoading(null);
//   }
// };

// useEffect(() => {
//   if (activeSection === "saved") {
//     loadSavedPosts();
//   }
// }, [activeSection]);

// useEffect(() => {
//   if (activeSection !== "followers") {
//     return;
//   }

//   loadFollowers();
//   loadFollowing();
// }, [activeSection]);

// const handleChangePassword = async (e) => {
//   e.preventDefault();

//   setPasswordError("");
//   setPasswordSuccess("");

//   // Validation
//   if (
//     !currentPassword ||
//     !newPassword ||
//     !confirmPassword
//   ) {
//     setPasswordError(
//       "Please fill all password fields."
//     );
//     return;
//   }

//   if (newPassword.length < 6) {
//     setPasswordError(
//       "New password must be at least 6 characters."
//     );
//     return;
//   }

//   if (newPassword !== confirmPassword) {
//     setPasswordError(
//       "New password and confirm password do not match."
//     );
//     return;
//   }

//   try {
//     setPasswordLoading(true);

//     const response = await changePassword({
//       currentPassword,
//       newPassword,
//     });

//     setPasswordSuccess(
//       response.message ||
//         "Password changed successfully."
//     );

//     // Clear form
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   } catch (error) {
//     console.error(
//       "Change Password Error:",
//       error
//     );

//     setPasswordError(
//       error.message ||
//         "Unable to change password."
//     );
//   } finally {
//     setPasswordLoading(false);
//   }
// };

// const renderForgotPassword = () => {
//   return (
//     <div className="max-w-2xl">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)/10">
//           <LockKeyhole
//             size={22}
//             className="text-(--primary)"
//           />
//         </div>

//         <h2 className="text-xl font-semibold text-white">
//           Change Password
//         </h2>

//         <p className="mt-1 text-sm text-(--text-secondary)">
//           Update your password to keep your account secure.
//         </p>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleChangePassword}
//         className="rounded-2xl border border-(--border) bg-(--card) p-6"
//       >
//         {/* Current Password */}
//         <div className="mb-5">
//           <label className="mb-2 block text-sm font-medium text-white">
//             Current Password
//           </label>

//           <div className="relative">
//             <input
//               type={
//                 showCurrentPassword
//                   ? "text"
//                   : "password"
//               }
//               value={currentPassword}
//               onChange={(e) =>
//                 setCurrentPassword(e.target.value)
//               }
//               placeholder="Enter current password"
//               autoComplete="current-password"
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowCurrentPassword(
//                   (value) => !value
//                 )
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
//             >
//               {showCurrentPassword ? (
//                 <EyeOff size={18} />
//               ) : (
//                 <Eye size={18} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* New Password */}
//         <div className="mb-5">
//           <label className="mb-2 block text-sm font-medium text-white">
//             New Password
//           </label>

//           <div className="relative">
//             <input
//               type={
//                 showNewPassword
//                   ? "text"
//                   : "password"
//               }
//               value={newPassword}
//               onChange={(e) =>
//                 setNewPassword(e.target.value)
//               }
//               placeholder="Enter new password"
//               autoComplete="new-password"
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowNewPassword(
//                   (value) => !value
//                 )
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
//             >
//               {showNewPassword ? (
//                 <EyeOff size={18} />
//               ) : (
//                 <Eye size={18} />
//               )}
//             </button>
//           </div>

//           <p className="mt-2 text-xs text-(--text-muted)">
//             Password must be at least 6 characters.
//           </p>
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-6">
//           <label className="mb-2 block text-sm font-medium text-white">
//             Confirm New Password
//           </label>

//           <div className="relative">
//             <input
//               type={
//                 showConfirmPassword
//                   ? "text"
//                   : "password"
//               }
//               value={confirmPassword}
//               onChange={(e) =>
//                 setConfirmPassword(e.target.value)
//               }
//               placeholder="Confirm new password"
//               autoComplete="new-password"
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmPassword(
//                   (value) => !value
//                 )
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
//             >
//               {showConfirmPassword ? (
//                 <EyeOff size={18} />
//               ) : (
//                 <Eye size={18} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Error */}
//         {passwordError && (
//           <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//             {passwordError}
//           </div>
//         )}

//         {/* Success */}
//         {passwordSuccess && (
//           <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
//             {passwordSuccess}
//           </div>
//         )}

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={passwordLoading}
//           className="w-full rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {passwordLoading
//             ? "Updating Password..."
//             : "Update Password"}
//         </button>
//       </form>

//       {/* Security Information */}
//       <div className="mt-4 flex gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
//         <ShieldCheck
//           size={20}
//           className="mt-0.5 shrink-0 text-(--success)"
//         />

//         <div>
//           <p className="text-sm font-medium text-white">
//             Keep your account secure
//           </p>

//           <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
//             Use a strong password that you don't use
//             on other websites.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const renderFollowersFollowing = () => {
//   const users =
//     followTab === "followers"
//       ? followers
//       : following;

//   const loading =
//     followTab === "followers"
//       ? followersLoading
//       : followingLoading;

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-white">
//           Followers & Following
//         </h2>

//         <p className="mt-1 text-sm text-(--text-secondary)">
//           Manage your followers and the people you follow.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="mb-6 flex border-b border-(--border)">
//         <button
//           type="button"
//           onClick={() => setFollowTab("followers")}
//           className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
//             followTab === "followers"
//               ? "border-b-2 border-(--primary) text-white"
//               : "text-(--text-secondary) hover:text-white"
//           }`}
//         >
//           <Users size={17} />

//           Followers

//           <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
//             {followers.length}
//           </span>
//         </button>

//         <button
//           type="button"
//           onClick={() => setFollowTab("following")}
//           className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
//             followTab === "following"
//               ? "border-b-2 border-(--primary) text-white"
//               : "text-(--text-secondary) hover:text-white"
//           }`}
//         >
//           <UserPlus size={17} />

//           Following

//           <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
//             {following.length}
//           </span>
//         </button>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <div className="flex min-h-60 items-center justify-center">
//           <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
//         </div>
//       ) : users.length === 0 ? (
//         <div className="flex min-h-60 flex-col items-center justify-center text-center">
//           <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--card)">
//             <UserRound
//               size={28}
//               className="text-(--text-muted)"
//             />
//           </div>

//           <h3 className="text-lg font-semibold text-white">
//             {followTab === "followers"
//               ? "No Followers Yet"
//               : "Not Following Anyone"}
//           </h3>

//           <p className="mt-1 text-sm text-(--text-secondary)">
//             {followTab === "followers"
//               ? "When people follow you, they will appear here."
//               : "People you follow will appear here."}
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4 transition hover:bg-(--card-hover)"
//             >
//               {/* User */}
//               <div className="flex min-w-0 items-center gap-3">
//                 {user.profileImage ? (
//                   <img
//                     src={
//                       user.profileImage.startsWith("http")
//                         ? user.profileImage
//                         // : `http://localhost:5000${user.profileImage}`
//                         : `${import.meta.env.VITE_API_URL}${user.profileImage}`
//                     }
//                     alt={user.username}
//                     className="h-12 w-12 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary)">
//                     <span className="font-semibold text-white">
//                       {user.username
//                         ?.charAt(0)
//                         ?.toUpperCase()}
//                     </span>
//                   </div>
//                 )}

//                 <div className="min-w-0">
//                   <p className="truncate font-semibold text-white">
//                     {user.fullName || user.username}
//                   </p>

//                   <p className="truncate text-sm text-(--text-secondary)">
//                     @{user.username}
//                   </p>

//                   {user.bio && (
//                     <p className="mt-1 line-clamp-1 text-xs text-(--text-muted)">
//                       {user.bio}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Action */}
//               {/* <button
//                 type="button"
//                 className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
//               >
//                 {followTab === "followers"
//                   ? "View Profile"
//                   : "Following"}
//               </button> */}
//               {/* <button
//   type="button"
//   onClick={() => {
//     navigate(`/profile/${user.username}`);
//   }}
//   className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
// >
//   View Profile
// </button> */}

// {/* Action */}
// {followTab === "followers" ? (
//   <button
//     type="button"
//     onClick={() => {
//       navigate(`/profile/${user.username}`);
//     }}
//     className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
//   >
//     View Profile
//   </button>
// ) : (
//   <button
//     type="button"
//     disabled={unfollowLoading === user.id}
//     onClick={() => handleUnfollow(user.id)}
//     className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
//   >
//     {unfollowLoading === user.id
//       ? "Unfollowing..."
//       : "Following"}
//   </button>
// )}

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// const renderProfileDetails = () => {
//   if (profileLoading) {
//     return (
//       <div className="flex min-h-60 items-center justify-center">
//         <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex min-h-60 items-center justify-center text-sm text-(--text-secondary)">
//         Unable to load profile details.
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-white">
//           Profile Details
//         </h2>

//         <p className="mt-1 text-sm text-(--text-secondary)">
//           View your complete profile and account information.
//         </p>
//       </div>

//       {/* Profile Card */}
//       <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        
//         {/* Cover */}
//         <div className="relative h-36 bg-(--background-secondary)">
//           {profile.coverImage ? (
//             <img
//               src={
//                 profile.coverImage.startsWith("http")
//                   ? profile.coverImage
//                   // : `http://localhost:5000${profile.coverImage}`
//                   : `${import.meta.env.VITE_API_URL}${profile.coverImage}`
//               }
//               alt="Cover"
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="h-full w-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)" />
//           )}

//           {/* Profile Image */}
//           <div className="absolute -bottom-12 left-6">
//             {profile.profileImage ? (
//               <img
//                 src={
//                   profile.profileImage.startsWith("http")
//                     ? profile.profileImage
//                     // : `http://localhost:5000${profile.profileImage}`
//                     : `${import.meta.env.VITE_API_URL}${profile.profileImage}`
//                 }
//                 alt={profile.username}
//                 className="h-24 w-24 rounded-full border-4 border-(--card) object-cover"
//               />
//             ) : (
//               <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-(--card) bg-(--primary)">
//                 <span className="text-3xl font-bold text-white">
//                   {profile.username
//                     ?.charAt(0)
//                     ?.toUpperCase()}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Name */}
//         <div className="px-6 pb-6 pt-16">
//           <h3 className="text-xl font-semibold text-white">
//             {profile.fullName || profile.username}
//           </h3>

//           <p className="mt-1 text-sm text-(--text-secondary)">
//             @{profile.username}
//           </p>

//           {profile.bio && (
//             <p className="mt-4 max-w-2xl text-sm leading-6 text-(--text-secondary)">
//               {profile.bio}
//             </p>
//           )}
//         </div>
//       </div>


//       {/* Personal Information */}
//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Personal Information
//         </h3>

//         <div className="grid gap-3 md:grid-cols-2">

//           {/* Full Name */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
//                 <User
//                   size={18}
//                   className="text-(--text-secondary)"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs text-(--text-muted)">
//                   Full Name
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-white">
//                   {profile.fullName || "Not provided"}
//                 </p>
//               </div>
//             </div>
//           </div>


//           {/* Username */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
//                 <AtSign
//                   size={18}
//                   className="text-(--text-secondary)"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs text-(--text-muted)">
//                   Username
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-white">
//                   @{profile.username}
//                 </p>
//               </div>
//             </div>
//           </div>


//           {/* Email */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
//                 <Mail
//                   size={18}
//                   className="text-(--text-secondary)"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs text-(--text-muted)">
//                   Email Address
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-white">
//                   {profile.email || "Not provided"}
//                 </p>
//               </div>
//             </div>
//           </div>


//           {/* Bio */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
//                 <FileText
//                   size={18}
//                   className="text-(--text-secondary)"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs text-(--text-muted)">
//                   Bio
//                 </p>

//                 <p className="mt-1 line-clamp-2 text-sm font-medium text-white">
//                   {profile.bio || "No bio added"}
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>


//       {/* Account Statistics */}
//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Account Statistics
//         </h3>

//         <div className="grid grid-cols-3 gap-3">

//           {/* Posts */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
//             <Image
//               size={20}
//               className="mx-auto text-(--text-secondary)"
//             />

//             <p className="mt-2 text-xl font-bold text-white">
//               {profile.postsCount ?? 0}
//             </p>

//             <p className="text-xs text-(--text-muted)">
//               Posts
//             </p>
//           </div>


//           {/* Followers */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
//             <Users
//               size={20}
//               className="mx-auto text-(--text-secondary)"
//             />

//             <p className="mt-2 text-xl font-bold text-white">
//               {profile.followersCount ?? 0}
//             </p>

//             <p className="text-xs text-(--text-muted)">
//               Followers
//             </p>
//           </div>


//           {/* Following */}
//           <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
//             <UserPlus
//               size={20}
//               className="mx-auto text-(--text-secondary)"
//             />

//             <p className="mt-2 text-xl font-bold text-white">
//               {profile.followingCount ?? 0}
//             </p>

//             <p className="text-xs text-(--text-muted)">
//               Following
//             </p>
//           </div>

//         </div>
//       </div>


//       {/* Account Information */}
//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Account Information
//         </h3>

//         <div className="space-y-3">

//           {/* User ID */}
//           <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <Hash
//                 size={18}
//                 className="text-(--text-secondary)"
//               />

//               <span className="text-sm text-(--text-secondary)">
//                 User ID
//               </span>
//             </div>

//             <span className="text-sm font-medium text-white">
//               #{profile.id}
//             </span>
//           </div>


//           {/* Account Status */}
//           <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <ShieldCheck
//                 size={18}
//                 className="text-(--text-secondary)"
//               />

//               <span className="text-sm text-(--text-secondary)">
//                 Account Status
//               </span>
//             </div>

//             <span className="rounded-full bg-(--success)/10 px-3 py-1 text-xs font-medium text-(--success)">
//               Active
//             </span>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "edit-profile":
//         // return (
//         //   <div>
//         //     <h2 className="text-xl font-semibold text-white">
//         //       Edit Profile
//         //     </h2>

//         //     <p className="mt-1 text-sm text-(--text-secondary)">
//         //       Update your profile information and profile picture.
//         //     </p>

//         //     <div className="mt-8">
//         //       <p className="text-sm text-(--text-secondary)">
//         //         Edit Profile content will appear here.
//         //       </p>
//         //     </div>
//         //   </div>
//         // );
//          return (
//     <div>
//       <h2 className="text-xl font-semibold text-white">
//         Edit Profile
//       </h2>

//       <p className="mt-1 text-sm text-(--text-secondary)">
//         Update your profile information and profile picture.
//       </p>

//       {profileLoading ? (
//         <div className="mt-8">
//           <p className="text-sm text-(--text-secondary)">
//             Loading profile...
//           </p>
//         </div>
//       ) : profile ? (
//         <div className="mt-8 max-w-2xl">

//           {/* PROFILE PREVIEW */}
//           <div className="mb-6 flex items-center gap-4 rounded-xl border border-(--border) bg-(--background-secondary) p-4">

//             <div className="h-16 w-16 overflow-hidden rounded-full bg-(--primary)">
//               {profile.profileImage ? (
//                 <img
//                   // src={`http://localhost:5000${profile.profileImage}`}
//                   src={`${import.meta.env.VITE_API_URL}${profile.profileImage}`}
//                   alt={profile.username}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center">
//                   <span className="text-xl font-semibold text-white">
//                     {profile.fullName
//                       ?.charAt(0)
//                       .toUpperCase()}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="min-w-0">
//               <p className="font-semibold text-white">
//                 {profile.fullName}
//               </p>

//               <p className="text-sm text-(--text-secondary)">
//                 @{profile.username}
//               </p>

//               <p className="mt-1 text-xs text-(--text-muted)">
//                 {profile.email}
//               </p>
//             </div>
//           </div>

//           {/* EDIT BUTTON */}
//           <button
//             type="button"
//             onClick={() =>
//               setShowEditProfile(true)
//             }
//             className="rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <div className="mt-8">
//           <p className="text-sm text-(--danger)">
//             Unable to load profile.
//           </p>
//         </div>
//       )}

//       {/* EDIT PROFILE MODAL */}
//       {showEditProfile && profile && (
//         <EditProfileModal
//           user={profile}
//           onClose={() =>
//             setShowEditProfile(false)
//           }
//           onUpdated={handleProfileUpdated}
//         />
//       )}
//     </div>
//   );

//       case "notifications":
//         return (
//           <div>
//             <h2 className="text-xl font-semibold text-white">
//               Notifications
//             </h2>

//             <p className="mt-1 text-sm text-(--text-secondary)">
//               Manage your notification preferences.
//             </p>

//             <div className="mt-8">
//               <p className="text-sm text-(--text-secondary)">
//                 Notification settings will appear here.
//               </p>
//             </div>
//           </div>
//         );

//       case "saved":
//         // return (
//         //   <div>
//         //     <h2 className="text-xl font-semibold text-white">
//         //       Saved Posts
//         //     </h2>

//         //     <p className="mt-1 text-sm text-(--text-secondary)">
//         //       View all posts you have saved.
//         //     </p>

//         //     <div className="mt-8">
//         //       <p className="text-sm text-(--text-secondary)">
//         //         Saved posts will appear here.
//         //       </p>
//         //     </div>
//         //   </div>
//         // );
//          return (
//     <div>
//       <h2 className="text-xl font-semibold text-white">
//         Saved Posts
//       </h2>

//       <p className="mt-1 text-sm text-(--text-secondary)">
//         Posts you have saved.
//       </p>

//       {savedLoading ? (
//         <div className="flex min-h-60 items-center justify-center">
//           <p className="text-sm text-(--text-secondary)">
//             Loading saved posts...
//           </p>
//         </div>
//       ) : (
//         <div className="mt-8">
//           <ProfilePostGrid
//             posts={savedPosts
//               .filter((item) => item.post)
//               .map((item) => ({
//                 ...item.post,
//                 isSaved: true,
//               }))}
//             onPostClick={(post) =>
//               setSelectedSavedPost(post)
//             }
//           />
//         </div>
//       )}

//       {selectedSavedPost && (
//         <PostModal
//           post={selectedSavedPost}
//           onClose={() =>
//             setSelectedSavedPost(null)
//           }
//         />
//       )}
//     </div>
//   );

//       case "followers":
//         // return (
//         //   <div>
//         //     <h2 className="text-xl font-semibold text-white">
//         //       Followers & Following
//         //     </h2>

//         //     <p className="mt-1 text-sm text-(--text-secondary)">
//         //       Manage your followers and following list.
//         //     </p>

//         //     <div className="mt-8">
//         //       <div className="flex border-b border-(--border)">
//         //         <button
//         //           type="button"
//         //           className="border-b-2 border-(--primary) px-5 py-3 text-sm font-medium text-white"
//         //         >
//         //           Followers
//         //         </button>

//         //         <button
//         //           type="button"
//         //           className="px-5 py-3 text-sm font-medium text-(--text-secondary) transition hover:text-white"
//         //         >
//         //           Following
//         //         </button>
//         //       </div>

//         //       <div className="py-8 text-center">
//         //         <p className="text-sm text-(--text-secondary)">
//         //           Followers and following will appear here.
//         //         </p>
//         //       </div>
//         //     </div>
//         //   </div>
//         // );
//         return renderFollowersFollowing();

//       case "profile-details":
//   return renderProfileDetails();
//         // return (
//         //   <div>
//         //     <h2 className="text-xl font-semibold text-white">
//         //       Profile Details
//         //     </h2>

//         //     <p className="mt-1 text-sm text-(--text-secondary)">
//         //       View your complete account and profile information.
//         //     </p>

//         //     <div className="mt-8">
//         //       <p className="text-sm text-(--text-secondary)">
//         //         Profile details will appear here.
//         //       </p>
//         //     </div>
//         //   </div>
//         // );

//       case "change-password":
//          return renderForgotPassword();
//         // return (
//         //   <div>
//         //     <h2 className="text-xl font-semibold text-white">
//         //       Forgot Password
//         //     </h2>

//         //     <p className="mt-1 text-sm text-(--text-secondary)">
//         //       Reset or change your account password.
//         //     </p>

//         //     <div className="mt-8">
//         //       <p className="text-sm text-(--text-secondary)">
//         //         Password reset form will appear here.
//         //       </p>
//         //     </div>
//         //   </div>
//         // );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full px-4 py-6 md:px-8">
//       {/* PAGE HEADER */}
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white">
//             Settings
//           </h1>

//           <p className="mt-1 text-sm text-(--text-secondary)">
//             Manage your SnapGrid account and preferences.
//           </p>
//         </div>

//         {/* SETTINGS CONTAINER */}
//         <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
//           <div className="flex min-h-[calc(100vh-180px)] flex-col md:flex-row">

//             {/* SIDEBAR */}
//             <aside className="w-full shrink-0 border-b border-(--border) md:w-64 md:border-b-0 md:border-r">

//               <div className="p-3 md:sticky md:top-0">

//                 <div className="mb-3 px-3 pt-2">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
//                     Account Settings
//                   </p>
//                 </div>

//                 <div className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-1">

//                   {settingsOptions.map((option) => {
//                     const Icon = option.icon;

//                     const isActive =
//                       activeSection === option.id;

//                     return (
//                       <button
//                         key={option.id}
//                         type="button"
//                         onClick={() =>
//                           setActiveSection(option.id)
//                         }
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
//                           isActive
//                             ? "bg-(--primary)/15 text-white"
//                             : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//                         }`}
//                       >
//                         <Icon
//                           size={18}
//                           className={
//                             isActive
//                               ? "text-(--primary)"
//                               : "text-(--text-secondary) group-hover:text-white"
//                           }
//                         />

//                         <span className="flex-1">
//                           {option.label}
//                         </span>

//                         <ChevronRight
//                           size={16}
//                           className={`transition ${
//                             isActive
//                               ? "text-(--primary)"
//                               : "text-transparent group-hover:text-(--text-muted)"
//                           }`}
//                         />
//                       </button>



//                     );
//                   })}

//                 </div>

//                 {/* LOGOUT */}
//                 <button
//   type="button"
//   onClick={Logout}
//   className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 md:hidden"
// >
//   <LogOut size={17} />
//   <span>Logout</span>
// </button>
//               </div>
//             </aside>

//             {/* RIGHT CONTENT */}
//             <main className="min-w-0 flex-1">
//               <div className="h-full overflow-y-auto p-5 md:p-8">
//                 {renderContent()}
//               </div>
//             </main>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
























// import { memo, useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   UserRound,
//   Bell,
//   Bookmark,
//   Users,
//   UserCircle,
//   LockKeyhole,
//   ChevronRight,
//   UserPlus,
//   User,
//   Mail,
//   AtSign,
//   FileText,
//   Image,
//   ShieldCheck,
//   Hash,
//   EyeOff,
//   Eye,
//   LogOut,
// } from "lucide-react";

// import { useAuth } from "../context/AuthContext.jsx";
// import { getUserProfile } from "../services/userService.js";
// import { getSavedPosts } from "../services/savedPostService.js";
// import {
//   getFollowers,
//   getFollowing,
//   unfollowUser,
// } from "../services/followService.js";
// import { changePassword } from "../services/authService.js";
// import EditProfileModal from "../components/profile/EditProfileModal.jsx";
// import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
// import PostModal from "../components/profile/PostModal.jsx";

// // =============================================================
// // CONSTANTS & HELPERS
// // =============================================================

// const API_URL = import.meta.env.VITE_API_URL;
// const MIN_PASSWORD_LENGTH = 6;

// const assetUrl = (path) => {
//   if (!path) return "";
//   if (/^https?:\/\//.test(path)) return path;
//   return `${API_URL}${path}`;
// };

// const SETTINGS_OPTIONS = [
//   { id: "edit-profile", label: "Edit Profile", icon: UserRound },
//   { id: "notifications", label: "Notifications", icon: Bell },
//   { id: "saved", label: "Saved Posts", icon: Bookmark },
//   { id: "followers", label: "Followers & Following", icon: Users },
//   { id: "profile-details", label: "Profile Details", icon: UserCircle },
//   { id: "change-password", label: "Change Password", icon: LockKeyhole },
// ];

// const passwordInputClass =
//   "w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)";

// // =============================================================
// // SMALL SHARED PIECES
// // =============================================================

// const Spinner = () => (
//   <div className="flex min-h-60 items-center justify-center">
//     <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
//   </div>
// );

// const SectionHeader = ({ title, subtitle }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold text-white">{title}</h2>
//     <p className="mt-1 text-sm text-(--text-secondary)">{subtitle}</p>
//   </div>
// );

// const ErrorBanner = ({ children }) =>
//   children ? (
//     <div
//       role="alert"
//       className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
//     >
//       {children}
//     </div>
//   ) : null;

// const Avatar = memo(function Avatar({
//   src,
//   name,
//   className = "h-12 w-12",
//   textClass = "font-semibold text-white",
// }) {
//   const [failed, setFailed] = useState(false);

//   useEffect(() => {
//     setFailed(false);
//   }, [src]);

//   if (src && !failed) {
//     return (
//       <img
//         src={assetUrl(src)}
//         alt={name || "User"}
//         loading="lazy"
//         onError={() => setFailed(true)}
//         className={`${className} shrink-0 rounded-full object-cover`}
//       />
//     );
//   }

//   return (
//     <div
//       className={`${className} flex shrink-0 items-center justify-center rounded-full bg-(--primary)`}
//     >
//       <span className={textClass}>
//         {(name || "?").charAt(0).toUpperCase()}
//       </span>
//     </div>
//   );
// });

// // =============================================================
// // CHANGE PASSWORD (owns its state, so typing never re-renders Settings)
// // =============================================================

// const PasswordField = ({ id, label, hint, ...inputProps }) => {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="mb-5">
//       <label
//         htmlFor={id}
//         className="mb-2 block text-sm font-medium text-white"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           id={id}
//           type={show ? "text" : "password"}
//           className={passwordInputClass}
//           {...inputProps}
//         />

//         <button
//           type="button"
//           onClick={() => setShow((value) => !value)}
//           aria-label={show ? "Hide password" : "Show password"}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
//         >
//           {show ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       </div>

//       {hint && <p className="mt-2 text-xs text-(--text-muted)">{hint}</p>}
//     </div>
//   );
// };

// const ChangePasswordSection = () => {
//   const [form, setForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     setError("");
//     setSuccess("");

//     const { currentPassword, newPassword, confirmPassword } = form;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setError("Please fill all password fields.");
//       return;
//     }

//     if (newPassword.length < MIN_PASSWORD_LENGTH) {
//       setError(
//         `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`
//       );
//       return;
//     }

//     if (newPassword === currentPassword) {
//       setError("New password must be different from the current password.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("New password and confirm password do not match.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await changePassword({ currentPassword, newPassword });

//       setSuccess(response?.message || "Password changed successfully.");
//       setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       console.error("Change Password Error:", err);
//       setError(err.message || "Unable to change password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl">
//       <div className="mb-6">
//         <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)/10">
//           <LockKeyhole size={22} className="text-(--primary)" />
//         </div>
//         <h2 className="text-xl font-semibold text-white">Change Password</h2>
//         <p className="mt-1 text-sm text-(--text-secondary)">
//           Update your password to keep your account secure.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="rounded-2xl border border-(--border) bg-(--card) p-6"
//       >
//         <PasswordField
//           id="currentPassword"
//           name="currentPassword"
//           label="Current Password"
//           value={form.currentPassword}
//           onChange={handleChange}
//           placeholder="Enter current password"
//           autoComplete="current-password"
//         />

//         <PasswordField
//           id="newPassword"
//           name="newPassword"
//           label="New Password"
//           value={form.newPassword}
//           onChange={handleChange}
//           placeholder="Enter new password"
//           autoComplete="new-password"
//           hint={`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`}
//         />

//         <PasswordField
//           id="confirmPassword"
//           name="confirmPassword"
//           label="Confirm New Password"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm new password"
//           autoComplete="new-password"
//         />

//         <ErrorBanner>{error}</ErrorBanner>

//         {success && (
//           <div
//             role="status"
//             className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
//           >
//             {success}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {loading ? "Updating Password..." : "Update Password"}
//         </button>
//       </form>

//       <div className="mt-4 flex gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
//         <ShieldCheck size={20} className="mt-0.5 shrink-0 text-(--success)" />
//         <div>
//           <p className="text-sm font-medium text-white">
//             Keep your account secure
//           </p>
//           <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
//             Use a strong password that you don't use on other websites.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =============================================================
// // FOLLOWERS & FOLLOWING
// // =============================================================

// const UserRow = memo(function UserRow({
//   user,
//   mode,
//   busy,
//   onView,
//   onUnfollow,
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4 transition hover:bg-(--card-hover)">
//       <div className="flex min-w-0 items-center gap-3">
//         <Avatar src={user.profileImage} name={user.username} />

//         <div className="min-w-0">
//           <p className="truncate font-semibold text-white">
//             {user.fullName || user.username}
//           </p>
//           <p className="truncate text-sm text-(--text-secondary)">
//             @{user.username}
//           </p>
//           {user.bio && (
//             <p className="mt-1 line-clamp-1 text-xs text-(--text-muted)">
//               {user.bio}
//             </p>
//           )}
//         </div>
//       </div>

//       {mode === "followers" ? (
//         <button
//           type="button"
//           onClick={() => onView(user.username)}
//           className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
//         >
//           View Profile
//         </button>
//       ) : (
//         <button
//           type="button"
//           disabled={busy}
//           onClick={() => onUnfollow(user.id)}
//           className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {busy ? "Unfollowing..." : "Following"}
//         </button>
//       )}
//     </div>
//   );
// });

// const FollowersSection = ({ onUnfollowed }) => {
//   const navigate = useNavigate();

//   const [tab, setTab] = useState("followers");
//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unfollowLoading, setUnfollowLoading] = useState(null);
//   const [error, setError] = useState("");

//   // fetch both lists in parallel, once
//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       const [followersResult, followingResult] = await Promise.allSettled([
//         getFollowers(),
//         getFollowing(),
//       ]);

//       if (cancelled) return;

//       if (followersResult.status === "fulfilled") {
//         setFollowers(followersResult.value?.data?.users || []);
//       }
//       if (followingResult.status === "fulfilled") {
//         setFollowing(followingResult.value?.data?.users || []);
//       }
//       if (
//         followersResult.status === "rejected" ||
//         followingResult.status === "rejected"
//       ) {
//         setError("Some follow data could not be loaded.");
//       }

//       setLoading(false);
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const handleView = useCallback(
//     (username) => navigate(`/profile/${username}`),
//     [navigate]
//   );

//   const handleUnfollow = useCallback(
//     async (userId) => {
//       if (!window.confirm("Are you sure you want to unfollow this user?")) {
//         return;
//       }

//       try {
//         setUnfollowLoading(userId);
//         setError("");

//         await unfollowUser(userId);

//         setFollowing((current) =>
//           current.filter((user) => Number(user.id) !== Number(userId))
//         );
//         onUnfollowed?.();
//       } catch (err) {
//         console.error("Unfollow Error:", err);
//         setError(err.message || "Could not unfollow this user.");
//       } finally {
//         setUnfollowLoading(null);
//       }
//     },
//     [onUnfollowed]
//   );

//   const users = tab === "followers" ? followers : following;

//   const tabs = [
//     { id: "followers", label: "Followers", icon: Users, count: followers.length },
//     { id: "following", label: "Following", icon: UserPlus, count: following.length },
//   ];

//   return (
//     <div>
//       <SectionHeader
//         title="Followers & Following"
//         subtitle="Manage your followers and the people you follow."
//       />

//       <div className="mb-6 flex border-b border-(--border)">
//         {tabs.map(({ id, label, icon: Icon, count }) => (
//           <button
//             key={id}
//             type="button"
//             onClick={() => setTab(id)}
//             className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
//               tab === id
//                 ? "border-b-2 border-(--primary) text-white"
//                 : "text-(--text-secondary) hover:text-white"
//             }`}
//           >
//             <Icon size={17} />
//             {label}
//             <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
//               {count}
//             </span>
//           </button>
//         ))}
//       </div>

//       <ErrorBanner>{error}</ErrorBanner>

//       {loading ? (
//         <Spinner />
//       ) : users.length === 0 ? (
//         <div className="flex min-h-60 flex-col items-center justify-center text-center">
//           <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--card)">
//             <UserRound size={28} className="text-(--text-muted)" />
//           </div>
//           <h3 className="text-lg font-semibold text-white">
//             {tab === "followers" ? "No Followers Yet" : "Not Following Anyone"}
//           </h3>
//           <p className="mt-1 text-sm text-(--text-secondary)">
//             {tab === "followers"
//               ? "When people follow you, they will appear here."
//               : "People you follow will appear here."}
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {users.map((user) => (
//             <UserRow
//               key={user.id}
//               user={user}
//               mode={tab}
//               busy={unfollowLoading === user.id}
//               onView={handleView}
//               onUnfollow={handleUnfollow}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // =============================================================
// // SAVED POSTS
// // =============================================================

// const SavedSection = () => {
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       try {
//         const response = await getSavedPosts();
//         console.log("Saved Posts API Response:", response);
// console.log(
//   "First Saved Post:",
//   response?.data?.posts?.[0]?.post
// );
//         if (!cancelled) setSavedPosts(response?.data?.posts || []);
//       } catch (err) {
//         console.error("Settings Saved Posts Error:", err);
//         if (!cancelled) setError(err.message || "Failed to load saved posts");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const gridPosts = savedPosts
//     .filter((item) => item.post)
//     .map((item) => ({ ...item.post, isSaved: true }));

//   const removePost = useCallback((postId) => {
//     setSavedPosts((current) =>
//       current.filter((item) => item.post?.id !== postId)
//     );
//     setSelectedPost(null);
//   }, []);

//   const patchPost = useCallback((postId, patch) => {
//     setSavedPosts((current) =>
//       current.map((item) =>
//         item.post?.id === postId
//           ? { ...item, post: { ...item.post, ...patch } }
//           : item
//       )
//     );
//     setSelectedPost((current) =>
//       current && current.id === postId ? { ...current, ...patch } : current
//     );
//   }, []);

//   return (
//     <div>
//       <SectionHeader title="Saved Posts" subtitle="Posts you have saved." />

//       <ErrorBanner>{error}</ErrorBanner>

//       {loading ? (
//         <Spinner />
//       ) : (
//         <ProfilePostGrid posts={gridPosts} onPostClick={setSelectedPost} />
//       )}

//       {selectedPost && (
//         <PostModal
//           post={selectedPost}
//           onClose={() => setSelectedPost(null)}
//           onLikeUpdated={({ postId, liked, likeCount }) =>
//             patchPost(postId, { isLiked: liked, likeCount })
//           }
//           onCommentUpdated={({ postId, commentCount }) =>
//             patchPost(postId, { commentCount })
//           }
//           onPostDeleted={removePost}
//           onPostUnsave={removePost}
//         />
//       )}
//     </div>
//   );
// };

// // =============================================================
// // EDIT PROFILE
// // =============================================================

// const EditProfileSection = ({ profile, loading, onUpdated }) => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
//       <p className="mt-1 text-sm text-(--text-secondary)">
//         Update your profile information and profile picture.
//       </p>

//       {loading ? (
//         <p className="mt-8 text-sm text-(--text-secondary)">
//           Loading profile...
//         </p>
//       ) : profile ? (
//         <div className="mt-8 max-w-2xl">
//           <div className="mb-6 flex items-center gap-4 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
//             <Avatar
//               src={profile.profileImage}
//               name={profile.fullName || profile.username}
//               className="h-16 w-16"
//               textClass="text-xl font-semibold text-white"
//             />

//             <div className="min-w-0">
//               <p className="font-semibold text-white">{profile.fullName}</p>
//               <p className="text-sm text-(--text-secondary)">
//                 @{profile.username}
//               </p>
//               <p className="mt-1 text-xs text-(--text-muted)">{profile.email}</p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={() => setShowModal(true)}
//             className="rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <p className="mt-8 text-sm text-(--danger)">Unable to load profile.</p>
//       )}

//       {showModal && profile && (
//         <EditProfileModal
//           user={profile}
//           onClose={() => setShowModal(false)}
//           onUpdated={(updatedUser) => {
//             setShowModal(false);
//             onUpdated(updatedUser);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // =============================================================
// // PROFILE DETAILS
// // =============================================================

// const InfoCard = ({ icon: Icon, label, children }) => (
//   <div className="rounded-xl border border-(--border) bg-(--card) p-4">
//     <div className="flex items-center gap-3">
//       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
//         <Icon size={18} className="text-(--text-secondary)" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-xs text-(--text-muted)">{label}</p>
//         <p className="mt-1 truncate text-sm font-medium text-white">
//           {children}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const StatCard = ({ icon: Icon, value, label }) => (
//   <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
//     <Icon size={20} className="mx-auto text-(--text-secondary)" />
//     <p className="mt-2 text-xl font-bold text-white">{value ?? 0}</p>
//     <p className="text-xs text-(--text-muted)">{label}</p>
//   </div>
// );

// const ProfileDetailsSection = ({ profile, loading }) => {
//   if (loading) return <Spinner />;

//   if (!profile) {
//     return (
//       <div className="flex min-h-60 items-center justify-center text-sm text-(--text-secondary)">
//         Unable to load profile details.
//       </div>
//     );
//   }

//   return (
//     <div>
//       <SectionHeader
//         title="Profile Details"
//         subtitle="View your complete profile and account information."
//       />

//       <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
//         <div className="relative h-36 bg-(--background-secondary)">
//           {profile.coverImage ? (
//             <img
//               src={assetUrl(profile.coverImage)}
//               alt="Cover"
//               decoding="async"
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="h-full w-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)" />
//           )}

//           <div className="absolute -bottom-12 left-6">
//             <Avatar
//               src={profile.profileImage}
//               name={profile.username}
//               className="h-24 w-24 border-4 border-(--card)"
//               textClass="text-3xl font-bold text-white"
//             />
//           </div>
//         </div>

//         <div className="px-6 pb-6 pt-16">
//           <h3 className="text-xl font-semibold text-white">
//             {profile.fullName || profile.username}
//           </h3>
//           <p className="mt-1 text-sm text-(--text-secondary)">
//             @{profile.username}
//           </p>
//           {profile.bio && (
//             <p className="mt-4 max-w-2xl text-sm leading-6 text-(--text-secondary)">
//               {profile.bio}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Personal Information
//         </h3>
//         <div className="grid gap-3 md:grid-cols-2">
//           <InfoCard icon={User} label="Full Name">
//             {profile.fullName || "Not provided"}
//           </InfoCard>
//           <InfoCard icon={AtSign} label="Username">
//             @{profile.username}
//           </InfoCard>
//           <InfoCard icon={Mail} label="Email Address">
//             {profile.email || "Not provided"}
//           </InfoCard>
//           <InfoCard icon={FileText} label="Bio">
//             {profile.bio || "No bio added"}
//           </InfoCard>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Account Statistics
//         </h3>
//         <div className="grid grid-cols-3 gap-3">
//           <StatCard icon={Image} value={profile.postsCount} label="Posts" />
//           <StatCard icon={Users} value={profile.followersCount} label="Followers" />
//           <StatCard icon={UserPlus} value={profile.followingCount} label="Following" />
//         </div>
//       </div>

//       <div className="mt-6">
//         <h3 className="mb-3 text-base font-semibold text-white">
//           Account Information
//         </h3>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <Hash size={18} className="text-(--text-secondary)" />
//               <span className="text-sm text-(--text-secondary)">User ID</span>
//             </div>
//             <span className="text-sm font-medium text-white">#{profile.id}</span>
//           </div>

//           <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
//             <div className="flex items-center gap-3">
//               <ShieldCheck size={18} className="text-(--text-secondary)" />
//               <span className="text-sm text-(--text-secondary)">
//                 Account Status
//               </span>
//             </div>
//             <span className="rounded-full bg-(--success)/10 px-3 py-1 text-xs font-medium text-(--success)">
//               Active
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NotificationsSection = () => (
//   <div>
//     <h2 className="text-xl font-semibold text-white">Notifications</h2>
//     <p className="mt-1 text-sm text-(--text-secondary)">
//       Manage your notification preferences.
//     </p>
//     <p className="mt-8 text-sm text-(--text-secondary)">
//       Notification settings will appear here.
//     </p>
//   </div>
// );

// // =============================================================
// // PAGE
// // =============================================================

// const Settings = () => {
//   const { user: loggedInUser, setUser, Logout } = useAuth();

//   const [activeSection, setActiveSection] = useState("edit-profile");
//   const [profile, setProfile] = useState(null);
//   const [profileLoading, setProfileLoading] = useState(true);

//   const username = loggedInUser?.username;

//   // load own profile once (race-safe)
//   useEffect(() => {
//     if (!username) {
//       setProfileLoading(false); // previously stayed "loading" forever
//       return;
//     }

//     let cancelled = false;
//     setProfileLoading(true);

//     (async () => {
//       try {
//         const response = await getUserProfile(username);
//         if (!cancelled) setProfile(response?.data?.user || null);
//       } catch (err) {
//         console.error("Settings Profile Error:", err);
//       } finally {
//         if (!cancelled) setProfileLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [username]);

//   const handleProfileUpdated = useCallback(
//     (updatedUser) => {
//       setProfile(updatedUser);
//       setUser?.(updatedUser);
//     },
//     [setUser]
//   );

//   const handleUnfollowed = useCallback(() => {
//     setProfile((current) =>
//       current
//         ? {
//             ...current,
//             followingCount: Math.max(0, (current.followingCount || 0) - 1),
//           }
//         : current
//     );
//   }, []);

//   const renderContent = () => {
//     switch (activeSection) {
//       case "edit-profile":
//         return (
//           <EditProfileSection
//             profile={profile}
//             loading={profileLoading}
//             onUpdated={handleProfileUpdated}
//           />
//         );
//       case "notifications":
//         return <NotificationsSection />;
//       case "saved":
//         return <SavedSection />;
//       case "followers":
//         return <FollowersSection onUnfollowed={handleUnfollowed} />;
//       case "profile-details":
//         return (
//           <ProfileDetailsSection profile={profile} loading={profileLoading} />
//         );
//       case "change-password":
//         return <ChangePasswordSection />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full px-4 py-6 md:px-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white">Settings</h1>
//           <p className="mt-1 text-sm text-(--text-secondary)">
//             Manage your SnapGrid account and preferences.
//           </p>
//         </div>

//         <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
//           <div className="flex min-h-[calc(100dvh-180px)] flex-col md:flex-row">
//             {/* SIDEBAR */}
//             <aside className="w-full shrink-0 border-b border-(--border) md:w-64 md:border-b-0 md:border-r">
//               <div className="p-3 md:sticky md:top-0">
//                 <div className="mb-3 px-3 pt-2">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
//                     Account Settings
//                   </p>
//                 </div>

//                 <div className="max-h-[calc(100dvh-250px)] space-y-1 overflow-y-auto pr-1">
//                   {SETTINGS_OPTIONS.map(({ id, label, icon: Icon }) => {
//                     const isActive = activeSection === id;

//                     return (
//                       <button
//                         key={id}
//                         type="button"
//                         onClick={() => setActiveSection(id)}
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
//                           isActive
//                             ? "bg-(--primary)/15 text-white"
//                             : "text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//                         }`}
//                       >
//                         <Icon
//                           size={18}
//                           className={
//                             isActive
//                               ? "text-(--primary)"
//                               : "text-(--text-secondary) group-hover:text-white"
//                           }
//                         />
//                         <span className="flex-1">{label}</span>
//                         <ChevronRight
//                           size={16}
//                           className={`transition ${
//                             isActive
//                               ? "text-(--primary)"
//                               : "text-transparent group-hover:text-(--text-muted)"
//                           }`}
//                         />
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={Logout}
//                   className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 md:hidden"
//                 >
//                   <LogOut size={17} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </aside>

//             {/* CONTENT */}
//             <main className="min-w-0 flex-1">
//               <div className="h-full overflow-y-auto p-5 md:p-8">
//                 {renderContent()}
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;












































import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import { getUserProfile } from "../services/userService.js";
import { getSavedPosts } from "../services/savedPostService.js";
import {
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../services/followService.js";
import { changePassword } from "../services/authService.js";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";
import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
import PostModal from "../components/profile/PostModal.jsx";

// =============================================================
// CONSTANTS & HELPERS
// =============================================================

const API_URL = import.meta.env.VITE_API_URL;
const MIN_PASSWORD_LENGTH = 6;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const SETTINGS_OPTIONS = [
  { id: "edit-profile", label: "Edit Profile", icon: UserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "saved", label: "Saved Posts", icon: Bookmark },
  { id: "followers", label: "Followers & Following", icon: Users },
  { id: "profile-details", label: "Profile Details", icon: UserCircle },
  { id: "change-password", label: "Change Password", icon: LockKeyhole },
];

const passwordInputClass =
  "w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)";

// =============================================================
// SMALL SHARED PIECES
// =============================================================

const Spinner = () => (
  <div className="flex min-h-60 items-center justify-center">
    <div className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <p className="mt-1 text-sm text-(--text-secondary)">{subtitle}</p>
  </div>
);

const ErrorBanner = ({ children }) =>
  children ? (
    <div
      role="alert"
      className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
    >
      {children}
    </div>
  ) : null;

const Avatar = memo(function Avatar({
  src,
  name,
  className = "h-12 w-12",
  textClass = "font-semibold text-white",
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (src && !failed) {
    return (
      <img
        src={assetUrl(src)}
        alt={name || "User"}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${className} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-(--primary)`}
    >
      <span className={textClass}>
        {(name || "?").charAt(0).toUpperCase()}
      </span>
    </div>
  );
});

// =============================================================
// CHANGE PASSWORD (owns its state, so typing never re-renders Settings)
// =============================================================

const PasswordField = ({ id, label, hint, ...inputProps }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className={passwordInputClass}
          {...inputProps}
        />

        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) transition hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {hint && <p className="mt-2 text-xs text-(--text-muted)">{hint}</p>}
    </div>
  );
};

const ChangePasswordSection = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill all password fields.");
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(
        `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`
      );
      return;
    }

    if (newPassword === currentPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword({ currentPassword, newPassword });

      setSuccess(response?.message || "Password changed successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Change Password Error:", err);
      setError(err.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary)/10">
          <LockKeyhole size={22} className="text-(--primary)" />
        </div>
        <h2 className="text-xl font-semibold text-white">Change Password</h2>
        <p className="mt-1 text-sm text-(--text-secondary)">
          Update your password to keep your account secure.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-(--border) bg-(--card) p-6"
      >
        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          autoComplete="current-password"
        />

        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New Password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          autoComplete="new-password"
          hint={`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          autoComplete="new-password"
        />

        <ErrorBanner>{error}</ErrorBanner>

        {success && (
          <div
            role="status"
            className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>
      </form>

      <div className="mt-4 flex gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-(--success)" />
        <div>
          <p className="text-sm font-medium text-white">
            Keep your account secure
          </p>
          <p className="mt-1 text-xs leading-5 text-(--text-secondary)">
            Use a strong password that you don't use on other websites.
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================
// FOLLOWERS & FOLLOWING
// =============================================================

const UserRow = memo(function UserRow({
  user,
  mode,
  busy,
  onView,
  onUnfollow,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4 transition hover:bg-(--card-hover)">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={user.profileImage} name={user.username} />

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

      {mode === "followers" ? (
        <button
          type="button"
          onClick={() => onView(user.username)}
          className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
        >
          View Profile
        </button>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => onUnfollow(user.id)}
          className="ml-4 shrink-0 rounded-lg border border-(--border) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Unfollowing..." : "Following"}
        </button>
      )}
    </div>
  );
});

const FollowersSection = ({ onUnfollowed }) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unfollowLoading, setUnfollowLoading] = useState(null);
  const [error, setError] = useState("");

  // fetch both lists in parallel, once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [followersResult, followingResult] = await Promise.allSettled([
        getFollowers(),
        getFollowing(),
      ]);

      if (cancelled) return;

      if (followersResult.status === "fulfilled") {
        setFollowers(followersResult.value?.data?.users || []);
      }
      if (followingResult.status === "fulfilled") {
        setFollowing(followingResult.value?.data?.users || []);
      }
      if (
        followersResult.status === "rejected" ||
        followingResult.status === "rejected"
      ) {
        setError("Some follow data could not be loaded.");
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleView = useCallback(
    (username) => navigate(`/profile/${username}`),
    [navigate]
  );

  const handleUnfollow = useCallback(
    async (userId) => {
      if (!window.confirm("Are you sure you want to unfollow this user?")) {
        return;
      }

      try {
        setUnfollowLoading(userId);
        setError("");

        await unfollowUser(userId);

        setFollowing((current) =>
          current.filter((user) => Number(user.id) !== Number(userId))
        );
        onUnfollowed?.();
      } catch (err) {
        console.error("Unfollow Error:", err);
        setError(err.message || "Could not unfollow this user.");
      } finally {
        setUnfollowLoading(null);
      }
    },
    [onUnfollowed]
  );

  const users = tab === "followers" ? followers : following;

  const tabs = [
    { id: "followers", label: "Followers", icon: Users, count: followers.length },
    { id: "following", label: "Following", icon: UserPlus, count: following.length },
  ];

  return (
    <div>
      <SectionHeader
        title="Followers & Following"
        subtitle="Manage your followers and the people you follow."
      />

      <div className="mb-6 flex border-b border-(--border)">
        {tabs.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition ${
              tab === id
                ? "border-b-2 border-(--primary) text-white"
                : "text-(--text-secondary) hover:text-white"
            }`}
          >
            <Icon size={17} />
            {label}
            <span className="rounded-full bg-(--card) px-2 py-0.5 text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <div className="flex min-h-60 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--card)">
            <UserRound size={28} className="text-(--text-muted)" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            {tab === "followers" ? "No Followers Yet" : "Not Following Anyone"}
          </h3>
          <p className="mt-1 text-sm text-(--text-secondary)">
            {tab === "followers"
              ? "When people follow you, they will appear here."
              : "People you follow will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              mode={tab}
              busy={unfollowLoading === user.id}
              onView={handleView}
              onUnfollow={handleUnfollow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================
// SAVED POSTS
// =============================================================

const SavedSection = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await getSavedPosts();
        if (!cancelled) setSavedPosts(response?.data?.posts || []);
      } catch (err) {
        console.error("Settings Saved Posts Error:", err);
        if (!cancelled) setError(err.message || "Failed to load saved posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const gridPosts = savedPosts
    .filter((item) => item.post)
    .map((item) => ({ ...item.post, isSaved: true }));

  const removePost = useCallback((postId) => {
    setSavedPosts((current) =>
      current.filter((item) => item.post?.id !== postId)
    );
    setSelectedPost(null);
  }, []);

  const patchPost = useCallback((postId, patch) => {
    setSavedPosts((current) =>
      current.map((item) =>
        item.post?.id === postId
          ? { ...item, post: { ...item.post, ...patch } }
          : item
      )
    );
    setSelectedPost((current) =>
      current && current.id === postId ? { ...current, ...patch } : current
    );
  }, []);

  return (
    <div>
      <SectionHeader title="Saved Posts" subtitle="Posts you have saved." />

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : (
        <ProfilePostGrid
          posts={gridPosts}
          onPostClick={setSelectedPost}
          emptyTitle="No Saved Posts"
          emptyMessage="Posts you save will appear here."
        />
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLikeUpdated={({ postId, liked, likeCount }) =>
            patchPost(postId, { isLiked: liked, likeCount })
          }
          onCommentUpdated={({ postId, commentCount }) =>
            patchPost(postId, { commentCount })
          }
          onPostDeleted={removePost}
          onPostUnsave={removePost}
        />
      )}
    </div>
  );
};

// =============================================================
// EDIT PROFILE
// =============================================================

const EditProfileSection = ({ profile, loading, onUpdated }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
      <p className="mt-1 text-sm text-(--text-secondary)">
        Update your profile information and profile picture.
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-(--text-secondary)">
          Loading profile...
        </p>
      ) : profile ? (
        <div className="mt-8 max-w-2xl">
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-(--border) bg-(--background-secondary) p-4">
            <Avatar
              src={profile.profileImage}
              name={profile.fullName || profile.username}
              className="h-16 w-16"
              textClass="text-xl font-semibold text-white"
            />

            <div className="min-w-0">
              <p className="font-semibold text-white">{profile.fullName}</p>
              <p className="text-sm text-(--text-secondary)">
                @{profile.username}
              </p>
              <p className="mt-1 text-xs text-(--text-muted)">{profile.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <p className="mt-8 text-sm text-(--danger)">Unable to load profile.</p>
      )}

      {showModal && profile && (
        <EditProfileModal
          user={profile}
          onClose={() => setShowModal(false)}
          onUpdated={(updatedUser) => {
            setShowModal(false);
            onUpdated(updatedUser);
          }}
        />
      )}
    </div>
  );
};

// =============================================================
// PROFILE DETAILS
// =============================================================

const InfoCard = ({ icon: Icon, label, children }) => (
  <div className="rounded-xl border border-(--border) bg-(--card) p-4">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--background-secondary)">
        <Icon size={18} className="text-(--text-secondary)" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-(--text-muted)">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white">
          {children}
        </p>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="rounded-xl border border-(--border) bg-(--card) p-4 text-center">
    <Icon size={20} className="mx-auto text-(--text-secondary)" />
    <p className="mt-2 text-xl font-bold text-white">{value ?? 0}</p>
    <p className="text-xs text-(--text-muted)">{label}</p>
  </div>
);

const ProfileDetailsSection = ({ profile, loading }) => {
  if (loading) return <Spinner />;

  if (!profile) {
    return (
      <div className="flex min-h-60 items-center justify-center text-sm text-(--text-secondary)">
        Unable to load profile details.
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Profile Details"
        subtitle="View your complete profile and account information."
      />

      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        <div className="relative h-36 bg-(--background-secondary)">
          {profile.coverImage ? (
            <img
              src={assetUrl(profile.coverImage)}
              alt="Cover"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-r from-(--primary) via-(--secondary) to-(--accent)" />
          )}

          <div className="absolute -bottom-12 left-6">
            <Avatar
              src={profile.profileImage}
              name={profile.username}
              className="h-24 w-24 border-4 border-(--card)"
              textClass="text-3xl font-bold text-white"
            />
          </div>
        </div>

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

      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Personal Information
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <InfoCard icon={User} label="Full Name">
            {profile.fullName || "Not provided"}
          </InfoCard>
          <InfoCard icon={AtSign} label="Username">
            @{profile.username}
          </InfoCard>
          <InfoCard icon={Mail} label="Email Address">
            {profile.email || "Not provided"}
          </InfoCard>
          <InfoCard icon={FileText} label="Bio">
            {profile.bio || "No bio added"}
          </InfoCard>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Account Statistics
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={Image} value={profile.postsCount} label="Posts" />
          <StatCard icon={Users} value={profile.followersCount} label="Followers" />
          <StatCard icon={UserPlus} value={profile.followingCount} label="Following" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-white">
          Account Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <Hash size={18} className="text-(--text-secondary)" />
              <span className="text-sm text-(--text-secondary)">User ID</span>
            </div>
            <span className="text-sm font-medium text-white">#{profile.id}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card) p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-(--text-secondary)" />
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

const NotificationsSection = () => (
  <div>
    <h2 className="text-xl font-semibold text-white">Notifications</h2>
    <p className="mt-1 text-sm text-(--text-secondary)">
      Manage your notification preferences.
    </p>
    <p className="mt-8 text-sm text-(--text-secondary)">
      Notification settings will appear here.
    </p>
  </div>
);

// =============================================================
// PAGE
// =============================================================

const Settings = () => {
  const { user: loggedInUser, setUser, Logout } = useAuth();

  const [activeSection, setActiveSection] = useState("edit-profile");
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const username = loggedInUser?.username;

  // load own profile once (race-safe)
  useEffect(() => {
    if (!username) {
      setProfileLoading(false); // previously stayed "loading" forever
      return;
    }

    let cancelled = false;
    setProfileLoading(true);

    (async () => {
      try {
        const response = await getUserProfile(username);
        if (!cancelled) setProfile(response?.data?.user || null);
      } catch (err) {
        console.error("Settings Profile Error:", err);
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username]);

  const handleProfileUpdated = useCallback(
    (updatedUser) => {
      setProfile(updatedUser);
      setUser?.(updatedUser);
    },
    [setUser]
  );

  const handleUnfollowed = useCallback(() => {
    setProfile((current) =>
      current
        ? {
            ...current,
            followingCount: Math.max(0, (current.followingCount || 0) - 1),
          }
        : current
    );
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "edit-profile":
        return (
          <EditProfileSection
            profile={profile}
            loading={profileLoading}
            onUpdated={handleProfileUpdated}
          />
        );
      case "notifications":
        return <NotificationsSection />;
      case "saved":
        return <SavedSection />;
      case "followers":
        return <FollowersSection onUnfollowed={handleUnfollowed} />;
      case "profile-details":
        return (
          <ProfileDetailsSection profile={profile} loading={profileLoading} />
        );
      case "change-password":
        return <ChangePasswordSection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-sm text-(--text-secondary)">
            Manage your SnapGrid account and preferences.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
          <div className="flex min-h-[calc(100dvh-180px)] flex-col md:flex-row">
            {/* SIDEBAR */}
            <aside className="w-full shrink-0 border-b border-(--border) md:w-64 md:border-b-0 md:border-r">
              <div className="p-3 md:sticky md:top-0">
                <div className="mb-3 px-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
                    Account Settings
                  </p>
                </div>

                <div className="max-h-[calc(100dvh-250px)] space-y-1 overflow-y-auto pr-1">
                  {SETTINGS_OPTIONS.map(({ id, label, icon: Icon }) => {
                    const isActive = activeSection === id;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveSection(id)}
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
                        <span className="flex-1">{label}</span>
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

            {/* CONTENT */}
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