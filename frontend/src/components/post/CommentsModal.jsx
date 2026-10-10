// import { useEffect, useState } from "react";

// import { X, Trash2 } from "lucide-react";

// import { useAuth } from "../../context/AuthContext.jsx";

// import {
//   getPostComments,
//   createComment,
//   deleteComment,
// } from "../../services/commentService.js";

// const CommentsModal = ({ post, onClose, onCommentAdded, onCommentDeleted }) => {
//   const { user: currentUser } = useAuth();

//   const [comments, setComments] = useState([]);

//   const [commentText, setCommentText] = useState("");

//   const [loading, setLoading] = useState(true);

//   const [commentLoading, setCommentLoading] = useState(false);

//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!post) return;

//     fetchComments();
//   }, [post]);

//   const fetchComments = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getPostComments(post.id);

//       setComments(response.data.comments);
//     } catch (error) {
//       console.error("Fetch Comments Error:", error);

//       setError(error.message || "Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const content = commentText.trim();

//     if (!content || commentLoading) {
//       return;
//     }

//     try {
//       setCommentLoading(true);
//       setError("");

//       const response = await createComment(post.id, content);

//       const newComment = response.data.comment;

//       setComments((currentComments) => [newComment, ...currentComments]);

//       setCommentText("");

//       if (onCommentAdded) {
//         onCommentAdded({
//           postId: post.id,
//           commentCount: comments.length + 1,
//         });
//       }
//     } catch (error) {
//       console.error("Create Comment Error:", error);

//       setError(error.message || "Failed to add comment");
//     } finally {
//       setCommentLoading(false);
//     }
//   };

//   const handleDelete = async (commentId) => {
//     try {
//       setError("");

//       await deleteComment(commentId);

//       setComments((currentComments) =>
//         currentComments.filter((comment) => comment.id !== commentId),
//       );

//       if (onCommentDeleted) {
//         onCommentDeleted({
//           postId: post.id,
//           commentCount: Math.max(comments.length - 1, 0),
//         });
//       }
//     } catch (error) {
//       console.error("Delete Comment Error:", error);

//       setError(error.message || "Failed to delete comment");
//     }
//   };

//   if (!post) return null;

//   return (
//     <div
//       className="fixed inset-0 z-300 flex items-center justify-center bg-black/70 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="flex h-137.5 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card) shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-5 py-4">
//           <div>
//             <h2 className="text-lg font-semibold text-white">Comments</h2>

//             <p className="mt-0.5 text-xs text-(--text-secondary)">
//               {comments.length} {comments.length === 1 ? "comment" : "comments"}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-full text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Comments */}
//         <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
//           {loading && (
//             <div className="flex justify-center py-8">
//               <p className="text-sm text-(--text-secondary)">
//                 Loading comments...
//               </p>
//             </div>
//           )}

//           {!loading && comments.length === 0 && (
//             <div className="flex h-full flex-col items-center justify-center text-center">
//               <p className="text-base font-medium text-white">
//                 No comments yet
//               </p>

//               <p className="mt-1 text-sm text-(--text-secondary)">
//                 Be the first to comment.
//               </p>
//             </div>
//           )}

//           {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

//           <div className="space-y-5">
//             {comments.map((comment) => (
//               <div key={comment.id} className="flex gap-3">
//                 {/* Avatar */}
//                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--primary)">
//                   <span className="text-sm font-semibold text-white">
//                     {comment.user?.fullName?.charAt(0).toUpperCase()}
//                   </span>
//                 </div>

//                 {/* Content */}
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="min-w-0">
//                       <p className="text-sm font-semibold text-white">
//                         @{comment.user?.username}
//                       </p>

//                       <p className="mt-1 wrap-break-word text-sm leading-5 text-(--text-secondary)">
//                         {comment.content}
//                       </p>
//                     </div>

//                     {/* Delete own comment */}
//                     {currentUser?.id === comment.userId && (
//                       <button
//                         type="button"
//                         onClick={() => handleDelete(comment.id)}
//                         className="shrink-0 rounded-lg p-2 text-(--text-muted) transition hover:bg-(--card-hover) hover:text-red-400"
//                         title="Delete comment"
//                       >
//                         <Trash2 size={15} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex shrink-0 gap-2 border-t border-(--border) p-4"
//         >
//           <input
//             type="text"
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder="Write a comment..."
//             maxLength={500}
//             className="min-w-0 flex-1 rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//           />

