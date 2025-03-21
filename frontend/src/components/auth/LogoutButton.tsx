import { LogOut } from "lucide-react";
import { useLogout } from "../../hooks/hooks";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="btn btn-outline flex items-center gap-2 hover:btn-primary"
    >
      <LogOut />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
