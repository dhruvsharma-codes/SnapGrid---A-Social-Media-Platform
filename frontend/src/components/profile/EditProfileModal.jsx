// import { useEffect, useRef, useState } from "react";
// import { X, Camera } from "lucide-react";

// import { updateProfile } from "../../services/userService.js";

// // const API_URL = "http://localhost:5000";

// const EditProfileModal = ({ user, onClose, onUpdated }) => {
//   const fileInputRef = useRef(null);

//   const [fullName, setFullName] = useState(user?.fullName || "");

//   const [bio, setBio] = useState(user?.bio || "");

//   const [image, setImage] = useState(null);

//   const [preview, setPreview] = useState(
//     user?.profileImage ? `${import.meta.env.VITE_API_URL}${user.profileImage}` : "",
//   );

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setFullName(user?.fullName || "");
//     setBio(user?.bio || "");

//     setPreview(user?.profileImage ? `${import.meta.env.VITE_API_URL}${user.profileImage}` : "");
//   }, [user]);

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!fullName.trim()) {
//       setError("Full name is required");
//       return;
//     }

//     if (fullName.trim().length > 50) {
//       setError("Full name cannot exceed 50 characters");
//       return;
//     }

//     if (bio.length > 150) {
//       setError("Bio cannot exceed 150 characters");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("fullName", fullName.trim());

//       formData.append("bio", bio.trim());

//       if (image) {
//         formData.append("profileImage", image);
//       }

//       const response = await updateProfile(formData);

//       onUpdated(response.data.user);

//       onClose();
//     } catch (error) {
//       console.error("Update Profile Error:", error);

//       setError(error.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-200 flex items-center justify-center bg-black/75 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="w-full max-w-md overflow-hidden rounded-2xl border border-(--border) bg-(--card)"
//         onClick={(event) => event.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
//           <h2 className="text-lg font-semibold text-white">Edit Profile</h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-5">
//           {/* Profile Image */}
//           <div className="mb-6 flex justify-center">
//             <div className="relative">
//               <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-3xl font-bold text-white">
//                     {fullName?.charAt(0).toUpperCase()}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-(--primary) text-white shadow-lg transition hover:bg-(--primary-hover)"
//               >
//                 <Camera size={18} />
//               </button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Full Name */}
//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium text-(--text-primary)">
//               Full Name
//             </label>

//             <input
//               type="text"
//               value={fullName}
//               onChange={(event) => setFullName(event.target.value)}
//               maxLength={50}
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
//               placeholder="Enter your full name"
//             />

//             <p className="mt-1 text-right text-xs text-(--text-muted)">
//               {fullName.length}/50
//             </p>
//           </div>

//           {/* Bio */}
//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium text-(--text-primary)">
//               Bio
//             </label>

//             <textarea
//               value={bio}
//               onChange={(event) => setBio(event.target.value)}
//               maxLength={150}
//               rows={4}
//               className="w-full resize-none rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
//               placeholder="Tell people about yourself..."
//             />

//             <p className="mt-1 text-right text-xs text-(--text-muted)">
//               {bio.length}/150
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-(--danger)">
//               {error}
//             </p>
//           )}

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 rounded-xl border border-(--border) px-4 py-3 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;













// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   X,
//   Camera,
// } from "lucide-react";

// import {
//   updateProfile,
// } from "../../services/userService.js";

// const EditProfileModal = ({
//   user,
//   onClose,
//   onUpdated,
// }) => {
//   const fileInputRef = useRef(null);

//   const [fullName, setFullName] = useState(
//     user?.fullName || ""
//   );

//   const [bio, setBio] = useState(
//     user?.bio || ""
//   );

//   const [image, setImage] = useState(null);

//   const [preview, setPreview] = useState(
//     user?.profileImage
//       ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
//       : ""
//   );

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setFullName(user?.fullName || "");
//     setBio(user?.bio || "");

//     setPreview(
//       user?.profileImage
//         ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
//         : ""
//     );

//     setImage(null);
//     setError("");
//   }, [user]);

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setImage(file);
//     setPreview(
//       URL.createObjectURL(file)
//     );
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!fullName.trim()) {
//       setError("Full name is required");
//       return;
//     }

//     if (fullName.trim().length > 50) {
//       setError(
//         "Full name cannot exceed 50 characters"
//       );
//       return;
//     }

//     if (bio.length > 150) {
//       setError(
//         "Bio cannot exceed 150 characters"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append(
//         "fullName",
//         fullName.trim()
//       );

//       formData.append(
//         "bio",
//         bio.trim()
//       );

//       if (image) {
//         formData.append(
//           "profileImage",
//           image
//         );
//       }

//       const response =
//         await updateProfile(formData);

//       onUpdated(response.data.user);

//       onClose();
//     } catch (error) {
//       console.error(
//         "Update Profile Error:",
//         error
//       );

//       setError(
//         error.message ||
//           "Failed to update profile"
//       );
//     } finally {
//       setLoading(false);
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
//         bg-black/75
//         p-3
//         sm:p-4
//       "
//       onClick={onClose}
//     >
//       <div
//         className="
//           flex
//           max-h-[calc(100dvh-24px)]
//           w-full
//           max-w-md
//           flex-col
//           overflow-hidden
//           rounded-2xl
//           border
//           border-(--border)
//           bg-(--card)
//           sm:max-h-[calc(100dvh-32px)]
//         "
//         onClick={(event) =>
//           event.stopPropagation()
//         }
//       >
//         {/* Header */}
//         <div
//           className="
//             flex
//             shrink-0
//             items-center
//             justify-between
//             border-b
//             border-(--border)
//             px-4
//             py-3
//             sm:px-5
//             sm:py-4
//           "
//         >
//           <h2 className="text-base font-semibold text-white sm:text-lg">
//             Edit Profile
//           </h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-lg
//               text-(--text-secondary)
//               transition
//               hover:bg-(--card-hover)
//               hover:text-white
//             "
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Scrollable Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="
//             overflow-y-auto
//             p-4
//             sm:p-5
//           "
//         >
//           {/* Profile Image */}
//           <div className="mb-5 flex justify-center sm:mb-6">
//             <div className="relative">
//               <div
//                 className="
//                   flex
//                   h-24
//                   w-24
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-full
//                   bg-(--primary)
//                   sm:h-28
//                   sm:w-28
//                 "
//               >
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-2xl font-bold text-white sm:text-3xl">
//                     {fullName
//                       ?.charAt(0)
//                       .toUpperCase()}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   fileInputRef.current?.click()
//                 }
//                 className="
//                   absolute
//                   bottom-0
//                   right-0
//                   flex
//                   h-9
//                   w-9
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-(--primary)
//                   text-white
//                   shadow-lg
//                   transition
//                   hover:bg-(--primary-hover)
//                   active:scale-95
//                 "
//               >
//                 <Camera size={18} />
//               </button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png,image/webp"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Full Name */}
//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium text-(--text-primary)">
//               Full Name
//             </label>

//             <input
//               type="text"
//               value={fullName}
//               onChange={(event) =>
//                 setFullName(event.target.value)
//               }
//               maxLength={50}
//               className="
//                 w-full
//                 rounded-xl
//                 border
//                 border-(--border)
//                 bg-(--input)
//                 px-3
//                 py-3
//                 text-sm
//                 text-white
//                 outline-none
//                 transition
//                 placeholder:text-(--text-muted)
//                 focus:border-(--primary)
//                 sm:px-4
//               "
//               placeholder="Enter your full name"
//             />

//             <p className="mt-1 text-right text-xs text-(--text-muted)">
//               {fullName.length}/50
//             </p>
//           </div>

//           {/* Bio */}
//           <div className="mb-4">
//             <label className="mb-2 block text-sm font-medium text-(--text-primary)">
//               Bio
//             </label>

//             <textarea
//               value={bio}
//               onChange={(event) =>
//                 setBio(event.target.value)
//               }
//               maxLength={150}
//               rows={4}
//               className="
//                 w-full
//                 resize-none
//                 rounded-xl
//                 border
//                 border-(--border)
//                 bg-(--input)
//                 px-3
//                 py-3
//                 text-sm
//                 text-white
//                 outline-none
//                 transition
//                 placeholder:text-(--text-muted)
//                 focus:border-(--primary)
//                 sm:px-4
//               "
//               placeholder="Tell people about yourself..."
//             />

//             <p className="mt-1 text-right text-xs text-(--text-muted)">
//               {bio.length}/150
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <p
//               className="
//                 mb-4
//                 rounded-lg
//                 bg-red-500/10
//                 px-3
//                 py-2
//                 text-xs
//                 leading-5
//                 text-(--danger)
//                 sm:text-sm
//               "
//             >
//               {error}
//             </p>
//           )}

//           {/* Buttons */}
//           <div className="flex gap-2.5 sm:gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="
//                 min-h-11
//                 flex-1
//                 rounded-xl
//                 border
//                 border-(--border)
//                 px-3
//                 py-3
//                 text-sm
//                 font-semibold
//                 text-(--text-secondary)
//                 transition
//                 hover:bg-(--card-hover)
//                 hover:text-white
//               "
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 min-h-11
//                 flex-1
//                 rounded-xl
//                 bg-(--primary)
//                 px-3
//                 py-3
//                 text-sm
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-(--primary-hover)
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//             >
//               {loading
//                 ? "Saving..."
//                 : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;


































import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

import { updateProfile } from "../../services/userService.js";

const API_URL = import.meta.env.VITE_API_URL;
const MAX_NAME_LENGTH = 50;
const MAX_BIO_LENGTH = 150;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const inputClass =
  "w-full rounded-xl border border-(--border) bg-(--input) px-3 py-3 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60 sm:px-4";

const EditProfileModal = ({ user, onClose, onUpdated }) => {
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Initialised once. The modal is mounted fresh each time it opens.
  // (A previous effect re-initialised these whenever `user` changed, which
  // wiped what you were typing if the profile refreshed in the background.)
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(assetUrl(user?.profileImage));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // free the preview blob when the modal closes
  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    []
  );

  // Escape closes (but not while saving)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loading, onClose]);

  // lock background scroll
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleClose = () => {
    if (!loading) onClose?.();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 5 MB");
      event.target.value = "";
      return;
    }

    setError("");

    // release the previous preview before creating a new one
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    setImage(file);
    setPreview(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setError("");

    const trimmedName = fullName.trim();
    const trimmedBio = bio.trim();

    if (!trimmedName) {
      setError("Full name is required");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setError(`Full name cannot exceed ${MAX_NAME_LENGTH} characters`);
      return;
    }

    if (trimmedBio.length > MAX_BIO_LENGTH) {
      setError(`Bio cannot exceed ${MAX_BIO_LENGTH} characters`);
      return;
    }

    // nothing changed -> skip the network request
    const unchanged =
      !image &&
      trimmedName === (user?.fullName || "") &&
      trimmedBio === (user?.bio || "");

    if (unchanged) {
      onClose?.();
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", trimmedName);
      formData.append("bio", trimmedBio);
      if (image) formData.append("profileImage", image);

      const response = await updateProfile(formData);

      onUpdated?.(response.data.user);
      onClose?.();
    } catch (err) {
      console.error("Update Profile Error:", err);
      setError(err.message || "Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/75 p-3 sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Edit profile"
    >
      <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card) sm:max-h-[calc(100dvh-32px)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Edit Profile
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-5">
          {/* Profile image */}
          <div className="mb-5 flex justify-center sm:mb-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-(--primary) sm:h-28 sm:w-28">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white sm:text-3xl">
                    {(fullName || user?.username || "?").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-(--primary) text-white shadow-lg transition hover:bg-(--primary-hover) active:scale-95 disabled:opacity-50"
              >
                <Camera size={18} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Full name */}
          <div className="mb-4">
            <label
              htmlFor="edit-fullName"
              className="mb-2 block text-sm font-medium text-(--text-primary)"
            >
              Full Name
            </label>
            <input
              id="edit-fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              maxLength={MAX_NAME_LENGTH}
              disabled={loading}
              autoComplete="name"
              className={inputClass}
              placeholder="Enter your full name"
            />
            <p className="mt-1 text-right text-xs text-(--text-muted)">
              {fullName.length}/{MAX_NAME_LENGTH}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label
              htmlFor="edit-bio"
              className="mb-2 block text-sm font-medium text-(--text-primary)"
            >
              Bio
            </label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={MAX_BIO_LENGTH}
              disabled={loading}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Tell people about yourself..."
            />
            <p className="mt-1 text-right text-xs text-(--text-muted)">
              {bio.length}/{MAX_BIO_LENGTH}
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs leading-5 text-(--danger) sm:text-sm"
            >
              {error}
            </p>
          )}

          <div className="flex gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="min-h-11 flex-1 rounded-xl border border-(--border) px-3 py-3 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="min-h-11 flex-1 rounded-xl bg-(--primary) px-3 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;