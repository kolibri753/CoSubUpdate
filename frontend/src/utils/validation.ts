export const validateSignUp = (formData: {
  password: string;
  confirmPassword: string;
}) => {
  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
};
