// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getUserProfile } from "../services/userService.js";
// import { getUserPosts } from "../services/postService.js";
// import { getSavedPosts } from "../services/savedPostService.js";
// import { useAuth } from "../context/AuthContext.jsx";
// import UserCard from "../components/user/UserCard.jsx";
// import UserStats from "../components/user/UserStats.jsx";
// import ProfileTabs from "../components/profile/ProfileTabs.jsx";
// import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
// import PostModal from "../components/profile/PostModal.jsx";
// import EditProfileModal from "../components/profile/EditProfileModal.jsx";

// const Profile = () => {
//   const { username } = useParams();

//   const { user: loggedInUser } = useAuth();

//   const [user, setUser] = useState(null);

//   const [posts, setPosts] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [postsLoading, setPostsLoading] = useState(true);

//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeTab, setActiveTab] = useState("posts");

// const [savedPosts, setSavedPosts] = useState([]);

// const [savedLoading, setSavedLoading] = useState(false);

//   const [showEditProfile, setShowEditProfile] = useState(false);

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         setPostsLoading(true);
//         setError("");

//         const [profileResponse, postsResponse] = await Promise.all([
//           getUserProfile(username),
//           getUserPosts(username),
//         ]);

//         setUser(profileResponse.data.user);

//         setPosts(postsResponse.data.posts);
//       } catch (error) {
//         console.error("Profile Data Error:", error);

//         setError(error.message || "Failed to load profile");
//       } finally {
//         setLoading(false);
//         setPostsLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [username]);



// //   const loadSavedPosts = async () => {
// //   try {
// //     setSavedLoading(true);

// //     const response = await getSavedPosts();

// //     setSavedPosts(
// //       response.data?.posts || []
// //     );
// //   } catch (error) {
// //     console.error(
// //       "Saved Posts Error:",
// //       error
// //     );
// //   } finally {
// //     setSavedLoading(false);
// //   }
// // };

// const loadSavedPosts = async () => {
//   try {
//     setSavedLoading(true);

//     const response = await getSavedPosts();

//     setSavedPosts(
//       response.data?.posts || []
//     );
//   } catch (error) {
//     console.error(
//       "Saved Posts Error:",
//       error
//     );
//   } finally {
//     setSavedLoading(false);
//   }
// };

// const handleTabChange = (tab) => {
//   setActiveTab(tab);

//   if (
//     tab === "saved" &&
//     savedPosts.length === 0
//   ) {
//     loadSavedPosts();
//   }
// };

//   const handleProfileUpdated = (updatedUser) => {
//     setUser(updatedUser);
//     setShowEditProfile(false);
//   };

//   const handleLikeUpdated = ({ postId, liked, likeCount }) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               isLiked: liked,
//               likeCount,
//             }
//           : post,
//       ),
//     );

//     setSelectedPost((currentPost) => {
//       if (!currentPost || currentPost.id !== postId) {
//         return currentPost;
//       }

//       return {
//         ...currentPost,
//         isLiked: liked,
//         likeCount,
//       };
//     });
//   };

//   const handleCommentUpdated = ({ postId, commentCount }) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               commentCount,
//             }
//           : post,
//       ),
//     );

//     setSelectedPost((currentPost) => {
//       if (!currentPost || currentPost.id !== postId) {
//         return currentPost;
//       }

//       return {
//         ...currentPost,
//         commentCount,
//       };
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex sm:min-h-[calc(100vh-64px)] items-center justify-center px-4  min-h-[calc(100vh-128px)]">
//         <p className="text-(--text-secondary) text-sm sm:text-base">Loading profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       // <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
//       <div className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4 sm:min-h-[calc(100vh-64px)]">
//         <p className="text-(--danger) text-sm sm:text-base">{error}</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   const isOwnProfile = loggedInUser?.username === user.username;

//   return (
//     <div className="w-full min-w-0">
//       {/* Cover */}
//       {/* <div className="relative h-64 overflow-hidden cursor-pointer rounded-b-2xl bg-(--card) md:h-72"> */}
//       <div
//   className="
//     relative
//     h-40
//     overflow-hidden
//     rounded-b-2xl
//     bg-(--card)
//     sm:h-52
//     md:h-64
//     lg:h-72
//   "
// >
//         {user.coverImage ? (
//           <img
//             // src={`http://localhost:5000${user.coverImage}`}
//             src={`${import.meta.env.VITE_API_URL}${user.coverImage}`}
//             alt="Cover"
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="h-full w-full bg-linear-to-r from-(--primary)/40 via-(--secondary)/20 to-(--accent)/30" />
//         )}
//       </div>

