// import { useEffect, useState } from "react";
// import { Heart, MessageCircle, Send, MoreVertical,
//   Bookmark,
//   Trash2, } from "lucide-react";
//   import { useAuth } from "../context/AuthContext.jsx";

// import { getFeedPosts,deletePost } from "../services/postService.js";
// import { toggleLike } from "../services/likeService.js";
// import {
//   savePost,
//   unsavePost,
// } from "../services/savedPostService.js";
// import SuggestedUsers from "../components/user/SuggestedUsers.jsx";

// import CommentModal from "../components/post/CommentsModal.jsx";


// // const API_URL = "http://localhost:5000";
// const API_URL = import.meta.env.VITE_API_URL;

// const Home = () => {
//    const { user: currentUser } = useAuth();
//   const [posts, setPosts] = useState([]);

//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const [likeLoading, setLikeLoading] = useState(null);
//   const [openMenu, setOpenMenu] = useState(null);

// const [saveLoading, setSaveLoading] =
//   useState(null);
//   const [deleteLoading, setDeleteLoading] =
//   useState(null);

//   // Currently selected post for comment modal
//   const [commentPost, setCommentPost] = useState(null);

//   // FETCH FEED
//   const fetchFeed = async (pageNumber = 1, append = false) => {
//     try {
//       if (append) {
//         setLoadingMore(true);
//       } else {
//         setLoading(true);
//       }

//       const response = await getFeedPosts(pageNumber, 10);

//       const newPosts = response.data.posts || [];
//       const newPagination = response.data.pagination;

//       if (append) {
//         setPosts((currentPosts) => [...currentPosts, ...newPosts]);
//       } else {
//         setPosts(newPosts);
//       }

//       setPagination(newPagination);
//       setPage(pageNumber);
//     } catch (error) {
//       console.error("Feed Error:", error);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeed(1, false);
//   }, []);

//   // LOAD MORE POSTS
//   const handleLoadMore = () => {
//     if (pagination?.hasNextPage && !loadingMore) {
//       fetchFeed(page + 1, true);
//     }
//   };

 
//   // LIKE / UNLIKE
//   const handleLike = async (post) => {
//     if (likeLoading === post.id) return;

//     try {
//       setLikeLoading(post.id);

//       const response = await toggleLike(post.id);

//       const data = response.data;

//       setPosts((currentPosts) =>
//         currentPosts.map((item) =>
//           item.id === post.id
//             ? {
//                 ...item,
//                 isLiked: data.liked,
//                 likeCount: data.likeCount,
//               }
//             : item,
//         ),
//       );
//     } catch (error) {
//       console.error("Like Error:", error);
//     } finally {
//       setLikeLoading(null);
//     }
//   };

//   // Handle Saved Post
//   const handleSavePost = async (post) => {
//   if (saveLoading === post.id) {
//     return;
//   }

//   try {
//     setSaveLoading(post.id);

//     if (post.isSaved) {
//       await unsavePost(post.id);

//       setPosts((currentPosts) =>
//         currentPosts.map((item) =>
//           item.id === post.id
//             ? {
//                 ...item,
//                 isSaved: false,
//               }
//             : item
//         )
//       );
//     } else {
//       await savePost(post.id);

//       setPosts((currentPosts) =>
//         currentPosts.map((item) =>
//           item.id === post.id
//             ? {
//                 ...item,
//                 isSaved: true,
//               }
//             : item
//         )
//       );
//     }
//   } catch (error) {
//     console.error(
//       "Save Post Error:",
//       error
//     );
//   } finally {
//     setSaveLoading(null);
//     setOpenMenu(null);
//   }
// };


// const handleDeletePost = async (postId) => {
//   if (deleteLoading === postId) {
//     return;
//   }

//   const confirmed = window.confirm(
//     "Are you sure you want to delete this post?"
//   );

//   if (!confirmed) {
//     return;
//   }

//   try {
//     setDeleteLoading(postId);

//     await deletePost(postId);

