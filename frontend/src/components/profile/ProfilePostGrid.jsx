import { Grid3X3 } from "lucide-react";

const API_URL = "http://localhost:5000";

const ProfilePostGrid = ({ posts, onPostClick }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-(--border)">
          <Grid3X3 size={28} className="text-(--text-muted)" />
        </div>

        <h3 className="text-lg font-semibold text-white">No Posts Yet</h3>

        <p className="mt-1 text-sm text-(--text-secondary)">
          When posts are created, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-1 grid grid-cols-2 gap-1 md:grid-cols-3">
      {posts.map((post) => {
        const imageUrl = post.image ? `${API_URL}${post.image}` : null;

        return (
          <button
            key={post.id}
            type="button"
            onClick={() => onPostClick(post)}
            className="group relative aspect-square overflow-hidden bg-(--card)"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.caption || "Post"}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6">
                <p className="line-clamp-5 text-center text-sm text-(--text-secondary)">
                  {post.caption}
                </p>
              </div>
            )}

            {/* Hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
              <p className="px-4 text-sm font-medium text-white">View Post</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ProfilePostGrid;