//       {/* Profile Info */}
//       <div className="px-3 sm:px-5 md:px-8">
//         {/* <UserCard
//           user={user}
//           isOwnProfile={isOwnProfile}
//           onEditProfile={() => setShowEditProfile(true)}
//         /> */}

//         <UserCard
//           user={user}
//           isOwnProfile={isOwnProfile}
//           onEditProfile={() => setShowEditProfile(true)}
//           onFollowChange={(data) => {
//             if (data?.receiver) {
//               setUser((prev) => ({
//                 ...prev,
//                 followersCount: data.receiver.followersCount,
//                 followingCount: data.receiver.followingCount,
//               }));
//             }
//           }}
//         />

//         <UserStats user={user} postsCount={posts.length} />
//       </div>

//       {/* Tabs */}
//       <div className="mt-2 w-full overflow-x-auto">
//       <ProfileTabs isOwnProfile={isOwnProfile}
//       activeTab={activeTab}
//       onTabChange={handleTabChange}
//       />
//       </div>

//       {/* Posts */}
//       {/* {postsLoading ? (
//         <div className="flex min-h-60 items-center justify-center">
//           <p className="text-(--text-secondary)">Loading posts...</p>
//         </div>
//       ) : (
//         <ProfilePostGrid
//           posts={posts}
//           onPostClick={(post) => setSelectedPost(post)}
//         />
//       )} */}

// <div className="mt-1 w-full">


//       {activeTab === "posts" ? (
//   postsLoading ? (
//     <div className="flex min-h-60 items-center justify-center px-4">
//       <p className="text-(--text-secondary) text-sm sm:text-base">
//         Loading posts...
//       </p>
//     </div>
//   ) : (
//     <ProfilePostGrid
//       posts={posts}
//       onPostClick={(post) =>
//         setSelectedPost(post)
//       }
//     />
//   )
// ) : (
//   savedLoading ? (
//     <div className="flex min-h-60 items-center justify-center px-4">
//       <p className="text-(--text-secondary) text-sm sm:text-base">
//         Loading saved posts...
//       </p>
//     </div>
//   ) : (
//     // <ProfilePostGrid
//     //   posts={savedPosts.map(
//     //     (item) => item.post
//     //   )}
//     //   onPostClick={(post) =>
//     //     setSelectedPost(post)
//     //   }
//     // />
//     <ProfilePostGrid
//   posts={savedPosts
//     .filter((item) => item.post)
//     .map((item) => ({
//       ...item.post,
//       isSaved: true,
//     }))}
//   onPostClick={(post) =>
//     setSelectedPost(post)
//   }
// />
//   )
// )}
// </div>

//       {/* Post Modal */}
//       {selectedPost && (
//   //       <PostModal
//   //         post={selectedPost}
//   //         onClose={() => setSelectedPost(null)}
//   //         onLikeUpdated={handleLikeUpdated}
//   //         onCommentUpdated={handleCommentUpdated}
//   //         onPostDeleted={(postId) => {
//   //   setPosts((currentPosts) =>
//   //     currentPosts.filter(
//   //       (post) => post.id !== postId
//   //     )
//   //   );
//   //    setSavedPosts((currentSavedPosts) =>
//   //     currentSavedPosts.filter(
//   //       (item) =>
//   //         item.post?.id !== postId
//   //     )
//   //   );
//   // }}
//   //       />

//   <PostModal
//   post={selectedPost}
//   onClose={() => setSelectedPost(null)}
//   onLikeUpdated={handleLikeUpdated}
//   onCommentUpdated={handleCommentUpdated}

//   onPostDeleted={(postId) => {
//     setPosts((currentPosts) =>
//       currentPosts.filter(
//         (post) => post.id !== postId
//       )
//     );

//     setSavedPosts((currentSavedPosts) =>
//       currentSavedPosts.filter(
//         (item) => item.post?.id !== postId
//       )
//     );
//   }}

//   onPostUnsave={(postId) => {
//     setSavedPosts((currentSavedPosts) =>
//       currentSavedPosts.filter(
//         (item) => item.post?.id !== postId
//       )
//     );

//     // Saved tab se Unsave hone ke baad modal close
//     setSelectedPost(null);
//   }}
// />
//       )}

//       {/* Edit Profile */}
//       {showEditProfile && (
//         <EditProfileModal
//           user={user}
//           onClose={() => setShowEditProfile(false)}
//           onUpdated={handleProfileUpdated}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;















import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../services/userService.js";
import { getUserPosts } from "../services/postService.js";
import { getSavedPosts } from "../services/savedPostService.js";
import { useAuth } from "../context/AuthContext.jsx";
import UserCard from "../components/user/UserCard.jsx";
import UserStats from "../components/user/UserStats.jsx";
import ProfileTabs from "../components/profile/ProfileTabs.jsx";
import ProfilePostGrid from "../components/profile/ProfilePostGrid.jsx";
import PostModal from "../components/profile/PostModal.jsx";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const CenteredMessage = ({ children, className = "" }) => (
  <div className="flex min-h-[calc(100dvh-128px)] items-center justify-center px-4 sm:min-h-[calc(100dvh-64px)]">
    <p className={`text-sm sm:text-base ${className}`}>{children}</p>
  </div>
);

