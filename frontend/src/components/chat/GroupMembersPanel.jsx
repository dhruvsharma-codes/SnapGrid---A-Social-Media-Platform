
import { useState } from "react";

import {
  addGroupMembers,
  removeGroupMember,
} from "../../services/groupService.js";

import { searchUsers } from "../../services/userService.js";

const API_URL = "http://localhost:5000";

const GroupMembersPanel = ({
  group,
  currentUserId,
  onUpdated,
}) => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [showAddMembers, setShowAddMembers] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [selectedUsers, setSelectedUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // CURRENT USER / ADMIN
  // =====================================================

  const currentMember =
    group?.members?.find(
      (member) =>
        Number(member.userId) ===
        Number(currentUserId)
    );

  const isAdmin =
    currentMember?.role === "admin";

  // =====================================================
  // EXISTING MEMBERS
  // =====================================================

  const existingMemberIds =
    new Set(
      (group?.members || []).map(
        (member) =>
          Number(member.userId)
      )
    );

  // =====================================================
  // PROFILE IMAGE URL
  // =====================================================

  const getImageUrl = (
    profileImage
  ) => {
    if (!profileImage) {
      return "";
    }

    if (
      profileImage.startsWith(
        "http://"
      ) ||
      profileImage.startsWith(
        "https://"
      )
    ) {
      return profileImage;
    }

    return `${API_URL}${profileImage}`;
  };

  // =====================================================
  // USER INITIAL
  // =====================================================

  const getInitial = (user) => {
    return (
      user?.fullName ||
      user?.username ||
      "?"
    )
      .charAt(0)
      .toUpperCase();
  };

  // =====================================================
  // SEARCH USERS
  // =====================================================

  const handleSearch = async (
    value
  ) => {
    setSearch(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await searchUsers(
          value.trim()
        );

      const result =
        response.data?.users ||
        response.users ||
        [];

      setUsers(
        result.filter(
          (user) =>
            !existingMemberIds.has(
              Number(user.id)
            )
        )
      );
    } catch (error) {
      console.error(
        "Search users error:",
        error
      );

      setError(
        error.message ||
          "Could not search users"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SELECT USER
  // =====================================================

  const toggleUser = (user) => {
    setSelectedUsers(
      (current) => {
        const exists =
          current.some(
            (item) =>
              Number(item.id) ===
              Number(user.id)
          );

        if (exists) {
          return current.filter(
            (item) =>
              Number(item.id) !==
              Number(user.id)
          );
        }

        return [
          ...current,
          user,
        ];
      }
    );
  };

  // =====================================================
  // ADD MEMBERS
  // =====================================================

  const handleAddMembers =
    async () => {
      if (
        !selectedUsers.length
      ) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await addGroupMembers(
            group.id,
            selectedUsers.map(
              (user) => user.id
            )
          );

        const updatedGroup =
          response.data?.group;

        setSelectedUsers([]);
        setSearch("");
        setUsers([]);
        setShowAddMembers(false);

        if (updatedGroup) {
          onUpdated(
            updatedGroup
          );
        }
      } catch (error) {
        console.error(
          "Add members error:",
          error
        );

        setError(
          error.message ||
            "Could not add members"
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // REMOVE MEMBER
  // =====================================================

  const handleRemove =
    async (userId) => {
      const confirmed =
        window.confirm(
          "Remove this member from the group?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await removeGroupMember(
            group.id,
            userId
          );

        const updatedGroup =
          response.data?.group;

        if (updatedGroup) {
          onUpdated(
            updatedGroup
          );
        }
      } catch (error) {
        console.error(
          "Remove member error:",
          error
        );

        setError(
          error.message ||
            "Could not remove member"
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // TOGGLE PANEL
  // =====================================================

  const handleToggle = () => {
    setIsOpen(
      (current) => !current
    );

    setError("");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="border-t border-(--border) bg-(--background-secondary)">

      {/* =================================================
          COLLAPSED HEADER
      ================================================= */}

      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-(--card-hover)"
      >

        <div className="flex items-center gap-3">

          {/* ICON */}

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary)/15 text-(--primary)">
            👥
          </div>

          <div className="text-left">

            <p className="text-sm font-semibold text-(--text-primary)">
              Group Members
            </p>

            <p className="text-xs text-(--text-secondary)">
              {group?.members?.length ||
                0}{" "}
              members
            </p>

          </div>

        </div>

        {/* ARROW */}

        <span
          className={`text-lg text-(--text-secondary) transition-transform ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        >
         ⌄
        </span>

      </button>

      {/* =================================================
          MEMBERS CONTENT
      ================================================= */}

      {isOpen && (

        <div className="max-h-80 overflow-y-auto border-t border-(--border)">

          {/* ERROR */}

          {error && (
            <div className="border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* =============================================
              ADD MEMBER BUTTON
          ============================================== */}

          {isAdmin && (
            <div className="border-b border-(--border) p-3">

              {!showAddMembers ? (

                <button
                  type="button"
                  onClick={() =>
                    setShowAddMembers(
                      true
                    )
                  }
                  className="w-full rounded-lg border border-(--border) bg-(--card) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--card-hover)"
                >
                  + Add Members
                </button>

              ) : (

                <div className="space-y-3">

                  {/* SEARCH */}

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      handleSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search users..."
                    className="w-full rounded-lg border border-(--border) bg-(--input) px-3 py-2 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
                  />

                  {/* SEARCH RESULTS */}

                  {loading && (
                    <p className="text-xs text-(--text-secondary)">
                      Searching...
                    </p>
                  )}

                  {users.length > 0 && (
                    <div className="max-h-40 space-y-1 overflow-y-auto">

                      {users.map(
                        (user) => {

                          const selected =
                            selectedUsers.some(
                              (item) =>
                                Number(
                                  item.id
                                ) ===
                                Number(
                                  user.id
                                )
                            );

                          return (
                            <button
                              type="button"
                              key={
                                user.id
                              }
                              onClick={() =>
                                toggleUser(
                                  user
                                )
                              }
                              className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition ${
                                selected
                                  ? "bg-(--primary)/20"
                                  : "hover:bg-(--card-hover)"
                              }`}
                            >

                              {user.profileImage ? (
                                <img
                                  src={getImageUrl(
                                    user.profileImage
                                  )}
                                  alt=""
                                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--primary) text-xs font-bold">
                                  {getInitial(
                                    user
                                  )}
                                </div>
                              )}

                              <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-semibold">
                                  {user.fullName ||
                                    user.username}
                                </p>

                                <p className="truncate text-xs text-(--text-muted)">
                                  @
                                  {user.username}
                                </p>

                              </div>

                              {selected && (
                                <span className="text-sm text-(--success)">
                                  ✓
                                </span>
                              )}

                            </button>
                          );
                        }
                      )}

                    </div>
                  )}

                  {/* BUTTONS */}

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={
                        handleAddMembers
                      }
                      disabled={
                        loading ||
                        !selectedUsers.length
                      }
                      className="flex-1 rounded-lg bg-(--primary) px-3 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading
                        ? "Adding..."
                        : "Add Selected"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddMembers(
                          false
                        );
                        setSearch("");
                        setUsers([]);
                        setSelectedUsers(
                          []
                        );
                      }}
                      className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              )}

            </div>
          )}

          {/* =============================================
              MEMBERS LIST
          ============================================== */}

          <div className="p-3">

            <div className="mb-2 px-1">

              <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
                Members
              </p>

            </div>

            <div className="space-y-1">

              {group?.members?.length ? (

                group.members.map(
                  (member) => {

                    const user =
                      member.user;

                    const isCurrentUser =
                      Number(
                        member.userId
                      ) ===
                      Number(
                        currentUserId
                      );

                    return (
                      <div
                        key={
                          member.id
                        }
                        className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-(--card-hover)"
                      >

                        {/* PROFILE IMAGE */}

                        {user?.profileImage ? (

                          <img
                            src={getImageUrl(
                              user.profileImage
                            )}
                            alt={
                              user.fullName ||
                              user.username ||
                              "User"
                            }
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />

                        ) : (

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
                            {getInitial(
                              user
                            )}
                          </div>

                        )}

                        {/* USER INFO */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center gap-2">

                            <p className="truncate text-sm font-semibold text-(--text-primary)">
                              {user?.fullName ||
                                user?.username ||
                                "Unknown User"}
                            </p>

                            {isCurrentUser && (
                              <span className="shrink-0 rounded-full bg-(--primary)/15 px-2 py-0.5 text-[10px] font-semibold text-(--primary)">
                                You
                              </span>
                            )}

                          </div>

                          <p className="truncate text-xs text-(--text-muted)">
                            @
                            {user?.username ||
                              "user"}
                          </p>

                        </div>

                        {/* ROLE */}

                        <div className="flex shrink-0 items-center gap-2">

                          {member.role ===
                            "admin" && (
                            <span className="rounded-full bg-(--primary)/15 px-2 py-1 text-[10px] font-semibold text-(--primary)">
                              Admin
                            </span>
                          )}

                          {/* REMOVE */}

                          {isAdmin &&
                            !isCurrentUser &&
                            member.role !==
                              "admin" && (

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemove(
                                    member.userId
                                  )
                                }
                                disabled={
                                  loading
                                }
                                className="rounded-lg px-2 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                              >
                                Remove
                              </button>

                            )}

                        </div>

                      </div>
                    );
                  }
                )

              ) : (

                <p className="py-5 text-center text-sm text-(--text-secondary)">
                  No members found.
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default GroupMembersPanel;