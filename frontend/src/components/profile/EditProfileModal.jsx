import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

import { updateProfile } from "../../services/userService.js";

const API_URL = "http://localhost:5000";

const EditProfileModal = ({ user, onClose, onUpdated }) => {
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState(user?.fullName || "");

  const [bio, setBio] = useState(user?.bio || "");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    user?.profileImage ? `${API_URL}${user.profileImage}` : "",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFullName(user?.fullName || "");
    setBio(user?.bio || "");

    setPreview(user?.profileImage ? `${API_URL}${user.profileImage}` : "");
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (fullName.trim().length > 50) {
      setError("Full name cannot exceed 50 characters");
      return;
    }

    if (bio.length > 150) {
      setError("Bio cannot exceed 150 characters");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName.trim());

      formData.append("bio", bio.trim());

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await updateProfile(formData);

      onUpdated(response.data.user);

      onClose();
    } catch (error) {
      console.error("Update Profile Error:", error);

      setError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-(--border) bg-(--card)"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Edit Profile</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-(--primary)">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {fullName?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-(--primary) text-white shadow-lg transition hover:bg-(--primary-hover)"
              >
                <Camera size={18} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-(--text-primary)">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              maxLength={50}
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
              placeholder="Enter your full name"
            />

            <p className="mt-1 text-right text-xs text-(--text-muted)">
              {fullName.length}/50
            </p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-(--text-primary)">
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={150}
              rows={4}
              className="w-full resize-none rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
              placeholder="Tell people about yourself..."
            />

            <p className="mt-1 text-right text-xs text-(--text-muted)">
              {bio.length}/150
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-(--danger)">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-(--border) px-4 py-3 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
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
