import { useEffect, useState } from "react";

import {
  createGroup,
} from "../../services/groupService.js";

import {
  searchUsers,
} from "../../services/userService.js";

const CreateGroupModal = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [groupName, setGroupName] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [selectedUsers, setSelectedUsers] =
    useState([]);

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!isOpen) return;

    setGroupName("");
    setSearch("");
    setUsers([]);
    setSelectedUsers([]);
    setError("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !search.trim()) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoadingUsers(true);
        setError("");

        const response =
          await searchUsers(search.trim());

        setUsers(
          response.data?.users ||
          response.users ||
          []
        );
      } catch (err) {
        setError(
          err.message ||
            "Could not search users"
        );
      } finally {
        setLoadingUsers(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, isOpen]);

  const toggleUser = (user) => {
    setSelectedUsers((current) => {
      const exists = current.some(
        (item) =>
          Number(item.id) === Number(user.id)
      );

      if (exists) {
        return current.filter(
          (item) =>
            Number(item.id) !==
            Number(user.id)
        );
      }

      return [...current, user];
    });
  };

  const handleCreate = async () => {
    if (!groupName.trim()) {
      setError("Enter a group name");
      return;
    }

    if (!selectedUsers.length) {
      setError(
        "Select at least one member"
      );
      return;
    }

    try {
      setCreating(true);
      setError("");

      const response =
        await createGroup(
          groupName.trim(),
          selectedUsers.map(
            (user) => user.id
          )
        );

      const group =
        response.data?.group;

      onCreated(group);

      onClose();
    } catch (err) {
      setError(
        err.message ||
          "Could not create group"
      );
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-(--border) bg-(--card)">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-(--border) p-5">
          <div>
            <h2 className="text-lg font-bold text-white">
              Create Group
            </h2>

            <p className="mt-1 text-xs text-(--text-secondary)">
              Create a private group conversation
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-(--text-secondary) hover:bg-(--card-hover)"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="space-y-5 p-5">
          {/* Group name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Group Name
            </label>

            <input
              value={groupName}
              onChange={(event) =>
                setGroupName(
                  event.target.value
                )
              }
              maxLength={100}
              placeholder="e.g. MERN Team"
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
            />
          </div>

          {/* Selected users */}

          {selectedUsers.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-white">
                Selected Members
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedUsers.map(
                  (user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() =>
                        toggleUser(user)
                      }
                      className="rounded-full bg-(--primary)/20 px-3 py-1.5 text-xs text-purple-200"
                    >
                      {user.fullName ||
                        user.username}

                      <span className="ml-2">
                        ×
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Search */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Add Members
            </label>

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search users..."
              className="w-full rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
            />
          </div>

          {/* Users */}

          <div className="max-h-52 overflow-y-auto rounded-xl border border-(--border)">
            {loadingUsers && (
              <p className="p-4 text-sm text-(--text-secondary)">
                Searching...
              </p>
            )}

            {!loadingUsers &&
              search.trim() &&
              users.length === 0 && (
                <p className="p-4 text-sm text-(--text-secondary)">
                  No users found.
                </p>
              )}

            {users.map((user) => {
              const selected =
                selectedUsers.some(
                  (item) =>
                    Number(item.id) ===
                    Number(user.id)
                );

              return (
                <button
                  type="button"
                  key={user.id}
                  onClick={() =>
                    toggleUser(user)
                  }
                  className={`flex w-full items-center gap-3 border-b border-(--border) p-3 text-left last:border-b-0 hover:bg-(--card-hover) ${
                    selected
                      ? "bg-(--primary)/10"
                      : ""
                  }`}
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
                      {(
                        user.fullName ||
                        user.username ||
                        "?"
                      )
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.fullName ||
                        user.username}
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
                      <span className="text-xs text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-(--border) p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--card-hover)"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreate}
            disabled={
              creating ||
              !groupName.trim() ||
              !selectedUsers.length
            }
            className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating
              ? "Creating..."
              : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;