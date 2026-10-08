import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";


const SocketContext =
  createContext(null);


export const SocketProvider = ({
  children,
}) => {

  const [socket, setSocket] =
    useState(null);


  useEffect(() => {

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");


    if (!token) {
      return;
    }


    const newSocket =
      io(
        // "http://localhost:5000"
        import.meta.env.VITE_API_URL
        ,
        {
          auth: {
            token,
          },
        }
      );


    newSocket.on(
      "connect",
      () => {

        console.log(
          "Socket connected:",
          newSocket.id
        );

      }
    );


    newSocket.on(
      "connect_error",
      (error) => {

        console.error(
          "Socket connection error:",
          error.message
        );

      }
    );


    newSocket.on(
      "disconnect",
      (reason) => {

        console.log(
          "Socket disconnected:",
          reason
        );

      }
    );


    setSocket(newSocket);


    return () => {

      newSocket.disconnect();

    };

  }, []);


  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => {

  return useContext(
    SocketContext
  );

};