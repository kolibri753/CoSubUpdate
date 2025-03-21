import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

type SignInInputs = {
  username: string;
  password: string;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signin = async (inputs: SignInInputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      setAuthUser(data);
      toast.success("Signed in successfully!");
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, signin };
};
