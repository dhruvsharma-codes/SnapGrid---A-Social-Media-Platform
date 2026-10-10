// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { io } from "socket.io-client";


// const SocketContext =
//   createContext(null);


// export const SocketProvider = ({
//   children,
// }) => {

//   const [socket, setSocket] =
//     useState(null);


//   useEffect(() => {

//     const token =
//       localStorage.getItem("token") ||
//       sessionStorage.getItem("token");


//     if (!token) {
//       return;
//     }


//     const newSocket =
//       io(
//         // "http://localhost:5000"
//         import.meta.env.VITE_API_URL
//         ,
//         {
//           auth: {
//             token,
//           },
//         }
//       );


//     newSocket.on(
//       "connect",
//       () => {

//         console.log(
//           "Socket connected:",
//           newSocket.id
//         );

//       }
//     );


//     newSocket.on(
//       "connect_error",
//       (error) => {

//         console.error(
//           "Socket connection error:",
//           error.message
//         );

//       }
//     );


//     newSocket.on(
//       "disconnect",
//       (reason) => {

//         console.log(
//           "Socket disconnected:",
//           reason
//         );

//       }
//     );


//     setSocket(newSocket);


//     return () => {

//       newSocket.disconnect();

//     };

//   }, []);


//   return (
//     <SocketContext.Provider
//       value={socket}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };


// export const useSocket = () => {

//   return useContext(
//     SocketContext
//   );

// };




















import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useAuth } from "./AuthContext.jsx";

const SocketContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

const readToken = () => {
  try {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  } catch {
    return null;
  }
};

// NOTE: <SocketProvider> must be rendered INSIDE <AuthProvider>
export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [socket, setSocket] = useState(null);

  // Re-runs whenever the logged-in user changes:
  //   login  -> connect
  //   logout -> disconnect
  //   switch account -> reconnect with the new token
  useEffect(() => {
    if (!userId || !readToken()) {
      setSocket(null);
      return;
    }

    const newSocket = io(API_URL, {
      // function form: every (re)connect uses the CURRENT token
      auth: (callback) => callback({ token: readToken() }),
      withCredentials: true,
    });

    if (import.meta.env.DEV) {
      newSocket.on("connect", () =>
        console.log("Socket connected:", newSocket.id)
      );
      newSocket.on("disconnect", (reason) =>
        console.log("Socket disconnected:", reason)
      );
    }

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);