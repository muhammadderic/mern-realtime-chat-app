import type { UserLoginProps } from "../pages/LoginPage";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }: UserLoginProps) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem("chat-user", JSON.stringify(response.data.data));
      setAuthUser(response.data.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }: UserLoginProps) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}