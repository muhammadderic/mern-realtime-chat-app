import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../lib/utils/emojis";
import UserConversation from "./UserConversation";

const UserConversations = () => {
  const { loading, users } = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {users.map((user, idx) => (
        <UserConversation
          key={user._id}
          user={user}
          emoji={getRandomEmoji() as string}
          lastIdx={idx === users.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default UserConversations;