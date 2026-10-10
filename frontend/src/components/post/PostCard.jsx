// import { useState } from "react";

// import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";

// import { toggleLike } from "../../services/likeService.js";

// // const API_URL = "http://localhost:5000";

// const PostCard = ({ post, onPostClick }) => {
//   const [liked, setLiked] = useState(post.isLiked || false);

//   const [likeCount, setLikeCount] = useState(post.likeCount || 0);

//   const [likeLoading, setLikeLoading] = useState(false);

//   // const imageUrl = post.image ? `${API_URL}${post.image}` : null;
//   const imageUrl = post.image
//   ? `${import.meta.env.VITE_API_URL}${post.image}`
//   : null;

//   const handleLike = async () => {
//     if (likeLoading) return;

//     try {
//       setLikeLoading(true);

//       const response = await toggleLike(post.id);

//       const { liked, likeCount } = response.data;

//       setLiked(liked);

//       setLikeCount(likeCount);
//     } catch (error) {
//       console.error("Like Error:", error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   return (
//     <article className="overflow-hidden cursor-pointer rounded-2xl border border-(--border) bg-(--card)">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary)">
//             <span className="font-semibold text-white">
//               {post.user?.fullName?.charAt(0).toUpperCase()}
//             </span>
//           </div>

//           <div>
//             <p className="text-sm font-semibold text-white">
//               @{post.user?.username}
//             </p>

//             <p className="text-xs text-(--text-secondary)">
//               {post.user?.fullName}
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           className="rounded-full p-2 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//         >
//           <MoreHorizontal size={20} />
//         </button>
//       </div>

//       {/* Image */}
//       {imageUrl && (
//         <button
//           type="button"
//           onClick={() => onPostClick(post)}
//           className="block w-full"
//         >
//           <img
//             src={imageUrl}
//             alt={post.caption || "Post"}
//             className="max-h-162.5 w-full object-cover"
//           />
//         </button>
//       )}

//       {/* Actions */}
//       <div className="flex items-center cursor-pointer gap-3 px-3 pt-3">
//         {/* Like */}
//         <div className="flex items-center cursor-pointer gap-1">
//           <button
//             type="button"
//             onClick={handleLike}
//             disabled={likeLoading}
//             className={`rounded-full p-2 transition ${
//               liked
//                 ? "text-red-500"
//                 : "text-(--text-primary) hover:bg-(--card-hover)"
//             }`}
//           >
//             <Heart size={23} fill={liked ? "currentColor" : "none"} />
//           </button>

//           <span className="text-sm text-(--text-secondary)">{likeCount}</span>
//         </div>

//         {/* Comment */}
//         <button
//           type="button"
//           onClick={() => onPostClick(post)}
//           className="flex items-center gap-1 rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
//         >
//           <MessageCircle size={23} />

//           <span className="text-sm text-(--text-secondary)">
//             {post.commentCount || 0}
//           </span>
//         </button>

//         {/* Share */}
//         <button
//           type="button"
//           className="rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
//         >
//           <Send size={23} />
//         </button>
//       </div>

//       {/* Like Count */}
//       <div className="px-4 pt-1">
//         <p className="text-sm font-semibold text-white">
//           {likeCount} {likeCount === 1 ? "like" : "likes"}
//         </p>
//       </div>

//       {/* Caption */}
//       {post.caption && (
//         <div className="px-4 py-3">
//           <p className="text-sm leading-6 text-(--text-primary)">
//             <span className="mr-2 font-semibold text-white">
//               {post.user?.username}
//             </span>

//             {post.caption}
//           </p>
//         </div>
//       )}
//     </article>
//   );
// };

// export default PostCard;























import { memo, useEffect, useState } from "react";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";

import { toggleLike } from "../../services/likeService.js";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const PostCard = ({ post, onPostClick, onLikeUpdated }) => {
  const [liked, setLiked] = useState(!!post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  // stay in sync if the parent updates the post (state used to be frozen
  // at first render)
  useEffect(() => setLiked(!!post.isLiked), [post.id, post.isLiked]);
  useEffect(() => setLikeCount(post.likeCount || 0), [post.id, post.likeCount]);

  const imageUrl = post.image ? assetUrl(post.image) : null;
  const user = post.user;

  // optimistic like, rolled back on failure
  const handleLike = async () => {
    if (likeLoading) return;

    const previous = { liked, likeCount };
    const nextLiked = !liked;

    setLiked(nextLiked);
    setLikeCount((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
    setLikeLoading(true);

    try {
      const response = await toggleLike(post.id);
      const data = response?.data;

      if (data) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
        onLikeUpdated?.({
          postId: post.id,
          liked: data.liked,
          likeCount: data.likeCount,
        });
      }
    } catch (error) {
      console.error("Like Error:", error);
      setLiked(previous.liked);
      setLikeCount(previous.likeCount);
    } finally {
      setLikeLoading(false);
    }
  };

  const openPost = () => onPostClick?.(post);

  return (
    <article className="overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
            {user?.profileImage && !avatarFailed ? (
              <img
                src={assetUrl(user.profileImage)}
                alt={user.username}
                loading="lazy"
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-semibold text-white">
                {(user?.fullName || user?.username || "?")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              @{user?.username}
            </p>
            <p className="truncate text-xs text-(--text-secondary)">
              {user?.fullName}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="More options"
          className="rounded-full p-2 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      {imageUrl && (
        <button
          type="button"
          onClick={openPost}
          className="block w-full cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={post.caption || "Post"}
            loading="lazy"
            decoding="async"
            className="max-h-[650px] w-full object-cover"
          />
        </button>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 px-3 pt-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleLike}
            disabled={likeLoading}
            aria-label={liked ? "Unlike" : "Like"}
            aria-pressed={liked}
            className={`rounded-full p-2 transition ${
              liked
                ? "text-red-500"
                : "text-(--text-primary) hover:bg-(--card-hover)"
            }`}
          >
            <Heart size={23} fill={liked ? "currentColor" : "none"} />
          </button>

          <span className="text-sm text-(--text-secondary)">{likeCount}</span>
        </div>

        <button
          type="button"
          onClick={openPost}
          aria-label="Comments"
          className="flex items-center gap-1 rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
        >
          <MessageCircle size={23} />
          <span className="text-sm text-(--text-secondary)">
            {post.commentCount || 0}
          </span>
        </button>

        <button
          type="button"
          aria-label="Share"
          className="rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
        >
          <Send size={23} />
        </button>
      </div>

      <div className="px-4 pt-1">
        <p className="text-sm font-semibold text-white">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </p>
      </div>

      {post.caption && (
        <div className="px-4 py-3">
          <p className="break-words text-sm leading-6 text-(--text-primary)">
            <span className="mr-2 font-semibold text-white">
              {user?.username}
            </span>
            {post.caption}
          </p>
        </div>
      )}
    </article>
  );
};

export default memo(PostCard);