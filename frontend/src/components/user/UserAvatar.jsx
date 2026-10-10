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






// const UserAvatar = ({
//   user,
//   size = "large",
// }) => {
//   const sizes = {
//     small: "h-10 w-10",
//     medium: "h-16 w-16",
//     large: `
//       h-24
//       w-24
//       sm:h-28
//       sm:w-28
//       md:h-36
//       md:w-36
//     `,
//   };

//   const imageUrl = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `${import.meta.env.VITE_API_URL}${user.profileImage}`
//     : null;

//   return (
//     <div
//       className={`
//         ${sizes[size]}
//         flex
//         shrink-0
//         items-center
//         justify-center
//         overflow-hidden
//         rounded-full
//         bg-(--primary)
//       `}
//     >
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={user?.username || "Profile"}
//           className="h-full w-full object-cover"
//         />
//       ) : (
//         <span
//           className="
//             text-3xl
//             font-bold
//             text-white
//             sm:text-4xl
//           "
//         >
//           {user?.username
//             ?.charAt(0)
//             .toUpperCase()}
//         </span>
//       )}
//     </div>
//   );
// };

// export default UserAvatar;





























import { memo, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

// module-level: no new objects on every render
const SIZES = {
  small: "h-10 w-10",
  medium: "h-16 w-16",
  large: "h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36",
};

// the initial used to be text-3xl for EVERY size, which overflowed "small"
const TEXT_SIZES = {
  small: "text-base",
  medium: "text-2xl",
  large: "text-3xl sm:text-4xl",
};

const UserAvatar = ({ user, size = "large" }) => {
  const [failed, setFailed] = useState(false);
  const src = user?.profileImage;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const initial = (user?.username || user?.fullName || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div
      className={`${SIZES[size] || SIZES.large} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)`}
    >
      {src && !failed ? (
        <img
          src={assetUrl(src)}
          alt={user?.username || "Profile"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className={`${TEXT_SIZES[size] || TEXT_SIZES.large} font-bold text-white`}
        >
          {initial}
        </span>
      )}
    </div>
  );
};

export default memo(UserAvatar);