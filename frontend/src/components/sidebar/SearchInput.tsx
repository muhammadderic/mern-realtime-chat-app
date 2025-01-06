import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversationStore from "../../store/conversationStore";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const { setSelectedUser } = useConversationStore();
  const { users } = useGetConversations();

  const handleSearchInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = users.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedUser(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  }

  return (
    <form onSubmit={handleSearchInputSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type='submit'
        className='btn btn-circle bg-sky-500 text-white'
      >
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput;