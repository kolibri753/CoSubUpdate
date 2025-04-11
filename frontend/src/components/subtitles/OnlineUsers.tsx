import clsx from "clsx";
import { useSocketContext, OnlineUser } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";

const OnlineUsers = () => {
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const others = onlineUsers.filter((u) => u.id !== authUser?.id);

  return (
    <div className="online-users">
      <h3 className="text-lg font-semibold mb-2">Online Users</h3>
      {others.length ? (
        <ul className="flex gap-3">
          {others.map((user: OnlineUser) => {
            return (
              <li key={user.id}>
                <img
                  src={user.profilePic}
                  alt={user.username}
                  title={user.username}
                  className={clsx(
                    "w-10 h-10 rounded-full object-cover border-2"
                  )}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No users online.</p>
      )}
    </div>
  );
};

export default OnlineUsers;
