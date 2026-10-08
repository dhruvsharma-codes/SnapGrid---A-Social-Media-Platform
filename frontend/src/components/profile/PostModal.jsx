// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import {
//   savePost,
//   unsavePost,
// } from "../../services/savedPostService.js";
// import { deletePost } from "../../services/postService.js";

// import { X, Heart, MessageCircle, Send, MoreVertical,
//   Bookmark,
//   Trash2, } from "lucide-react";


// import { toggleLike } from "../../services/likeService.js";

// import CommentsModal from "../post/CommentsModal.jsx";

// // const API_URL = "http://localhost:5000";

// const PostModal = ({ post, onClose, onLikeUpdated, onCommentUpdated, onPostDeleted, onPostUnsave, }) => {
//   const { user: currentUser } = useAuth();

//   const [liked, setLiked] = useState(post?.isLiked || false);

//   const [likeCount, setLikeCount] = useState(post?.likeCount || 0);

//   const [likeLoading, setLikeLoading] = useState(false);

//   const [showComments, setShowComments] = useState(false);
//   const [isSaved, setIsSaved] = useState(
//   post?.isSaved || false
// );

// const [saveLoading, setSaveLoading] =
//   useState(false);

// const [deleteLoading, setDeleteLoading] =
//   useState(false);

// const [showMenu, setShowMenu] =
//   useState(false);

//   if (!post) return null;

//   const imageUrl = post.image ? `${import.meta.env.VITE_API_URL}${post.image}` : null;

//   const handleLike = async () => {
//     if (likeLoading) return;

//     try {
//       setLikeLoading(true);

//       const response = await toggleLike(post.id);

//       const { liked, likeCount } = response.data;

//       setLiked(liked);

//       setLikeCount(likeCount);

//       if (onLikeUpdated) {
//         onLikeUpdated({
//           postId: post.id,
//           liked,
//           likeCount,
//         });
//       }
//     } catch (error) {
//       console.error("Like Error:", error);
//     } finally {
//       setLikeLoading(false);
//     }
//   };

// //   const handleSave = async () => {
// //   if (saveLoading) return;

// //   try {
// //     setSaveLoading(true);

// //     if (isSaved) {
// //       await unsavePost(post.id);
// //       setIsSaved(false);
// //     } else {
// //       await savePost(post.id);
// //       setIsSaved(true);
// //     }

// //     setShowMenu(false);
// //   } catch (error) {
// //     console.error("Save Post Error:", error);
// //   } finally {
// //     setSaveLoading(false);
// //   }
// // };


// const handleSave = async () => {
//   if (saveLoading) return;

//   try {
//     setSaveLoading(true);

//     if (isSaved) {
//       await unsavePost(post.id);

//       setIsSaved(false);

//       // Saved tab ko immediately update karo
//       if (onPostUnsave) {
//         onPostUnsave(post.id);
//       }
//     } else {
//       await savePost(post.id);

//       setIsSaved(true);
//     }

//     setShowMenu(false);
//   } catch (error) {
//     console.error("Save Post Error:", error);
//   } finally {
//     setSaveLoading(false);
//   }
// };

// const handleDelete = async () => {
//   if (deleteLoading) return;

//   const confirmed = window.confirm(
//     "Are you sure you want to delete this post?"
//   );

//   if (!confirmed) return;

//   try {
//     setDeleteLoading(true);

//     await deletePost(post.id);
//     if (onPostDeleted) {
//   onPostDeleted(post.id);
// }


// setShowMenu(false);
// onClose();

//     onClose();
//   } catch (error) {
//     console.error(
//       "Delete Post Error:",
//       error
//     );
//   } finally {
//     setDeleteLoading(false);
//   }
// };

//   const handleCommentAdded = ({ postId, commentCount }) => {
//     if (onCommentUpdated) {
//       onCommentUpdated({
//         postId,
//         commentCount,
//       });
//     }
//   };

//   const handleCommentDeleted = ({ postId, commentCount }) => {
//     if (onCommentUpdated) {
//       onCommentUpdated({
//         postId,
//         commentCount,
//       });
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-(--border) bg-(--card) shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close */}
//         {/* <button
//           type="button"
//           onClick={onClose}
//           className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
//         >
//           <X size={20} />
//         </button> */}

//         <div className="absolute right-3 top-3 z-20 flex items-center gap-2">

