// const UserAvatar = ({ user, size = "large" }) => {
//   const sizes = {
//     small: "w-10 h-10",
//     medium: "w-16 h-16",
//     large: "w-36 h-36",
//   };

//   return (
//     <div
//       className={`${sizes[size]} rounded-full overflow-hidden bg-(--primary) flex items-center justify-center`}
//     >
//       {user?.profileImage ? (
//         <img
//           src={`http://localhost:5000${user.profileImage}`}
//           alt={user.username}
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <span className="text-white text-4xl font-bold">
//           {user?.username?.charAt(0).toUpperCase()}
//         </span>
//       )}
//     </div>
//   );
// };

// export default UserAvatar;






const UserAvatar = ({
  user,
  size = "large",
}) => {
  const sizes = {
    small: "h-10 w-10",
    medium: "h-16 w-16",
    large: `
      h-24
      w-24
      sm:h-28
      sm:w-28
      md:h-36
      md:w-36
    `,
  };

  const imageUrl = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `${import.meta.env.VITE_API_URL}${user.profileImage}`
    : null;

  return (
    <div
      className={`
        ${sizes[size]}
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        bg-(--primary)
      `}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={user?.username || "Profile"}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="
            text-3xl
            font-bold
            text-white
            sm:text-4xl
          "
        >
          {user?.username
            ?.charAt(0)
            .toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;