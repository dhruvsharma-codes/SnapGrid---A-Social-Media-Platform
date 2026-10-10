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
















// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext.jsx";

// import {
//   savePost,
//   unsavePost,
// } from "../../services/savedPostService.js";

// import { deletePost } from "../../services/postService.js";

// import {
//   X,
//   Heart,
//   MessageCircle,
//   Send,
//   MoreVertical,
//   Bookmark,
//   Trash2,
// } from "lucide-react";

// import { toggleLike } from "../../services/likeService.js";

// import CommentsModal from "../post/CommentsModal.jsx";

// const PostModal = ({
//   post,
//   onClose,
//   onLikeUpdated,
//   onCommentUpdated,
//   onPostDeleted,
//   onPostUnsave,
// }) => {
//   const { user: currentUser } = useAuth();

//   const [liked, setLiked] = useState(
//     post?.isLiked || false
//   );

//   const [likeCount, setLikeCount] = useState(
//     post?.likeCount || 0
//   );

//   const [likeLoading, setLikeLoading] =
//     useState(false);

//   const [showComments, setShowComments] =
//     useState(false);

//   const [isSaved, setIsSaved] = useState(
//     post?.isSaved || false
//   );

//   const [saveLoading, setSaveLoading] =
//     useState(false);

//   const [deleteLoading, setDeleteLoading] =
//     useState(false);

//   const [showMenu, setShowMenu] =
//     useState(false);

//   if (!post) return null;

//   const imageUrl = post.image
//     ? `${import.meta.env.VITE_API_URL}${post.image}`
//     : null;

//   const handleLike = async () => {
//     if (likeLoading) return;

//     try {
//       setLikeLoading(true);

//       const response =
//         await toggleLike(post.id);

//       const {
//         liked,
//         likeCount,
//       } = response.data;

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
//       console.error(
//         "Like Error:",
//         error
//       );
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     if (saveLoading) return;

//     try {
//       setSaveLoading(true);

//       if (isSaved) {
//         await unsavePost(post.id);

//         setIsSaved(false);

//         if (onPostUnsave) {
//           onPostUnsave(post.id);
//         }
//       } else {
//         await savePost(post.id);

//         setIsSaved(true);
//       }

//       setShowMenu(false);
//     } catch (error) {
//       console.error(
//         "Save Post Error:",
//         error
//       );
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (deleteLoading) return;

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this post?"
//     );

//     if (!confirmed) return;

//     try {
//       setDeleteLoading(true);

//       await deletePost(post.id);

//       if (onPostDeleted) {
//         onPostDeleted(post.id);
//       }

//       setShowMenu(false);