//     setPosts((currentPosts) =>
//       currentPosts.filter(
//         (post) => post.id !== postId
//       )
//     );

//     setOpenMenu(null);
//   } catch (error) {
//     console.error(
//       "Delete Post Error:",
//       error
//     );
//   } finally {
//     setDeleteLoading(null);
//   }
// };

//   // =========================
//   // COMMENT COUNT CHANGE
//   // =========================

//   const handleCommentChange = (postId, change) => {
//     setPosts((currentPosts) =>
//       currentPosts.map((item) =>
//         item.id === postId
//           ? {
//               ...item,
//               commentCount: Math.max(0, (item.commentCount || 0) + change),
//             }
//           : item,
//       ),
//     );
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <div className="flex justify-center py-10">
//         <p className="text-sm text-(--text-secondary)">Loading feed...</p>
//       </div>
//     );
//   }

//   // HOME
//   return (
//     <>
// {/* <div className="mx-auto grid h-[calc(100vh-80px)] w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[640px_320px]">    */}
// <div className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-6xl grid-cols-1 gap-4 lg:h-[calc(100vh-80px)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">

//      {/* <div className="w-full min-w-0 overflow-y-auto pr-2"> */}
//      {/* <div className="w-full posts-scroll  max-w-115 overflow-y-auto pr-2"> */}
//        <div className="posts-scroll min-w-0 overflow-y-auto lg:pr-2">
//     <div className="mx-auto w-full max-w-120">

//         {/* ================= HEADER ================= */}
//         <div className="sm:mb-5 mb-4">
//           <p className="mt-1 text-xs text-(--text-secondary) sm:text-sm">
//             Latest posts from SnapGrid
//           </p>
//         </div>

//         {/* ================= NO POSTS ================= */}
//         {posts.length === 0 ? (
//           <div className="rounded-xl border border-(--border) bg-(--card) px-4 py-10 text-center">
//             <p className="text-sm text-(--text-secondary)">No posts yet</p>
//           </div>
//         ) : (
//           <>
//             {/* ================= POSTS ================= */}
//             <div className="space-y-4">
//               {posts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="overflow-hidden rounded-lg border border-(--border) bg-(--card) sm:rounded-2xl"
//                 >
//                   {/* ================= USER HEADER ================= */}
//                   {/* <div className="flex items-center gap-3 px-3 py-3"> */}
//                   <div className="flex items-center min-w-0 gap-2 sm:px-4 justify-between px-3 py-3">
//                     {/* Avatar */}

//                     {/* <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-(--primary)">
//                       {post.user?.profileImage ? (
//                         <img
//                           src={`${API_URL}${post.user.profileImage}`}
//                           alt={post.user.username}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center">
//                           <span className="text-xs font-semibold text-white">
//                             {post.user?.fullName?.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       )}
//                     </div> */}

//                     {/* User Info */}

//                     {/* <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold text-white">
//                         {post.user?.fullName}
//                       </p>

//                       <p className="truncate text-[11px] text-(--text-secondary)">
//                         @{post.user?.username}
//                       </p>
//                     </div> */}


//                     <div className="flex min-w-0 items-center gap-3">

//   <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-(--primary) sm:h-10 sm:w-10">
//     {post.user?.profileImage ? (
//       <img
//         src={`${API_URL}${post.user.profileImage}`}
//         alt={post.user.username}
//         className="h-full w-full object-cover"
//       />
//     ) : (
//       <div className="flex h-full w-full items-center justify-center">
//         <span className="text-xs font-semibold text-white">
//           {post.user?.fullName
//             ?.charAt(0)
//             .toUpperCase()}
//         </span>
//       </div>
//     )}
//   </div>

//   <div className="min-w-0">
//     <p className="truncate text-sm font-semibold text-white">
//       {post.user?.fullName}
//     </p>

//     <p className="truncate text-[11px] text-(--text-secondary)">
//       @{post.user?.username}
//     </p>
//   </div>

// </div>

