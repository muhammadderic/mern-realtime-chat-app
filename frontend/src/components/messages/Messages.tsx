import { useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import type { Message } from "../../store/conversationStore";
import MessageSection from "./MessageSection";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message: Message) => (
          <div key={message._id} ref={lastMessageRef}>
            <MessageSection message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages?.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages;