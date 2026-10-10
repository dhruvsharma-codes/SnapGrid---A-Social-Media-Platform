
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Bookmark, MoreVertical } from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import { getFeedPosts, deletePost } from "../services/postService.js";
import { toggleLike } from "../services/likeService.js";
import { savePost, unsavePost } from "../services/savedPostService.js";
import CommentsModal from "../components/post/CommentsModal.jsx";

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 10;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path}`;
};

const Explore = () => {
  const { user: currentUser } = useAuth();

  const [posts, setPosts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [commentPost, setCommentPost] = useState(null);
  const [busyPost, setBusyPost] = useState({});
  const [openMenu, setOpenMenu] = useState(null);

  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);
  const busyRef = useRef(new Set());

  const fetchPosts = useCallback(async (pageNumber, append = false) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      setError("");
      if (append) setLoadingMore(true);
      else setLoading(true);

      const response = await getFeedPosts(pageNumber, PAGE_SIZE);
      const incoming = response?.data?.posts || [];

      setPosts((current) => {
        if (!append) return incoming;

        const existingIds = new Set(current.map((post) => post.id));
        return [
          ...current,
          ...incoming.filter((post) => !existingIds.has(post.id)),
        ];
      });

      setPagination(response?.data?.pagination || null);
      setPage(pageNumber);
    } catch (err) {
      console.error("Explore Error:", err);
      setError(err.message || "Unable to load posts.");
    } finally {
      fetchingRef.current = false;
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !pagination?.hasNextPage || loadingMore || loading || error) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchPosts(page + 1, true);
      },
      { rootMargin: "400px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [pagination, page, loading, loadingMore, error, fetchPosts]);

  const updatePost = useCallback((postId, changes) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, ...changes } : post
      )
    );

    setCommentPost((current) =>
      current?.id === postId ? { ...current, ...changes } : current
    );
  }, []);

  const performAction = async (post, action) => {
    if (busyRef.current.has(post.id)) return;

    busyRef.current.add(post.id);
    setBusyPost((current) => ({ ...current, [post.id]: action }));

    try {
      if (action === "like") {
        const response = await toggleLike(post.id);
        const data = response?.data;

        if (data) {
          updatePost(post.id, {
            isLiked: data.liked,
            likeCount: data.likeCount,
          });
        }
      }

      if (action === "save") {
        if (post.isSaved) await unsavePost(post.id);
        else await savePost(post.id);

        updatePost(post.id, { isSaved: !post.isSaved });
      }

      if (action === "delete") {
        if (!window.confirm("Are you sure you want to delete this post?")) {
          return;
        }

        await deletePost(post.id);

        setPosts((current) =>
          current.filter((item) => item.id !== post.id)
        );

        setSelectedIndex((current) => {
          if (current === null) return null;
          if (current > posts.findIndex((item) => item.id === post.id)) {
            return current - 1;
          }
          if (current >= posts.length - 1) return null;
          return current;
        });
      }
    } catch (err) {
      console.error(`Explore ${action} error:`, err);
    } finally {
      busyRef.current.delete(post.id);
      setBusyPost((current) => {
        const next = { ...current };
        delete next[post.id];
        return next;
      });
    }
  };

  const changeCommentCount = useCallback((postId, change) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentCount: Math.max(0, (post.commentCount || 0) + change),
            }
          : post
      )
    );
  }, []);

  const openPost = (post) => {
    const index = posts.findIndex((item) => item.id === post.id);
    if (index !== -1) setSelectedIndex(index);
  };

  const selectedPost =
    selectedIndex !== null ? posts[selectedIndex] : null;

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center text-sm text-(--text-secondary)">
        Loading Explore...
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <p className="text-sm text-red-400">{error}</p>
        <button
          onClick={() => fetchPosts(1)}
          className="rounded-xl border border-(--border) px-4 py-2 text-sm text-(--text-primary)"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-2 py-4 sm:px-4 sm:py-6">
      {selectedPost ? (
        <>
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="mb-4 flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm text-(--text-primary) hover:bg-(--card-hover)"
          >
            <ArrowLeft size={19} />
            Back to Explore
          </button>

          <div className="mx-auto max-w-2xl space-y-5">
            {posts.slice(selectedIndex).map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-xl border border-(--border) bg-(--card) sm:rounded-2xl"
              >
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={
                        assetUrl(post.user?.profileImage) ||
                        "/default-avatar.png"
                      }
                      alt=""
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      className="h-10 w-10 rounded-full bg-(--background-secondary) object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-(--text-primary)">
                        {post.user?.fullName || post.user?.username || "User"}
                      </p>
                      <p className="truncate text-xs text-(--text-secondary)">
                        @{post.user?.username || "user"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Post options"
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === post.id ? null : post.id
                      )
                    }
                    className="rounded-full p-2 text-(--text-secondary) hover:bg-(--card-hover)"
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>

                {openMenu === post.id && (
                  <div className="flex flex-wrap gap-2 px-3 pb-3">
                    <button
                      onClick={() => performAction(post, "save")}
                      disabled={!!busyPost[post.id]}
                      className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--text-primary)"
                    >
                      {post.isSaved ? "Unsave Post" : "Save Post"}
                    </button>

                    {Number(post.user?.id) === Number(currentUser?.id) && (
                      <button
                        onClick={() => performAction(post, "delete")}
                        disabled={!!busyPost[post.id]}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400"
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                )}

                {post.image && (
                  <img
                    src={assetUrl(post.image)}
                    alt={post.caption || "Post"}
                    loading={post.id === selectedPost.id ? "eager" : "lazy"}
                    decoding="async"
                    className="max-h-[75vh] w-full bg-black object-contain"
                  />
                )}

                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      disabled={!!busyPost[post.id]}
                      onClick={() => performAction(post, "like")}
                      className="flex min-h-10 items-center gap-2 text-(--text-primary)"
                    >
                      <Heart
                        size={22}
                        className={post.isLiked ? "fill-red-500 text-red-500" : ""}
                      />
                      <span className="text-sm">{post.likeCount || 0}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCommentPost(post)}
                      className="flex min-h-10 items-center gap-2 text-(--text-primary)"
                    >
                      <MessageCircle size={21} />
                      <span className="text-sm">{post.commentCount || 0}</span>
                    </button>

                    <button
                      type="button"
                      disabled={!!busyPost[post.id]}
                      onClick={() => performAction(post, "save")}
                      aria-label={post.isSaved ? "Unsave post" : "Save post"}
                      className="ml-auto min-h-10 rounded-lg px-2 text-(--text-primary)"
                    >
                      <Bookmark
                        size={21}
                        className={post.isSaved ? "fill-current" : ""}
                      />
                    </button>
                  </div>

                  {post.caption && (
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-(--text-primary)">
                      <span className="mr-2 font-semibold">
                        {post.user?.username}
                      </span>
                      {post.caption}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-(--text-muted)">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </article>
            ))}

            {pagination?.hasNextPage && (
              <div ref={sentinelRef} className="py-6 text-center">
                {loadingMore && (
                  <p className="text-sm text-(--text-secondary)">
                    Loading more posts...
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-(--text-primary)">
              Explore
            </h1>
            <p className="mt-1 text-sm text-(--text-secondary)">
              Discover posts from SnapGrid
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="py-12 text-center text-sm text-(--text-secondary)">
              No posts to explore yet.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => openPost(post)}
                  aria-label={`Open post by ${post.user?.username || "user"}`}
                  className="group relative aspect-square overflow-hidden bg-(--card)"
                >
                  {post.image ? (
                    <img
                      src={assetUrl(post.image)}
                      alt={post.caption || "Explore post"}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-sm text-(--text-primary)">
                      {post.caption || "Post"}
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/0 text-white opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <Heart size={18} />
                      {post.likeCount || 0}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <MessageCircle size={18} />
                      {post.commentCount || 0}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {pagination?.hasNextPage && (
            <div ref={sentinelRef} className="py-6 text-center">
              {loadingMore && (
                <p className="text-sm text-(--text-secondary)">
                  Loading more posts...
                </p>
              )}
            </div>
          )}

          {error && (
            <p className="py-4 text-center text-sm text-red-400">{error}</p>
          )}
        </>
      )}

      {commentPost && (
        <CommentsModal
          post={commentPost}
          onClose={() => setCommentPost(null)}
          onCommentChange={(postId, change) =>
            changeCommentCount(postId, change)
          }
        />
      )}
    </main>
  );
};

export default Explore;
