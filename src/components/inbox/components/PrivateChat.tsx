import React from 'react';
import type { ChatItem } from './types';

interface PrivateChatItemProps {
  chat: ChatItem;
  index: number;
  handleMarkAsRead: (index: number) => void;
}

const PrivateChat: React.FC<PrivateChatItemProps> = ({
  chat,
  index,
  handleMarkAsRead,
}) => (
  <div
    className="items-center space-x-2 pb-4 cursor-pointer"
    onClick={() => handleMarkAsRead(index)}
  >
    <div className="relative w-[50px] h-[50px] inline-block align-top">
      <div className="absolute top-0 left-2 bg-[#2F80ED] rounded-full mt-1">
        <div className="flex-shrink-0 w-[32px] h-[32px] bg-[#2F80ED] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {chat.users[0].name.split(' ')[0][0]}
          </span>
        </div>
      </div>
    </div>

    <div className="inline-block align-top w-[calc(100%-60px)] relative">
      <div className="flex items-center justify-between w-full">
        <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
          {chat.users[0].name}
        </p>
        <p className="text-xs text-gray-500">{chat.date}</p>
      </div>
      <p className="text-sm text-gray-500 -mb-1">{chat.message}</p>
    </div>
  </div>
);

export default PrivateChat;
