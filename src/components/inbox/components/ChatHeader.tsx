import React from 'react';
import BackIcon from '../../../icons/BackIcon';
import type { ChatItem } from './types';

interface ChatHeaderProps {
  selectedChat: ChatItem;
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedChat,
  setSelectedChatIndex,
}) => {
  return (
    <div className="flex items-center space-x-4 pb-[24px]">
      <div
        onClick={() => setSelectedChatIndex(null)}
        className="cursor-pointer"
      >
        <BackIcon className="text-black" />
      </div>
      <div>
        {!selectedChat.isPrivate ? (
          <>
            <h2 className="text-lg font-bold text-[#2F80ED]">
              {selectedChat.group}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedChat.users.length + 1} participant
              {selectedChat.users.length !== 1 ? 's' : ''}
            </p>
          </>
        ) : (
          <h2 className="text-lg font-bold text-[#2F80ED]">
            {selectedChat.users.map(user => user.name).join(', ')}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
