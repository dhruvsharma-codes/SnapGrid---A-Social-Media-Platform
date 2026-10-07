
const UserStats = ({ user, postsCount }) => {
  return (
    <div className="flex gap-8">
      <div>
        <p className="text-lg font-bold text-white">
          {postsCount ?? user.postsCount ?? 0}
        </p>
        <p className="text-sm text-(--text-secondary)">
          Posts
        </p>
      </div>

      <div>
        <p className="text-lg font-bold text-white">
          {user.followersCount ?? 0}
        </p>
        <p className="text-sm text-(--text-secondary)">
          Followers
        </p>
      </div>

      <div>
        <p className="text-lg font-bold text-white">
          {user.followingCount ?? 0}
        </p>
        <p className="text-sm text-(--text-secondary)">
          Following
        </p>
      </div>
    </div>
  );
};

export default UserStats;