// <div className="relative shrink-0">

//   <button
//     type="button"
//     onClick={() =>
//       setOpenMenu(
//         openMenu === post.id
//           ? null
//           : post.id
//       )
//     }
//     // className="rounded-full p-2 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//     className="
//   flex
//   h-9
//   w-9
//   shrink-0
//   items-center
//   justify-center
//   rounded-full
//   text-(--text-secondary)
//   transition
//   hover:bg-(--card-hover)
//   hover:text-white
//   active:scale-95
// "
//   >
//     <MoreVertical size={19} />
//   </button>

//   {openMenu === post.id && (
//     <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">

//       {/* LIKE */}
//       <button
//         type="button"
//         onClick={() => {
//           handleLike(post);
//           setOpenMenu(null);
//         }}
//         className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover)"
//       >
//         <Heart
//           size={17}
//           className={
//             post.isLiked
//               ? "fill-red-500 text-red-500"
//               : ""
//           }
//         />

//         {post.isLiked
//           ? "Unlike Post"
//           : "Like Post"}
//       </button>

//       {/* COMMENT */}
//       <button
//         type="button"
//         onClick={() => {
//           setCommentPost(post);
//           setOpenMenu(null);
//         }}
//         className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover)"
//       >
//         <MessageCircle size={17} />

//         Comment Post
//       </button>

//       {/* SAVE */}
//       <button
//         type="button"
//         disabled={saveLoading === post.id}
//         onClick={() =>
//           handleSavePost(post)
//         }
//         className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover) disabled:opacity-50"
//       >
//         <Bookmark
//           size={17}
//           className={
//             post.isSaved
//               ? "fill-white"
//               : ""
//           }
//         />

//         {saveLoading === post.id
//           ? "Saving..."
//           : post.isSaved
//             ? "Unsave Post"
//             : "Save Post"}
//       </button>

//       {/* DELETE */}
//       {/* Isko sirf owner ke liye show karna */}
//       {/* {Number(post.user?.id) ===
//         Number(currentUser?.id) && (
//         <button
//           type="button"
//           onClick={() => {
//             // delete handler yahan connect karenge
//             setOpenMenu(null);
//           }}
//           className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
//         >
//           <Trash2 size={17} />

//           Delete Post
//         </button>
//       )} */}

//       {Number(post.user?.id) ===
//   Number(currentUser?.id) && (
//   <button
//     type="button"
//     disabled={deleteLoading === post.id}
//     onClick={() =>
//       handleDeletePost(post.id)
//     }
//     className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
//   >
//     <Trash2 size={17} />

//     {deleteLoading === post.id
//       ? "Deleting..."
//       : "Delete Post"}
//   </button>
// )}

//     </div>
//   )}

// </div>
//                   </div>

//                   {/* ================= POST IMAGE ================= */}

//                   {post.image && (
//                     <div className="bg-black">
//                       <img
//                         src={`${API_URL}${post.image}`}
//                         loading="lazy"
//                         alt="Post"
//                         className="max-h-[600px] max-h-[70vh] w-full bg-black object-contain"
//                       />
//                     </div>
//                   )}

//                   {/* ================= POST CONTENT ================= */}

//                   <div className="px-3 py-3 sm:px-4">
//                     {/* ================= ACTIONS ================= */}

//                     <div className="mb-2 flex items-center gap-4 sm:gap-5">
//                       {/* LIKE */}

//                       {/* <button
//                         type="button"
//                         disabled={likeLoading === post.id}
//                         onClick={() => handleLike(post)}
//                         className="flex items-center gap-1.5 transition hover:opacity-80 disabled:opacity-50"
//                       > */}

//                       <button
//   type="button"
//   disabled={likeLoading === post.id}
//   onClick={() => handleLike(post)}
//   className="
//     flex
//     min-h-10
//     items-center
//     gap-1.5
//     rounded-lg
//     px-1
//     transition
//     hover:bg-(--card-hover)
//     disabled:opacity-50
//   "
// >
//                         <Heart
//                           size={20}
//                           className={
//                             post.isLiked
//                               ? "fill-red-500 text-red-500"
//                               : "text-white"
//                           }
//                         />

