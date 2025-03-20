import { useState } from "react";
import { useSignUp } from "./hooks";
import { validateSignUp } from "../utils/validation";

export const useSignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const [error, setError] = useState("");
  const { signup, loading } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateSignUp(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await signup(formData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleGenderChange,
    handleSubmit,
  };
};
