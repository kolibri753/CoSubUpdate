import { useSignInForm } from "../../hooks/useSignInForm.hook";
import InputField from "../form/InputField";

const SignInForm = () => {
  const { formData, loading, handleChange, handleSubmit } = useSignInForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="btn btn-primary w-full mt-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
