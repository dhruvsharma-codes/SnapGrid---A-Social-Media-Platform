
// import { MoreHorizontal, Edit3 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import UserAvatar from "./UserAvatar";
// import FollowButton from "./FollowButton";

// const UserCard = ({
//   user,
//   isOwnProfile,
//   onEditProfile,
//   onFollowChange,
// }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col gap-6 md:flex-row md:items-end cursor-pointer">
//       <div className="relative z-10 -mt-16">
//         <div className="overflow-hidden rounded-full border-4 border-(--background) bg-(--card)">
//           <UserAvatar user={user} size="large" />
//         </div>
//       </div>

//       <div className="flex-1 pb-2">
//         <div className="flex flex-wrap items-center gap-3">
//           <h1 className="text-2xl font-bold text-white">
//             {user.username}
//           </h1>

//           {isOwnProfile ? (
//             <button
//               type="button"
//               onClick={onEditProfile}
//               className="flex items-center gap-2 rounded-lg border border-(--border) bg-(--card) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--card-hover)"
//             >
//               <Edit3 size={16} />
//               Edit Profile
//             </button>
//           ) : (
//             <>
//             <FollowButton
//               userId={user.id}
//               onFollowChange={onFollowChange}
//             />
//             <button
//       type="button"
//       onClick={() =>
//         navigate("/messages", {
//           state: {
//             userId: user.id,
//           },
//         })
//       }
//       className="rounded-lg border border-(--border) bg-(--card) px-5 py-2 text-sm font-semibold text-white transition hover:bg-(--card-hover)"
//     >
//       Message
//     </button>

//             </>

//           )}

//           <button
//             type="button"
//             className="rounded-lg p-2 transition hover:bg-(--card-hover)"
//           >
//             <MoreHorizontal size={21} />
//           </button>
//         </div>

//         <p className="mt-1 text-(--text-secondary)">
//           {user.fullName}
//         </p>

//         {user.bio && (
//           <p className="mt-4 max-w-xl text-sm leading-6 text-(--text-primary)">
//             {user.bio}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserCard;













import {
  MoreHorizontal,
  Edit3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";

const UserCard = ({
  user,
  isOwnProfile,
  onEditProfile,
  onFollowChange,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-end
        md:gap-6
      "
    >
      {/* Avatar */}
      <div
        className="
          relative
          z-10
          -mt-12
          sm:-mt-14
          md:-mt-16
        "
      >
        <div
          className="
            w-fit
            overflow-hidden
            rounded-full
            border-4
            border-(--background)
            bg-(--card)
          "
        >
          <UserAvatar
            user={user}
            size="large"
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="min-w-0 flex-1 pb-2">
        {/* Username + Actions */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            sm:gap-3
          "
        >
          <h1
            className="
              min-w-0
              max-w-full
              truncate
              text-xl
              font-bold
              text-white
              sm:text-2xl
            "
          >
            {user.username}
          </h1>

          {/* Own Profile */}
          {isOwnProfile ? (
            <button
              type="button"
              onClick={onEditProfile}
              className="
                flex
                min-h-10
                items-center
                gap-1.5
                rounded-lg
                border
                border-(--border)
                bg-(--card)
                px-3
                py-2
                text-xs
                font-medium
                text-white
                transition
                hover:bg-(--card-hover)
                sm:px-4
                sm:text-sm
              "
            >
              <Edit3
                size={15}
                className="shrink-0"
              />

              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <FollowButton
                userId={user.id}
                onFollowChange={
                  onFollowChange
                }
              />

              <button
                type="button"
                onClick={() =>
                  navigate("/messages", {
                    state: {
                      userId: user.id,
                    },
                  })
                }
                className="
                  min-h-10
                  rounded-lg
                  border
                  border-(--border)
                  bg-(--card)
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-(--card-hover)
                  sm:px-5
                  sm:text-sm
                "
              >
                Message
              </button>
            </>
          )}

          {/* More */}
          <button
            type="button"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-(--text-secondary)
              transition
              hover:bg-(--card-hover)
              hover:text-white
            "
            aria-label="More options"
          >
            <MoreHorizontal size={21} />
          </button>
        </div>

        {/* Full Name */}
        <p className="mt-1 truncate text-sm text-(--text-secondary) sm:text-base">
          {user.fullName}
        </p>

        {/* Bio */}
        {user.bio && (
          <p
            className="
              mt-3
              max-w-xl
              break-words
              text-sm
              leading-5
              text-(--text-primary)
              sm:mt-4
              sm:leading-6
            "
          >
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;