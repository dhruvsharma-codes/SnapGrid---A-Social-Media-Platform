





// import { Grid3X3, Bookmark } from "lucide-react";

// const ProfileTabs = ({
//   isOwnProfile,
//   activeTab,
//   onTabChange,
// }) => {
//   return (
//     <div className="mt-10 border-t border-(--border)">
//       <div className="flex items-center justify-center gap-10">

//         {/* POSTS */}
//         <button
//           type="button"
//           onClick={() => onTabChange("posts")}
//           className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition ${
//             activeTab === "posts"
//               ? "text-white"
//               : "text-(--text-secondary) hover:text-white"
//           }`}
//         >
//           <Grid3X3 size={18} />

//           Posts

//           {activeTab === "posts" && (
//             <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
//           )}
//         </button>

//         {/* SAVED */}
//         {isOwnProfile && (
//           <button
//             type="button"
//             onClick={() => onTabChange("saved")}
//             className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition ${
//               activeTab === "saved"
//                 ? "text-white"
//                 : "text-(--text-secondary) hover:text-white"
//             }`}
//           >
//             <Bookmark
//               size={18}
//               className={
//                 activeTab === "saved"
//                   ? "fill-white"
//                   : ""
//               }
//             />

//             Saved

//             {activeTab === "saved" && (
//               <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
//             )}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileTabs;









import { Grid3X3, Bookmark } from "lucide-react";

const ProfileTabs = ({
  isOwnProfile,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mt-6 w-full border-t border-(--border) sm:mt-8 md:mt-10">
      <div className="flex min-w-max items-center justify-center gap-2 sm:gap-6 md:gap-10">
        
        {/* POSTS */}
        <button
          type="button"
          onClick={() => onTabChange("posts")}
          className={`
            relative flex min-h-12 items-center gap-1.5
            px-4 py-3 text-sm font-semibold
            transition sm:gap-2 sm:px-5 sm:py-4
            ${
              activeTab === "posts"
                ? "text-white"
                : "text-(--text-secondary) hover:text-white"
            }
          `}
        >
          <Grid3X3 size={17} className="shrink-0 sm:size-[18px]" />

          <span>Posts</span>

          {activeTab === "posts" && (
            <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-white sm:left-0 sm:right-0" />
          )}
        </button>

        {/* SAVED */}
        {isOwnProfile && (
          <button
            type="button"
            onClick={() => onTabChange("saved")}
            className={`
              relative flex min-h-12 items-center gap-1.5
              px-4 py-3 text-sm font-semibold
              transition sm:gap-2 sm:px-5 sm:py-4
              ${
                activeTab === "saved"
                  ? "text-white"
                  : "text-(--text-secondary) hover:text-white"
              }
            `}
          >
            <Bookmark
              size={17}
              className={`shrink-0 sm:size-[18px] ${
                activeTab === "saved"
                  ? "fill-white"
                  : ""
              }`}
            />

            <span>Saved</span>

            {activeTab === "saved" && (
              <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-white sm:left-0 sm:right-0" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;