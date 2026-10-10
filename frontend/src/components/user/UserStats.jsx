
// const UserStats = ({ user, postsCount }) => {
//   return (
//     <div className="flex gap-8">
//       <div>
//         <p className="text-lg font-bold text-white">
//           {postsCount ?? user.postsCount ?? 0}
//         </p>
//         <p className="text-sm text-(--text-secondary)">
//           Posts
//         </p>
//       </div>

//       <div>
//         <p className="text-lg font-bold text-white">
//           {user.followersCount ?? 0}
//         </p>
//         <p className="text-sm text-(--text-secondary)">
//           Followers
//         </p>
//       </div>

//       <div>
//         <p className="text-lg font-bold text-white">
//           {user.followingCount ?? 0}
//         </p>
//         <p className="text-sm text-(--text-secondary)">
//           Following
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserStats;









// const UserStats = ({
//   user,
//   postsCount,
// }) => {
//   return (
//     <div
//       className="
//         mt-3
//         flex
//         items-center
//         gap-6
//         sm:gap-8
//       "
//     >
//       <div className="min-w-16">
//         <p className="text-base font-bold text-white sm:text-lg">
//           {postsCount ??
//             user.postsCount ??
//             0}
//         </p>

//         <p className="text-xs text-(--text-secondary) sm:text-sm">
//           Posts
//         </p>
//       </div>

//       <div className="min-w-16">
//         <p className="text-base font-bold text-white sm:text-lg">
//           {user.followersCount ?? 0}
//         </p>

//         <p className="text-xs text-(--text-secondary) sm:text-sm">
//           Followers
//         </p>
//       </div>

//       <div className="min-w-16">
//         <p className="text-base font-bold text-white sm:text-lg">
//           {user.followingCount ?? 0}
//         </p>

//         <p className="text-xs text-(--text-secondary) sm:text-sm">
//           Following
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserStats;

































import { memo } from "react";

// 1200 -> "1.2K" (created once, not on every render)
const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const Stat = ({ value, label }) => (
  <div className="min-w-16">
    <p className="text-base font-bold text-white sm:text-lg">
      {compact.format(value ?? 0)}
    </p>
    <p className="text-xs text-(--text-secondary) sm:text-sm">{label}</p>
  </div>
);

const UserStats = ({ user, postsCount }) => (
  <div className="mt-3 flex items-center gap-6 sm:gap-8">
    <Stat value={postsCount ?? user?.postsCount} label="Posts" />
    <Stat value={user?.followersCount} label="Followers" />
    <Stat value={user?.followingCount} label="Following" />
  </div>
);

export default memo(UserStats);