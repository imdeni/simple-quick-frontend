import './App.css';
import { useState } from 'react';
import MenuIcon from './component/MenuIcon';
import SearchIcon from './component/SearchIcon';
import InboxIcon from './component/InboxIcon';
import TaskIcon from './component/TaskIcon';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(prev => !prev);
  };

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
        {menuOpen ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-between space-y-1 h-full">
              <p className="text-xs">Task</p>
              <TaskIcon />
            </div>
            <div className="flex flex-col items-center justify-between space-y-1 h-full">
              <p className="text-xs">Inbox</p>
              <InboxIcon />
            </div>
            <div
              className="flex flex-col items-center justify-between space-y-1 h-full"
              onClick={toggleMenu}
            >
              <p></p>
              <MenuIcon />
            </div>
          </div>
        ) : (
          <div onClick={toggleMenu}>
            <MenuIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
