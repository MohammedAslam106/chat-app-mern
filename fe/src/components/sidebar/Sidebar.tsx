import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  return (
    <div className=" border-r border-slate-500 flex flex-col p-4">
      <SearchInput />
      <div className=" divider px-3"></div>
      <Conversations/>
      <LogoutButton/>
    </div>
  );
}
