import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";
import type { User } from "../types/types";

type SocketContextType = {
  socket: Socket | null;
  onlineUsers: User[];
};

type SocketContextProviderProps = {
  children: ReactNode;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: []
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let newSocket: Socket;

    if (authUser) {
      newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: User[]) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>
    {children}
  </SocketContext.Provider>;
};
