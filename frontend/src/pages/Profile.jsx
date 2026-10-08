import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Profile = () => {
  const { username } = useParams();

  const { user: loggedInUser } = useAuth();

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [postsLoading, setPostsLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

const [savedPosts, setSavedPosts] = useState([]);

const [savedLoading, setSavedLoading] = useState(false);

  const [showEditProfile, setShowEditProfile] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setPostsLoading(true);
        setError("");

        const [profileResponse, postsResponse] = await Promise.all([
          getUserProfile(username),
          getUserPosts(username),
        ]);

        setUser(profileResponse.data.user);

        setPosts(postsResponse.data.posts);
      } catch (error) {
        console.error("Profile Data Error:", error);

        setError(error.message || "Failed to load profile");
      } finally {
        setLoading(false);
        setPostsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);



//   const loadSavedPosts = async () => {
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

const loadSavedPosts = async () => {
  try {
    setSavedLoading(true);

    const response = await getSavedPosts();

    setSavedPosts(
      response.data?.posts || []
    );
  } catch (error) {
    console.error(
      "Saved Posts Error:",
      error
    );
  } finally {
    setSavedLoading(false);
  }
};

const handleTabChange = (tab) => {
  setActiveTab(tab);

  if (
    tab === "saved" &&
    savedPosts.length === 0
  ) {
    loadSavedPosts();
  }
};

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    setShowEditProfile(false);
  };

  const handleLikeUpdated = ({ postId, liked, likeCount }) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: liked,
              likeCount,
            }
          : post,
      ),
    );

    setSelectedPost((currentPost) => {
      if (!currentPost || currentPost.id !== postId) {
        return currentPost;
      }

      return {
        ...currentPost,
        isLiked: liked,
        likeCount,
      };
    });
  };

  const handleCommentUpdated = ({ postId, commentCount }) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentCount,
            }
          : post,
      ),
    );

    setSelectedPost((currentPost) => {
      if (!currentPost || currentPost.id !== postId) {
        return currentPost;
      }

      return {
        ...currentPost,
        commentCount,
      };
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-(--text-secondary)">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-(--danger)">{error}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isOwnProfile = loggedInUser?.username === user.username;

  return (
    <div className="w-full">
      {/* Cover */}
      <div className="relative h-64 overflow-hidden cursor-pointer rounded-b-2xl bg-(--card) md:h-72">
        {user.coverImage ? (
          <img
            // src={`http://localhost:5000${user.coverImage}`}
            src={`${import.meta.env.VITE_API_URL}${user.coverImage}`}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-r from-(--primary)/40 via-(--secondary)/20 to-(--accent)/30" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-8">
        {/* <UserCard
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={() => setShowEditProfile(true)}
        /> */}

        <UserCard
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={() => setShowEditProfile(true)}
          onFollowChange={(data) => {
            if (data?.receiver) {
              setUser((prev) => ({
                ...prev,
                followersCount: data.receiver.followersCount,
                followingCount: data.receiver.followingCount,
              }));
            }
          }}
        />

        <UserStats user={user} postsCount={posts.length} />
      </div>

      {/* Tabs */}
      <ProfileTabs isOwnProfile={isOwnProfile}
      activeTab={activeTab}
  onTabChange={handleTabChange}
      />

      {/* Posts */}
      {/* {postsLoading ? (
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-(--text-secondary)">Loading posts...</p>
        </div>
      ) : (
        <ProfilePostGrid
          posts={posts}
          onPostClick={(post) => setSelectedPost(post)}
        />
      )} */}

      {activeTab === "posts" ? (
  postsLoading ? (
    <div className="flex min-h-60 items-center justify-center">
      <p className="text-(--text-secondary)">
        Loading posts...
      </p>
    </div>
  ) : (
    <ProfilePostGrid
      posts={posts}
      onPostClick={(post) =>
        setSelectedPost(post)
      }
    />
  )
) : (
  savedLoading ? (
    <div className="flex min-h-60 items-center justify-center">
      <p className="text-(--text-secondary)">
        Loading saved posts...
      </p>
    </div>
  ) : (
    // <ProfilePostGrid
    //   posts={savedPosts.map(
    //     (item) => item.post
    //   )}
    //   onPostClick={(post) =>
    //     setSelectedPost(post)
    //   }
    // />
    <ProfilePostGrid
  posts={savedPosts
    .filter((item) => item.post)
    .map((item) => ({
      ...item.post,
      isSaved: true,
    }))}
  onPostClick={(post) =>
    setSelectedPost(post)
  }
/>
  )
)}

      {/* Post Modal */}
      {selectedPost && (
  //       <PostModal
  //         post={selectedPost}
  //         onClose={() => setSelectedPost(null)}
  //         onLikeUpdated={handleLikeUpdated}
  //         onCommentUpdated={handleCommentUpdated}
  //         onPostDeleted={(postId) => {
  //   setPosts((currentPosts) =>
  //     currentPosts.filter(
  //       (post) => post.id !== postId
  //     )
  //   );
  //    setSavedPosts((currentSavedPosts) =>
  //     currentSavedPosts.filter(
  //       (item) =>
  //         item.post?.id !== postId
  //     )
  //   );
  // }}
  //       />

  <PostModal
  post={selectedPost}
  onClose={() => setSelectedPost(null)}
  onLikeUpdated={handleLikeUpdated}
  onCommentUpdated={handleCommentUpdated}

  onPostDeleted={(postId) => {
    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId
      )
    );

    setSavedPosts((currentSavedPosts) =>
      currentSavedPosts.filter(
        (item) => item.post?.id !== postId
      )
    );
  }}

  onPostUnsave={(postId) => {
    setSavedPosts((currentSavedPosts) =>
      currentSavedPosts.filter(
        (item) => item.post?.id !== postId
      )
    );

    // Saved tab se Unsave hone ke baad modal close
    setSelectedPost(null);
  }}
/>
      )}

      {/* Edit Profile */}
      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
};

export default Profile;
