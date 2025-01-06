import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import type { User } from "../types/types";

type useGetConversationsProps = {
  loading: boolean;
  users: User[];
}

const useGetConversations = (): useGetConversationsProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const response = await axios.get('/api/users');
        setUsers(response.data.data);
      } catch (error: any) {
        let errorMessage = 'Get conversation failed';

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

    getConversations();
  }, []);

  return { loading, users };
};

export default useGetConversations;
