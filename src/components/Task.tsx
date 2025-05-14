import React, { useEffect, useState } from 'react';
import TaskItem from './task/TaskItem';

interface Props {
  taskOpen: boolean;
}

interface TaskItemData {
  id: number;
  title: string;
  description: string;
  dueIn: number;
  user: string;
  completed?: boolean;
  date: Date;
}

const Task: React.FC<Props> = ({ taskOpen }) => {
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Record<number, Date | null>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (taskOpen) {
      setLoading(true);
      timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }

    return () => clearTimeout(timer);
  }, [taskOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, commentsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
      ]);

      const users = await usersRes.json();
      const comments = await commentsRes.json();

      const mockTasks: TaskItemData[] = comments
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
      setLoading(false);
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

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const handleSelectChange = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleNewTaskClick = () => {
    setLoading(true);
    setTimeout(() => {
      const newTask: TaskItemData = {
        id: tasks.length + 1,
        title: '',
        description: 'No Description',
        dueIn: 0,
        user: '',
        completed: false,
        date: new Date(),
      };

      setTasks(prev => [...prev, newTask]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const handleDateChange = (id: number, date: Date) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, date: date } : task))
    );
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };

  return (
    <div
      className={`fixed bottom-28 right-4 bg-white rounded-md shadow-lg w-xs lg:w-2xl h-96 lg:h-128 landscape:h-64 lg:landscape:h-128 text-black transition-transform duration-300 ${
        taskOpen ? 'translate-x-0' : 'translate-x-[150%]'
      }`}
    >
      <div className="py-[24px] px-[32px] h-full flex flex-col">
        <div className="pb-2 flex justify-between items-center text-sm">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
            onChange={handleSelectChange}
          >
            <option value="all">My Tasks</option>
            <option value="incomplete">Personal Errands</option>
            <option value="completed">Urgent To-Do</option>
          </select>

          <button
            onClick={handleNewTaskClick}
            className="!bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
          >
            New Task
          </button>
        </div>

        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-8 border-gray-200 border-t-gray-500" />
            <p>Loading Tasks...</p>
          </div>
        ) : (
          <div className="overflow-y-auto space-y-4 text-sm">
            {[...incompleteTasks, ...completedTasks].map(task => (
              <TaskItem
                key={task.id}
                task={task}
                toggleCompletion={toggleCompletion}
                handleToggleDescription={handleToggleDescription}
                expandedTasks={expandedTasks}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onTitleChange={handleTitleChange}
                onDelete={handleDeleteTask}
                handleDateChange={handleDateChange}
                handleDescriptionChange={handleDescriptionChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
