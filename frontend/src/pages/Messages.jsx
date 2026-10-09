// import {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import {
//   Paperclip,
//   FileText,
//   X,
//   Send,
// } from "lucide-react";

// import { io } from "socket.io-client";
// import { useLocation } from "react-router-dom";

// import {
//   getMyConversations,
//   getOrCreateConversation,
//   getConversationMessages,
//   sendMessage,
//   uploadMessageAttachment
// } from "../services/messageService.js";

// import {
//   getMyGroups,
//   getGroupMessages,
//   sendGroupMessage,
//   getGroupDetails,
// } from "../services/groupService.js";

// import CreateGroupModal from "../components/chat/CreateGroupModal.jsx";
// import GroupMembersPanel from "../components/chat/GroupMembersPanel.jsx";

// import { useSocket } from "../context/SocketContext.jsx";
// // const SOCKET_URL = "http://localhost:5000";

// const Messages = () => {
//   // =========================================================
//   // STATE
//   // =========================================================
//    const location = useLocation();

//   const targetUserId = location.state?.userId;

// const socket = useSocket();
//   const [chatType, setChatType] =
//     useState("direct");

//   const [conversations, setConversations] =
//     useState([]);

//   const [groups, setGroups] =
//     useState([]);

//   const [selectedConversation, setSelectedConversation] =
//     useState(null);

//   const [selectedGroup, setSelectedGroup] =
//     useState(null);

//     const [mobileChatOpen, setMobileChatOpen] =
//   useState(false);

//   const [messages, setMessages] =
//     useState([]);

//   const [messageText, setMessageText] =
//     useState("");

//     const [selectedFile, setSelectedFile] =
//   useState(null);

// const [filePreview, setFilePreview] =
//   useState(null);

// const [uploadingFile, setUploadingFile] =
//   useState(false);

// const fileInputRef = useRef(null);

//   const [loadingList, setLoadingList] =
//     useState(true);

//   const [loadingMessages, setLoadingMessages] =
//     useState(false);

//   const [sending, setSending] =
//     useState(false);

//   const [error, setError] =
//     useState("");
//     const [onlineUsers, setOnlineUsers] =
//   useState([]);

//   const [isCreateGroupOpen, setIsCreateGroupOpen] =
//     useState(false);

//   const socketRef =
//     useRef(null);

//   const messagesEndRef =
//     useRef(null);

//   useEffect(() => {
//   if (!socket) {
//     return;
//   }

//   // Ask server who is currently online
//   socket.emit("get_online_users");

//   const handleOnlineUsers = (users) => {
//     setOnlineUsers(users);
//   };

//   const handleUserOnline = ({ userId }) => {
//     setOnlineUsers((current) => {
//       if (current.includes(userId)) {
//         return current;
//       }

//       return [
//         ...current,
//         userId,
//       ];
//     });
//   };

//   const handleUserOffline = ({ userId }) => {
//     setOnlineUsers((current) =>
//       current.filter(
//         (id) => id !== userId
//       )
//     );
//   };

//   socket.on(
//     "online_users",
//     handleOnlineUsers
//   );

//   socket.on(
//     "user_online",
//     handleUserOnline
//   );

//   socket.on(
//     "user_offline",
//     handleUserOffline
//   );

//   return () => {
//     socket.off(
//       "online_users",
//       handleOnlineUsers
//     );

//     socket.off(
//       "user_online",
//       handleUserOnline
//     );

//     socket.off(
//       "user_offline",
//       handleUserOffline
//     );
//   };
// }, [socket]);

//   // =========================================================
//   // AUTH / CURRENT USER
//   // =========================================================

//   const token =
//     localStorage.getItem("token") ||
//     sessionStorage.getItem("token");

//   const currentUser = useMemo(() => {
//     try {
//       const stored =
//         localStorage.getItem("user") ||
//         sessionStorage.getItem("user");

//       return stored
//         ? JSON.parse(stored)
//         : null;
//     } catch {
//       return null;
//     }
//   }, []);

//   const currentUserId =
//     Number(currentUser?.id);

//   // =========================================================
//   // HELPER - GET CHAT USER
//   // =========================================================

//   const getChatUser = (conversation) => {
//     if (!conversation) {
//       return null;
//     }

//     // Preferred
//     if (conversation.otherUser) {
//       return conversation.otherUser;
//     }

//     // Fallback
//     if (
//       Number(conversation.userOneId) ===
//       currentUserId
//     ) {
//       return conversation.userTwo || null;
//     }

//     return conversation.userOne || null;
//   };

//   // =========================================================
//   // HELPER - PROFILE IMAGE URL
//   // =========================================================

//   const getProfileImageUrl = (
//     profileImage
//   ) => {
//     if (!profileImage) {
//       return "";
//     }

//     if (
//       profileImage.startsWith("http://") ||
//       profileImage.startsWith("https://")
//     ) {
//       return profileImage;
//     }

//     // return `http://localhost:5000${profileImage}`;
//     return `${import.meta.env.VITE_API_URL}${profileImage}`;
//   };

//   // =========================================================
//   // HELPER - INITIAL
//   // =========================================================

//   const getUserInitial = (user) => {
//     return (
//       user?.fullName ||
//       user?.username ||
//       "?"
//     )
//       .charAt(0)
//       .toUpperCase();
//   };

//   // =========================================================
//   // SOCKET CONNECTION
//   // =========================================================

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     // const socket = io(
//     //   SOCKET_URL,
//     //   {
//     //     auth: {
//     //       token,
//     //     },
//     //   }
//     // );

//     const socket = io(
//   import.meta.env.VITE_API_URL,
//   {
//     auth: {
//       token,
//     },
//     withCredentials: true,
//   }
// );

//     socketRef.current = socket;

//     // -------------------------------------------------------
//     // CONNECT
//     // -------------------------------------------------------

//     socket.on("connect", () => {
//       console.log(
//         "Socket connected:",
//         socket.id
//       );
//     });

//     // -------------------------------------------------------
//     // CONNECT ERROR
//     // -------------------------------------------------------

//     socket.on(
//       "connect_error",
//       (socketError) => {
//         console.error(
//           "Socket connection error:",
//           socketError.message
//         );
//       }
//     );

//     // -------------------------------------------------------
//     // SOCKET ERROR
//     // -------------------------------------------------------

//     socket.on(
//       "socket_error",
//       (data) => {
//         console.error(
//           "Socket error:",
//           data?.message
//         );

//         setError(
//           data?.message ||
//             "Socket error"
//         );
//       }
//     );

//     // -------------------------------------------------------
//     // NEW DIRECT MESSAGE
//     // -------------------------------------------------------

//     socket.on(
//       "new_message",
//       (message) => {
//         setMessages((current) => {
//           // We don't know selected chat inside
//           // this effect because of stale closure.
//           // The message list is safely updated
//           // only when conversation matches.
//           if (
//             !message ||
//             !message.conversationId
//           ) {
//             return current;
//           }

//           const alreadyExists =
//             current.some(
//               (item) =>
//                 Number(item.id) ===
//                 Number(message.id)
//             );

//           if (alreadyExists) {
//             return current;
//           }

//           return [
//             ...current,
//             message,
//           ];
//         });

//         loadConversations();
//       }
//     );

//     // -------------------------------------------------------
//     // NEW GROUP MESSAGE
//     // -------------------------------------------------------

//     socket.on(
//       "new_group_message",
//       (message) => {
//         setMessages((current) => {
//           if (
//             !message ||
//             !message.groupId
//           ) {
//             return current;
//           }

//           const alreadyExists =
//             current.some(
//               (item) =>
//                 Number(item.id) ===
//                 Number(message.id)
//             );

//           if (alreadyExists) {
//             return current;
//           }

//           return [
//             ...current,
//             message,
//           ];
//         });

//         loadGroups();
//       }
//     );

//     // -------------------------------------------------------
//     // CONVERSATION JOINED
//     // -------------------------------------------------------

//     socket.on(
//       "conversation_joined",
//       (data) => {
//         console.log(
//           "Joined conversation:",
//           data.conversationId
//         );
//       }
//     );

//     // -------------------------------------------------------
//     // GROUP JOINED
//     // -------------------------------------------------------

//     socket.on(
//       "group_joined",
//       (data) => {
//         console.log(
//           "Joined group:",
//           data.groupId
//         );
//       }
//     );

//     // -------------------------------------------------------
//     // CLEANUP
//     // -------------------------------------------------------

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [token]);

//   // =========================================================
//   // SCROLL TO BOTTOM
//   // =========================================================

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // =========================================================
//   // LOAD DIRECT CONVERSATIONS
//   // =========================================================

//   const loadConversations =
//     async () => {
//       try {
//         const response =
//           await getMyConversations();

//         setConversations(
//           response.data?.conversations ||
//             response.conversations ||
//             []
//         );
//       } catch (error) {
//         console.error(
//           "Load conversations error:",
//           error
//         );