//       // Only close once
//       onClose();
//     } catch (error) {
//       console.error(
//         "Delete Post Error:",
//         error
//       );
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleCommentAdded = ({
//     postId,
//     commentCount,
//   }) => {
//     if (onCommentUpdated) {
//       onCommentUpdated({
//         postId,
//         commentCount,
//       });
//     }
//   };

//   const handleCommentDeleted = ({
//     postId,
//     commentCount,
//   }) => {
//     if (onCommentUpdated) {
//       onCommentUpdated({
//         postId,
//         commentCount,
//       });
//     }
//   };

//   return (
//     <div
//       className="
//         fixed
//         inset-0
//         z-200
//         flex
//         items-center
//         justify-center
//         bg-black/80
//         p-2
//         sm:p-4
//       "
//       onClick={onClose}
//     >
//       <div
//         className="
//           relative
//           flex
//           max-h-[calc(100dvh-16px)]
//           w-full
//           flex-col
//           overflow-hidden
//           rounded-xl
//           border
//           border-(--border)
//           bg-(--card)
//           shadow-2xl
//           sm:max-h-[calc(100dvh-32px)]
//           sm:max-w-xl
//           sm:rounded-2xl
//         "
//         onClick={(event) =>
//           event.stopPropagation()
//         }
//       >
//         {/* Top Right Controls */}
//         <div
//           className="
//             absolute
//             right-2
//             top-2
//             z-30
//             flex
//             items-center
//             gap-1.5
//             sm:right-3
//             sm:top-3
//             sm:gap-2
//           "
//         >
//           {/* More Menu */}
//           <div className="relative">
//             <button
//               type="button"
//               onClick={() =>
//                 setShowMenu(
//                   (current) => !current
//                 )
//               }
//               className="
//                 flex
//                 h-9
//                 w-9
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-black/60
//                 text-white
//                 transition
//                 hover:bg-black
//                 active:scale-95
//               "
//               aria-label="Post options"
//             >
//               <MoreVertical size={19} />
//             </button>

//             {showMenu && (
//               <div
//                 className="
//                   absolute
//                   right-0
//                   top-11
//                   z-50
//                   w-48
//                   overflow-hidden
//                   rounded-xl
//                   border
//                   border-(--border)
//                   bg-(--card)
//                   shadow-xl
//                 "
//               >
//                 {/* Like */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     handleLike();
//                     setShowMenu(false);
//                   }}
//                   disabled={likeLoading}
//                   className="
//                     flex
//                     min-h-11
//                     w-full
//                     items-center
//                     gap-3
//                     px-4
//                     py-3
//                     text-left
//                     text-sm
//                     text-white
//                     transition
//                     hover:bg-(--card-hover)
//                     disabled:opacity-50
//                   "
//                 >
//                   <Heart
//                     size={17}
//                     className={
//                       liked
//                         ? "fill-red-500 text-red-500"
//                         : ""
//                     }
//                   />

//                   {liked
//                     ? "Unlike Post"
//                     : "Like Post"}
//                 </button>

//                 {/* Comment */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowComments(true);
//                     setShowMenu(false);
//                   }}
//                   className="
//                     flex
//                     min-h-11
//                     w-full
//                     items-center
//                     gap-3
//                     px-4
//                     py-3
//                     text-left
//                     text-sm
//                     text-white
//                     transition
//                     hover:bg-(--card-hover)
//                   "
//                 >
//                   <MessageCircle size={17} />

//                   Comment Post
//                 </button>

//                 {/* Save */}
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   disabled={saveLoading}
//                   className="
//                     flex
//                     min-h-11
//                     w-full
//                     items-center
//                     gap-3
//                     px-4
//                     py-3
//                     text-left
//                     text-sm
//                     text-white
//                     transition
//                     hover:bg-(--card-hover)
//                     disabled:opacity-50
//                   "
//                 >
//                   <Bookmark
//                     size={17}
//                     className={
//                       isSaved
//                         ? "fill-white"
//                         : ""
//                     }
//                   />

//                   {saveLoading
//                     ? "Saving..."
//                     : isSaved
//                       ? "Unsave Post"
//                       : "Save Post"}
//                 </button>

//                 {/* Delete */}
//                 {Number(post.user?.id) ===
//                   Number(currentUser?.id) && (
//                   <button
//                     type="button"
//                     onClick={handleDelete}
//                     disabled={deleteLoading}
//                     className="
//                       flex
//                       min-h-11
//                       w-full
//                       items-center
//                       gap-3
//                       px-4
//                       py-3
//                       text-left
//                       text-sm
//                       text-red-400
//                       transition
//                       hover:bg-red-500/10
//                       disabled:opacity-50
//                     "
//                   >
//                     <Trash2 size={17} />

//                     {deleteLoading
//                       ? "Deleting..."
//                       : "Delete Post"}
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Close */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-full
//               bg-black/60
//               text-white
//               transition
//               hover:bg-black
//               active:scale-95
//             "
//             aria-label="Close"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* User */}
//         <div
//           className="
//             flex
//             shrink-0
//             items-center
//             gap-3
//             border-b
//             border-(--border)
//             px-4
//             py-3
//             pr-24
//             sm:px-5
//             sm:py-4
//             sm:pr-28
//           "
//         >
//           <div
//             className="
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               overflow-hidden
//               rounded-full
//               bg-(--primary)
//               sm:h-10
//               sm:w-10
//             "
//           >
//             {post.user?.profileImage ? (
//               <img
//                 src={
//                   post.user.profileImage.startsWith(
//                     "http"
//                   )
//                     ? post.user.profileImage
//                     : `${import.meta.env.VITE_API_URL}${post.user.profileImage}`
//                 }
//                 alt={
//                   post.user?.username ||
//                   "Profile"
//                 }
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <span className="text-sm font-semibold text-white">
//                 {post.user?.fullName
//                   ?.charAt(0)
//                   .toUpperCase()}
//               </span>
//             )}
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-white">
//               @{post.user?.username}
//             </p>

//             <p className="truncate text-xs text-(--text-secondary)">
//               {post.user?.fullName}
//             </p>
//           </div>
//         </div>

//         {/* Image */}
//         {imageUrl && (
//           <div className="flex max-h-[42vh] shrink-0 items-center justify-center bg-black sm:max-h-[55vh]">
//             <img
//               src={imageUrl}
//               alt={
//                 post.caption || "Post"
//               }
//               className="
//                 max-h-[42vh]
//                 w-full
//                 object-contain
//                 sm:max-h-[55vh]
//               "
//             />
//           </div>
//         )}

//         {/* Scrollable Content */}
//         <div className="min-h-0 overflow-y-auto">
//           {/* Actions */}
//           <div
//             className="
//               flex
//               items-center
//               gap-1
//               border-b
//               border-(--border)
//               px-3
//               py-2
//               sm:px-4
//               sm:py-3
//             "
//           >
//             {/* Like */}
//             <button
//               type="button"
//               onClick={handleLike}
//               disabled={likeLoading}
//               className={`
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-full
//                 transition
//                 active:scale-95
//                 ${
//                   liked
//                     ? "text-red-500"
//                     : "text-(--text-primary) hover:bg-(--card-hover)"
//                 }
//               `}
//               aria-label="Like post"
//             >
//               <Heart
//                 size={23}
//                 fill={
//                   liked
//                     ? "currentColor"
//                     : "none"
//                 }
//               />
//             </button>

//             {/* Comment */}
//             <button
//               type="button"
//               onClick={() =>
//                 setShowComments(true)
//               }
//               className="
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-full
//                 text-(--text-primary)
//                 transition
//                 hover:bg-(--card-hover)
//                 active:scale-95
//               "
//               aria-label="Comment"
//             >
//               <MessageCircle size={23} />
//             </button>

//             {/* Share */}
//             <button
//               type="button"
//               className="
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-full
//                 text-(--text-primary)
//                 transition
//                 hover:bg-(--card-hover)
//                 active:scale-95
//               "
//               aria-label="Share"
//             >
//               <Send size={23} />
//             </button>
//           </div>

//           {/* Counts */}
//           <div
//             className="
//               flex
//               flex-wrap
//               items-center
//               gap-x-4
//               gap-y-1
//               px-4
//               pt-3
//               sm:px-5
//             "
//           >
//             <p className="text-sm font-semibold text-white">
//               {likeCount}{" "}
//               {likeCount === 1
//                 ? "like"
//                 : "likes"}
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowComments(true)
//               }
//               className="
//                 text-sm
//                 font-semibold
//                 text-white
//                 hover:underline
//               "
//             >
//               {post.commentCount || 0}{" "}
//               {post.commentCount === 1
//                 ? "comment"
//                 : "comments"}
//             </button>
//           </div>

//           {/* Caption */}
//           {post.caption && (
//             <div className="px-4 py-3 sm:px-5 sm:py-4">
//               <p
//                 className="
//                   break-words
//                   text-sm
//                   leading-6
//                   text-(--text-primary)
//                 "
//               >
//                 <span className="mr-2 font-semibold text-white">
//                   @{post.user?.username}
//                 </span>

//                 {post.caption}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Comments Modal */}
//       {showComments && (
//         <CommentsModal
//           post={post}
//           onClose={() =>
//             setShowComments(false)
//           }
//           onCommentAdded={
//             handleCommentAdded
//           }
//           onCommentDeleted={
//             handleCommentDeleted
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default PostModal;








































import { useEffect, useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Send,
  MoreVertical,
  Bookmark,
  Trash2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { savePost, unsavePost } from "../../services/savedPostService.js";
import { deletePost } from "../../services/postService.js";
import { toggleLike } from "../../services/likeService.js";
import CommentsModal from "../post/CommentsModal.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const menuItemClass =
  "flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-(--card-hover) disabled:opacity-50";

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full text-(--text-primary) transition hover:bg-(--card-hover) active:scale-95";

const PostModal = ({
  post,
  onClose,
  onLikeUpdated,
  onCommentUpdated,
  onPostDeleted,
  onPostUnsave,
  onPostSaved, // optional
}) => {
  const { user: currentUser } = useAuth();

  const [liked, setLiked] = useState(!!post?.isLiked);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [commentCount, setCommentCount] = useState(post?.commentCount || 0);
  const [isSaved, setIsSaved] = useState(!!post?.isSaved);

  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  // Keep local state in sync when the parent updates the post.
  // One effect per field so a like update can't overwrite the saved state.
  useEffect(() => setLiked(!!post?.isLiked), [post?.id, post?.isLiked]);
  useEffect(() => setLikeCount(post?.likeCount || 0), [post?.id, post?.likeCount]);
  useEffect(
    () => setCommentCount(post?.commentCount || 0),
    [post?.id, post?.commentCount]
  );
  useEffect(() => setIsSaved(!!post?.isSaved), [post?.id, post?.isSaved]);

  // lock background scroll while open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Escape closes the top-most layer first: comments -> menu -> modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (showComments) setShowComments(false);
      else if (showMenu) setShowMenu(false);
      else onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showComments, showMenu, onClose]);

  // close the options menu when clicking anywhere outside it
  useEffect(() => {
    if (!showMenu) return;

    const handleMouseDown = (event) => {
      if (!event.target.closest?.("[data-post-menu]")) setShowMenu(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [showMenu]);

  if (!post) return null;

  const imageUrl = post.image ? assetUrl(post.image) : null;
  const isOwner = Number(post.user?.id) === Number(currentUser?.id);

  // ---------------------------------------------------------
  // LIKE: optimistic, rolled back on failure
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // SAVE / UNSAVE
  // ---------------------------------------------------------

  const handleSave = async () => {
    if (saveLoading) return;

    try {
      setSaveLoading(true);

      if (isSaved) {
        await unsavePost(post.id);
        setIsSaved(false);
        onPostUnsave?.(post.id);
      } else {
        await savePost(post.id);
        setIsSaved(true);
        onPostSaved?.(post.id);
      }

      setShowMenu(false);
    } catch (error) {
      console.error("Save Post Error:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  const handleDelete = async () => {
    if (deleteLoading) return;

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setDeleteLoading(true);

      await deletePost(post.id);

      onPostDeleted?.(post.id);
      setShowMenu(false);
      onClose?.();
    } catch (error) {
      console.error("Delete Post Error:", error);
      setDeleteLoading(false);
    }
  };

  // comments (added + deleted share one handler)
  const handleCommentChange = ({ postId, commentCount: nextCount }) => {
    setCommentCount(nextCount);
    onCommentUpdated?.({ postId, commentCount: nextCount });
  };

  const openComments = () => {
    setShowComments(true);
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-2 sm:p-4"
        // mousedown (not click) so dragging a text selection out of the card
        // doesn't accidentally close the modal
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose?.();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Post"
      >
        <div className="relative flex max-h-[calc(100dvh-16px)] w-full flex-col overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-2xl sm:max-h-[calc(100dvh-32px)] sm:max-w-xl sm:rounded-2xl">
          {/* Top right controls */}
          <div className="absolute right-2 top-2 z-30 flex items-center gap-1.5 sm:right-3 sm:top-3 sm:gap-2">
            <div className="relative" data-post-menu>
              <button
                type="button"
                onClick={() => setShowMenu((current) => !current)}
                aria-label="Post options"
                aria-expanded={showMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black active:scale-95"
              >
                <MoreVertical size={19} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card) shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      handleLike();
                      setShowMenu(false);
                    }}
                    disabled={likeLoading}
                    className={menuItemClass}
                  >
                    <Heart
                      size={17}
                      className={liked ? "fill-red-500 text-red-500" : ""}
                    />
                    {liked ? "Unlike Post" : "Like Post"}
                  </button>

                  <button
                    type="button"
                    onClick={openComments}
                    className={menuItemClass}
                  >
                    <MessageCircle size={17} />
                    Comment Post
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveLoading}
                    className={menuItemClass}
                  >
                    <Bookmark size={17} className={isSaved ? "fill-white" : ""} />
                    {saveLoading
                      ? "Saving..."
                      : isSaved
                        ? "Unsave Post"
                        : "Save Post"}
                  </button>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <Trash2 size={17} />
                      {deleteLoading ? "Deleting..." : "Delete Post"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {/* User */}
          <div className="flex shrink-0 items-center gap-3 border-b border-(--border) px-4 py-3 pr-24 sm:px-5 sm:py-4 sm:pr-28">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary) sm:h-10 sm:w-10">
              {post.user?.profileImage && !avatarFailed ? (
                <img
                  src={assetUrl(post.user.profileImage)}
                  alt={post.user?.username || "Profile"}
                  onError={() => setAvatarFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {(post.user?.fullName || post.user?.username || "?")
                    .charAt(0)
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
                alt={post.caption || "Post"}
                decoding="async"
                className="max-h-[42vh] w-full object-contain sm:max-h-[55vh]"
              />
            </div>
          )}

          {/* Scrollable content */}
          <div className="min-h-0 overflow-y-auto">
            <div className="flex items-center gap-1 border-b border-(--border) px-3 py-2 sm:px-4 sm:py-3">
              <button
                type="button"
                onClick={handleLike}
                disabled={likeLoading}
                aria-label={liked ? "Unlike post" : "Like post"}
                aria-pressed={liked}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95 ${
                  liked
                    ? "text-red-500"
                    : "text-(--text-primary) hover:bg-(--card-hover)"
                }`}
              >
                <Heart size={23} fill={liked ? "currentColor" : "none"} />
              </button>

              <button
                type="button"
                onClick={openComments}
                aria-label="Comment"
                className={iconButtonClass}
              >
                <MessageCircle size={23} />
              </button>

              <button type="button" aria-label="Share" className={iconButtonClass}>
                <Send size={23} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 pt-3 sm:px-5">
              <p className="text-sm font-semibold text-white">
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </p>

              <button
                type="button"
                onClick={openComments}
                className="text-sm font-semibold text-white hover:underline"
              >
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </button>
            </div>

            {post.caption && (
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <p className="break-words text-sm leading-6 text-(--text-primary)">
                  <span className="mr-2 font-semibold text-white">
                    @{post.user?.username}
                  </span>
                  {post.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rendered as a SIBLING of the backdrop, so clicks inside the comments
          modal can never bubble up and close the post modal */}
      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
          onCommentAdded={handleCommentChange}
          onCommentDeleted={handleCommentChange}
        />
      )}
    </>
  );
};

export default PostModal;