import { useSocketContext, OnlineUser } from "../../context/SocketContext";

const OnlineUsers = () => {
  const { onlineUsers } = useSocketContext();

  return (
    <div className="online-users">
      {onlineUsers.length ? (
        <ul className="flex gap-3">
          {onlineUsers.map((user: OnlineUser) => (
            <li key={user.id}>
              <img
                src={user.profilePic}
                alt={user.username}
                title={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No users online.</p>
      )}
    </div>
  );
};

export default OnlineUsers;