//   {/* 3 DOT */}
//   <div className="relative">

//     <button
//       type="button"
//       onClick={() =>
//         setShowMenu((current) => !current)
//       }
//       className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
//     >
//       <MoreVertical size={20} />
//     </button>

//     {showMenu && (
//       <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">

//         {/* LIKE */}
//         <button
//           type="button"
//           onClick={() => {
//             handleLike();
//             setShowMenu(false);
//           }}
//           disabled={likeLoading}
//           className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover)"
//         >
//           <Heart
//             size={17}
//             className={
//               liked
//                 ? "fill-red-500 text-red-500"
//                 : ""
//             }
//           />

//           {liked
//             ? "Unlike Post"
//             : "Like Post"}
//         </button>

//         {/* COMMENT */}
//         <button
//           type="button"
//           onClick={() => {
//             setShowComments(true);
//             setShowMenu(false);
//           }}
//           className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover)"
//         >
//           <MessageCircle size={17} />

//           Comment Post
//         </button>

//         {/* SAVE */}
//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={saveLoading}
//           className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover) disabled:opacity-50"
//         >
//           <Bookmark
//             size={17}
//             className={
//               isSaved
//                 ? "fill-white"
//                 : ""
//             }
//           />

//           {saveLoading
//             ? "Saving..."
//             : isSaved
//               ? "Unsave Post"
//               : "Save Post"}
//         </button>

//         {/* DELETE */}
//         {Number(post.user?.id) ===
//           Number(currentUser?.id) && (
//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={deleteLoading}
//             className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
//           >
//             <Trash2 size={17} />

//             {deleteLoading
//               ? "Deleting..."
//               : "Delete Post"}
//           </button>
//         )}
//       </div>
//     )}
//   </div>

//   {/* CLOSE */}
//   <button
//     type="button"
//     onClick={onClose}
//     className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
//   >
//     <X size={20} />
//   </button>

// </div>

//         {/* User */}
//         <div className="flex items-center gap-3 border-b border-(--border) px-5 py-4">
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

//         {/* Image */}
//         {imageUrl && (
//           <div className="bg-black">
//             <img
//               src={imageUrl}
//               alt={post.caption || "Post"}
//               className="max-h-[55vh] w-full object-contain"
//             />
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex items-center gap-1 border-b border-(--border) px-4 py-3">
//           {/* Like */}
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
//             <Heart size={24} fill={liked ? "currentColor" : "none"} />
//           </button>

//           {/* Comment */}
//           <button
//             type="button"
//             onClick={() => setShowComments(true)}
//             className="rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
//           >
//             <MessageCircle size={24} />
//           </button>

//           {/* Share */}
//           <button
//             type="button"
//             className="rounded-full p-2 text-(--text-primary) transition hover:bg-(--card-hover)"
//           >
//             <Send size={24} />
//           </button>
//         </div>

//         {/* Counts */}
//         <div className="flex items-center gap-4 px-5 pt-3">
//           <p className="text-sm font-semibold text-white">
//             {likeCount} {likeCount === 1 ? "like" : "likes"}
//           </p>

//           <button
//             type="button"
//             onClick={() => setShowComments(true)}
//             className="text-sm font-semibold text-white hover:underline"
//           >
//             {post.commentCount || 0}{" "}
//             {post.commentCount === 1 ? "comment" : "comments"}
//           </button>
//         </div>

//         {/* Caption */}
//         {post.caption && (
//           <div className="px-5 py-4">
//             <p className="text-sm leading-6 text-(--text-primary)">
//               <span className="mr-2 font-semibold block text-white">
//                 {post.user?.username}
//               </span>
//               {post.caption}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Comments Modal */}
//       {showComments && (
//         <CommentsModal
//           post={post}
//           onClose={() => setShowComments(false)}
//           onCommentAdded={handleCommentAdded}
//           onCommentDeleted={handleCommentDeleted}
//         />
//       )}
//     </div>
//   );
// };

// export default PostModal;
















import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

import {
  savePost,
  unsavePost,
} from "../../services/savedPostService.js";

import { deletePost } from "../../services/postService.js";

import {
  X,
  Heart,
  MessageCircle,
  Send,
  MoreVertical,
  Bookmark,
  Trash2,
} from "lucide-react";

