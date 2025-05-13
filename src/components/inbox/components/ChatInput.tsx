interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isEditing: boolean;
  cancelEdit: () => void;
}

const ChatInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  isEditing,
  cancelEdit,
}) => {
  return (
    <div className="py-2 px-[2px] flex gap-2">
      <input
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        className="flex-1 border p-2 rounded-lg"
        placeholder="Type a message"
      />
      {isEditing ? (
        <>
          <button
            onClick={handleSendMessage}
            className="!bg-blue-500 text-white px-4 rounded-r"
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="!bg-blue-500 text-white px-4 rounded-r"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={handleSendMessage}
          className="!bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      )}
    </div>
  );
};

export default ChatInput;
