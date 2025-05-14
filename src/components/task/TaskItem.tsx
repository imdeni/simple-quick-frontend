import React, { useState } from 'react';
import TaskCheckbox from './TaslCheckbox';
import TaskHeader from './TaskHeader';
import TaskActions from './TaskAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description: string;
    dueIn: number;
    user: string;
    completed?: boolean;
    date: Date;
  };
  toggleCompletion: (id: number) => void;
  handleToggleDescription: (id: number) => void;
  expandedTasks: Set<number>;
  selectedDate: Record<number, Date | null>;
  setSelectedDate: React.Dispatch<
    React.SetStateAction<Record<number, Date | null>>
  >;
  onDelete: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
  handleDateChange: (id: number, date: Date) => void;
  handleDescriptionChange: (id: number, newDescription: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleCompletion,
  handleToggleDescription,
  expandedTasks,
  selectedDate,
  setSelectedDate,
  onDelete,
  onTitleChange,
  handleDateChange,
  handleDescriptionChange,
}) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDescription, setTempDescription] = useState(task.description);

  const handleDateChangeInternal = (date: Date | null) => {
    if (date) {
      handleDateChange(task.id, date);
    } else {
      handleDateChange(task.id, new Date());
    }
  };

  return (
    <div className="flex flex-col border-b pb-2">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2 flex-1 mr-2">
          <TaskCheckbox
            completed={task.completed}
            onToggle={() => toggleCompletion(task.id)}
          />
          <div className="flex-1">
            <TaskHeader
              title={task.title}
              completed={task.completed}
              onTitleChange={newTitle => onTitleChange(task.id, newTitle)}
            />
          </div>
        </div>

        <TaskActions
          dueIn={task.dueIn}
          date={task.date}
          completed={task.completed}
          expanded={expandedTasks.has(task.id)}
          onToggleDescription={() => handleToggleDescription(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      </div>

      {expandedTasks.has(task.id) && (
        <div
          className={`text-xs text-gray-500 ${
            task.completed ? 'line-through' : ''
          }`}
        >
          <div className="pt-2 grid grid-cols-[40px_auto] max-w-xs">
            {/* Icon Date Picker */}
            {selectedDate[task.id] ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.2508 2.51465C8.31048 2.51465 2.69031 8.1474 2.69031 15.0877C2.69031 22.0281 8.31048 27.6608 15.2508 27.6608C22.2038 27.6608 27.8365 22.0281 27.8365 15.0877C27.8365 8.1474 22.2038 2.51465 15.2508 2.51465ZM15.2637 25.1462C9.70636 25.1462 5.20519 20.6451 5.20519 15.0878C5.20519 9.53045 9.70636 5.02928 15.2637 5.02928C20.821 5.02928 25.3221 9.53045 25.3221 15.0878C25.3221 20.6451 20.821 25.1462 15.2637 25.1462ZM14.0061 8.80121H15.8921V15.4021L21.55 18.7591L20.607 20.3056L14.0061 16.3451V8.80121Z"
                  fill="#2F80ED"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.2508 2.51465C8.31048 2.51465 2.69031 8.1474 2.69031 15.0877C2.69031 22.0281 8.31048 27.6608 15.2508 27.6608C22.2038 27.6608 27.8365 22.0281 27.8365 15.0877C27.8365 8.1474 22.2038 2.51465 15.2508 2.51465ZM15.2637 25.1462C9.70636 25.1462 5.20519 20.6451 5.20519 15.0878C5.20519 9.53045 9.70636 5.02928 15.2637 5.02928C20.821 5.02928 25.3221 9.53045 25.3221 15.0878C25.3221 20.6451 20.821 25.1462 15.2637 25.1462ZM14.0061 8.80121H15.8921V15.4021L21.55 18.7591L20.607 20.3056L14.0061 16.3451V8.80121Z"
                  fill="gray"
                />
              </svg>
            )}

            {/* Date Picker */}
            <div className="relative flex items-center gap-2">
              <div className="flex items-center bg-white px-2 py-1 rounded shadow">
                <DatePicker
                  selected={selectedDate[task.id] || null}
                  onChange={(date: Date | null) => {
                    handleDateChangeInternal(date);
                    setSelectedDate(prev => ({
                      ...prev,
                      [task.id]: date,
                    }));
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="outline-none px-2"
                  calendarClassName="custom-datepicker"
                  popperPlacement="right-start"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10],
                      },
                      fn: ({ rects }) => {
                        const referenceRect = rects.reference;
                        return {
                          x: referenceRect.x + 160,
                          y: referenceRect.y + 25,
                        };
                      },
                    },
                  ]}
                />
                <span>📅</span>
              </div>
            </div>
          </div>
          <div className="pt-2 grid grid-cols-[40px_auto] w-full">
            {selectedDate[task.id] ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z"
                  fill="#2F80ED"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z"
                  fill="gray"
                />
              </svg>
            )}

            {/* <p>{task.description}</p> */}
            <div className="mr-2">
              {isEditingDesc ? (
                <textarea
                  className="text-sm w-full border rounded px-2 py-1"
                  value={tempDescription}
                  onChange={e => setTempDescription(e.target.value)}
                  onBlur={() => {
                    handleDescriptionChange(task.id, tempDescription);
                    setIsEditingDesc(false);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleDescriptionChange(task.id, tempDescription);
                      setIsEditingDesc(false);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => setIsEditingDesc(true)}
                  className="cursor-pointer"
                  title="Click to edit"
                >
                  {task.description || 'No description'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
