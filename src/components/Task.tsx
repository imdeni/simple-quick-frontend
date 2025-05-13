import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  taskOpen: boolean;
}

interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueIn: number;
  user: string;
  completed?: boolean;
  date: Date;
}

const Task: React.FC<Props> = ({ taskOpen }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Record<number, Date | null>>(
    {}
  );
  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, commentsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
      ]);

      const users = await usersRes.json();
      const comments = await commentsRes.json();

      const mockTasks: TaskItem[] = comments
        .slice(0, 5)
        .map((comment: any, index: number) => {
          const user = users.find(
            (u: any) => u.id === (comment.postId % users.length) + 1
          );
          return {
            id: comment.id,
            title: `${comment.body.split(' ').slice(0, 5).join(' ')}...`,
            description: comment.body,
            dueIn: (index + 1) * 2,
            user: user?.name ?? 'Unknown',
            completed: false,
            date: new Date(),
          };
        });

      setTasks(mockTasks);
    };

    fetchData();
  }, []);

  const toggleCompletion = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleDescription = (id: number) => {
    setExpandedTasks(prev => {
      const newExpandedTasks = new Set(prev);
      if (newExpandedTasks.has(id)) {
        newExpandedTasks.delete(id);
      } else {
        newExpandedTasks.add(id);
      }
      return newExpandedTasks;
    });
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div
      className={`fixed bottom-28 right-4 bg-white rounded-md shadow-lg w-xs lg:w-2xl h-96 lg:h-128 landscape:h-64 lg:landscape:h-128 text-black transition-transform duration-300 ${
        taskOpen ? 'translate-x-0' : 'translate-x-[150%]'
      }`}
    >
      <div className="py-[24px] px-[32px] h-full flex flex-col">
        <div className="overflow-y-auto space-y-4 text-sm">
          {[...incompleteTasks, ...completedTasks].map(task => (
            <div key={task.id} className="flex flex-col border-b pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 mr-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-gray-800 ${
                        task.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end text-xs text-black whitespace-nowrap min-w-[200px] gap-1">
                  <div className="grid grid-cols-[auto_auto_1fr_auto] gap-2">
                    {!task.completed && (
                      <span className="text-red-500">
                        {task.dueIn} Days Left
                      </span>
                    )}
                    <span>{task.date.toLocaleDateString()}</span>

                    <div className="flex items-start gap-2">
                      <div
                        onClick={() => handleToggleDescription(task.id)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`w-4 h-4 transition-transform duration-300 ${
                            expandedTasks.has(task.id) ? 'rotate-180' : ''
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
                    <div className="flex items-start gap-2">
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
                  </div>
                </div>
              </div>
              {expandedTasks.has(task.id) && (
                <div
                  className={`text-xs text-gray-500 ${
                    task.completed ? 'line-through' : ''
                  }`}
                >
                  <div className="pt-2 grid grid-cols-[40px_auto] max-w-xs">
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

                    <div className="relative flex items-center gap-2">
                      <div className="flex items-center bg-white px-2 py-1 rounded shadow">
                        <DatePicker
                          selected={selectedDate[task.id] || null}
                          onChange={date =>
                            setSelectedDate(prev => ({
                              ...prev,
                              [task.id]: date,
                            }))
                          }
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
                              fn: ({ x, y, rects }) => {
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

                    <p>{task.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm">
            New Task
          </button>
        </div>
      </div>
    </div>
  );
};
export default Task;
