import { useState } from "react";
import { useSignIn } from "./hooks";
import toast from "react-hot-toast";

export const useSignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { signin, loading } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signin(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { formData, loading, handleChange, handleSubmit };
};
