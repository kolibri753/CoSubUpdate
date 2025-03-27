import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/users", {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};
