import './App.css';
import MenuIcon from './component/MenuIcon';
import SearchIcon from './component/SearchIcon';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen w-screen bg-[#2c2c2c] text-white overflow-hidden">
      <aside className="w-[200px] bg-[#2f2f2f] border-r border-gray-600"></aside>

      <main className="flex-1 flex flex-col">
        <div className="h-12 bg-[#4a4a4a] flex items-center gap-2 px-4 border-b border-gray-600">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="flex-1 p-4"></div>
      </main>

      <div className="fixed bottom-4 right-4">
        <div>
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};

export default App;