//                         <span className="text-xs text-white">
//                           {post.likeCount || 0}
//                         </span>
//                       </button>

//                       {/* COMMENT */}

//                       {/* <button
//                         type="button"
//                         onClick={() => setCommentPost(post)}
//                         className="flex items-center gap-1.5 text-white transition hover:opacity-80"
//                       > */}


//                       <button
//   type="button"
//   onClick={() => setCommentPost(post)}
//   className="
//     flex
//     min-h-10
//     items-center
//     gap-1.5
//     rounded-lg
//     px-1
//     text-white
//     transition
//     hover:bg-(--card-hover)
//   "
// >
//                         <MessageCircle size={19} />

//                         <span className="text-xs">
//                           {post.commentCount || 0}
//                         </span>
//                       </button>

//                       {/* SHARE */}

//                       {/* <button
//                         type="button"
//                         className="text-white transition hover:opacity-80"
//                       >
//                         <Send size={18} />
//                       </button> */}

//                       <button
//   type="button"
//   className="
//     flex
//     h-10
//     w-10
//     items-center
//     justify-center
//     rounded-full
//     text-white
//     transition
//     hover:bg-(--card-hover)
//   "
// >
//   <Send size={18} />
// </button>
//                     </div>

//                     {/* ================= CAPTION ================= */}

//                     {post.caption && (
//                       <p className="text-sm wrap-break-word leading-5 text-(--text-primary)">
//                         <span className="mr-2 font-semibold">
//                           {post.user?.username}
//                         </span>

//                         {post.caption}
//                       </p>
//                     )}

//                     {/* ================= DATE ================= */}

//                     <p className="mt-2 text-[10px] text-(--text-muted) wrap-break-word">
//                       {new Date(post.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* ================= LOAD MORE ================= */}

//             {pagination?.hasNextPage && (
//               // <div className="flex justify-center py-6">
//               //   <button
//               //     type="button"
//               //     onClick={handleLoadMore}
//               //     disabled={loadingMore}
//               //     className="rounded-lg border border-(--border) bg-(--card) px-5 py-2 text-xs font-medium text-white transition hover:bg-(--card-hover) disabled:cursor-not-allowed disabled:opacity-50"
//               //   >
//               //     {loadingMore ? "Loading..." : "Load More"}
//               //   </button>
//               // </div>

//               <div className="flex justify-center px-4 py-5 sm:py-6">
//   <button
//     type="button"
//     onClick={handleLoadMore}
//     disabled={loadingMore}
//     className="
//       min-h-10
//       rounded-lg
//       border
//       border-(--border)
//       bg-(--card)
//       px-5
//       py-2
//       text-xs
//       font-medium
//       text-white
//       transition
//       hover:bg-(--card-hover)
//       active:scale-95
//       disabled:cursor-not-allowed
//       disabled:opacity-50
//     "
//   >
//     {loadingMore
//       ? "Loading..."
//       : "Load More"}
//   </button>
// </div>
//             )}

//             {/* ================= ALL POSTS LOADED ================= */}

//             {!pagination?.hasNextPage && posts.length > 0 && (
//               <p className="py-6 text-center text-xs text-(--text-muted)">
//                 You've reached the end
//               </p>
//             )}
//           </>
//         )}
//       </div>
//       </div>
//        {/* ================= SUGGESTED USERS ================= */}
//       <aside className="hidden lg:block">
//         <div className="sticky top-20">

//         <SuggestedUsers />
//         </div>
//       </aside>

//     </div>

//       {/* ================= COMMENT MODAL ================= */}

//       {commentPost && (
//         <CommentModal
//           post={commentPost}
//           onClose={() => setCommentPost(null)}
//           onCommentChange={handleCommentChange}
//         />
//       )}
//     </>
//   );
// };

