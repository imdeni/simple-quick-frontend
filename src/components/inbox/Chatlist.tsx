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
  group: string;
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
          const isPrivate = Math.random() > 0.5;
          const participants = isPrivate
            ? [users[index % users.length]]
            : users.slice(0, 3);

          let threadMessages: ThreadMessage[];

          const today = new Date();
          const currentDate = new Date();

          let formattedToday = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          if (today.toDateString() === currentDate.toDateString()) {
            formattedToday = formattedToday.replace(
              new RegExp(
                today.toLocaleDateString('en-US', { weekday: 'long' }),
                'i'
              ),
              'Today'
            );
          }
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const formattedYesterday = yesterday.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          if (isPrivate) {
            threadMessages = [
              {
                user: participants[0],
                message: comment.body,
                date: formattedToday,
              },
            ];
          } else {
            threadMessages = [
              {
                user: participants[0],
                message: comment.body,
                date: formattedYesterday,
              },
              {
                user: participants[1],
                message: comment.body,
                date: formattedToday,
              },
              {
                user: participants[2],
                message: comment.body,
                date: formattedToday,
              },
            ];
          }

          return {
            users: participants,
            message: comment.body,
            email: comment.email,
            date: new Date().toLocaleString(),
            read: savedReadStatus[index] || false,
            thread: threadMessages,
            isPrivate,
            group: comment.name,
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

    const today = new Date();
    let formattedToday = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const currentDate = new Date();
    if (today.toDateString() === currentDate.toDateString()) {
      formattedToday = formattedToday.replace(
        new RegExp(today.toLocaleDateString('en-US', { weekday: 'long' }), 'i'),
        'Today'
      );
    }

    const currentUser = { id: 999999, name: 'YOU', email: 'you@example.com' };
    const newThreadMessage: ThreadMessage = {
      user: currentUser,
      message: newMessage,
      date: formattedToday,
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
          <hr />

          <div className="flex-1 overflow-y-auto pt-2 font-lato">
            {selectedChat.thread.map((msg, i) => {
              const currentUser = {
                id: 999999,
                name: 'YOU',
                email: 'you@example.com',
              };
              const isMe = msg.user.id !== currentUser.id;
              const bgColors = [
                { bg: 'bg-green-100', text: 'text-green-500' },
                { bg: 'bg-yellow-100', text: 'text-yellow-500' },
                { bg: 'bg-blue-100', text: 'text-blue-500' },
                { bg: 'bg-purple-100', text: 'text-purple-500' },
                { bg: 'bg-orange-100', text: 'text-orange-500' },
                { bg: 'bg-teal-100', text: 'text-teal-500' },
              ];
              const colorPair = bgColors[i % bgColors.length];
              const showDateDivider =
                i === 0 ||
                selectedChat.thread[i].date !== selectedChat.thread[i - 1].date;

              return (
                <>
                  {showDateDivider && (
                    <div className="my-4 text-center text-xs text-gray-500 font-semibold">
                      {msg.date}
                    </div>
                  )}
                  <div
                    key={i}
                    className={`flex flex-col p-2 ${isMe ? 'items-start' : 'items-end'}`}
                  >
                    {!selectedChat.isPrivate && (
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
                </>
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
                      {chat.group}
                    </p>
                    <p className="text-xs text-gray-500">{chat.date}</p>
                  </div>
                  <p className="text-gray-600 font-bold text-[14px] font-lato -mb-1">
                    {chat.users[2].name} :
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
