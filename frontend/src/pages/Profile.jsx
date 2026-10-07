import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/userService.js";
import { getUserPosts } from "../services/postService.js";
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
            src={`http://localhost:5000${user.coverImage}`}
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
      <ProfileTabs isOwnProfile={isOwnProfile} />

      {/* Posts */}
      {postsLoading ? (
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-(--text-secondary)">Loading posts...</p>
        </div>
      ) : (
        <ProfilePostGrid
          posts={posts}
          onPostClick={(post) => setSelectedPost(post)}
        />
      )}

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLikeUpdated={handleLikeUpdated}
          onCommentUpdated={handleCommentUpdated}
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
