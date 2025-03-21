import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import Logo from "./Logo";
import ThemeSelector from "./ThemeSelector";
import { LogIn, UserPlus } from "lucide-react";

function Navbar() {
  const { authUser, isLoading } = useAuthContext();

  return (
    <nav className="navbar flex justify-between items-center bg-base-200 shadow-md px-4">
      <Logo />

      <div className="flex items-center gap-4">
        {!isLoading &&
          (authUser ? (
            <LogoutButton />
          ) : (
            <>
              <Link
                to="/signin"
                className="btn btn-outline flex items-center gap-2 hover:btn-primary"
              >
                <LogIn size={18} />
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline flex items-center gap-2 hover:btn-primary"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          ))}
        <ThemeSelector />
      </div>
    </nav>
  );
}

export default Navbar;
