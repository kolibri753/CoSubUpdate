import React from "react";
import { formatTime } from "../../utils/formatTime";
import { parseTime } from "../../utils/parseTime";

interface TimeInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, onBlur }) => {
  return (
    <input
      type="text"
      value={formatTime(value)}
      onChange={(e) => {
        const parsed = parseTime(e.target.value);
        onChange(parsed);
      }}
      onBlur={onBlur}
      className="input input-bordered input-md w-26 h-10 focus:border-primary focus:outline-none"
    />
  );
};

export default TimeInput;