// export default Home;



























import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  MoreVertical,
  Bookmark,
  Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import { getFeedPosts, deletePost } from "../services/postService.js";
import { toggleLike } from "../services/likeService.js";
import { savePost, unsavePost } from "../services/savedPostService.js";
import SuggestedUsers from "../components/user/SuggestedUsers.jsx";
import CommentModal from "../components/post/CommentsModal.jsx";

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 10;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

// =============================================================
// POST CARD (memoized: a like/menu change re-renders only one card)
// =============================================================

const PostCard = memo(function PostCard({
  post,
  isOwner,
  menuOpen,
  likeBusy,
  saveBusy,
  deleteBusy,
  onLike,
  onToggleMenu,
  onComment,
  onSave,
  onDelete,
}) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const user = post.user;

  const menuItemClass =
    "flex w-full min-h-11 items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover) disabled:opacity-50";

  return (
    <article className="overflow-hidden rounded-lg border border-(--border) bg-(--card) sm:rounded-2xl">
      {/* HEADER */}
      <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-(--primary) sm:h-10 sm:w-10">
            {user?.profileImage && !avatarFailed ? (
              <img
                src={assetUrl(user.profileImage)}
                alt={user.username}
                loading="lazy"
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs font-semibold text-white">
                  {(user?.fullName || user?.username || "?")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.fullName}
            </p>
            <p className="truncate text-[11px] text-(--text-secondary)">
              @{user?.username}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="relative shrink-0" data-post-menu>
          <button
            type="button"
            onClick={() => onToggleMenu(post.id)}
            aria-label="Post options"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white active:scale-95"
          >
            <MoreVertical size={19} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">
              <button
                type="button"
                onClick={() => {
                  onLike(post);
                  onToggleMenu(null);
                }}
                className={menuItemClass}
              >
                <Heart
                  size={17}
                  className={post.isLiked ? "fill-red-500 text-red-500" : ""}
                />
                {post.isLiked ? "Unlike Post" : "Like Post"}
              </button>

              <button
                type="button"
                onClick={() => {
                  onComment(post);
                  onToggleMenu(null);
                }}
                className={menuItemClass}
              >
                <MessageCircle size={17} />
                Comment Post
              </button>

              <button
                type="button"
                disabled={saveBusy}
                onClick={() => onSave(post)}
                className={menuItemClass}
              >
                <Bookmark
                  size={17}
                  className={post.isSaved ? "fill-white" : ""}
                />
                {saveBusy
                  ? "Saving..."
                  : post.isSaved
                    ? "Unsave Post"
                    : "Save Post"}
              </button>

              {isOwner && (
                <button
                  type="button"
                  disabled={deleteBusy}
                  onClick={() => onDelete(post.id)}
                  className="flex w-full min-h-11 items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={17} />
                  {deleteBusy ? "Deleting..." : "Delete Post"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* IMAGE */}
      {post.image && (
        <div className="bg-black">
          <img
            src={assetUrl(post.image)}
            loading="lazy"
            decoding="async"
            alt="Post"
            className="max-h-[70vh] w-full bg-black object-contain"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="px-3 py-3 sm:px-4">
        <div className="mb-2 flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            disabled={likeBusy}
            onClick={() => onLike(post)}
            aria-label={post.isLiked ? "Unlike" : "Like"}
            className="flex min-h-10 items-center gap-1.5 rounded-lg px-1 transition hover:bg-(--card-hover) disabled:opacity-50"
          >
            <Heart
              size={20}
              className={
                post.isLiked ? "fill-red-500 text-red-500" : "text-white"
              }
            />
            <span className="text-xs text-white">{post.likeCount || 0}</span>
          </button>

          <button
            type="button"
            onClick={() => onComment(post)}
            aria-label="Comments"
            className="flex min-h-10 items-center gap-1.5 rounded-lg px-1 text-white transition hover:bg-(--card-hover)"
          >
            <MessageCircle size={19} />
            <span className="text-xs">{post.commentCount || 0}</span>
          </button>

          <button
            type="button"
            aria-label="Share"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-(--card-hover)"
          >
            <Send size={18} />
          </button>
        </div>

        {post.caption && (
          <p className="wrap-break-word text-sm leading-5 text-(--text-primary)">
            <span className="mr-2 font-semibold">{user?.username}</span>
            {post.caption}
          </p>
        )}

        <p className="wrap-break-word mt-2 text-[10px] text-(--text-muted)">
          {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
        </p>
      </div>
    </article>
  );
});

// =============================================================
// PAGE
// =============================================================

const Home = () => {
  const { user: currentUser } = useAuth();
  const currentUserId = Number(currentUser?.id);

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [likeLoading, setLikeLoading] = useState(null);
  const [saveLoading, setSaveLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [commentPost, setCommentPost] = useState(null);

  const mountedRef = useRef(true);
  const pageRef = useRef(0);
  const fetchingRef = useRef(false);
  const busyRef = useRef({ like: new Set(), save: new Set(), delete: new Set() });
  const sentinelRef = useRef(null);

  // =========================================================
  // FEED
  // =========================================================

  const fetchFeed = useCallback(async (pageNumber, append) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      setError("");
      if (append) setLoadingMore(true);
      else setLoading(true);

      const response = await getFeedPosts(pageNumber, PAGE_SIZE);
      if (!mountedRef.current) return;

      const newPosts = response?.data?.posts || [];

      setPosts((current) => {
        if (!append) return newPosts;
        // de-duplicate: new posts can shift pagination between requests
        const ids = new Set(current.map((p) => p.id));
        return [...current, ...newPosts.filter((p) => !ids.has(p.id))];
      });

      setPagination(response?.data?.pagination || null);
      pageRef.current = pageNumber;
    } catch (err) {
      console.error("Feed Error:", err);
      if (mountedRef.current) setError(err.message || "Failed to load feed");
    } finally {
      fetchingRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchFeed(1, false);

    return () => {
      mountedRef.current = false;
    };
  }, [fetchFeed]);

  // INFINITE SCROLL: load next page shortly before the sentinel is visible
  const hasNextPage = !!pagination?.hasNextPage;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage || loading || loadingMore || error) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchFeed(pageRef.current + 1, true);
      },
      { rootMargin: "400px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, loading, loadingMore, error, posts.length, fetchFeed]);

  const handleRetry = useCallback(() => {
    if (pageRef.current === 0) fetchFeed(1, false);
    else fetchFeed(pageRef.current + 1, true);
  }, [fetchFeed]);

  // =========================================================
  // POST UPDATES
  // =========================================================

  const patchPost = useCallback((postId, patch) => {
    setPosts((current) =>
      current.map((post) => (post.id === postId ? { ...post, ...patch } : post))
    );
  }, []);

  // close menu on outside click / Escape
  useEffect(() => {
    if (openMenu == null) return;

    const handleMouseDown = (event) => {
      if (!event.target.closest?.("[data-post-menu]")) setOpenMenu(null);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  const handleToggleMenu = useCallback((postId) => {
    setOpenMenu((current) =>
      postId === null || current === postId ? null : postId
    );
  }, []);

  // LIKE: optimistic (instant), rolled back if the request fails
  const handleLike = useCallback(
    async (post) => {
      const busy = busyRef.current.like;
      if (busy.has(post.id)) return;
      busy.add(post.id);
      setLikeLoading(post.id);

      const previous = { isLiked: !!post.isLiked, likeCount: post.likeCount || 0 };
      const nextLiked = !previous.isLiked;

      patchPost(post.id, {
        isLiked: nextLiked,
        likeCount: Math.max(0, previous.likeCount + (nextLiked ? 1 : -1)),
      });

      try {
        const response = await toggleLike(post.id);
        const data = response?.data;

        if (data) {
          patchPost(post.id, { isLiked: data.liked, likeCount: data.likeCount });
        }
      } catch (err) {
        console.error("Like Error:", err);
        patchPost(post.id, previous);
      } finally {
        busy.delete(post.id);
        setLikeLoading((current) => (current === post.id ? null : current));
      }
    },
    [patchPost]
  );

  const handleSave = useCallback(
    async (post) => {
      const busy = busyRef.current.save;
      if (busy.has(post.id)) return;
      busy.add(post.id);
      setSaveLoading(post.id);

      try {
        if (post.isSaved) await unsavePost(post.id);
        else await savePost(post.id);

        patchPost(post.id, { isSaved: !post.isSaved });
      } catch (err) {
        console.error("Save Post Error:", err);
      } finally {
        busy.delete(post.id);
        setSaveLoading((current) => (current === post.id ? null : current));
        setOpenMenu(null);
      }
    },
    [patchPost]
  );

  const handleDelete = useCallback(async (postId) => {
    const busy = busyRef.current.delete;
    if (busy.has(postId)) return;

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    busy.add(postId);
    setDeleteLoading(postId);

    try {
      await deletePost(postId);
      setPosts((current) => current.filter((post) => post.id !== postId));
      setOpenMenu(null);
    } catch (err) {
      console.error("Delete Post Error:", err);
    } finally {
      busy.delete(postId);
      setDeleteLoading((current) => (current === postId ? null : current));
    }
  }, []);

  const handleCommentChange = useCallback((postId, change) => {
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

  const closeComments = useCallback(() => setCommentPost(null), []);

  // =========================================================
  // RENDER
  // =========================================================

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-(--text-secondary)">Loading feed...</p>
      </div>
    );
  }

  // first page failed: don't pretend there are simply "no posts"
  if (error && posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <p className="text-sm text-red-400">{error}</p>
        <button
          type="button"
          onClick={handleRetry}
          className="rounded-lg border border-(--border) bg-(--card) px-5 py-2 text-xs font-medium text-white transition hover:bg-(--card-hover)"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid min-h-[calc(100dvh-80px)] w-full max-w-6xl grid-cols-1 gap-4 lg:h-[calc(100dvh-80px)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <div className="posts-scroll min-w-0 overflow-y-auto lg:pr-2">
          <div className="mx-auto w-full max-w-120">
            <div className="mb-4 sm:mb-5">
              <p className="mt-1 text-xs text-(--text-secondary) sm:text-sm">
                Latest posts from SnapGrid
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="rounded-xl border border-(--border) bg-(--card) px-4 py-10 text-center">
                <p className="text-sm text-(--text-secondary)">No posts yet</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      isOwner={Number(post.user?.id) === currentUserId}
                      menuOpen={openMenu === post.id}
                      likeBusy={likeLoading === post.id}
                      saveBusy={saveLoading === post.id}
                      deleteBusy={deleteLoading === post.id}
                      onLike={handleLike}
                      onToggleMenu={handleToggleMenu}
                      onComment={setCommentPost}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>

                {/* sentinel for infinite scroll */}
                {hasNextPage && (
                  <div
                    ref={sentinelRef}
                    className="flex min-h-16 items-center justify-center py-5"
                  >
                    {loadingMore && (
                      <p className="text-xs text-(--text-secondary)">
                        Loading more...
                      </p>
                    )}
                  </div>
                )}

                {error && (
                  <div className="flex flex-col items-center gap-2 py-5">
                    <p className="text-xs text-red-400">{error}</p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="min-h-10 rounded-lg border border-(--border) bg-(--card) px-5 py-2 text-xs font-medium text-white transition hover:bg-(--card-hover)"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!hasNextPage && !error && (
                  <p className="py-6 text-center text-xs text-(--text-muted)">
                    You've reached the end
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <SuggestedUsers />
          </div>
        </aside>
      </div>

      {commentPost && (
        <CommentModal
          post={commentPost}
          onClose={closeComments}
          onCommentChange={handleCommentChange}
        />
      )}
    </>
  );
};

export default Home;