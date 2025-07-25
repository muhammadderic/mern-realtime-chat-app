import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversationStore from "../../store/conversationStore";
import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedUser, setSelectedUser } = useConversationStore();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedUser(null);
  }, [setSelectedUser]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span>{" "}
            <span className='text-gray-900 font-bold'>{selectedUser.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex items-center justify-center w-full h-full'>

      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};