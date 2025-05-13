import { useEffect, useState } from 'react';
import type {
  ChatItem,
  ChatListProps,
  Comment,
  ThreadMessage,
  User,
} from './components/types';
import ChatHeader from './components/ChatHeader';
import GroupChat from './components/GroupChat';
import PrivateChat from './components/PrivateChat';
import ChatThread from './components/ChatThread';
import ChatInput from './components/ChatInput';

const ChatList: React.FC<ChatListProps> = ({
  selectedChatIndex,
  setSelectedChatIndex,
}) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [originalText, setOriginalText] = useState<string>('');

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
      if (editIndex !== null) {
        updated[selectedChatIndex].thread[editIndex].message = newMessage;
      } else {
        updated[selectedChatIndex].thread.push(newThreadMessage);
      }
      return updated;
    });
    setNewMessage('');
    setEditIndex(null);
  };

  const beginEdit = (i: number, text: string) => {
    setEditIndex(i);
    setOriginalText(text);
    setNewMessage(text);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setNewMessage('');
  };

  const deleteMessage = (index: number) => {
    if (selectedChatIndex === null) return;
    setChats(prev => {
      const updated = [...prev];
      updated[selectedChatIndex].thread.splice(index, 1);
      return updated;
    });
    setEditIndex(null);
    setNewMessage('');
  };

  const selectedChat =
    selectedChatIndex !== null ? chats[selectedChatIndex] : null;

  return (
    <>
      {/* {console.log(chats)} */}
      {selectedChat ? (
        <div className="flex flex-col h-full">
          <ChatHeader
            selectedChat={selectedChat}
            setSelectedChatIndex={setSelectedChatIndex}
          />

          <hr />

          <ChatThread
            thread={selectedChat.thread}
            isPrivate={selectedChat.isPrivate}
            onBeginEdit={beginEdit}
            handleDelete={deleteMessage}
          />

          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            isEditing={editIndex !== null}
            cancelEdit={cancelEdit}
          />
        </div>
      ) : (
        chats.map((chat, index) => (
          <div key={index}>
            {chat.isPrivate ? (
              <PrivateChat
                chat={chat}
                index={index}
                handleMarkAsRead={handleMarkAsRead}
              />
            ) : (
              <GroupChat
                key={index}
                chat={chat}
                index={index}
                handleMarkAsRead={handleMarkAsRead}
              />
            )}

            <hr />
          </div>
        ))
      )}
    </>
  );
};

export default ChatList;
