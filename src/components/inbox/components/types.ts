export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ThreadMessage {
  user: User;
  message: string;
  date: string;
}

export interface ChatItem {
  users: User[];
  message: string;
  email: string;
  date: string;
  read: boolean;
  thread: ThreadMessage[];
  isPrivate: boolean;
  group: string;
}

export interface ChatListProps {
  selectedChatIndex: number | null;
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
