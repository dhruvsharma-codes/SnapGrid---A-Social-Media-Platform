
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









const UserStats = ({
  user,
  postsCount,
}) => {
  return (
    <div
      className="
        mt-3
        flex
        items-center
        gap-6
        sm:gap-8
      "
    >
      <div className="min-w-16">
        <p className="text-base font-bold text-white sm:text-lg">
          {postsCount ??
            user.postsCount ??
            0}
        </p>

        <p className="text-xs text-(--text-secondary) sm:text-sm">
          Posts
        </p>
      </div>

      <div className="min-w-16">
        <p className="text-base font-bold text-white sm:text-lg">
          {user.followersCount ?? 0}
        </p>

        <p className="text-xs text-(--text-secondary) sm:text-sm">
          Followers
        </p>
      </div>

      <div className="min-w-16">
        <p className="text-base font-bold text-white sm:text-lg">
          {user.followingCount ?? 0}
        </p>

        <p className="text-xs text-(--text-secondary) sm:text-sm">
          Following
        </p>
      </div>
    </div>
  );
};

export default UserStats;