import { toggleLike } from "../../services/likeService.js";

import CommentsModal from "../post/CommentsModal.jsx";

const PostModal = ({
  post,
  onClose,
  onLikeUpdated,
  onCommentUpdated,
  onPostDeleted,
  onPostUnsave,
}) => {
  const { user: currentUser } = useAuth();

  const [liked, setLiked] = useState(
    post?.isLiked || false
  );

  const [likeCount, setLikeCount] = useState(
    post?.likeCount || 0
  );

  const [likeLoading, setLikeLoading] =
    useState(false);

  const [showComments, setShowComments] =
    useState(false);

  const [isSaved, setIsSaved] = useState(
    post?.isSaved || false
  );

  const [saveLoading, setSaveLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [showMenu, setShowMenu] =
    useState(false);

  if (!post) return null;

  const imageUrl = post.image
    ? `${import.meta.env.VITE_API_URL}${post.image}`
    : null;

  const handleLike = async () => {
    if (likeLoading) return;

    try {
      setLikeLoading(true);

      const response =
        await toggleLike(post.id);

      const {
        liked,
        likeCount,
      } = response.data;

      setLiked(liked);
      setLikeCount(likeCount);

      if (onLikeUpdated) {
        onLikeUpdated({
          postId: post.id,
          liked,
          likeCount,
        });
      }
    } catch (error) {
      console.error(
        "Like Error:",
        error
      );
    } finally {
      setLikeLoading(false);
    }
  };

  const handleSave = async () => {
    if (saveLoading) return;

    try {
      setSaveLoading(true);

      if (isSaved) {
        await unsavePost(post.id);

        setIsSaved(false);

        if (onPostUnsave) {
          onPostUnsave(post.id);
        }
      } else {
        await savePost(post.id);

        setIsSaved(true);
      }

      setShowMenu(false);
    } catch (error) {
      console.error(
        "Save Post Error:",
        error
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);

      await deletePost(post.id);

      if (onPostDeleted) {
        onPostDeleted(post.id);
      }

      setShowMenu(false);

      // Only close once
      onClose();
    } catch (error) {
      console.error(
        "Delete Post Error:",
        error
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCommentAdded = ({
    postId,
    commentCount,
  }) => {
    if (onCommentUpdated) {
      onCommentUpdated({
        postId,
        commentCount,
      });
    }
  };

  const handleCommentDeleted = ({
    postId,
    commentCount,
  }) => {
    if (onCommentUpdated) {
      onCommentUpdated({
        postId,
        commentCount,
      });
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-200
        flex
        items-center
        justify-center
        bg-black/80
        p-2
        sm:p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          flex
          max-h-[calc(100dvh-16px)]
          w-full
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-(--border)
          bg-(--card)
          shadow-2xl
          sm:max-h-[calc(100dvh-32px)]
          sm:max-w-xl
          sm:rounded-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Top Right Controls */}
        <div
          className="
            absolute
            right-2
            top-2
            z-30
            flex
            items-center
            gap-1.5
            sm:right-3
            sm:top-3
            sm:gap-2
          "
        >
          {/* More Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowMenu(
                  (current) => !current
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                transition
                hover:bg-black
                active:scale-95
              "
              aria-label="Post options"
            >
              <MoreVertical size={19} />
            </button>

            {showMenu && (
              <div
                className="
                  absolute
                  right-0
                  top-11
                  z-50
                  w-48
                  overflow-hidden
                  rounded-xl
                  border
                  border-(--border)
                  bg-(--card)
                  shadow-xl
                "
              >
                {/* Like */}
                <button
                  type="button"
                  onClick={() => {
                    handleLike();
                    setShowMenu(false);
                  }}
                  disabled={likeLoading}
                  className="
                    flex
                    min-h-11
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white
                    transition
                    hover:bg-(--card-hover)
                    disabled:opacity-50
                  "
                >
                  <Heart
                    size={17}
                    className={
                      liked
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />

                  {liked
                    ? "Unlike Post"
                    : "Like Post"}
                </button>

                {/* Comment */}
                <button
                  type="button"
                  onClick={() => {
                    setShowComments(true);
                    setShowMenu(false);
                  }}
                  className="
                    flex
                    min-h-11
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white
                    transition
                    hover:bg-(--card-hover)
                  "
                >
                  <MessageCircle size={17} />

                  Comment Post
                </button>

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="
                    flex
                    min-h-11
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white
                    transition
                    hover:bg-(--card-hover)
                    disabled:opacity-50
                  "
                >
                  <Bookmark
                    size={17}
                    className={
                      isSaved
                        ? "fill-white"
                        : ""
                    }
                  />

                  {saveLoading
                    ? "Saving..."
                    : isSaved
                      ? "Unsave Post"
                      : "Save Post"}
                </button>

                {/* Delete */}
                {Number(post.user?.id) ===
                  Number(currentUser?.id) && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="
                      flex
                      min-h-11
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      text-sm
                      text-red-400
                      transition
                      hover:bg-red-500/10
                      disabled:opacity-50
                    "
                  >
                    <Trash2 size={17} />

                    {deleteLoading
                      ? "Deleting..."
                      : "Delete Post"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-black/60
              text-white
              transition
              hover:bg-black
              active:scale-95
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* User */}
        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
            border-b
            border-(--border)
            px-4
            py-3
            pr-24
            sm:px-5
            sm:py-4
            sm:pr-28
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-(--primary)
              sm:h-10
              sm:w-10
            "
          >
            {post.user?.profileImage ? (
              <img
                src={
                  post.user.profileImage.startsWith(
                    "http"
                  )
                    ? post.user.profileImage
                    : `${import.meta.env.VITE_API_URL}${post.user.profileImage}`
                }
                alt={
                  post.user?.username ||
                  "Profile"
                }
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {post.user?.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              @{post.user?.username}
            </p>

            <p className="truncate text-xs text-(--text-secondary)">
              {post.user?.fullName}
            </p>
          </div>
        </div>

        {/* Image */}
        {imageUrl && (
          <div className="flex max-h-[42vh] shrink-0 items-center justify-center bg-black sm:max-h-[55vh]">
            <img
              src={imageUrl}
              alt={
                post.caption || "Post"
              }
              className="
                max-h-[42vh]
                w-full
                object-contain
                sm:max-h-[55vh]
              "
            />
          </div>
        )}

        {/* Scrollable Content */}
        <div className="min-h-0 overflow-y-auto">
          {/* Actions */}
          <div
            className="
              flex
              items-center
              gap-1
              border-b
              border-(--border)
              px-3
              py-2
              sm:px-4
              sm:py-3
            "
          >
            {/* Like */}
            <button
              type="button"
              onClick={handleLike}
              disabled={likeLoading}
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition
                active:scale-95
                ${
                  liked
                    ? "text-red-500"
                    : "text-(--text-primary) hover:bg-(--card-hover)"
                }
              `}
              aria-label="Like post"
            >
              <Heart
                size={23}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

            {/* Comment */}
            <button
              type="button"
              onClick={() =>
                setShowComments(true)
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-(--text-primary)
                transition
                hover:bg-(--card-hover)
                active:scale-95
              "
              aria-label="Comment"
            >
              <MessageCircle size={23} />
            </button>

            {/* Share */}
            <button
              type="button"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-(--text-primary)
                transition
                hover:bg-(--card-hover)
                active:scale-95
              "
              aria-label="Share"
            >
              <Send size={23} />
            </button>
          </div>

          {/* Counts */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-1
              px-4
              pt-3
              sm:px-5
            "
          >
            <p className="text-sm font-semibold text-white">
              {likeCount}{" "}
              {likeCount === 1
                ? "like"
                : "likes"}
            </p>

            <button
              type="button"
              onClick={() =>
                setShowComments(true)
              }
              className="
                text-sm
                font-semibold
                text-white
                hover:underline
              "
            >
              {post.commentCount || 0}{" "}
              {post.commentCount === 1
                ? "comment"
                : "comments"}
            </button>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="px-4 py-3 sm:px-5 sm:py-4">
              <p
                className="
                  break-words
                  text-sm
                  leading-6
                  text-(--text-primary)
                "
              >
                <span className="mr-2 font-semibold text-white">
                  @{post.user?.username}
                </span>

                {post.caption}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <CommentsModal
          post={post}
          onClose={() =>
            setShowComments(false)
          }
          onCommentAdded={
            handleCommentAdded
          }
          onCommentDeleted={
            handleCommentDeleted
          }
        />
      )}
    </div>
  );
};

export default PostModal;