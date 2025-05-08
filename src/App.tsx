import './App.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Menu from './components/Menu';
import Inbox from './components/Inbox';
import Task from './components/Task';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [inboxOpen, setInboxOpen] = useState<boolean>(false);
  const [taskOpen, setTaskOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    if (inboxOpen || taskOpen) {
      setInboxOpen(false);
      setTaskOpen(false);
    }
    setMenuOpen(prev => !prev);
  };

  const toggleInbox = (): void => {
    if (taskOpen) {
      setTaskOpen(false);
    }
    setInboxOpen(prev => !prev);
  };

  const toggleTask = (): void => {
    if (inboxOpen) {
      setInboxOpen(false);
    }
    setTaskOpen(prev => !prev);
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#2c2c2c] text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 p-4"></div>
      </main>

      <Menu
        menuOpen={menuOpen}
        inboxOpen={inboxOpen}
        taskOpen={taskOpen}
        toggleMenu={toggleMenu}
        toggleInbox={toggleInbox}
        toggleTask={toggleTask}
      />

      <Inbox inboxOpen={inboxOpen} />
      <Task taskOpen={taskOpen} />
    </div>
  );
};

export default App;
