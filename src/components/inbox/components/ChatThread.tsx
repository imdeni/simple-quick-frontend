import React, { useEffect, useRef } from 'react';
import type { ThreadMessage } from './types';

interface MessageThreadProps {
  thread: ThreadMessage[];
  isPrivate: boolean;
}

const MessageThread: React.FC<MessageThreadProps> = ({ thread, isPrivate }) => {
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [thread]);

  return (
    <div className="flex-1 overflow-y-auto pt-2 font-lato">
      {thread.map((msg, i) => {
        const isMe = msg.user.id !== currentUser.id;
        const colorPair = bgColors[i % bgColors.length];
        const showDateDivider =
          i === 0 || thread[i].date !== thread[i - 1].date;

        return (
          <React.Fragment key={`${msg.date}-${msg.user.id}`}>
            {showDateDivider && (
              <div className="my-4 text-center text-xs text-gray-500 font-semibold">
                {msg.date}
              </div>
            )}
            <div
              key={i}
              className={`flex flex-col p-2 ${isMe ? 'items-start' : 'items-end'}`}
            >
              {!isPrivate && (
                <div
                  className={`text-xs mb-1 font-bold ${isMe ? colorPair.text : 'text-pink-500'}`}
                >
                  {isMe ? msg.user.name : 'YOU'}
                </div>
              )}
              <div
                className={`max-w-[75%] p-2 rounded ${isMe ? colorPair.bg : 'bg-pink-100'}`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageThread;
