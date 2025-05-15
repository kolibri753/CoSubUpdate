import React, { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils/formatTime";
import { parseTime } from "@/utils/parseTime";

interface TimeInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  disabled?: boolean;
}

const EDITABLE_POS = [0, 1, 3, 4, 6, 7, 9, 10, 11];

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, onBlur, disabled = false }) => {
  const [raw, setRaw] = useState<string>(formatTime(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValue = useRef<number>(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setRaw(formatTime(value));
      prevValue.current = value;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    const input = inputRef.current;
    if (!input) return;
    const pos = input.selectionStart ?? 0;

    // Digit input
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const nextEditable = EDITABLE_POS.find(p => p >= pos) ?? EDITABLE_POS[0];
      const newArr = raw.split("");
      newArr[nextEditable] = e.key;
      setRaw(newArr.join(""));
      const idx = EDITABLE_POS.indexOf(nextEditable);
      const caret = idx < EDITABLE_POS.length - 1 ? EDITABLE_POS[idx + 1] : nextEditable + 1;
      setTimeout(() => input.setSelectionRange(caret, caret), 0);
    }
    // Backspace
    else if (e.key === "Backspace") {
      e.preventDefault();
      const prevEditable = [...EDITABLE_POS].reverse().find(p => p < pos) ?? EDITABLE_POS[0];
      const newArr = raw.split("");
      newArr[prevEditable] = "0";
      setRaw(newArr.join(""));
      setTimeout(() => input.setSelectionRange(prevEditable, prevEditable), 0);
    }
    // Delete
    else if (e.key === "Delete") {
      e.preventDefault();
      const curEditable = EDITABLE_POS.find(p => p >= pos) ?? EDITABLE_POS[0];
      const newArr = raw.split("");
      newArr[curEditable] = "0";
      setRaw(newArr.join(""));
      setTimeout(() => input.setSelectionRange(curEditable, curEditable), 0);
    }
    // Navigation
    else if (["ArrowLeft","ArrowRight","Home","End"].includes(e.key)) {
      // allow
    }
    else {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboard = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 9);
    const padded = clipboard.padEnd(9, "0");
    const newRaw = `${padded.slice(0,2)}:${padded.slice(2,4)}:${padded.slice(4,6)},${padded.slice(6,9)}`;
    setRaw(newRaw);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.setSelectionRange(EDITABLE_POS.slice(-1)[0] + 1, EDITABLE_POS.slice(-1)[0] + 1);
    }, 0);
  };

  const handleBlur = () => {
    onChange(parseTime(raw));
    onBlur();
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={raw}
      onChange={() => {}}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onBlur={handleBlur}
      disabled={disabled}
      inputMode="numeric"
      className="input input-bordered input-md w-32 h-10 text-center focus:border-primary focus:outline-none"
    />
  );
};

export default TimeInput;
