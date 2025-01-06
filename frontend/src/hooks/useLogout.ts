import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        '/api/auth/logout',
        {}, // Empty body since logout typically doesn't need payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error: unknown) {
      let errorMessage = 'Logout failed';

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

  return { loading, logout };
};

export default useLogout;