import React from 'react';
import DatePicker from 'react-datepicker';

interface TaskDatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const TaskDatePicker: React.FC<TaskDatePickerProps> = ({ date, onChange }) => (
  <div className="relative flex items-center gap-2">
    <div className="flex items-center bg-white px-2 py-1 rounded shadow">
      <DatePicker
        selected={date}
        onChange={onChange}
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
);

export default TaskDatePicker;