//           <button
//             type="submit"
//             disabled={!commentText.trim() || commentLoading}
//             className="rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {commentLoading ? "..." : "Post"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommentsModal;






































import { memo, useCallback, useEffect, useRef, useState } from "react";
import { X, Trash2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import {
  getPostComments,
  createComment,
  deleteComment,
} from "../../services/commentService.js";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const CommentItem = memo(function CommentItem({ comment, canDelete, onDelete }) {
  const [imageFailed, setImageFailed] = useState(false);
  const user = comment.user;

  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
        {user?.profileImage && !imageFailed ? (
          <img
            src={assetUrl(user.profileImage)}
            alt={user.username}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-white">
            {(user?.fullName || user?.username || "?").charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              @{user?.username}
            </p>
            <p className="wrap-break-word mt-1 text-sm leading-5 text-(--text-secondary)">
              {comment.content}
            </p>
          </div>

          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(comment.id)}
              title="Delete comment"
              aria-label="Delete comment"
              className="shrink-0 rounded-lg p-2 text-(--text-muted) transition hover:bg-(--card-hover) hover:text-red-400"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

const CommentsModal = ({ post, onClose, onCommentAdded, onCommentDeleted }) => {
  const { user: currentUser } = useAuth();
  const currentUserId = Number(currentUser?.id);

  // Depend on the ID only. Depending on the whole `post` object refetched
  // all comments (and flashed "Loading") every time the parent patched the
  // post, e.g. after a like.
  const postId = post?.id;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");

  // always-current copy of the list, so rapid actions never use a stale closure
  const commentsRef = useRef([]);

  const applyComments = useCallback((updater) => {
    const next = updater(commentsRef.current);
    commentsRef.current = next;
    setComments(next);
    return next;
  }, []);

  // load comments (race-safe)
  useEffect(() => {
    if (!postId) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPostComments(postId);
        if (cancelled) return;

        applyComments(() => response?.data?.comments || []);
      } catch (err) {
        console.error("Fetch Comments Error:", err);
        if (!cancelled) setError(err.message || "Failed to load comments");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [postId, applyComments]);

  // Escape closes + lock background scroll
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = commentText.trim();
    if (!content || commentLoading) return;

    try {
      setCommentLoading(true);
      setError("");

      const response = await createComment(postId, content);
      const newComment = response?.data?.comment;

      if (newComment) {
        const next = applyComments((current) => [newComment, ...current]);
        onCommentAdded?.({ postId, commentCount: next.length });
      }

      setCommentText("");
    } catch (err) {
      console.error("Create Comment Error:", err);
      setError(err.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  // delete: removed instantly, restored if the request fails
  const handleDelete = useCallback(
    async (commentId) => {
      const index = commentsRef.current.findIndex((c) => c.id === commentId);
      if (index === -1) return;

      const removed = commentsRef.current[index];

      setError("");
      applyComments((current) => current.filter((c) => c.id !== commentId));

      try {
        await deleteComment(commentId);

        onCommentDeleted?.({
          postId,
          commentCount: commentsRef.current.length,
        });
      } catch (err) {
        console.error("Delete Comment Error:", err);
        setError(err.message || "Failed to delete comment");

        applyComments((current) => [
          ...current.slice(0, index),
          removed,
          ...current.slice(index),
        ]);
      }
    },
    [postId, applyComments, onCommentDeleted]
  );

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Comments"
    >
      <div className="flex h-[min(550px,85dvh)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card) shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Comments</h2>
            <p className="mt-0.5 text-xs text-(--text-secondary)">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Comments */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {loading && (
            <div className="flex justify-center py-8">
              <p className="text-sm text-(--text-secondary)">
                Loading comments...
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="mb-4 text-sm text-red-400">
              {error}
            </p>
          )}

          {!loading && !error && comments.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-base font-medium text-white">
                No comments yet
              </p>
              <p className="mt-1 text-sm text-(--text-secondary)">
                Be the first to comment.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                // Number() on both sides: a strict === between a string id and
                // a number id meant the delete button never appeared
                canDelete={
                  Number(comment.userId ?? comment.user?.id) === currentUserId
                }
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex shrink-0 gap-2 border-t border-(--border) p-4"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            aria-label="Write a comment"
            maxLength={500}
            autoComplete="off"
            className="min-w-0 flex-1 rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
          />

          <button
            type="submit"
            disabled={!commentText.trim() || commentLoading}
            className="rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {commentLoading ? "..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;