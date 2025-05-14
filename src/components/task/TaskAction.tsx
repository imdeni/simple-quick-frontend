import React, { useState } from 'react';

interface TaskActionsProps {
  dueIn: number;
  date: Date;
  completed?: boolean;
  expanded: boolean;
  onToggleDescription: () => void;
  onDelete?: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  dueIn,
  date,
  completed,
  expanded,
  onToggleDescription,
  onDelete,
}) => {
  const [showDelete, setShowDelete] = useState(false);

  const toggleDeleteMenu = () => {
    setShowDelete(prev => !prev);
  };

  return (
    <div className="flex flex-col items-end text-xs text-black whitespace-nowrap min-w-[200px] gap-1">
      <div className="grid grid-cols-[auto_auto_1fr_auto] gap-2 relative">
        {!completed && <span className="text-red-500">{dueIn} Days Left</span>}
        <span>{date.toLocaleDateString()}</span>

        <div className="flex items-start gap-2">
          <div
            onClick={onToggleDescription}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="relative flex items-start gap-2">
          <div onClick={toggleDeleteMenu} className="cursor-pointer">
            <svg
              width="22"
              height="22"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.07016 12.5731C6.68712 12.5731 5.55554 13.7046 5.55554 15.0877C5.55554 16.4707 6.68712 17.6023 8.07016 17.6023C9.4532 17.6023 10.5848 16.4707 10.5848 15.0877C10.5848 13.7046 9.4532 12.5731 8.07016 12.5731ZM23.1579 12.5731C21.7748 12.5731 20.6433 13.7046 20.6433 15.0877C20.6433 16.4707 21.7748 17.6023 23.1579 17.6023C24.5409 17.6023 25.6725 16.4707 25.6725 15.0877C25.6725 13.7046 24.5409 12.5731 23.1579 12.5731ZM13.0994 15.0877C13.0994 13.7046 14.231 12.5731 15.614 12.5731C16.9971 12.5731 18.1286 13.7046 18.1286 15.0877C18.1286 16.4707 16.9971 17.6023 15.614 17.6023C14.231 17.6023 13.0994 16.4707 13.0994 15.0877Z"
                fill="gray"
              />
            </svg>
          </div>

          {showDelete && (
            <button
              onClick={onDelete}
              className="absolute right-0 top-6 text-red-500 !bg-white px-2 py-1 rounded text-xs z-10"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskActions;