//         setError(
//           error.message ||
//             "Failed to load conversations"
//         );
//       }
//     };

//   // =========================================================
//   // LOAD GROUPS
//   // =========================================================

//   const loadGroups =
//     async () => {
//       try {
//         const response =
//           await getMyGroups();

//         setGroups(
//           response.data?.groups ||
//             response.groups ||
//             []
//         );
//       } catch (error) {
//         console.error(
//           "Load groups error:",
//           error
//         );

//         setError(
//           error.message ||
//             "Failed to load groups"
//         );
//       }
//     };

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     const loadData =
//       async () => {
//         try {
//           setLoadingList(true);
//           setError("");

//           await Promise.all([
//             loadConversations(),
//             loadGroups(),
//           ]);
//         } finally {
//           setLoadingList(false);
//         }
//       };

//     loadData();
//   }, []);

  

//   // =========================================================
//   // OPEN DIRECT CHAT
//   // =========================================================

//   // const openConversation =
//   //   async (conversation) => {
//   //     try {
//   //       setChatType("direct");

//   //       setSelectedGroup(null);

//   //       setSelectedConversation(
//   //         conversation
//   //       );

//   //       setMessages([]);

//   //       setLoadingMessages(true);

//   //       setError("");

//   //       const response =
//   //         await getConversationMessages(
//   //           conversation.id
//   //         );

//   //       const oldMessages =
//   //         response.data?.messages ||
//   //         response.messages ||
//   //         [];

//   //       setMessages(
//   //         oldMessages
//   //       );

//   //       // Join socket room
//   //       if (socketRef.current) {
//   //         socketRef.current.emit(
//   //           "join_conversation",
//   //           {
//   //             conversationId:
//   //               conversation.id,
//   //           }
//   //         );
//   //       }
//   //     } catch (error) {
//   //       console.error(
//   //         "Open conversation error:",
//   //         error
//   //       );

//   //       setError(
//   //         error.message ||
//   //           "Failed to open conversation"
//   //       );
//   //     } finally {
//   //       setLoadingMessages(false);
//   //     }
//   //   };



//   const openConversation = async (conversation) => {
//   try {
//     setChatType("direct");

//     setSelectedGroup(null);

//     setSelectedConversation(conversation);

//     // Mobile par chat screen show karo
//     setMobileChatOpen(true);

//     setMessages([]);

//     setLoadingMessages(true);

//     setError("");

//     const response =
//       await getConversationMessages(conversation.id);

//     const oldMessages =
//       response.data?.messages ||
//       response.messages ||
//       [];

//     setMessages(oldMessages);

//     if (socketRef.current?.connected) {
//       socketRef.current.emit(
//         "join_conversation",
//         {
//           conversationId: conversation.id,
//         }
//       );
//     }
//   } catch (error) {
//     console.error(
//       "Open conversation error:",
//       error
//     );

//     setError(
//       error.message ||
//         "Failed to open conversation"
//     );
//   } finally {
//     setLoadingMessages(false);
//   }
// };

//   // =========================================================
//   // OPEN GROUP CHAT
//   // =========================================================

//   // const openGroup =
//   //   async (group) => {
//   //     try {
//   //       setChatType("group");

//   //       setSelectedConversation(
//   //         null
//   //       );

//   //       setMessages([]);

//   //       setLoadingMessages(true);

//   //       setError("");

//   //       // Get complete group details
//   //       const groupResponse =
//   //         await getGroupDetails(
//   //           group.id
//   //         );

//   //       const completeGroup =
//   //         groupResponse.data?.group;

//   //       if (!completeGroup) {
//   //         throw new Error(
//   //           "Group details not found"
//   //         );
//   //       }

//   //       setSelectedGroup(
//   //         completeGroup
//   //       );

//   //       // Load messages
//   //       const messageResponse =
//   //         await getGroupMessages(
//   //           group.id
//   //         );

//   //       const oldMessages =
//   //         messageResponse.data
//   //           ?.messages ||
//   //         messageResponse.messages ||
//   //         [];

//   //       setMessages(
//   //         oldMessages
//   //       );

//   //       // Join socket room
//   //       if (socketRef.current) {
//   //         socketRef.current.emit(
//   //           "join_group",
//   //           {
//   //             groupId:
//   //               group.id,
//   //           }
//   //         );
//   //       }
//   //     } catch (error) {
//   //       console.error(
//   //         "Open group error:",
//   //         error
//   //       );

//   //       setError(
//   //         error.message ||
//   //           "Failed to open group"
//   //       );
//   //     } finally {
//   //       setLoadingMessages(false);
//   //     }
//   //   };



// const openGroup = async (group) => {
//   try {
//     setChatType("group");

//     setSelectedConversation(null);

//     setMessages([]);

//     setLoadingMessages(true);

//     setError("");

//     // Mobile chat screen open
//     setMobileChatOpen(true);

//     const groupResponse =
//       await getGroupDetails(group.id);

//     const completeGroup =
//       groupResponse.data?.group;

//     if (!completeGroup) {
//       throw new Error(
//         "Group details not found"
//       );
//     }

//     setSelectedGroup(completeGroup);

//     const messageResponse =
//       await getGroupMessages(group.id);

//     const oldMessages =
//       messageResponse.data?.messages ||
//       messageResponse.messages ||
//       [];

//     setMessages(oldMessages);

//     if (socketRef.current?.connected) {
//       socketRef.current.emit(
//         "join_group",
//         {
//           groupId: group.id,
//         }
//       );
//     }
//   } catch (error) {
//     console.error(
//       "Open group error:",
//       error
//     );

//     setError(
//       error.message ||
//         "Failed to open group"
//     );
//   } finally {
//     setLoadingMessages(false);
//   }
// };



//   // =========================================================
//   // START DIRECT CHAT FROM USER
//   // =========================================================

//   const startDirectChat =
//     async (userId) => {
//       try {
//         const response =
//           await getOrCreateConversation(
//             userId
//           );

//         const conversation =
//           response.data
//             ?.conversation ||
//           response.conversation;

//         await loadConversations();

//         await openConversation(
//           conversation
//         );
//       } catch (error) {
//         console.error(
//           "Start chat error:",
//           error
//         );

//         setError(
//           error.message ||
//             "Could not start conversation"
//         );
//       }
//     };

//     const handledNavigationRef = useRef(null);

// useEffect(() => {
//   if (!targetUserId) return;

//   // Same navigation ko baar-baar process mat karo
//   if (handledNavigationRef.current === location.key) {
//     return;
//   }

//   handledNavigationRef.current = location.key;

//   startDirectChat(targetUserId);
// }, [targetUserId, location.key]);

//     // =========================================================
// // SELECT MESSAGE ATTACHMENT
// // =========================================================

// const handleFileSelect = (event) => {
//   const file = event.target.files?.[0];

//   if (!file) {
//     return;
//   }

//   // 5 MB limit
//   if (file.size > 5 * 1024 * 1024) {
//     setError("File size must be less than 5 MB");

//     event.target.value = "";

//     return;
//   }

//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     setError(
//       "Only JPG, PNG, WEBP and PDF files are allowed"
//     );

//     event.target.value = "";

//     return;
//   }

//   setError("");

//   setSelectedFile(file);

//   // Image preview
//   if (file.type.startsWith("image/")) {
//     const previewUrl =
//       URL.createObjectURL(file);

//     setFilePreview(previewUrl);
//   } else {
//     setFilePreview(null);
//   }
// };

// // =========================================================
// // REMOVE SELECTED ATTACHMENT
// // =========================================================

// const removeSelectedFile = () => {
//   if (filePreview) {
//     URL.revokeObjectURL(filePreview);
//   }

//   setSelectedFile(null);
//   setFilePreview(null);

//   if (fileInputRef.current) {
//     fileInputRef.current.value = "";
//   }
// };

//   // =========================================================
//   // SEND DIRECT MESSAGE
//   // =========================================================

//   // const handleSendDirectMessage =
//   //   async () => {
//   //     const content =
//   //       messageText.trim();

//   //     if (!content) {
//   //       return;
//   //     }

//   //     if (!selectedConversation) {
//   //       return;
//   //     }

//   //     try {
//   //       setSending(true);

//   //       setError("");

//   //       // Socket preferred
//   //       if (
//   //         socketRef.current?.connected
//   //       ) {
//   //         socketRef.current.emit(
//   //           "send_message",
//   //           {
//   //             conversationId:
//   //               selectedConversation.id,
//   //             content,
//   //           }
//   //         );
//   //       } else {
//   //         // REST fallback
//   //         const response =
//   //           await sendMessage(
//   //             selectedConversation.id,
//   //             content
//   //           );

//   //         const message =
//   //           response.data?.message ||
//   //           response.message;

//   //         if (message) {
//   //           setMessages(
//   //             (current) => [
//   //               ...current,
//   //               message,
//   //             ]
//   //           );
//   //         }
//   //       }

