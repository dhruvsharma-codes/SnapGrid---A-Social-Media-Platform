const UserAvatar = ({ user, size = "large" }) => {
  const sizes = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-36 h-36",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden bg-(--primary) flex items-center justify-center`}
    >
      {user?.profileImage ? (
        <img
          src={`http://localhost:5000${user.profileImage}`}
          alt={user.username}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white text-4xl font-bold">
          {user?.username?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
