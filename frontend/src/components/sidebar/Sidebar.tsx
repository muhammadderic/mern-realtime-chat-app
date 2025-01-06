import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";
import UserConversations from "./UserConversations";

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
      <UserConversations />
      <LogoutBtn />
    </div>
  )
}

export default Sidebar;