import React from "react";
import { formatTime } from "@/utils/formatTime";
import { parseTime } from "@/utils/parseTime";

interface TimeInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  disabled?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  onBlur,
  disabled = false,
}) => {
  return (
    <input
      type="text"
      value={formatTime(value)}
      onChange={(e) => {
        const parsed = parseTime(e.target.value);
        onChange(parsed);
      }}
      onBlur={onBlur}
      disabled={disabled}
      className="input input-bordered input-md w-26 h-10 focus:border-primary focus:outline-none"
    />
  );
};

export default TimeInput;
