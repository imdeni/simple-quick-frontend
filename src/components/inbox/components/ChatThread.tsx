import React, { useEffect, useRef, useState } from 'react';
import type { ThreadMessage } from './types';

interface MessageThreadProps {
  thread: ThreadMessage[];
  isPrivate: boolean;
  onBeginEdit: (index: number, text: string) => void;
  handleDelete: (index: number) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  thread,
  isPrivate,
  onBeginEdit,
  handleDelete,
}) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [newMessagesIndex, setNewMessagesIndex] = useState<number | null>(null);
  const previousThreadRef = useRef<ThreadMessage[]>([]);

  const toggleMenu = (index: number) => {
    setActiveMenuIndex(prev => (prev === index ? null : index));
  };

  const doBeginEdit = (i: number, text: string) => {
    onBeginEdit(i, text);
    setActiveMenuIndex(null);
  };

  const currentUser = { id: 999999, name: 'YOU', email: 'you@example.com' };
  const bgColors = [
    { bg: 'bg-green-100', text: 'text-green-500' },
    { bg: 'bg-yellow-100', text: 'text-yellow-500' },
    { bg: 'bg-blue-100', text: 'text-blue-500' },
    { bg: 'bg-purple-100', text: 'text-purple-500' },
    { bg: 'bg-orange-100', text: 'text-orange-500' },
    { bg: 'bg-teal-100', text: 'text-teal-500' },
  ];
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setIsAtBottom(atBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (previousThreadRef.current.length < thread.length) {
      const newIndex = thread.length - 1;
      setNewMessagesIndex(newIndex);
      localStorage.setItem('newMessagesIndex', JSON.stringify(newIndex));
    } else {
      setNewMessagesIndex(null);
      localStorage.removeItem('newMessagesIndex');
    }

    previousThreadRef.current = thread;
  }, [thread]);

  useEffect(() => {
    const storedIndex = localStorage.getItem('newMessagesIndex');
    if (storedIndex) {
      setNewMessagesIndex(JSON.parse(storedIndex));
    }

    return () => {
      setNewMessagesIndex(null);
    };
  }, []);

  return (
    <div
      className="flex-1 overflow-y-auto overflow-x-hidden pt-2 font-lato"
      ref={containerRef}
    >
      {thread.map((msg, i) => {
        const isMe = msg.user.id !== currentUser.id;
        const colorPair = bgColors[i % bgColors.length];
        const showDateDivider =
          i === 0 || thread[i].date !== thread[i - 1].date;

        return (
          <React.Fragment key={`${msg.date}-${msg.user.id}-${i}`}>
            {showDateDivider && (
              <div className="my-4 flex items-center text-center text-xs text-gray-500 font-semibold">
                <div className="flex-grow border-t border-gray-500"></div>
                <div className="px-2 text-gray-500">{msg.date}</div>
                <div className="flex-grow border-t border-gray-500"></div>
              </div>
            )}
            {newMessagesIndex === i && (
              <div className="my-4 flex items-center text-center text-xs text-gray-500 font-semibold">
                <div className="flex-grow border-t border-red-500"></div>
                <div className="px-2 text-red-500">New Message</div>
                <div className="flex-grow border-t border-red-500"></div>
              </div>
            )}

            <div
              key={i}
              className={`flex flex-col p-2 ${i === msg.message.length - 1 && isPrivate ? 'mb-14' : ''} ${isMe ? 'items-start' : 'items-end'}`}
            >
              {!isPrivate && (
                <div
                  className={`text-xs mb-1 font-bold ${isMe ? colorPair.text : 'text-pink-500'}`}
                >
                  {isMe ? msg.user.name : 'YOU'}
                </div>
              )}
              <div className="flex items-start gap-2">
                {!isMe && (
                  <div className="relative cursor-pointer">
                    <p onClick={() => toggleMenu(i)}>…</p>
                    {activeMenuIndex === i && (
                      <div className="absolute left-0 top-6 bg-white border rounded shadow text-xs z-10">
                        <div
                          onClick={() => doBeginEdit(i, msg.message)}
                          className="block px-2 py-1 hover:bg-gray-100 w-full text-blue-500"
                        >
                          Edit
                        </div>
                        <div
                          onClick={() => {
                            handleDelete(i);
                            setActiveMenuIndex(null);
                          }}
                          className="block px-2 py-1 hover:bg-gray-100 w-full text-red-500"
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`break-all p-2 rounded max-w-xs ${
                    isMe ? colorPair.bg : 'bg-pink-100'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />

      {isPrivate && (
        <div className="absolute bottom-22 left-1/2 w-full transform -translate-x-1/2 z-10 px-8">
          <div className="bg-blue-100 px-4 py-2 rounded flex items-center space-x-2 shadow-md">
            <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs sm:text-sm font-medium text-blue-800">
              Please wait while we connect you with one of our team...
            </p>
          </div>
        </div>
      )}

      {!isAtBottom && (
        <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 z-10">
          <div
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTop =
                  containerRef.current.scrollHeight;
              }
            }}
            className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg shadow-md text-sm"
          >
            New Message
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageThread;
