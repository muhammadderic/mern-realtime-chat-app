import type { User } from "../types/types";
import { create } from "zustand";

// Shared type for MongoDB ObjectId (can be string in frontend)
type ObjectId = string;

export type Message = {
  _id: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  shouldShake?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

interface ConversationState {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversationStore = create<ConversationState>((set) => ({
  // State: Stores the currently selected conversation (null if none selected)
  // Action: Updates the selected conversation
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // State: Array of messages in the current conversation
  // Action: Updates the messages array
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversationStore;