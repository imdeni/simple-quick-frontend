interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
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
  );
};

export default ChatInput;
