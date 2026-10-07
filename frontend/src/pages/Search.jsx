import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { searchUsers } from "../services/userService.js";

const API_URL = "http://localhost:5000";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchUsers(value);

        setUsers(response.data.users);
      } catch (error) {
        console.error("Search Error:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Search Bar */}
      <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--input) px-4 py-3 focus-within:border-(--primary)">
        <SearchIcon size={20} className="shrink-0 text-(--text-muted)" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search SnapGrid"
          autoFocus
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
        />

        {loading && (
          <span className="text-xs text-(--text-muted)">Searching...</span>
        )}
      </div>

      {/* Search Results */}
      {query.trim() && (
        <div className="mt-3 overflow-hidden rounded-xl border border-(--border) bg-(--card)">
          {users.length > 0
            ? users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleUserClick(user.username)}
                  className="flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition last:border-b-0 hover:bg-(--card-hover)"
                >
                  {/* Profile Image / Initial */}
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--primary)">
                    {user.profileImage ? (
                      <img
                        src={`${API_URL}${user.profileImage}`}
                        alt={user.username}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-semibold text-white">
                          {user.fullName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.fullName}
                    </p>

                    <p className="truncate text-sm text-(--text-secondary)">
                      @{user.username}
                    </p>
                  </div>
                </button>
              ))
            : !loading && (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-(--text-secondary)">
                    No users found
                  </p>
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default Search;