const GridLoading = ({ children }) => (
  <div className="flex min-h-60 items-center justify-center px-4">
    <p className="text-sm text-(--text-secondary) sm:text-base">{children}</p>
  </div>
);

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser, setUser: setAuthUser } = useAuth();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [postsError, setPostsError] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const [savedPosts, setSavedPosts] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedLoaded, setSavedLoaded] = useState(false);
  const [savedError, setSavedError] = useState("");

  const [showEditProfile, setShowEditProfile] = useState(false);

  const isOwnProfile =
    !!user && !!loggedInUser && loggedInUser.username === user.username;

  // Saved tab only exists on your own profile
  const tab = isOwnProfile ? activeTab : "posts";

  // =========================================================
  // LOAD PROFILE + POSTS (parallel, race-safe)
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    // reset everything that belongs to the previous profile
    setLoading(true);
    setError("");
    setPostsError("");
    setUser(null);
    setPosts([]);
    setSelectedPost(null);
    setShowEditProfile(false);
    setActiveTab("posts");

    (async () => {
      const [profileResult, postsResult] = await Promise.allSettled([
        getUserProfile(username),
        getUserPosts(username),
      ]);

      if (cancelled) return;

      if (profileResult.status === "rejected") {
        console.error("Profile Data Error:", profileResult.reason);
        setError(profileResult.reason?.message || "Failed to load profile");
      } else {
        setUser(profileResult.value?.data?.user || null);

        if (postsResult.status === "fulfilled") {
          setPosts(postsResult.value?.data?.posts || []);
        } else {
          console.error("Profile Posts Error:", postsResult.reason);
          setPostsError(postsResult.reason?.message || "Failed to load posts");
        }
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [username]);

  // =========================================================
  // SAVED POSTS (loaded once, on first open of the tab)
  // =========================================================

  const loadSavedPosts = useCallback(async () => {
    try {
      setSavedLoading(true);
      setSavedError("");

      const response = await getSavedPosts();
      setSavedPosts(response?.data?.posts || []);
      setSavedLoaded(true);
    } catch (err) {
      console.error("Saved Posts Error:", err);
      setSavedError(err.message || "Failed to load saved posts");
    } finally {
      setSavedLoading(false);
    }
  }, []);

  const handleTabChange = useCallback(
    (nextTab) => {
      setActiveTab(nextTab);

      if (nextTab === "saved" && !savedLoaded && !savedLoading) {
        loadSavedPosts();
      }
    },
    [savedLoaded, savedLoading, loadSavedPosts]
  );

  const savedGridPosts = useMemo(
    () =>
      savedPosts
        .filter((item) => item.post)
        .map((item) => ({ ...item.post, isSaved: true })),
    [savedPosts]
  );

  // =========================================================
  // KEEP EVERY COPY OF A POST IN SYNC
  // (grid, saved list and open modal)
  // =========================================================

  const patchPost = useCallback((postId, patch) => {
    setPosts((current) =>
      current.map((post) => (post.id === postId ? { ...post, ...patch } : post))
    );

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

  const handleLikeUpdated = useCallback(
    ({ postId, liked, likeCount }) =>
      patchPost(postId, { isLiked: liked, likeCount }),
    [patchPost]
  );

  const handleCommentUpdated = useCallback(
    ({ postId, commentCount }) => patchPost(postId, { commentCount }),
    [patchPost]
  );

  const handlePostDeleted = useCallback((postId) => {
    setPosts((current) => current.filter((post) => post.id !== postId));
    setSavedPosts((current) =>
      current.filter((item) => item.post?.id !== postId)
    );
    setSelectedPost((current) => (current?.id === postId ? null : current));
  }, []);

  const handlePostUnsave = useCallback(
    (postId) => {
      setSavedPosts((current) =>
        current.filter((item) => item.post?.id !== postId)
      );
      setPosts((current) =>
        current.map((post) =>
          post.id === postId ? { ...post, isSaved: false } : post
        )
      );

      // only close the modal when unsaving from the Saved tab
      if (tab === "saved") setSelectedPost(null);
    },
    [tab]
  );

  const handleProfileUpdated = useCallback(
    (updatedUser) => {
      setUser(updatedUser);
      setShowEditProfile(false);

      // keep navbar / auth state in sync
      setAuthUser?.(updatedUser);

      // username changed -> the URL must follow, otherwise a refresh 404s
      if (updatedUser?.username && updatedUser.username !== username) {
        navigate(`/profile/${updatedUser.username}`, { replace: true });
      }
    },
    [setAuthUser, navigate, username]
  );

  const handleFollowChange = useCallback((data) => {
    if (data?.receiver) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              followersCount: data.receiver.followersCount,
              followingCount: data.receiver.followingCount,
            }
          : prev
      );
    }
  }, []);

  const openEditProfile = useCallback(() => setShowEditProfile(true), []);
  const closeEditProfile = useCallback(() => setShowEditProfile(false), []);
  const closePostModal = useCallback(() => setSelectedPost(null), []);

  // =========================================================
  // RENDER
  // =========================================================

  if (loading) {
    return (
      <CenteredMessage className="text-(--text-secondary)">
        Loading profile...
      </CenteredMessage>
    );
  }

  if (error) {
    return <CenteredMessage className="text-(--danger)">{error}</CenteredMessage>;
  }

  if (!user) return null;

  return (
    <div className="w-full min-w-0">
      {/* Cover */}
      <div className="relative h-40 overflow-hidden rounded-b-2xl bg-(--card) sm:h-52 md:h-64 lg:h-72">
        {user.coverImage ? (
          <img
            src={assetUrl(user.coverImage)}
            alt="Cover"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-r from-(--primary)/40 via-(--secondary)/20 to-(--accent)/30" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-3 sm:px-5 md:px-8">
        <UserCard
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={openEditProfile}
          onFollowChange={handleFollowChange}
        />

        <UserStats user={user} postsCount={posts.length} />
      </div>

      {/* Tabs */}
      <div className="mt-2 w-full overflow-x-auto">
        <ProfileTabs
          isOwnProfile={isOwnProfile}
          activeTab={tab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Grid */}
      <div className="mt-1 w-full">
        {tab === "posts" ? (
          postsError ? (
            <GridLoading>{postsError}</GridLoading>
          ) : (
            <ProfilePostGrid posts={posts} onPostClick={setSelectedPost} />
          )
        ) : savedLoading ? (
          <GridLoading>Loading saved posts...</GridLoading>
        ) : savedError ? (
          <GridLoading>{savedError}</GridLoading>
        ) : (
          <ProfilePostGrid posts={savedGridPosts} onPostClick={setSelectedPost} />
        )}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={closePostModal}
          onLikeUpdated={handleLikeUpdated}
          onCommentUpdated={handleCommentUpdated}
          onPostDeleted={handlePostDeleted}
          onPostUnsave={handlePostUnsave}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={closeEditProfile}
          onUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
};

export default Profile;