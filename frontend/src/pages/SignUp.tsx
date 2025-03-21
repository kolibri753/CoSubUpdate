import { Link } from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-2xl p-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
        <SignUpForm />
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
