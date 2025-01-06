import axios from "axios";
import useConversationStore from "../store/conversationStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedUser } = useConversationStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (!selectedUser) {
        return;
      }

      try {
        const response = await axios.get(`/api/messages/${selectedUser._id}`);
        console.log("useGetMessages, response.data: ", response.data)
        setMessages(response.data.data || []);
      } catch (error: any) {
        let errorMessage = 'Get messages failed';

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

    if (selectedUser?._id) getMessages();
  }, [selectedUser?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
