import SearchIcon from '../icons/SearchIcon';

const Header = () => (
  <div className="h-12 bg-[#4a4a4a] flex items-center gap-2 px-4 border-b border-gray-600">
    <SearchIcon className="h-6 w-6 text-[#F2F2F2]" />
    <input
      type="text"
      placeholder="Search"
      className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
    />
  </div>
);

export default Header;
