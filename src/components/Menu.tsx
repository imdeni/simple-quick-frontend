import MenuIcon from '../icons/MenuIcon';
import InboxIcon from '../icons/InboxIcon';
import InboxIconactive from '../icons/InboxIconactive';
import TaskIcon from '../icons/TaskIcon';
import TaskIconactive from '../icons/TaskIconactive';

interface Props {
  menuOpen: boolean;
  inboxOpen: boolean;
  taskOpen: boolean;
  toggleMenu: () => void;
  toggleInbox: () => void;
  toggleTask: () => void;
}

const Menu: React.FC<Props> = ({
  menuOpen,
  inboxOpen,
  taskOpen,
  toggleMenu,
  toggleInbox,
  toggleTask,
}) => {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50" onClick={toggleMenu}>
        {!menuOpen && <MenuIcon />}
      </div>

      <div
        className={`fixed bottom-4 right-4 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className={`grid gap-2 ml-4 ${inboxOpen || taskOpen ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {taskOpen ? (
            <>
              <div
                className="flex flex-col items-center justify-between h-full"
                onClick={toggleInbox}
              >
                <p className="text-xs mb-1">Inbox</p>
                <InboxIcon />
              </div>

              <div
                className="flex flex-col items-center justify-between h-full"
                onClick={toggleTask}
              >
                <p className="text-xs mb-1">Task</p>
                <div className="relative w-[56px] h-[56px]">
                  <TaskIconactive className="absolute -top-[4px] -left-[5px] text-gray-500 opacity-20" />
                  <TaskIconactive className="absolute -top-[4px] left-[5px]" />
                </div>
              </div>
            </>
          ) : inboxOpen ? (
            <>
              <div
                className="flex flex-col items-center justify-between space-y-1 h-full"
                onClick={toggleTask}
              >
                <p className="text-xs">Task</p>
                <TaskIcon />
              </div>

              <div
                className="flex flex-col items-center justify-between h-full"
                onClick={toggleInbox}
              >
                <p className="text-xs mb-1">Inbox</p>
                <div className="relative w-[56px] h-[56px]">
                  <InboxIconactive className="absolute -top-[4px] -left-[5px] text-gray-500 opacity-20" />
                  <InboxIconactive className="absolute -top-[4px] left-[5px]" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex flex-col items-center justify-between space-y-1 h-full"
                onClick={toggleTask}
              >
                <p className="text-xs">Task</p>
                <TaskIcon />
              </div>
              <div
                className="flex flex-col items-center justify-between space-y-1 h-full"
                onClick={toggleInbox}
              >
                <p className="text-xs">Inbox</p>
                <InboxIcon />
              </div>
              <div
                className="flex flex-col items-center justify-between space-y-1 h-full"
                onClick={toggleMenu}
              >
                <p className="text-xs"></p>
                <MenuIcon />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
