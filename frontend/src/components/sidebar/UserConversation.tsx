import useConversationStore from "../../store/conversationStore";
import type { User } from "../../types/types";
import { useSocketContext } from "../../context/SocketContext";

type ConversationProps = {
  user: User,
  lastIdx: boolean,
  emoji: string
}

const UserConversation = ({ user, lastIdx, emoji }: ConversationProps) => {
  const { selectedUser, setSelectedUser } = useConversationStore();

  const isSelected = selectedUser?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedUser(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img src={user.profilePic} alt='user avatar' />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{user.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default UserConversation;