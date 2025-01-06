import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";
import useConversationStore, { type Message } from "../store/conversationStore";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationStore();

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Return cleanup function that doesn't return anything
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