//   //       setMessageText("");
//   //     } catch (error) {
//   //       console.error(
//   //         "Send direct message error:",
//   //         error
//   //       );

//   //       setError(
//   //         error.message ||
//   //           "Message could not be sent"
//   //       );
//   //     } finally {
//   //       setSending(false);
//   //     }
//   //   };

//   // =========================================================
// // SEND DIRECT MESSAGE
// // =========================================================

// const handleSendDirectMessage = async () => {
//   const content = messageText.trim();

//   if (!content && !selectedFile) {
//     return;
//   }

//   if (!selectedConversation) {
//     return;
//   }

//   try {
//     setSending(true);
//     setError("");

//     let attachmentData = null;

//     // -------------------------------------------------------
//     // UPLOAD FILE FIRST
//     // -------------------------------------------------------

//     if (selectedFile) {
//       setUploadingFile(true);

//       const response =
//         await uploadMessageAttachment(
//           selectedFile
//         );

//       attachmentData = response.data;

//       setUploadingFile(false);
//     }

//     // -------------------------------------------------------
//     // SOCKET MESSAGE
//     // -------------------------------------------------------

//     if (socketRef.current?.connected) {
//       socketRef.current.emit(
//         "send_message",
//         {
//           conversationId:
//             selectedConversation.id,

//           content: content || null,

//           messageType:
//             attachmentData?.messageType ||
//             "text",

//           attachmentUrl:
//             attachmentData?.attachmentUrl ||
//             null,

//           attachmentName:
//             attachmentData?.attachmentName ||
//             null,

//           attachmentMimeType:
//             attachmentData?.attachmentMimeType ||
//             null,

//           attachmentSize:
//             attachmentData?.attachmentSize ||
//             null,
//         }
//       );
//     } else {
//       // -----------------------------------------------------
//       // REST FALLBACK
//       // -----------------------------------------------------

//       const response =
//         await sendMessage(
//           selectedConversation.id,
//           content,
//           {
//             messageType:
//               attachmentData?.messageType ||
//               "text",

//             attachmentUrl:
//               attachmentData?.attachmentUrl ||
//               null,

//             attachmentName:
//               attachmentData?.attachmentName ||
//               null,

//             attachmentMimeType:
//               attachmentData?.attachmentMimeType ||
//               null,

//             attachmentSize:
//               attachmentData?.attachmentSize ||
//               null,
//           }
//         );

//       const message =
//         response.data?.message ||
//         response.message;

//       if (message) {
//         setMessages((current) => [
//           ...current,
//           message,
//         ]);
//       }
//     }

//     // -------------------------------------------------------
//     // RESET
//     // -------------------------------------------------------

//     setMessageText("");

//     removeSelectedFile();

//   } catch (error) {
//     console.error(
//       "Send direct message error:",
//       error
//     );

//     setError(
//       error.message ||
//         "Message could not be sent"
//     );

//   } finally {
//     setSending(false);
//     setUploadingFile(false);
//   }
// };

//   // =========================================================
//   // SEND GROUP MESSAGE
//   // =========================================================

//   const handleSendGroupMessage =
//     async () => {
//       const content =
//         messageText.trim();

//       if (!content) {
//         return;
//       }

//       if (!selectedGroup) {
//         return;
//       }

//       try {
//         setSending(true);

//         setError("");

//         // Socket preferred
//         if (
//           socketRef.current?.connected
//         ) {
//           socketRef.current.emit(
//             "send_group_message",
//             {
//               groupId:
//                 selectedGroup.id,
//               content,
//             }
//           );
//         } else {
//           // REST fallback
//           const response =
//             await sendGroupMessage(
//               selectedGroup.id,
//               content
//             );

//           const message =
//             response.data?.message ||
//             response.message;

//           if (message) {
//             setMessages(
//               (current) => [
//                 ...current,
//                 message,
//               ]
//             );
//           }
//         }

//         setMessageText("");
//       } catch (error) {
//         console.error(
//           "Send group message error:",
//           error
//         );

//         setError(
//           error.message ||
//             "Group message could not be sent"
//         );
//       } finally {
//         setSending(false);
//       }
//     };

//   // =========================================================
//   // SEND MESSAGE
//   // =========================================================

//   const handleSendMessage =
//     async (event) => {
//       event.preventDefault();

//       if (chatType === "direct") {
//         await handleSendDirectMessage();
//         return;
//       }

//       await handleSendGroupMessage();
//     };

//   // =========================================================
//   // CREATE GROUP SUCCESS
//   // =========================================================

//   const handleGroupCreated =
//     async (group) => {
//       await loadGroups();

//       if (group) {
//         await openGroup(group);
//       }
//     };

//   // =========================================================
//   // ENTER KEY
//   // =========================================================

//   const handleKeyDown =
//     (event) => {
//       if (
//         event.key === "Enter" &&
//         !event.shiftKey
//       ) {
//         event.preventDefault();

//         handleSendMessage(event);
//       }
//     };

//   // =========================================================
//   // SELECTED CHAT USER
//   // =========================================================

//   const selectedChatUser =
//     getChatUser(
//       selectedConversation
//     );

//     // =========================================================
// // DIRECT CHAT ONLINE STATUS
// // =========================================================

// const isSelectedUserOnline =
//   chatType === "direct" &&
//   selectedChatUser &&
//   onlineUsers.includes(
//     Number(selectedChatUser.id)
//   );

//   // =========================================================
// // GROUP ONLINE MEMBERS
// // =========================================================

// // const onlineGroupMembers =
// //   chatType === "group" && selectedGroup?.members
// //     ? selectedGroup.members.filter((member) =>
// //         onlineUsers.includes(Number(member.id || member.userId))
// //       )
// //     : [];


// const onlineGroupMembers =
//   chatType === "group" && selectedGroup?.members
//     ? selectedGroup.members.filter((member) => {
//         const memberId = Number(
//           member.userId ?? member.id
//         );

//         return onlineUsers.some(
//           (onlineId) =>
//             Number(onlineId) === memberId
//         );
//       })
//     : [];

//     console.log("ONLINE USERS:", onlineUsers);

// console.log(
//   "GROUP MEMBERS:",
//   selectedGroup?.members
// );

// console.log(
//   "ONLINE GROUP MEMBERS:",
//   onlineGroupMembers
// );

//   // =========================================================
//   // CURRENT CHAT INFO
//   // =========================================================

//   const chatTitle =
//     chatType === "group"
//       ? selectedGroup?.name
//       : selectedChatUser?.fullName ||
//         selectedChatUser?.username ||
//         "Unknown User";

//   const chatSubtitle =
//     chatType === "group"
//       ? `${selectedGroup?.members?.length || selectedGroup?.memberCount || 0} members`
//       : selectedChatUser?.username
//         ? `@${selectedChatUser.username}`
//         : "";

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     // <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-(--background) text-white">
//     <div className="flex h-[calc(100dvh-64px)] overflow-hidden bg-(--background) text-white">

//       {/* =====================================================
//           LEFT SIDEBAR
//       ====================================================== */}

//       <aside className={`w-full max-w-sm flex-col border-r border-(--border) bg-(--background-secondary) md:flex ${mobileChatOpen ? "hidden" : "flex"}`}>

//         {/* HEADER */}

//         <div className="flex items-center justify-between border-b border-(--border) p-5">

//           <div>
//             <h1 className="text-xl font-bold">
//               Messages
//             </h1>

//             <p className="mt-1 text-xs text-(--text-secondary)">
//               Chat with people and groups
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() =>
//               setIsCreateGroupOpen(
//                 true
//               )
//             }
//             className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
//           >
//             + Group
//           </button>

//         </div>

//         {/* TABS */}

//         <div className="grid grid-cols-2 border-b border-(--border)">

//           <button
//             type="button"
//             onClick={() => {
//               setChatType("direct");
//               setSelectedGroup(null);
//               setMessages([]);
//             }}
//             className={`px-4 py-3 text-sm font-semibold transition ${
//               chatType === "direct"
//                 ? "border-b-2 border-(--primary) text-white"
//                 : "text-(--text-secondary) hover:text-white"
//             }`}
//           >
//             Direct
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               setChatType("group");
//               setSelectedConversation(
//                 null
//               );
//               setMessages([]);
//             }}
//             className={`px-4 py-3 text-sm font-semibold transition ${
//               chatType === "group"
//                 ? "border-b-2 border-(--primary) text-white"
//                 : "text-(--text-secondary) hover:text-white"
//             }`}
//           >
//             Groups
//           </button>

//         </div>

//         {/* LIST */}

//         <div className="flex-1 overflow-y-auto">

//           {loadingList ? (
//             <div className="p-5 text-sm text-(--text-secondary)">
//               Loading...
//             </div>
//           ) : chatType === "direct" ? (
//             <>
//               {conversations.length === 0 ? (
//                 <div className="p-5 text-center">
//                   <p className="text-sm text-(--text-secondary)">
//                     No conversations yet.
//                   </p>
//                 </div>
//               ) : (
//                 conversations.map(
//                   (conversation) => {
//                     const user =
//                       getChatUser(
//                         conversation
//                       );

//                     const active =
//                       Number(
//                         selectedConversation?.id
//                       ) ===
//                       Number(
//                         conversation.id
//                       );

//                     return (
//                       <button
//                         key={
//                           conversation.id
//                         }
//                         type="button"
//                         onClick={() =>
//                           openConversation(
//                             conversation
//                           )
//                         }
//                         className={`flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition ${
//                           active
//                             ? "bg-(--card)"
//                             : "hover:bg-(--card-hover)"
//                         }`}
//                       >

//                         {/* USER IMAGE */}

//                         {user?.profileImage ? (
//                           <img
//                             src={getProfileImageUrl(
//                               user.profileImage
//                             )}
//                             alt={
//                               user.fullName ||
//                               user.username ||
//                               "User"
//                             }
//                             className="h-11 w-11 shrink-0 rounded-full object-cover"
//                             onError={(
//                               event
//                             ) => {
//                               event.currentTarget.style.display =
//                                 "none";
//                             }}
//                           />
//                         ) : (
//                           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--primary) font-bold">
//                             {getUserInitial(
//                               user
//                             )}
//                           </div>
//                         )}

//                         {/* USER INFO */}

//                         <div className="min-w-0 flex-1">

//                           <p className="truncate text-sm font-semibold">
//                             {user?.fullName ||
//                               user?.username ||
//                               "Unknown User"}
//                           </p>

//                           <p className="truncate text-xs text-(--text-secondary)">
//                             {conversation
//                               .lastMessage
//                               ?.content ||
//                               `@${
//                                 user?.username ||
//                                 ""
//                               }`}
//                           </p>

//                         </div>

//                       </button>
//                     );
//                   }
//                 )
//               )}
//             </>
//           ) : (
//             <>
//               {groups.length === 0 ? (
//                 <div className="p-5 text-center">

//                   <p className="text-sm text-(--text-secondary)">
//                     No groups yet.
//                   </p>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setIsCreateGroupOpen(
//                         true
//                       )
//                     }
//                     className="mt-3 text-sm font-semibold text-purple-400 hover:text-purple-300"
//                   >
//                     Create your first group
//                   </button>

//                 </div>
//               ) : (
//                 groups.map(
//                   (group) => {
//                     const active =
//                       Number(
//                         selectedGroup?.id
//                       ) ===
//                       Number(group.id);

//                     return (
//                       <button
//                         key={group.id}
//                         type="button"
//                         onClick={() =>
//                           openGroup(group)
//                         }
//                         className={`flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition ${
//                           active
//                             ? "bg-(--card)"
//                             : "hover:bg-(--card-hover)"
//                         }`}
//                       >

//                         {/* GROUP IMAGE */}

//                         {group.groupImage ? (
//                           <img
//                             src={getProfileImageUrl(
//                               group.groupImage
//                             )}
//                             alt={
//                               group.name
//                             }
//                             className="h-11 w-11 shrink-0 rounded-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-(--primary) to-(--accent) font-bold">
//                             {group.name
//                               ?.slice(
//                                 0,
//                                 1
//                               )
//                               .toUpperCase()}
//                           </div>
//                         )}

//                         <div className="min-w-0 flex-1">

//                           <p className="truncate text-sm font-semibold">
//                             {group.name}
//                           </p>

//                           <p className="truncate text-xs text-(--text-secondary)">
//                             {group.lastMessage
//                               ?.sender
//                               ?.username
//                               ? `@${group.lastMessage.sender.username}: `
//                               : ""}

//                             {group.lastMessage
//                               ?.content ||
//                               `${group.memberCount} members`}
//                           </p>

//                         </div>

//                       </button>
//                     );
//                   }
//                 )
//               )}
//             </>
//           )}

//         </div>

//       </aside>

//       {/* =====================================================
//           CHAT AREA
//       ====================================================== */}

//       <main className={`min-w-0 flex-1 flex-col md:flex  ${mobileChatOpen ? "flex" : "hidden"}`}>

//         {!selectedConversation &&
//         !selectedGroup ? (

//           <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">

//             <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--primary)/10 text-4xl">
//               💬
//             </div>

//             <h2 className="text-xl font-bold">
//               Your Messages
//             </h2>

//             <p className="mt-2 max-w-sm text-sm text-(--text-secondary)">
//               Select a conversation or group
//               to start chatting.
//             </p>

//           </div>

//         ) : (

//           <>

//             {/* =================================================
//                 CHAT HEADER
//             ================================================== */}

//             <header className="flex items-center sm:gap-3 gap-2 border-b border-(--border) bg-(--background-secondary) p-3 sm:p-4">

// <button
//   type="button"
//   onClick={() => {
//     setMobileChatOpen(false);
//   }}
//   className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white md:hidden"
//   aria-label="Back to chats"
// >
//   ←
// </button>

//               {chatType === "group" ? (

//                 /* GROUP HEADER */

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-(--primary) to-(--accent) font-bold">

//                   {selectedGroup?.groupImage ? (
//                     <img
//                       src={getProfileImageUrl(
//                         selectedGroup.groupImage
//                       )}
//                       alt={
//                         selectedGroup.name
//                       }
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     selectedGroup?.name
//                       ?.slice(
//                         0,
//                         1
//                       )
//                       .toUpperCase()
//                   )}

//                 </div>

//               ) : (

//                 /* DIRECT USER HEADER */

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--primary)">

//                   {selectedChatUser?.profileImage ? (

//                     <img
//                       src={getProfileImageUrl(
//                         selectedChatUser.profileImage
//                       )}
//                       alt={
//                         selectedChatUser.fullName ||
//                         selectedChatUser.username ||
//                         "User"
//                       }
//                       className="h-full w-full object-cover"
//                       onError={(
//                         event
//                       ) => {
//                         event.currentTarget.style.display =
//                           "none";
//                       }}
//                     />

//                   ) : (

//                     <span className="font-bold text-white">
//                       {getUserInitial(
//                         selectedChatUser
//                       )}
//                     </span>

//                   )}

//                 </div>

//               )}

//               {/* <div className="min-w-0">

//                 <h2 className="truncate text-sm font-bold">
//                   {chatTitle}
//                 </h2>

//                 <p className="truncate text-xs text-(--text-secondary)">
//                   {chatSubtitle}
//                 </p>

//               </div> */}

//               <div className="min-w-0">

//   <h2 className="truncate text-sm font-bold">
//     {chatTitle}
//   </h2>
// {/* 
//   {chatType === "direct" ? (
//     <div className="flex items-center gap-1.5">

//       <span
//         className={`h-2 w-2 rounded-full ${
//           isSelectedUserOnline
//             ? "bg-green-500"
//             : "bg-gray-500"
//         }`}
//       />

//       <span className="text-xs text-(--text-secondary)">
//         {isSelectedUserOnline
//           ? "Online"
//           : "Offline"}
//       </span>

//     </div>
//   ) : (
//     <p className="truncate text-xs text-(--text-secondary)">
//       {chatSubtitle}
//     </p>
//   )} */}

//   {chatType === "direct" ? (
//   <div className="flex items-center gap-1.5">
//     <span
//       className={`h-2 w-2 rounded-full ${
//         isSelectedUserOnline
//           ? "bg-green-500"
//           : "bg-gray-500"
//       }`}
//     />

//     <span className="text-xs text-(--text-secondary)">
//       {isSelectedUserOnline
//         ? "Online"
//         : "Offline"}
//     </span>
//   </div>
// ) : (
//   <div className="flex items-center gap-1.5">
//     <span className="h-2 w-2 rounded-full bg-green-500" />

//     <span className="text-xs text-(--text-secondary)">
//       {onlineGroupMembers.length} online
//     </span>

//     <span className="text-xs text-(--text-muted)">
//       • {selectedGroup?.members?.length || 0} members
//     </span>
//   </div>
// )}

// </div>

//             </header>

//             {/* =================================================
//                 ERROR
//             ================================================== */}

//             {error && (
//               <div className="border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
//                 {error}
//               </div>
//             )}

//             {/* =================================================
//                 MESSAGES
//             ================================================== */}

//             {/* <div className="flex-1 overflow-y-auto p-5"> */}
//             <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">

//               {loadingMessages ? (

//                 <div className="flex h-full items-center justify-center text-sm text-(--text-secondary)">
//                   Loading messages...
//                 </div>

//               ) : messages.length === 0 ? (

//                 <div className="flex h-full items-center justify-center text-center">

//                   <div>

//                     <p className="text-sm text-(--text-secondary)">
//                       No messages yet.
//                     </p>

//                     <p className="mt-1 text-xs text-(--text-muted)">
//                       Send the first message.
//                     </p>

//                   </div>

//                 </div>

//               ) : (

//                 <div className="space-y-3">

