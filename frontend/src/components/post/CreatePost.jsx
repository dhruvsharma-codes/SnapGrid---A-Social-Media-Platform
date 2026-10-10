// import { useRef, useState } from "react";
// import { Image, X } from "lucide-react";
// import { createPost } from "../../services/postService.js";
// const CreatePost = ({ onClose, onPostCreated }) => {
//   const fileInputRef = useRef(null);

//   const [caption, setCaption] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!caption.trim() && !image) {
//       setError("Please add a caption or select an image.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("caption", caption);

//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await createPost(formData);

//       onPostCreated(response.data.post);

//       setCaption("");
//       setImage(null);
//       setPreview("");

//       onClose();
//     } catch (error) {
//       console.error("Create Post Error:", error);

//       setError(error.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4">
//       <div className="w-full max-w-lg rounded-2xl border border-(--border) bg-(--card)">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
//           <h2 className="text-lg font-semibold text-white">Create Post</h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-5">
//           <textarea
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             placeholder="What's on your mind?"
//             rows={5}
//             className="w-full resize-none rounded-xl border border-(--border) bg-(--input) p-4 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//           />

//           {/* Image Preview */}
//           {preview && (
//             <div className="relative mt-4 overflow-hidden rounded-xl">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="max-h-80 w-full object-cover"
//               />

//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           )}

//           {error && <p className="mt-3 text-sm text-(--danger)">{error}</p>}

//           {/* Bottom */}
//           <div className="mt-5 flex items-center justify-between">
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-(--text-secondary) hover:bg-(--card-hover) hover:text-white"
//             >
//               <Image size={20} />
//               Add Image
//             </button>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/jpeg,image/jpg,image/png,image/webp"
//               onChange={handleImageChange}
//               className="hidden"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-lg bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

































import { useEffect, useRef, useState } from "react";
import { Image, X } from "lucide-react";

import { createPost } from "../../services/postService.js";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const CreatePost = ({ onClose, onPostCreated }) => {
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    if (!loading) onClose?.();
  };

  // free the preview blob when the modal closes
  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    []
  );

  // Escape closes (not while posting) + lock background scroll
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, onClose]);

  const clearPreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    clearPreview(); // release the previous preview first

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    setImage(file);
    setPreview(url);
  };

  const removeImage = () => {
    clearPreview();
    setImage(null);
    setPreview("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setError("");

    const trimmedCaption = caption.trim();

    if (!trimmedCaption && !image) {
      setError("Please add a caption or select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caption", trimmedCaption);
      if (image) formData.append("image", image);

      const response = await createPost(formData);

      onPostCreated?.(response?.data?.post);
      onClose?.();
    } catch (err) {
      console.error("Create Post Error:", err);
      setError(err.message || "Failed to create post");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Create post"
    >
      <div className="flex max-h-[calc(100dvh-32px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Create Post</h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-lg p-2 text-(--text-secondary) hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
            disabled={loading}
            autoFocus
            className="w-full resize-none rounded-xl border border-(--border) bg-(--input) p-4 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
          />

          {preview && (
            <div className="relative mt-4 overflow-hidden rounded-xl">
              <img
                src={preview}
                alt="Preview"
                className="max-h-80 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                disabled={loading}
                aria-label="Remove image"
                className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-3 text-sm text-(--danger)">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-(--text-secondary) hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
            >
              <Image size={20} />
              Add Image
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;