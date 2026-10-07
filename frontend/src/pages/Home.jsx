import { useEffect, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

import { getFeedPosts } from "../services/postService.js";
import { toggleLike } from "../services/likeService.js";
import SuggestedUsers from "../components/user/SuggestedUsers.jsx";

import CommentModal from "../components/post/CommentsModal.jsx";

const API_URL = "http://localhost:5000";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [likeLoading, setLikeLoading] = useState(null);

  // Currently selected post for comment modal
  const [commentPost, setCommentPost] = useState(null);

  // FETCH FEED
  const fetchFeed = async (pageNumber = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await getFeedPosts(pageNumber, 10);

      const newPosts = response.data.posts || [];
      const newPagination = response.data.pagination;

      if (append) {
        setPosts((currentPosts) => [...currentPosts, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      setPagination(newPagination);
      setPage(pageNumber);
    } catch (error) {
      console.error("Feed Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFeed(1, false);
  }, []);

  // LOAD MORE POSTS
  const handleLoadMore = () => {
    if (pagination?.hasNextPage && !loadingMore) {
      fetchFeed(page + 1, true);
    }
  };

 
  // LIKE / UNLIKE
  const handleLike = async (post) => {
    if (likeLoading === post.id) return;

    try {
      setLikeLoading(post.id);

      const response = await toggleLike(post.id);

      const data = response.data;

      setPosts((currentPosts) =>
        currentPosts.map((item) =>
          item.id === post.id
            ? {
                ...item,
                isLiked: data.liked,
                likeCount: data.likeCount,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Like Error:", error);
    } finally {
      setLikeLoading(null);
    }
  };

  // =========================
  // COMMENT COUNT CHANGE
  // =========================

  const handleCommentChange = (postId, change) => {
    setPosts((currentPosts) =>
      currentPosts.map((item) =>
        item.id === postId
          ? {
              ...item,
              commentCount: Math.max(0, (item.commentCount || 0) + change),
            }
          : item,
      ),
    );
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-(--text-secondary)">Loading feed...</p>
      </div>
    );
  }

  // HOME
  return (
    <>
<div className="mx-auto grid h-[calc(100vh-80px)] w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[640px_320px]">     {/* <div className="w-full max-w-lg"> */}
     {/* <div className="w-full min-w-0 overflow-y-auto pr-2"> */}
     <div className="w-full max-w-[580px] overflow-y-auto pr-2">
        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <p className="mt-1 text-xs text-(--text-secondary)">
            Latest posts from SnapGrid
          </p>
        </div>

        {/* ================= NO POSTS ================= */}
        {posts.length === 0 ? (
          <div className="rounded-xl border border-(--border) bg-(--card) px-4 py-10 text-center">
            <p className="text-sm text-(--text-secondary)">No posts yet</p>
          </div>
        ) : (
          <>
            {/* ================= POSTS ================= */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-lg border border-(--border) bg-(--card)"
                >
                  {/* ================= USER HEADER ================= */}
                  <div className="flex items-center gap-3 px-3 py-3">
                    {/* Avatar */}

                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-(--primary)">
                      {post.user?.profileImage ? (
                        <img
                          src={`${API_URL}${post.user.profileImage}`}
                          alt={post.user.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-xs font-semibold text-white">
                            {post.user?.fullName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* User Info */}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {post.user?.fullName}
                      </p>

                      <p className="truncate text-[11px] text-(--text-secondary)">
                        @{post.user?.username}
                      </p>
                    </div>
                  </div>

                  {/* ================= POST IMAGE ================= */}

                  {post.image && (
                    <div className="bg-black">
                      <img
                        src={`${API_URL}${post.image}`}
                        alt="Post"
                        className="max-h-[500px] w-full object-cover"
                      />
                    </div>
                  )}

                  {/* ================= POST CONTENT ================= */}

                  <div className="px-3 py-3">
                    {/* ================= ACTIONS ================= */}

                    <div className="mb-2 flex items-center gap-4">
                      {/* LIKE */}

                      <button
                        type="button"
                        disabled={likeLoading === post.id}
                        onClick={() => handleLike(post)}
                        className="flex items-center gap-1.5 transition hover:opacity-80 disabled:opacity-50"
                      >
                        <Heart
                          size={20}
                          className={
                            post.isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }
                        />

                        <span className="text-xs text-white">
                          {post.likeCount || 0}
                        </span>
                      </button>

                      {/* COMMENT */}

                      <button
                        type="button"
                        onClick={() => setCommentPost(post)}
                        className="flex items-center gap-1.5 text-white transition hover:opacity-80"
                      >
                        <MessageCircle size={19} />

                        <span className="text-xs">
                          {post.commentCount || 0}
                        </span>
                      </button>

                      {/* SHARE */}

                      <button
                        type="button"
                        className="text-white transition hover:opacity-80"
                      >
                        <Send size={18} />
                      </button>
                    </div>

                    {/* ================= CAPTION ================= */}

                    {post.caption && (
                      <p className="text-sm leading-5 text-(--text-primary)">
                        <span className="mr-2 font-semibold">
                          {post.user?.username}
                        </span>

                        {post.caption}
                      </p>
                    )}

                    {/* ================= DATE ================= */}

                    <p className="mt-2 text-[10px] text-(--text-muted)">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= LOAD MORE ================= */}

            {pagination?.hasNextPage && (
              <div className="flex justify-center py-6">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-lg border border-(--border) bg-(--card) px-5 py-2 text-xs font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {/* ================= ALL POSTS LOADED ================= */}

            {!pagination?.hasNextPage && posts.length > 0 && (
              <p className="py-6 text-center text-xs text-(--text-muted)">
                You've reached the end
              </p>
            )}
          </>
        )}
      </div>
       {/* ================= SUGGESTED USERS ================= */}
      <aside className="hidden lg:block">
        <SuggestedUsers />
      </aside>

    </div>

      {/* ================= COMMENT MODAL ================= */}

      {commentPost && (
        <CommentModal
          post={commentPost}
          onClose={() => setCommentPost(null)}
          onCommentChange={handleCommentChange}
        />
      )}
    </>
  );
};

export default Home;
