// import { useEffect, useState } from "react";
// import { Search as SearchIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { searchUsers } from "../services/userService.js";

// // const API_URL = "http://localhost:5000";
// const API_URL = import.meta.env.VITE_API_URL;

// const Search = () => {
//   const navigate = useNavigate();

//   const [query, setQuery] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const value = query.trim();

//     if (!value) {
//       setUsers([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setLoading(true);

//         const response = await searchUsers(value);

//         setUsers(response.data.users);
//       } catch (error) {
//         console.error("Search Error:", error);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleUserClick = (username) => {
//     navigate(`/profile/${username}`);
//   };

//   return (
//     // <div className="mx-auto max-w-2xl">
//     <div className="mx-auto w-full max-w-2xl">
//       {/* Search Bar */}
//       <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--input) px-4 py-3 sm:px-4 focus-within:border-(--primary)">
//        {/* <div className="
//   flex w-full items-center gap-3
//   border-b border-(--border)
//   p-3 sm:p-4
//   text-left
//   transition
//   last:border-b-0
//   hover:bg-(--card-hover)
// "> */}
      
//         <SearchIcon size={20} className="shrink-0 text-(--text-muted)" />

//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search SnapGrid"
//           autoFocus
//           className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
//         />

//         {loading && (
//           <span className=" shrink-0 text-xs text-(--text-muted)">Searching...</span>
//         )}
//       </div>

//       {/* Search Results */}
//       {query.trim() && (
//         <div className="mt-3 overflow-hidden rounded-xl border border-(--border) bg-(--card)">
//           {users.length > 0
//             ? users.map((user) => (
//                 <button
//                   key={user.id}
//                   type="button"
//                   onClick={() => handleUserClick(user.username)}
//                   className="flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition last:border-b-0 hover:bg-(--card-hover)"
//                 >
//                   {/* Profile Image / Initial */}
//                   {/* <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--primary)"> */}
//                   <div className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full bg-(--primary)">
//                     {user.profileImage ? (
//                       <img
//                         src={`${API_URL}${user.profileImage}`}
//                         alt={user.username}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center">
//                         <span className="font-semibold text-white">
//                           {user.fullName?.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* User Info */}
//                   {/* <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-white">
//                       {user.fullName}
//                     </p>

//                     <p className="truncate text-sm text-(--text-secondary)">
//                       @{user.username}
//                     </p>
//                   </div> */}
//                   <div className="min-w-0 flex-1">
//   <p className="truncate text-sm font-semibold text-white">
//     {user.fullName}
//   </p>

//   <p className="truncate text-xs sm:text-sm text-(--text-secondary)">
//     @{user.username}
//   </p>
// </div>
//                 </button>
//               ))
//             : !loading && (
//                 <div className="px-4 py-6 text-center">
//                   <p className="text-sm text-(--text-secondary)">
//                     No users found
//                   </p>
//                 </div>
//               )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
















import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { searchUsers } from "../services/userService.js";

const API_URL = import.meta.env.VITE_API_URL;
const DEBOUNCE_MS = 300;
const CACHE_LIMIT = 50;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const UserResult = memo(function UserResult({ user, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(user.username)}
      className="flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition last:border-b-0 hover:bg-(--card-hover)"
    >
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-(--primary) sm:h-11 sm:w-11">
        {user.profileImage && !imageFailed ? (
          <img
            src={assetUrl(user.profileImage)}
            alt={user.username}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-semibold text-white">
              {(user.fullName || user.username || "?").charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {user.fullName || user.username}
        </p>
        <p className="truncate text-xs text-(--text-secondary) sm:text-sm">
          @{user.username}
        </p>
      </div>
    </button>
  );
});

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  // remember which query the results belong to
  const [results, setResults] = useState({ query: "", users: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cacheRef = useRef(new Map());

  // depend on the trimmed value so extra spaces don't trigger new requests
  const trimmed = query.trim();

  useEffect(() => {
    setError("");

    if (!trimmed) {
      setLoading(false);
      setResults({ query: "", users: [] });
      return;
    }

    // instant result for queries we've already run
    const cacheKey = trimmed.toLowerCase();
    const cached = cacheRef.current.get(cacheKey);

    if (cached) {
      setResults({ query: trimmed, users: cached });
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const response = await searchUsers(trimmed);
        const users = response?.data?.users || [];

        if (cancelled) return; // a newer query replaced this one

        if (cacheRef.current.size >= CACHE_LIMIT) {
          // drop the oldest entry
          cacheRef.current.delete(cacheRef.current.keys().next().value);
        }
        cacheRef.current.set(cacheKey, users);

        setResults({ query: trimmed, users });
      } catch (err) {
        if (cancelled) return;
        console.error("Search Error:", err);
        setError(err.message || "Search failed. Please try again.");
        setResults({ query: trimmed, users: [] });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed]);

  const handleUserClick = useCallback(
    (username) => navigate(`/profile/${username}`),
    [navigate]
  );

  const handleKeyDown = (event) => {
    // Enter opens the top result
    if (
      event.key === "Enter" &&
      results.query === trimmed &&
      results.users.length > 0
    ) {
      handleUserClick(results.users[0].username);
    }
  };

  const isCurrent = results.query === trimmed;
  const hasUsers = results.users.length > 0;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Search Bar */}
      <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--input) px-4 py-3 focus-within:border-(--primary)">
        <SearchIcon size={20} className="shrink-0 text-(--text-muted)" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search SnapGrid"
          aria-label="Search users"
          autoComplete="off"
          autoFocus
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-(--text-muted)"
        />

        {loading && (
          <span className="shrink-0 text-xs text-(--text-muted)">
            Searching...
          </span>
        )}
      </div>

      {/* Results */}
      {trimmed && (
        <div className="mt-3 overflow-hidden rounded-xl border border-(--border) bg-(--card)">
          {error ? (
            <div role="alert" className="px-4 py-6 text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : hasUsers ? (
            // previous results stay visible (dimmed) while the new query loads
            <div
              className={`transition-opacity ${
                isCurrent && !loading ? "opacity-100" : "opacity-60"
              }`}
            >
              {results.users.map((user) => (
                <UserResult
                  key={user.id}
                  user={user}
                  onSelect={handleUserClick}
                />
              ))}
            </div>
          ) : isCurrent && !loading ? (
            // only shown once the search for THIS query has finished
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-(--text-secondary)">No users found</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search;