//                   {messages.map(
//                     (message) => {

//                       const isMine =
//                         Number(
//                           message.senderId
//                         ) ===
//                         currentUserId;

//                       return (

//                         <div
//                           key={
//                             message.id
//                           }
//                           className={`flex ${
//                             isMine
//                               ? "justify-end"
//                               : "justify-start"
//                           }`}
//                         >

//                           <div
//                             className={` max-w-[85%] sm:max-w-[75%] ${
//                               isMine
//                                 ? "items-end"
//                                 : "items-start"
//                             } flex flex-col`}
//                           >

//                             {/* GROUP SENDER */}

//                             {chatType ===
//                               "group" &&
//                               !isMine && (

//                                 <span className="mb-1 px-2 text-xs font-semibold text-purple-400">
//                                   {message
//                                     .sender
//                                     ?.fullName ||
//                                     message
//                                       .sender
//                                       ?.username}
//                                 </span>

//                               )}

//                             {/* MESSAGE */}

//                             {/* <div
//                               className={`rounded-2xl px-4 py-2.5 text-sm ${
//                                 isMine
//                                   ? "rounded-br-md bg-(--primary) text-white"
//                                   : "rounded-bl-md bg-(--card) text-(--text-primary)"
//                               }`}
//                             >
//                               {message.content}
//                             </div> */}

//                             <div
//   className={`rounded-2xl px-3 py-3 ${
//     isMine
//       ? "rounded-br-md bg-(--primary) text-white"
//       : "rounded-bl-md bg-(--card) text-(--text-primary)"
//   }`}
// >
//   {/* IMAGE */}
//   {message.messageType === "image" &&
//     message.attachmentUrl && (
//       <img
//         // src={`http://localhost:5000${message.attachmentUrl}`}
//         src={`${import.meta.env.VITE_API_URL}${message.attachmentUrl}`}
//         alt={
//           message.attachmentName ||
//           "Attached image"
//         }
//         className="max-h-72 max-w-xs rounded-xl object-cover"
//       />
//     )}

//   {/* PDF / FILE */}
//   {message.messageType === "file" &&
//     message.attachmentUrl && (
//       <a
//         // href={`http://localhost:5000${message.attachmentUrl}`}
//         href={`${import.meta.env.VITE_API_URL}${message.attachmentUrl}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         // className="flex min-w-60 items-center gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-3 transition hover:bg-(--card-hover)"
//         className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-3 transition hover:bg-(--card-hover)"
//       >
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary)/15">
//           <FileText
//             size={22}
//             className="text-(--primary)"
//           />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-sm font-medium text-white">
//             {message.attachmentName ||
//               "Attached file"}
//           </p>

//           <p className="mt-1 text-xs text-(--text-muted)">
//             PDF
//           </p>
//         </div>
//       </a>
//     )}

//   {/* TEXT */}
//   {message.content && (
//     <p
//       className={`${
//         message.messageType !== "text"
//           ? "mt-2"
//           : ""
//       } text-sm`}
//     >
//       {message.content}
//     </p>
//   )}
// </div>

//                             {/* TIME */}

//                             <span className="mt-1 px-2 text-[10px] text-(--text-muted)">
//                               {message.createdAt
//                                 ? new Date(
//                                     message.createdAt
//                                   ).toLocaleTimeString(
//                                     [],
//                                     {
//                                       hour: "2-digit",
//                                       minute: "2-digit",
//                                     }
//                                   )
//                                 : ""}
//                             </span>

//                           </div>

//                         </div>

//                       );
//                     }
//                   )}

//                   <div
//                     ref={
//                       messagesEndRef
//                     }
//                   />

//                 </div>

//               )}

//             </div>

//             {/* =================================================
//                 GROUP MEMBERS PANEL
//             ================================================== */}

//             {chatType === "group" &&
//               selectedGroup && (

//                 <GroupMembersPanel
//                   group={
//                     selectedGroup
//                   }
//                   currentUserId={
//                     currentUserId
//                   }
//                   onUpdated={(
//                     updatedGroup
//                   ) => {
//                     setSelectedGroup(
//                       updatedGroup
//                     );

//                     loadGroups();
//                   }}
//                 />

//               )}

//             {/* =================================================
//                 MESSAGE INPUT
//             ================================================== */}

//             {/* <form
//               onSubmit={
//                 handleSendMessage
//               }
//               className="border-t border-(--border) bg-(--background-secondary) p-4"
//             >

//               <div className="flex items-end gap-3">

//                 <textarea
//                   value={
//                     messageText
//                   }
//                   onChange={(
//                     event
//                   ) =>
//                     setMessageText(
//                       event.target.value
//                     )
//                   }
//                   onKeyDown={
//                     handleKeyDown
//                   }
//                   rows={1}
//                   maxLength={5000}
//                   placeholder={
//                     chatType ===
//                     "group"
//                       ? "Message the group..."
//                       : "Write a message..."
//                   }
//                   className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//                 />

//                 <button
//                   type="submit"
//                   disabled={
//                     sending ||
//                     !messageText.trim()
//                   }
//                   className="rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {sending
//                     ? "..."
//                     : "Send"}
//                 </button>

//               </div>

//             </form> */}

// <form
//   onSubmit={handleSendMessage}
//   className="border-t border-(--border) bg-(--background-secondary) sm:p-4 p-2"
// >
//   {/* =====================================================
//       SELECTED FILE PREVIEW
//   ====================================================== */}

//   {selectedFile && (
//     <div className="mb-3 rounded-xl border border-(--border) bg-(--card) p-3">
//       <div className="flex items-center gap-3">

//         {/* IMAGE PREVIEW */}

//         {filePreview ? (
//           <img
//             src={filePreview}
//             alt={selectedFile.name}
//             className="h-14 w-14 shrink-0 rounded-lg object-cover"
//           />
//         ) : (
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-(--background-secondary)">
//             <FileText
//               size={24}
//               className="text-(--text-secondary)"
//             />
//           </div>
//         )}

//         {/* FILE INFO */}

//         <div className="min-w-0 flex-1">
//           <p className="truncate text-sm font-medium text-white">
//             {selectedFile.name}
//           </p>

//           <p className="mt-1 text-xs text-(--text-muted)">
//             {(selectedFile.size / 1024).toFixed(1)} KB
//           </p>

//           {uploadingFile && (
//             <p className="mt-1 text-xs text-(--primary)">
//               Uploading...
//             </p>
//           )}
//         </div>

//         {/* REMOVE */}

//         <button
//           type="button"
//           onClick={removeSelectedFile}
//           disabled={uploadingFile}
//           className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--text-muted) transition hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
//         >
//           <X size={17} />
//         </button>
//       </div>
//     </div>
//   )}

//   {/* =====================================================
//       INPUT
//   ====================================================== */}

//   <div className="flex items-end gap-2 sm:gap-3">

//     {/* HIDDEN FILE INPUT */}

//     <input
//       ref={fileInputRef}
//       type="file"
//       accept="image/jpeg,image/png,image/webp,application/pdf"
//       onChange={handleFileSelect}
//       className="hidden"
//     />

//     {/* ATTACH BUTTON */}

//     <button
//       type="button"
//       onClick={() =>
//         fileInputRef.current?.click()
//       }
//       disabled={sending || uploadingFile}
//       title="Attach image or PDF"
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--border) bg-(--input) text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       <Paperclip size={20} />
//     </button>

//     {/* TEXT INPUT */}

//     <textarea
//       value={messageText}
//       onChange={(event) =>
//         setMessageText(
//           event.target.value
//         )
//       }
//       onKeyDown={handleKeyDown}
//       rows={1}
//       maxLength={5000}
//       placeholder={
//         chatType === "group"
//           ? "Message the group..."
//           : "Write a message..."
//       }
//       className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
//     />

//     {/* SEND */}

//     <button
//       type="submit"
//       disabled={
//         sending ||
//         uploadingFile ||
//         (
//           !messageText.trim() &&
//           !selectedFile
//         )
//       }
//       // className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary) text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:gap-2 sm:px-5"
//     >
//       {sending ? (
//         "..."
//       ) : (
//         <>
//           <Send size={17} />
//           <span className="hidden sm:inline" >

//           Send
//           </span>
//         </>
//       )}
//     </button>

//   </div>
// </form>

//           </>

//         )}

//       </main>

//       {/* =====================================================
//           CREATE GROUP MODAL
//       ====================================================== */}

//       <CreateGroupModal
//         isOpen={
//           isCreateGroupOpen
//         }
//         onClose={() =>
//           setIsCreateGroupOpen(
//             false
//           )
//         }
//         onCreated={
//           handleGroupCreated
//         }
//       />

//     </div>
//   );
// };

// export default Messages;






















import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Paperclip, FileText, X, Send } from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  getMyConversations,
  getOrCreateConversation,
  getConversationMessages,
  sendMessage,
  uploadMessageAttachment,
} from "../services/messageService.js";

