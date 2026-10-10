// import { useEffect, useState } from "react";

// import {
//   createGroup,
// } from "../../services/groupService.js";

// import {
//   searchUsers,
// } from "../../services/userService.js";

// const CreateGroupModal = ({
//   isOpen,
//   onClose,
//   onCreated,
// }) => {
//   const [groupName, setGroupName] =
//     useState("");

//   const [search, setSearch] =
//     useState("");

//   const [users, setUsers] =
//     useState([]);

//   const [selectedUsers, setSelectedUsers] =
//     useState([]);

//   const [loadingUsers, setLoadingUsers] =
//     useState(false);

//   const [creating, setCreating] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     if (!isOpen) return;

//     setGroupName("");
//     setSearch("");
//     setUsers([]);
//     setSelectedUsers([]);
//     setError("");
//   }, [isOpen]);

//   useEffect(() => {
//     if (!isOpen || !search.trim()) {
//       setUsers([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         setLoadingUsers(true);
//         setError("");

//         const response =
//           await searchUsers(search.trim());

//         setUsers(
//           response.data?.users ||
//           response.users ||
//           []
//         );
//       } catch (err) {
//         setError(
//           err.message ||
//             "Could not search users"
//         );
//       } finally {
//         setLoadingUsers(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [search, isOpen]);

//   const toggleUser = (user) => {
//     setSelectedUsers((current) => {
//       const exists = current.some(
//         (item) =>
//           Number(item.id) === Number(user.id)
//       );

//       if (exists) {
//         return current.filter(
//           (item) =>
//             Number(item.id) !==
//             Number(user.id)
//         );
//       }

//       return [...current, user];
//     });
//   };

//   const handleCreate = async () => {
//     if (!groupName.trim()) {
//       setError("Enter a group name");
//       return;
//     }

//     if (!selectedUsers.length) {
//       setError(
//         "Select at least one member"
//       );
//       return;
//     }

//     try {
//       setCreating(true);
//       setError("");

//       const response =
//         await createGroup(
//           groupName.trim(),
//           selectedUsers.map(
//             (user) => user.id
//           )
//         );

//       const group =
//         response.data?.group;

//       onCreated(group);

//       onClose();
//     } catch (err) {
//       setError(
//         err.message ||
//           "Could not create group"
//       );
//     } finally {
//       setCreating(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//       <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
//         {/* Header */}

//         <div className="flex items-center justify-between border-b border-(--border) p-5">
//           <div>
//             <h2 className="text-lg font-bold text-white">
//               Create Group
//             </h2>

//             <p className="mt-1 text-xs text-(--text-secondary)">
//               Create a private group conversation
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg px-3 py-2 text-xl text-(--text-secondary) hover:bg-(--card-hover)"
//           >
//             ×
//           </button>
//         </div>

//         {/* Body */}

//         <div className="space-y-5 p-5">
//           {/* Group name */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-white">
//               Group Name
//             </label>

//             <input
//               value={groupName}
//               onChange={(event) =>
//                 setGroupName(
//                   event.target.value
//                 )
//               }
//               maxLength={100}
//               placeholder="e.g. MERN Team"
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//             />
//           </div>

//           {/* Selected users */}

//           {selectedUsers.length > 0 && (
//             <div>
//               <p className="mb-2 text-sm font-medium text-white">
//                 Selected Members
//               </p>

//               <div className="flex flex-wrap gap-2">
//                 {selectedUsers.map(
//                   (user) => (
//                     <button
//                       key={user.id}
//                       type="button"
//                       onClick={() =>
//                         toggleUser(user)
//                       }
//                       className="rounded-full bg-(--primary)/20 px-3 py-1.5 text-xs text-purple-200"
//                     >
//                       {user.fullName ||
//                         user.username}

//                       <span className="ml-2">
//                         ×
//                       </span>
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Search */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-white">
//               Add Members
//             </label>

//             <input
//               value={search}
//               onChange={(event) =>
//                 setSearch(
//                   event.target.value
//                 )
//               }
//               placeholder="Search users..."
//               className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//             />
//           </div>

//           {/* Users */}

//           <div className="max-h-52 overflow-y-auto rounded-xl border border-(--border)">
//             {loadingUsers && (
//               <p className="p-4 text-sm text-(--text-secondary)">
//                 Searching...
//               </p>
//             )}

//             {!loadingUsers &&
//               search.trim() &&
//               users.length === 0 && (
//                 <p className="p-4 text-sm text-(--text-secondary)">
//                   No users found.
//                 </p>
//               )}

//             {users.map((user) => {
//               const selected =
//                 selectedUsers.some(
//                   (item) =>
//                     Number(item.id) ===
//                     Number(user.id)
//                 );

//               return (
//                 <button
//                   type="button"
//                   key={user.id}
//                   onClick={() =>
//                     toggleUser(user)
//                   }
//                   className={`flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover) ${
//                     selected
//                       ? "bg-(--primary)/10"
//                       : ""
//                   }`}
//                 >
//                   {user.profileImage ? (
//                     <img
//                       src={user.profileImage}
//                       alt=""
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
//                       {(
//                         user.fullName ||
//                         user.username ||
//                         "?"
//                       )
//                         .slice(0, 1)
//                         .toUpperCase()}
//                     </div>
//                   )}

//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-semibold text-white">
//                       {user.fullName ||
//                         user.username}
//                     </p>

//                     <p className="truncate text-xs text-(--text-secondary)">
//                       @{user.username}
//                     </p>
//                   </div>

//                   <div
//                     className={`flex h-5 w-5 items-center justify-center rounded-full border ${
//                       selected
//                         ? "border-(--primary) bg-(--primary)"
//                         : "border-(--border)"
//                     }`}
//                   >
//                     {selected && (
//                       <span className="text-xs text-white">
//                         ✓
//                       </span>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {error && (
//             <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
//               {error}
//             </p>
//           )}
//         </div>

//         {/* Footer */}

//         <div className="flex justify-end gap-3 border-t border-(--border) p-5">
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--card-hover)"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={handleCreate}
//             disabled={
//               creating ||
//               !groupName.trim() ||
//               !selectedUsers.length
//             }
//             className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {creating
//               ? "Creating..."
//               : "Create Group"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateGroupModal;


















































import { memo, useEffect, useState } from "react";

import { createGroup } from "../../services/groupService.js";
import { searchUsers } from "../../services/userService.js";

const API_URL = import.meta.env.VITE_API_URL;
const DEBOUNCE_MS = 300;

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const UserAvatar = memo(function UserAvatar({ user }) {
  const [failed, setFailed] = useState(false);

  if (user.profileImage && !failed) {
    return (
      <img
        // this used to use the raw path with no API URL, so relative
        // profile images were broken here
        src={assetUrl(user.profileImage)}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
      {(user.fullName || user.username || "?").slice(0, 1).toUpperCase()}
    </div>
  );
});

const CreateGroupModal = ({ isOpen, onClose, onCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ query: "", users: [] });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const trimmed = search.trim();

  const handleClose = () => {
    if (!creating) onClose?.();
  };

  // reset every time it opens
  useEffect(() => {
    if (!isOpen) return;

    setGroupName("");
    setSearch("");
    setResults({ query: "", users: [] });
    setSelectedUsers([]);
    setError("");
  }, [isOpen]);

  // Escape closes + lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !creating) onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, creating, onClose]);

  // debounced, race-safe user search
  useEffect(() => {
    if (!isOpen || !trimmed) {
      setResults({ query: "", users: [] });
      setLoadingUsers(false);
      return;
    }

    let cancelled = false;
    setLoadingUsers(true);

    const timer = setTimeout(async () => {
      try {
        const response = await searchUsers(trimmed);
        if (cancelled) return;

        setError("");
        setResults({
          query: trimmed,
          users: response?.data?.users || response?.users || [],
        });
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Could not search users");
      } finally {
        if (!cancelled) setLoadingUsers(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, isOpen]);

  const toggleUser = (user) => {
    setSelectedUsers((current) =>
      current.some((item) => Number(item.id) === Number(user.id))
        ? current.filter((item) => Number(item.id) !== Number(user.id))
        : [...current, user]
    );
  };

  const handleCreate = async () => {
    if (creating) return;

    if (!groupName.trim()) {
      setError("Enter a group name");
      return;
    }

    if (!selectedUsers.length) {
      setError("Select at least one member");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const response = await createGroup(
        groupName.trim(),
        selectedUsers.map((user) => user.id)
      );

      onCreated?.(response?.data?.group);
      onClose?.();
    } catch (err) {
      setError(err.message || "Could not create group");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  const isCurrent = results.query === trimmed;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Create group"
    >
      <div className="flex max-h-[calc(100dvh-32px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-(--border) p-5">
          <div>
            <h2 className="text-lg font-bold text-white">Create Group</h2>
            <p className="mt-1 text-xs text-(--text-secondary)">
              Create a private group conversation
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={creating}
            aria-label="Close"
            className="rounded-lg px-3 py-2 text-xl text-(--text-secondary) hover:bg-(--card-hover) disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
          <div>
            <label
              htmlFor="group-name"
              className="mb-2 block text-sm font-medium text-white"
            >
              Group Name
            </label>
            <input
              id="group-name"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              maxLength={100}
              disabled={creating}
              placeholder="e.g. MERN Team"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
            />
          </div>

          {selectedUsers.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-white">
                Selected Members ({selectedUsers.length})
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleUser(user)}
                    aria-label={`Remove ${user.fullName || user.username}`}
                    className="rounded-full bg-(--primary)/20 px-3 py-1.5 text-xs text-purple-200"
                  >
                    {user.fullName || user.username}
                    <span className="ml-2">×</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="group-member-search"
              className="mb-2 block text-sm font-medium text-white"
            >
              Add Members
            </label>
            <input
              id="group-member-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              disabled={creating}
              placeholder="Search users..."
              autoComplete="off"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
            />
          </div>

          {trimmed && (
            <div className="max-h-52 overflow-y-auto rounded-xl border border-(--border)">
              {loadingUsers && results.users.length === 0 && (
                <p className="p-4 text-sm text-(--text-secondary)">
                  Searching...
                </p>
              )}

              {/* only after THIS query finished, so no flicker while typing */}
              {!loadingUsers && isCurrent && results.users.length === 0 && (
                <p className="p-4 text-sm text-(--text-secondary)">
                  No users found.
                </p>
              )}

              {results.users.map((user) => {
                const selected = selectedUsers.some(
                  (item) => Number(item.id) === Number(user.id)
                );

                return (
                  <button
                    type="button"
                    key={user.id}
                    onClick={() => toggleUser(user)}
                    aria-pressed={selected}
                    className={`flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover) ${
                      selected ? "bg-(--primary)/10" : ""
                    }`}
                  >
                    <UserAvatar user={user} />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.fullName || user.username}
                      </p>
                      <p className="truncate text-xs text-(--text-secondary)">
                        @{user.username}
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? "border-(--primary) bg-(--primary)"
                          : "border-(--border)"
                      }`}
                    >
                      {selected && (
                        <span className="text-xs text-white">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-(--border) p-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={creating}
            className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--card-hover) disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreate}
            disabled={creating || !groupName.trim() || !selectedUsers.length}
            className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;