import React from 'react';
import UserIcon from '../../../icons/UserIcon';
import type { ChatItem } from './types';

interface ChatItemProps {
  chat: ChatItem;
  index: number;
  handleMarkAsRead: (index: number) => void;
}

const GroupChat: React.FC<ChatItemProps> = ({
  chat,
  index,
  handleMarkAsRead,
}) => {
  return (
    <div
      className="items-center space-x-2 pb-4 cursor-pointer"
      onClick={() => handleMarkAsRead(index)}
    >
      <div className="relative w-[50px] h-[50px] inline-block align-top">
        <div className="absolute top-0 left-0 bg-gray-300 rounded-full mt-1">
          <UserIcon className="p-2 text-black" />
        </div>
        <div className="absolute top-0 left-4 bg-[#2F80ED] rounded-full mt-1">
          <UserIcon className="p-2 text-white" />
        </div>
      </div>

      <div className="inline-block align-top w-[calc(100%-60px)] relative">
        <div className="flex items-center justify-between w-full -mb-1">
          <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
            {chat.group}
          </p>
          <p className="text-xs text-gray-500">{chat.date}</p>
        </div>
        <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
          {chat.users[2].name} :
        </p>
        <p className="text-sm text-gray-500 -mb-1 mr-2">{chat.message}</p>

        {!chat.read && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <span className="text-red-500 text-lg">•</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
