import React, { useState, useEffect, useRef } from 'react';

interface TaskHeaderProps {
  title: string;
  completed?: boolean;
  onTitleChange?: (newTitle: string) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  title,
  completed = false,
  onTitleChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(title);
    }
  }, [title, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleBlur = () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      setEditedTitle(title);
      return;
    }
    if (onTitleChange && trimmedTitle !== title) {
      onTitleChange(trimmedTitle);
    }
    setIsEditing(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center text-sm">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder="Type Task Title"
          className="border-2 rounded-lg p-1 w-full"
        />
      ) : (
        <p
          className={`font-semibold text-gray-800 cursor-pointer ${
            completed ? 'line-through text-gray-400' : ''
          }`}
          onClick={() => setIsEditing(true)}
          title="Click to edit"
        >
          {title.trim() || 'Untitled Task'}
        </p>
      )}
    </div>
  );
};

export default TaskHeader;
