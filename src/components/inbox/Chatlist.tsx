import { useEffect, useState } from 'react';
import UserIcon from '../../icons/UserIcon';
import BackIcon from '../../icons/BackIcon';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface ChatItem {
  users: User[];
  message: string;
  email: string;
  date: string;
  read: boolean;
  thread: ThreadMessage[];
  isPrivate: boolean;
}

interface ThreadMessage {
  user: User;
  message: string;
  date: string;
}

interface ChatListProps {
  selectedChatIndex: number | null;
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const ChatList: React.FC<ChatListProps> = ({
  selectedChatIndex,
  setSelectedChatIndex,
}) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, commentsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
      ]);

      const users: User[] = await usersRes.json();
      const comments: Comment[] = await commentsRes.json();
      const savedReadStatus = JSON.parse(
        localStorage.getItem('chatReadStatus') || '[]'
      );

      const combined: ChatItem[] = comments
        .slice(0, 10)
        .map((comment, index) => {
          // const isUserOne = index % 2 === 0;
          const isPrivate = Math.random() > 0.5;
          // const participants = users.slice(0, 3);
          const participants = isPrivate
            ? [users[index % users.length]]
            : users.slice(0, 3);

          // const threadMessage: ThreadMessage = {
          //   // user: users[isUserOne ? 0 : 1],
          //   user: participants[0],
          //   message: comment.body,
          //   date: new Date().toLocaleString(),
          // };
          let threadMessages: ThreadMessage[];

          if (isPrivate) {
            threadMessages = [
              {
                user: participants[0],
                message: comment.body,
                date: new Date().toLocaleString(),
              },
            ];
          } else {
            threadMessages = [
              {
                user: participants[0],
                message: comment.body,
                date: new Date().toLocaleString(),
              },
              {
                user: participants[1],
                message: comment.body,
                date: new Date().toLocaleString(),
              },
              {
                user: participants[2],
                message: comment.body,
                date: new Date().toLocaleString(),
              },
            ];
          }

          return {
            // user: users[isUserOne ? 0 : 1],
            users: participants,
            message: comment.body,
            email: comment.email,
            date: new Date().toLocaleString(),
            read: savedReadStatus[index] || false,
            // thread: [threadMessage],
            thread: threadMessages,
            isPrivate,
          };
        });

      setChats(combined);
    };

    fetchData();
  }, []);

  const handleMarkAsRead = (index: number) => {
    setChats(prevChats => {
      const updated = [...prevChats];
      updated[index].read = true;
      localStorage.setItem(
        'chatReadStatus',
        JSON.stringify(updated.map(chat => chat.read))
      );
      return updated;
    });
    setSelectedChatIndex(index);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || selectedChatIndex === null) return;

    // const currentUser = chats[selectedChatIndex].user;
    const currentUser = { id: 999999, name: 'YOU', email: 'you@example.com' };
    const newThreadMessage: ThreadMessage = {
      user: currentUser,
      message: newMessage,
      date: new Date().toLocaleString(),
    };

    setChats(prevChats => {
      const updated = [...prevChats];
      updated[selectedChatIndex].thread.push(newThreadMessage);
      return updated;
    });
    setNewMessage('');
  };

  const selectedChat =
    selectedChatIndex !== null ? chats[selectedChatIndex] : null;

  return (
    <>
      {console.log(chats)}
      {selectedChat ? (
        <div className="flex flex-col h-full">
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
                    should be group name
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedChat.users.length + 1} participant
                    {selectedChat.users.length !== 1 ? 's' : ''}
                  </p>
                </>
              ) : (
                <h2 className="text-lg font-bold text-[#2F80ED]">
                  {/* {selectedChat.user.name} */}
                  {selectedChat.users.map(user => user.name).join(', ')}
                </h2>
              )}
            </div>
          </div>
          <hr />

          <div className="flex-1 overflow-y-auto pt-2 font-lato">
            {selectedChat.thread.map((msg, i) => {
              // const isMe = msg.user.id === selectedChat.user.id;
              // const isMe = msg.user.id === selectedChat.users[0].id;
              const currentUser = {
                id: 999999,
                name: 'YOU',
                email: 'you@example.com',
              };
              const isMe = msg.user.id !== currentUser.id;
              return (
                <div
                  key={i}
                  className={`flex flex-col p-2 ${isMe ? 'items-start' : 'items-end'}`}
                >
                  {!selectedChat.isPrivate && (
                    <div
                      className={`text-xs mb-1 font-bold ${isMe ? 'text-blue-500' : 'text-pink-500'}`}
                    >
                      {isMe ? msg.user.name : 'YOU'}
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-2 rounded ${
                      isMe ? 'bg-blue-100' : 'bg-pink-100'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="py-2 px-[2px] flex gap-2">
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="!bg-blue-500 text-white px-4 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        chats.map((chat, index) => (
          <div key={index}>
            {chat.isPrivate ? (
              <div
                className="items-center space-x-2 pb-4 cursor-pointer"
                onClick={() => handleMarkAsRead(index)}
              >
                <div className="relative w-[50px] h-[50px] inline-block align-top">
                  <div className="absolute top-0 left-2 bg-[#2F80ED] rounded-full mt-1">
                    <div className="flex-shrink-0 w-[32px] h-[32px] bg-[#2F80ED] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {/* {chat.user.name.split(' ')[0][0]} */}
                        {chat.users[0].name.split(' ')[0][0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-block align-top w-[calc(100%-60px)] relative">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[#2F80ED] font-bold text-[16px] font-lato">
                      {/* {chat.user.name} */}
                      {chat.users[0].name}
                    </p>
                    <p className="text-xs text-gray-500">{chat.date}</p>
                  </div>
                  <p className="text-sm text-gray-500 -mb-1">{chat.message}</p>
                </div>
              </div>
            ) : (
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
                      should be group name
                    </p>
                    <p className="text-xs text-gray-500">{chat.date}</p>
                  </div>
                  <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
                    {/* {chat.user.name} : */}
                    {chat.users[0].name} :
                  </p>
                  <p className="text-sm text-gray-500 -mb-1 mr-2">
                    {chat.message}
                  </p>

                  {!chat.read && (
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                      <span className="text-red-500 text-lg">•</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </>
  );
};

export default ChatList;
