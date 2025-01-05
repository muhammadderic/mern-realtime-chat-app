import type { User } from "../types/types";
import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

type AuthContextType = {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => { },
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // Safely get and parse user from localStorage
  const getInitialUser = (): User | null => {
    try {
      const storedUser = localStorage.getItem("chat-user");
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  };

  const [authUser, setAuthUser] = useState<User | null>(getInitialUser());

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>
    {children}
  </AuthContext.Provider>
}