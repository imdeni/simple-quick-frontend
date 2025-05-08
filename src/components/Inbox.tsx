import React, { useEffect, useState } from 'react';
import Search from './inbox/Search';
import Loadingchats from './inbox/Loadingchats';
import ChatList from './inbox/Chatlist';

interface Props {
  inboxOpen: boolean;
}

const Inbox: React.FC<Props> = ({ inboxOpen }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (inboxOpen) {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }

    return () => clearTimeout(timer);
  }, [inboxOpen]);

  return (
    <div
      className={`fixed bottom-28 right-4 bg-white rounded-md shadow-lg w-full max-w-[400px] lg:max-w-[600px] h-96 lg:h-128 landscape:h-64 lg:landscape:h-128 text-black transition-transform duration-300 ${
        inboxOpen ? 'translate-x-0' : 'translate-x-[150%]'
      }`}
    >
      <div className="py-[24px] px-[32px] h-full flex flex-col">
        <Search />
        <div className="flex-1 overflow-y-auto flex flex-col space-y-4">
          {isLoading ? <Loadingchats /> : <ChatList />}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
