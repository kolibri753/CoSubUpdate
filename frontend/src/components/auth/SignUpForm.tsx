import { useSignUpForm } from "../../hooks/hooks";
import InputField from "../form/InputField";
import GenderToggle from "../form/GenderToggle";

const SignUpForm = () => {
  const {
    formData,
    error,
    loading,
    handleChange,
    handleGenderChange,
    handleSubmit,
  } = useSignUpForm();

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
        label="Full Name"
        name="fullName"
        value={formData.fullName}
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
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <GenderToggle selected={formData.gender} onChange={handleGenderChange} />
      <button
        type="submit"
        className="btn btn-primary w-full mt-2"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
