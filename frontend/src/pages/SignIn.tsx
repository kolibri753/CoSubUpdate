import { Link } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-2xl p-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign In</h2>
        <SignInForm />
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
