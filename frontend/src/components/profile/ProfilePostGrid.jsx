// import { Grid3X3 } from "lucide-react";

// // const API_URL = "http://localhost:5000";

// const ProfilePostGrid = ({ posts, onPostClick }) => {
//   if (!posts || posts.length === 0) {
//     return (
//       <div className="flex min-h-60 flex-col items-center justify-center text-center">
//         <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-(--border)">
//           <Grid3X3 size={28} className="text-(--text-muted)" />
//         </div>

//         <h3 className="text-lg font-semibold text-white">No Posts Yet</h3>

//         <p className="mt-1 text-sm text-(--text-secondary)">
//           When posts are created, they'll appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-1 grid grid-cols-2 gap-1 md:grid-cols-3">
//       {posts.map((post) => {
//         // const imageUrl = post.image ? `${API_URL}${post.image}` : null;
//         const imageUrl = post.image
//   ? `${import.meta.env.VITE_API_URL}${post.image}`
//   : null;

//         return (
//           <button
//             key={post.id}
//             type="button"
//             onClick={() => onPostClick(post)}
//             className="group relative aspect-square overflow-hidden bg-(--card)"
//           >
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt={post.caption || "Post"}
//                 className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center p-6">
//                 <p className="line-clamp-5 text-center text-sm text-(--text-secondary)">
//                   {post.caption}
//                 </p>
//               </div>
//             )}

//             {/* Hover */}
//             <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
//               <p className="px-4 text-sm font-medium text-white">View Post</p>
//             </div>
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default ProfilePostGrid;








// import { Grid3X3 } from "lucide-react";

// const ProfilePostGrid = ({
//   posts,
//   onPostClick,
// }) => {
//   if (!posts || posts.length === 0) {
//     return (
//       <div
//         className="
//           flex
//           min-h-60
//           flex-col
//           items-center
//           justify-center
//           px-4
//           py-10
//           text-center
//         "
//       >
//         <div
//           className="
//             mb-4
//             flex
//             h-14
//             w-14
//             items-center
//             justify-center
//             rounded-full
//             border
//             border-(--border)
//             sm:h-16
//             sm:w-16
//           "
//         >
//           <Grid3X3
//             size={24}
//             className="text-(--text-muted) sm:size-[28px]"
//           />
//         </div>

//         <h3 className="text-base font-semibold text-white sm:text-lg">
//           No Posts Yet
//         </h3>

//         <p
//           className="
//             mt-1
//             max-w-sm
//             text-xs
//             leading-5
//             text-(--text-secondary)
//             sm:text-sm
//           "
//         >
//           When posts are created, they'll appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="
//         mt-1
//         grid
//         grid-cols-3
//         gap-0.5
//         sm:gap-1
//         md:gap-2
//       "
//     >
//       {posts.map((post) => {
//         const imageUrl = post.image
//           ? `${import.meta.env.VITE_API_URL}${post.image}`
//           : null;

//         return (
//           <button
//             key={post.id}
//             type="button"
//             onClick={() => onPostClick(post)}
//             className="
//               group
//               relative
//               aspect-square
//               min-w-0
//               overflow-hidden
//               bg-(--card)
//             "
//           >
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt={post.caption || "Post"}
//                 loading="lazy"
//                 className="
//                   h-full
//                   w-full
//                   object-cover
//                   transition
//                   duration-300
//                   sm:group-hover:scale-105
//                 "
//               />
//             ) : (
//               <div
//                 className="
//                   flex
//                   h-full
//                   w-full
//                   items-center
//                   justify-center
//                   p-2
//                   sm:p-4
//                   md:p-6
//                 "
//               >
//                 <p
//                   className="
//                     line-clamp-4
//                     text-center
//                     text-[10px]
//                     leading-4
//                     text-(--text-secondary)
//                     sm:line-clamp-5
//                     sm:text-sm
//                   "
//                 >
//                   {post.caption}
//                 </p>
//               </div>
//             )}

//             {/* Hover overlay - desktop */}
//             <div
//               className="
//                 absolute
//                 inset-0
//                 hidden
//                 items-center
//                 justify-center
//                 bg-black/0
//                 opacity-0
//                 transition
//                 sm:flex
//                 sm:group-hover:bg-black/50
//                 sm:group-hover:opacity-100
//               "
//             >
//               <p className="px-4 text-sm font-medium text-white">
//                 View Post
//               </p>
//             </div>
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default ProfilePostGrid;























import { memo, useState } from "react";
import { Grid3X3 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

// One tile. Memoized so liking a post re-renders only that tile.
const PostTile = memo(function PostTile({ post, onPostClick }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = post.image && !imageFailed;

  return (
    <button
      type="button"
      onClick={() => onPostClick?.(post)}
      aria-label={post.caption ? `Open post: ${post.caption}` : "Open post"}
      className="group relative aspect-square min-w-0 overflow-hidden bg-(--card)"
    >
      {showImage ? (
        <img
          src={assetUrl(post.image)}
          alt={post.caption || "Post"}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition duration-300 sm:group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-6">
          <p className="line-clamp-4 text-center text-[10px] leading-4 text-(--text-secondary) sm:line-clamp-5 sm:text-sm">
            {post.caption || "Post"}
          </p>
        </div>
      )}

      {/* Hover overlay (desktop only) */}
      <div className="absolute inset-0 hidden items-center justify-center bg-black/0 opacity-0 transition sm:flex sm:group-hover:bg-black/50 sm:group-hover:opacity-100">
        <p className="px-4 text-sm font-medium text-white">View Post</p>
      </div>
    </button>
  );
});

const ProfilePostGrid = ({
  posts,
  onPostClick,
  emptyTitle = "No Posts Yet",
  emptyMessage = "When posts are created, they'll appear here.",
}) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-(--border) sm:h-16 sm:w-16">
          <Grid3X3 size={24} className="text-(--text-muted) sm:size-[28px]" />
        </div>

        <h3 className="text-base font-semibold text-white sm:text-lg">
          {emptyTitle}
        </h3>

        <p className="mt-1 max-w-sm text-xs leading-5 text-(--text-secondary) sm:text-sm">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-1 grid grid-cols-3 gap-0.5 sm:gap-1 md:gap-2">
      {posts.map((post) => (
        <PostTile key={post.id} post={post} onPostClick={onPostClick} />
      ))}
    </div>
  );
};

export default memo(ProfilePostGrid);