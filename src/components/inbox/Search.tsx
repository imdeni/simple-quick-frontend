import SearchIcon from '../../icons/SearchIcon';

const Search = () => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search"
      className="text-black border border-black rounded-md px-8 py-1 w-full pl-10 pr-10"
    />
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black">
      <SearchIcon className="w-6 h-6 mr-10" />
    </div>
  </div>
);

export default Search;