import {
  getMyGroups,
  getGroupMessages,
  sendGroupMessage,
  getGroupDetails,
} from "../services/groupService.js";

import CreateGroupModal from "../components/chat/CreateGroupModal.jsx";
import GroupMembersPanel from "../components/chat/GroupMembersPanel.jsx";
import { useSocket } from "../context/SocketContext.jsx";

// =============================================================
// CONSTANTS & PURE HELPERS (outside component = created once)
// =============================================================

const API_URL = import.meta.env.VITE_API_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
};

const getUserInitial = (user) =>
  (user?.fullName || user?.username || "?").charAt(0).toUpperCase();

const getChatUser = (conversation, currentUserId) => {
  if (!conversation) return null;
  if (conversation.otherUser) return conversation.otherUser;

  if (Number(conversation.userOneId) === currentUserId) {
    return conversation.userTwo || null;
  }
  return conversation.userOne || null;
};

const previewText = (message) => {
  if (!message) return "";
  if (message.content) return message.content;
  if (message.messageType === "image") return "📷 Photo";
  if (message.messageType === "file") {
    return `📄 ${message.attachmentName || "File"}`;
  }
  return "";
};

const appendUnique = (list, message) =>
  list.some((m) => Number(m.id) === Number(message.id))
    ? list
    : [...list, message];

// history first, then any live messages received while loading
const mergeMessages = (history, live) => {
  if (!live.length) return history;
  const ids = new Set(history.map((m) => Number(m.id)));
  return [...history, ...live.filter((m) => !ids.has(Number(m.id)))];
};

const extractList = (response, key) =>
  response?.data?.[key] || response?.[key] || [];

// =============================================================
// SMALL MEMOIZED COMPONENTS
// =============================================================

const Avatar = memo(function Avatar({
  src,
  name,
  fallback,
  className = "h-11 w-11",
  fallbackClassName = "bg-(--primary)",
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (src && !failed) {
    return (
      <img
        src={assetUrl(src)}
        alt={name || "Avatar"}
        loading="lazy"
        className={`${className} shrink-0 rounded-full object-cover`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${className} ${fallbackClassName} flex shrink-0 items-center justify-center rounded-full font-bold`}
    >
      {fallback}
    </div>
  );
});

const ConversationItem = memo(function ConversationItem({
  conversation,
  currentUserId,
  active,
  onOpen,
}) {
  const user = getChatUser(conversation, currentUserId);

  return (
    <button
      type="button"
      onClick={() => onOpen(conversation)}
      className={`flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition ${
        active ? "bg-(--card)" : "hover:bg-(--card-hover)"
      }`}
    >
      <Avatar
        src={user?.profileImage}
        name={user?.fullName || user?.username}
        fallback={getUserInitial(user)}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {user?.fullName || user?.username || "Unknown User"}
        </p>
        <p className="truncate text-xs text-(--text-secondary)">
          {previewText(conversation.lastMessage) ||
            `@${user?.username || ""}`}
        </p>
      </div>
    </button>
  );
});

const GroupItem = memo(function GroupItem({ group, active, onOpen }) {
  const senderName = group.lastMessage?.sender?.username;

  return (
    <button
      type="button"
      onClick={() => onOpen(group)}
      className={`flex w-full items-center gap-3 border-b border-(--border) p-4 text-left transition ${
        active ? "bg-(--card)" : "hover:bg-(--card-hover)"
      }`}
    >
      <Avatar
        src={group.groupImage}
        name={group.name}
        fallback={group.name?.slice(0, 1).toUpperCase()}
        fallbackClassName="bg-gradient-to-br from-(--primary) to-(--accent)"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{group.name}</p>
        <p className="truncate text-xs text-(--text-secondary)">
          {senderName ? `@${senderName}: ` : ""}
          {previewText(group.lastMessage) ||
            `${group.memberCount ?? 0} members`}
        </p>
      </div>
    </button>
  );
});

const MessageBubble = memo(function MessageBubble({
  message,
  isMine,
  showSender,
}) {
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] flex-col sm:max-w-[75%] ${
          isMine ? "items-end" : "items-start"
        }`}
      >
        {showSender && (
          <span className="mb-1 px-2 text-xs font-semibold text-purple-400">
            {message.sender?.fullName || message.sender?.username}
          </span>
        )}

        <div
          className={`rounded-2xl px-3 py-3 ${
            isMine
              ? "rounded-br-md bg-(--primary) text-white"
              : "rounded-bl-md bg-(--card) text-(--text-primary)"
          }`}
        >
          {message.messageType === "image" && message.attachmentUrl && (
            <img
              src={assetUrl(message.attachmentUrl)}
              alt={message.attachmentName || "Attached image"}
              loading="lazy"
              className="max-h-72 max-w-xs rounded-xl object-cover"
            />
          )}

          {message.messageType === "file" && message.attachmentUrl && (
            <a
              href={assetUrl(message.attachmentUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-3 transition hover:bg-(--card-hover)"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary)/15">
                <FileText size={22} className="text-(--primary)" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {message.attachmentName || "Attached file"}
                </p>
                <p className="mt-1 text-xs text-(--text-muted)">PDF</p>
              </div>
            </a>
          )}

          {message.content && (
            <p
              className={`${
                message.messageType && message.messageType !== "text"
                  ? "mt-2"
                  : ""
              } whitespace-pre-wrap break-words text-sm`}
            >
              {message.content}
            </p>
          )}
        </div>

        <span className="mt-1 px-2 text-[10px] text-(--text-muted)">
          {time}
        </span>
      </div>
    </div>
  );
});

// Re-renders only when messages change, NOT on every keystroke
const MessageList = memo(function MessageList({
  messages,
  currentUserId,
  isGroup,
  endRef,
}) {
  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const isMine = Number(message.senderId) === currentUserId;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isMine={isMine}
            showSender={isGroup && !isMine}
          />
        );
      })}
      <div ref={endRef} />
    </div>
  );
});

// =============================================================
// PAGE
// =============================================================

