import React from 'react';

interface TaskCheckboxProps {
  completed?: boolean;
  onToggle: () => void;
}

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({ completed, onToggle }) => (
  <input
    type="checkbox"
    checked={completed}
    onChange={onToggle}
    className="mt-1"
  />
);

export default TaskCheckbox;
