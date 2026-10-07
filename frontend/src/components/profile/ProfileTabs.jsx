import { Grid3X3, Bookmark } from "lucide-react";

const ProfileTabs = ({ isOwnProfile }) => {
  return (
    <div className="mt-10 border-t border-(--border)">
      <div className="flex items-center justify-center gap-10">
        <button className="relative flex items-center gap-2 px-4 py-4 text-sm font-semibold text-white">
          <Grid3X3 size={18} />
          Posts
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
        </button>

        {isOwnProfile && (
          <button className="flex items-center gap-2 px-4 py-4 text-sm text-(--text-secondary) hover:text-white transition">
            <Bookmark size={18} />
            Saved
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