const Messages = () => {
  const location = useLocation();
  const targetUserId = location.state?.userId;
  const socket = useSocket();

  const [chatType, setChatType] = useState("direct");
  const [conversations, setConversations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const fileInputRef = useRef(null);
  const filePreviewRef = useRef(null);
  const messagesEndRef = useRef(null);
  const prevLengthRef = useRef(0);
  const loadSeqRef = useRef(0); // guards against out-of-order responses
  const handledNavigationRef = useRef(null);

  // Refs so socket handlers always see fresh values (no stale closures)
  const activeRef = useRef({
    chatType: "direct",
    conversationId: null,
    groupId: null,
  });
  const conversationsRef = useRef([]);
  const groupsRef = useRef([]);

  // =========================================================
  // AUTH / CURRENT USER
  // =========================================================

  const currentUser = useMemo(() => {
    try {
      const stored =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const currentUserId = Number(currentUser?.id);

  // keep refs in sync
  useEffect(() => {
    activeRef.current = {
      chatType,
      conversationId: selectedConversation?.id ?? null,
      groupId: selectedGroup?.id ?? null,
    };
  }, [chatType, selectedConversation, selectedGroup]);

  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);

  useEffect(() => {
    groupsRef.current = groups;
  }, [groups]);

  // =========================================================
  // LOADERS
  // =========================================================

  const loadConversations = useCallback(async () => {
    try {
      const response = await getMyConversations();
      setConversations(extractList(response, "conversations"));
    } catch (err) {
      console.error("Load conversations error:", err);
      setError(err.message || "Failed to load conversations");
    }
  }, []);

  const loadGroups = useCallback(async () => {
    try {
      const response = await getMyGroups();
      setGroups(extractList(response, "groups"));
    } catch (err) {
      console.error("Load groups error:", err);
      setError(err.message || "Failed to load groups");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoadingList(true);
        setError("");
        await Promise.all([loadConversations(), loadGroups()]);
      } finally {
        setLoadingList(false);
      }
    })();
  }, [loadConversations, loadGroups]);

  // =========================================================
  // LOCAL LIST UPDATES (instead of refetching whole lists)
  // =========================================================

  const bumpConversation = useCallback((message) => {
    setConversations((current) => {
      const index = current.findIndex(
        (c) => Number(c.id) === Number(message.conversationId)
      );
      if (index === -1) return current;

      const updated = { ...current[index], lastMessage: message };
      return [
        updated,
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ];
    });
  }, []);

  const bumpGroup = useCallback((message) => {
    setGroups((current) => {
      const index = current.findIndex(
        (g) => Number(g.id) === Number(message.groupId)
      );
      if (index === -1) return current;

      const updated = { ...current[index], lastMessage: message };
      return [
        updated,
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ];
    });
  }, []);

  // =========================================================
  // SOCKET EVENTS (uses shared socket from context only)
  // =========================================================

  useEffect(() => {
    if (!socket) return;

    const requestOnline = () => socket.emit("get_online_users");

    const handleOnlineUsers = (users) =>
      setOnlineUsers((users || []).map(Number));

    const handleUserOnline = ({ userId }) => {
      const id = Number(userId);
      setOnlineUsers((cur) => (cur.includes(id) ? cur : [...cur, id]));
    };

    const handleUserOffline = ({ userId }) => {
      const id = Number(userId);
      setOnlineUsers((cur) => cur.filter((u) => u !== id));
    };

    const handleNewMessage = (message) => {
      if (!message?.conversationId) return;

      const active = activeRef.current;
      if (
        active.chatType === "direct" &&
        Number(active.conversationId) === Number(message.conversationId)
      ) {
        setMessages((cur) => appendUnique(cur, message));
      }

      const known = conversationsRef.current.some(
        (c) => Number(c.id) === Number(message.conversationId)
      );
      if (known) bumpConversation(message);
      else loadConversations(); // brand-new conversation
    };

    const handleNewGroupMessage = (message) => {
      if (!message?.groupId) return;

      const active = activeRef.current;
      if (
        active.chatType === "group" &&
        Number(active.groupId) === Number(message.groupId)
      ) {
        setMessages((cur) => appendUnique(cur, message));
      }

      const known = groupsRef.current.some(
        (g) => Number(g.id) === Number(message.groupId)
      );
      if (known) bumpGroup(message);
      else loadGroups();
    };

    const handleSocketError = (data) => {
      console.error("Socket error:", data?.message);
      setError(data?.message || "Socket error");
    };

    // (re)join the open room after every (re)connect
    const joinActiveRoom = () => {
      const active = activeRef.current;
      if (active.chatType === "direct" && active.conversationId) {
        socket.emit("join_conversation", {
          conversationId: active.conversationId,
        });
      } else if (active.chatType === "group" && active.groupId) {
        socket.emit("join_group", { groupId: active.groupId });
      }
    };

    const handleConnect = () => {
      requestOnline();
      joinActiveRoom();
    };

    requestOnline();

    socket.on("connect", handleConnect);
    socket.on("online_users", handleOnlineUsers);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);
    socket.on("new_message", handleNewMessage);
    socket.on("new_group_message", handleNewGroupMessage);
    socket.on("socket_error", handleSocketError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("online_users", handleOnlineUsers);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
      socket.off("new_message", handleNewMessage);
      socket.off("new_group_message", handleNewGroupMessage);
      socket.off("socket_error", handleSocketError);
    };
  }, [socket, bumpConversation, bumpGroup, loadConversations, loadGroups]);

  // Join room whenever the open chat changes
  useEffect(() => {
    if (!socket) return;

    if (chatType === "direct" && selectedConversation?.id) {
      socket.emit("join_conversation", {
        conversationId: selectedConversation.id,
      });
    } else if (chatType === "group" && selectedGroup?.id) {
      socket.emit("join_group", { groupId: selectedGroup.id });
    }
  }, [socket, chatType, selectedConversation?.id, selectedGroup?.id]);

  // =========================================================
  // SCROLL TO BOTTOM
  // =========================================================

  useEffect(() => {
    const grewByOne = messages.length - prevLengthRef.current === 1;
    prevLengthRef.current = messages.length;

    messagesEndRef.current?.scrollIntoView({
      behavior: grewByOne ? "smooth" : "auto",
    });
  }, [messages]);

  // =========================================================
  // FILE ATTACHMENT
  // =========================================================

  const removeSelectedFile = useCallback(() => {
    if (filePreviewRef.current) {
      URL.revokeObjectURL(filePreviewRef.current);
      filePreviewRef.current = null;
    }

    setSelectedFile(null);
    setFilePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // free object URL on unmount
  useEffect(
    () => () => {
      if (filePreviewRef.current) {
        URL.revokeObjectURL(filePreviewRef.current);
      }
    },
    []
  );

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5 MB");
      event.target.value = "";
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WEBP and PDF files are allowed");
      event.target.value = "";
      return;
    }

    setError("");

    // release previous preview before creating a new one
    if (filePreviewRef.current) {
      URL.revokeObjectURL(filePreviewRef.current);
      filePreviewRef.current = null;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      filePreviewRef.current = url;
      setFilePreview(url);
    } else {
      setFilePreview(null);
    }
  };

  // =========================================================
  // OPEN CHATS (history + details fetched in parallel)
  // =========================================================

  const openConversation = useCallback(async (conversation) => {
    const seq = ++loadSeqRef.current;

    // update immediately so live messages during loading aren't dropped
    activeRef.current = {
      chatType: "direct",
      conversationId: conversation.id,
      groupId: null,
    };

    setChatType("direct");
    setSelectedGroup(null);
    setSelectedConversation(conversation);
    setMobileChatOpen(true);
    setMessages([]);
    setLoadingMessages(true);
    setError("");

    try {
      const response = await getConversationMessages(conversation.id);
      if (seq !== loadSeqRef.current) return; // user already moved on

      const history = extractList(response, "messages");
      setMessages((live) => mergeMessages(history, live));
    } catch (err) {
      console.error("Open conversation error:", err);
      if (seq === loadSeqRef.current) {
        setError(err.message || "Failed to open conversation");
      }
    } finally {
      if (seq === loadSeqRef.current) setLoadingMessages(false);
    }
  }, []);

  const openGroup = useCallback(async (group) => {
    const seq = ++loadSeqRef.current;

    activeRef.current = {
      chatType: "group",
      conversationId: null,
      groupId: group.id,
    };

    setChatType("group");
    setSelectedConversation(null);
    setSelectedGroup(group); // show header instantly with list data
    setMobileChatOpen(true);
    setMessages([]);
    setLoadingMessages(true);
    setError("");

    try {
      const [detailsResponse, messageResponse] = await Promise.all([
        getGroupDetails(group.id),
        getGroupMessages(group.id),
      ]);

      if (seq !== loadSeqRef.current) return;

      const completeGroup = detailsResponse?.data?.group;
      if (!completeGroup) throw new Error("Group details not found");

      setSelectedGroup(completeGroup);

      const history = extractList(messageResponse, "messages");
      setMessages((live) => mergeMessages(history, live));
    } catch (err) {
      console.error("Open group error:", err);
      if (seq === loadSeqRef.current) {
        setError(err.message || "Failed to open group");
      }
    } finally {
      if (seq === loadSeqRef.current) setLoadingMessages(false);
    }
  }, []);

  const startDirectChat = useCallback(
    async (userId) => {
      try {
        const response = await getOrCreateConversation(userId);
        const conversation =
          response?.data?.conversation || response?.conversation;

        if (!conversation) throw new Error("Conversation not found");

        // add locally instead of refetching the whole list
        setConversations((cur) =>
          cur.some((c) => Number(c.id) === Number(conversation.id))
            ? cur
            : [conversation, ...cur]
        );

        await openConversation(conversation);
      } catch (err) {
        console.error("Start chat error:", err);
        setError(err.message || "Could not start conversation");
      }
    },
    [openConversation]
  );

  // open chat when navigated here with a userId
  useEffect(() => {
    if (!targetUserId) return;
    if (handledNavigationRef.current === location.key) return;

    handledNavigationRef.current = location.key;
    startDirectChat(targetUserId);
  }, [targetUserId, location.key, startDirectChat]);

  // =========================================================
  // TABS
  // =========================================================

  const switchTab = (type) => {
    if (type === chatType) return; // don't wipe the open chat on same-tab click

    loadSeqRef.current++; // cancel in-flight loads
    setChatType(type);
    setSelectedConversation(null);
    setSelectedGroup(null);
    setMessages([]);
    setLoadingMessages(false);
    setMessageText("");
    removeSelectedFile();
  };

  // =========================================================
  // SENDING
  // =========================================================

  const handleSendDirectMessage = async () => {
    const content = messageText.trim();
    if (!content && !selectedFile) return;
    if (!selectedConversation) return;

    try {
      setSending(true);
      setError("");

      let attachment = null;

      if (selectedFile) {
        setUploadingFile(true);
        const response = await uploadMessageAttachment(selectedFile);
        attachment = response.data;
        setUploadingFile(false);
      }

      const payload = {
        messageType: attachment?.messageType || "text",
        attachmentUrl: attachment?.attachmentUrl || null,
        attachmentName: attachment?.attachmentName || null,
        attachmentMimeType: attachment?.attachmentMimeType || null,
        attachmentSize: attachment?.attachmentSize || null,
      };

      if (socket?.connected) {
        socket.emit("send_message", {
          conversationId: selectedConversation.id,
          content: content || null,
          ...payload,
        });
      } else {
        const response = await sendMessage(
          selectedConversation.id,
          content,
          payload
        );

        const message = response?.data?.message || response?.message;
        if (message) {
          setMessages((cur) => appendUnique(cur, message));
          bumpConversation(message);
        }
      }

      setMessageText("");
      removeSelectedFile();
    } catch (err) {
      console.error("Send direct message error:", err);
      setError(err.message || "Message could not be sent");
    } finally {
      setSending(false);
      setUploadingFile(false);
    }
  };

  const handleSendGroupMessage = async () => {
    const content = messageText.trim();
    if (!content) return;
    if (!selectedGroup) return;

    try {
      setSending(true);
      setError("");

      if (socket?.connected) {
        socket.emit("send_group_message", {
          groupId: selectedGroup.id,
          content,
        });
      } else {
        const response = await sendGroupMessage(selectedGroup.id, content);
        const message = response?.data?.message || response?.message;

        if (message) {
          setMessages((cur) => appendUnique(cur, message));
          bumpGroup(message);
        }
      }

      setMessageText("");
    } catch (err) {
      console.error("Send group message error:", err);
      setError(err.message || "Group message could not be sent");
    } finally {
      setSending(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (sending || uploadingFile) return; // prevent double-send

    if (chatType === "direct") {
      await handleSendDirectMessage();
    } else {
      await handleSendGroupMessage();
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent?.isComposing // don't send while using an IME
    ) {
      handleSendMessage(event);
    }
  };

  const handleGroupCreated = async (group) => {
    await loadGroups();
    if (group) await openGroup(group);
  };

  // =========================================================
  // DERIVED DATA
  // =========================================================

  const selectedChatUser = useMemo(
    () => getChatUser(selectedConversation, currentUserId),
    [selectedConversation, currentUserId]
  );

  const onlineSet = useMemo(() => new Set(onlineUsers), [onlineUsers]);

  const isSelectedUserOnline =
    chatType === "direct" &&
    !!selectedChatUser &&
    onlineSet.has(Number(selectedChatUser.id));

  const onlineGroupCount = useMemo(() => {
    if (chatType !== "group" || !selectedGroup?.members) return 0;
    return selectedGroup.members.filter((m) =>
      onlineSet.has(Number(m.userId ?? m.id))
    ).length;
  }, [chatType, selectedGroup, onlineSet]);

  const chatTitle =
    chatType === "group"
      ? selectedGroup?.name
      : selectedChatUser?.fullName ||
        selectedChatUser?.username ||
        "Unknown User";

  const memberTotal =
    selectedGroup?.members?.length || selectedGroup?.memberCount || 0;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex h-[calc(100dvh-64px)] overflow-hidden bg-(--background) text-white">
      {/* ================= SIDEBAR ================= */}

      <aside
        className={`w-full max-w-sm flex-col border-r border-(--border) bg-(--background-secondary) md:flex ${
          mobileChatOpen ? "hidden" : "flex"
        }`}
      >
        <div className="flex items-center justify-between border-b border-(--border) p-5">
          <div>
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="mt-1 text-xs text-(--text-secondary)">
              Chat with people and groups
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateGroupOpen(true)}
            className="rounded-xl bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
          >
            + Group
          </button>
        </div>

        <div className="grid grid-cols-2 border-b border-(--border)">
          {["direct", "group"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => switchTab(type)}
              className={`px-4 py-3 text-sm font-semibold transition ${
                chatType === type
                  ? "border-b-2 border-(--primary) text-white"
                  : "text-(--text-secondary) hover:text-white"
              }`}
            >
              {type === "direct" ? "Direct" : "Groups"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingList ? (
            <div className="p-5 text-sm text-(--text-secondary)">
              Loading...
            </div>
          ) : chatType === "direct" ? (
            conversations.length === 0 ? (
              <div className="p-5 text-center">
                <p className="text-sm text-(--text-secondary)">
                  No conversations yet.
                </p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  currentUserId={currentUserId}
                  active={
                    Number(selectedConversation?.id) ===
                    Number(conversation.id)
                  }
                  onOpen={openConversation}
                />
              ))
            )
          ) : groups.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-sm text-(--text-secondary)">
                No groups yet.
              </p>
              <button
                type="button"
                onClick={() => setIsCreateGroupOpen(true)}
                className="mt-3 text-sm font-semibold text-purple-400 hover:text-purple-300"
              >
                Create your first group
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                active={Number(selectedGroup?.id) === Number(group.id)}
                onOpen={openGroup}
              />
            ))
          )}
        </div>
      </aside>

      {/* ================= CHAT AREA ================= */}

      <main
        className={`min-w-0 flex-1 flex-col md:flex ${
          mobileChatOpen ? "flex" : "hidden"
        }`}
      >
        {!selectedConversation && !selectedGroup ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-(--primary)/10 text-4xl">
              💬
            </div>
            <h2 className="text-xl font-bold">Your Messages</h2>
            <p className="mt-2 max-w-sm text-sm text-(--text-secondary)">
              Select a conversation or group to start chatting.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}

            <header className="flex items-center gap-2 border-b border-(--border) bg-(--background-secondary) p-3 sm:gap-3 sm:p-4">
              <button
                type="button"
                onClick={() => setMobileChatOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white md:hidden"
                aria-label="Back to chats"
              >
                ←
              </button>

              {chatType === "group" ? (
                <Avatar
                  key={selectedGroup?.groupImage || "g"}
                  src={selectedGroup?.groupImage}
                  name={selectedGroup?.name}
                  fallback={selectedGroup?.name?.slice(0, 1).toUpperCase()}
                  fallbackClassName="bg-gradient-to-br from-(--primary) to-(--accent)"
                />
              ) : (
                <Avatar
                  src={selectedChatUser?.profileImage}
                  name={selectedChatUser?.fullName || selectedChatUser?.username}
                  fallback={getUserInitial(selectedChatUser)}
                />
              )}

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">{chatTitle}</h2>

                {chatType === "direct" ? (
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelectedUserOnline ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    <span className="text-xs text-(--text-secondary)">
                      {isSelectedUserOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-(--text-secondary)">
                      {onlineGroupCount} online
                    </span>
                    <span className="text-xs text-(--text-muted)">
                      • {memberTotal} members
                    </span>
                  </div>
                )}
              </div>
            </header>

            {/* ERROR */}

            {error && (
              <div className="flex items-center justify-between gap-3 border-b border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setError("")}
                  aria-label="Dismiss error"
                  className="shrink-0 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* MESSAGES */}

            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
              {loadingMessages ? (
                <div className="flex h-full items-center justify-center text-sm text-(--text-secondary)">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <p className="text-sm text-(--text-secondary)">
                      No messages yet.
                    </p>
                    <p className="mt-1 text-xs text-(--text-muted)">
                      Send the first message.
                    </p>
                  </div>
                </div>
              ) : (
                <MessageList
                  messages={messages}
                  currentUserId={currentUserId}
                  isGroup={chatType === "group"}
                  endRef={messagesEndRef}
                />
              )}
            </div>

            {/* GROUP MEMBERS PANEL */}

            {chatType === "group" && selectedGroup && (
              <GroupMembersPanel
                group={selectedGroup}
                currentUserId={currentUserId}
                onUpdated={(updatedGroup) => {
                  setSelectedGroup(updatedGroup);
                  loadGroups();
                }}
              />
            )}

            {/* INPUT */}

            <form
              onSubmit={handleSendMessage}
              className="border-t border-(--border) bg-(--background-secondary) p-2 sm:p-4"
            >
              {selectedFile && (
                <div className="mb-3 rounded-xl border border-(--border) bg-(--card) p-3">
                  <div className="flex items-center gap-3">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt={selectedFile.name}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-(--background-secondary)">
                        <FileText
                          size={24}
                          className="text-(--text-secondary)"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {selectedFile.name}
                      </p>
                      <p className="mt-1 text-xs text-(--text-muted)">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                      {uploadingFile && (
                        <p className="mt-1 text-xs text-(--primary)">
                          Uploading...
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={removeSelectedFile}
                      disabled={uploadingFile}
                      aria-label="Remove attachment"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--text-muted) transition hover:bg-(--card-hover) hover:text-white disabled:opacity-50"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-end gap-2 sm:gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Attachments are only wired up for direct chats */}
                {chatType === "direct" && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={sending || uploadingFile}
                    title="Attach image or PDF"
                    aria-label="Attach image or PDF"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--border) bg-(--input) text-(--text-secondary) transition hover:bg-(--card-hover) hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Paperclip size={20} />
                  </button>
                )}

                <textarea
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={5000}
                  placeholder={
                    chatType === "group"
                      ? "Message the group..."
                      : "Write a message..."
                  }
                  className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-(--border) bg-(--input) px-4 py-3 text-sm text-white outline-none placeholder:text-(--text-muted) focus:border-(--primary)"
                />

                <button
                  type="submit"
                  disabled={
                    sending ||
                    uploadingFile ||
                    (!messageText.trim() &&
                      !(chatType === "direct" && selectedFile))
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary) text-white transition hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:gap-2 sm:px-5"
                >
                  {sending ? (
                    "..."
                  ) : (
                    <>
                      <Send size={17} />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </main>

      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreated={handleGroupCreated}
      />
    </div>
  );
};

export default Messages;