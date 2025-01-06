import axios from "axios";
import useConversationStore from "../store/conversationStore";
import { useState } from "react";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedUser } = useConversationStore();

  const sendMessage = async (message: any) => {
    setLoading(true);

    if (!selectedUser) {
      return;
    }

    try {
      const response = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessages([...messages, response.data.data]);
    } catch (error: any) {
      let errorMessage = 'Send message failed';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
