import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useUserStore from "../../store/useUserStore";

export const useGetUsers = () => {
  const { users, setUsers, loading, setLoading } = useUserStore();
  const fetchingRef = useRef(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (fetchingRef.current || loading) return;
      console.log("Fetching users...");

      fetchingRef.current = true;
      setLoading(true);

      try {
        const response = await fetch("/api/auth/users", {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch users");

        setUsers(data);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
        console.log("Finished fetching users");
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [users.length, setUsers, setLoading, loading]);

  return { users, loading };
};
