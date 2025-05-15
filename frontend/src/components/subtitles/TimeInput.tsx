import React, { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils/formatTime";
import { parseTime } from "@/utils/parseTime";

interface TimeInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

// Editable positions in "HH:MM:SS,mmm"
const EDITABLE_POS = [0, 1, 3, 4, 6, 7, 9, 10, 11];

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [raw, setRaw] = useState<string>(formatTime(value));
  const prevValue = useRef<number>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep mask in sync if prop changes externally
  useEffect(() => {
    if (value !== prevValue.current) {
      const formatted = formatTime(value);
      setRaw(formatted);
      prevValue.current = value;
    }
  }, [value]);

  // Helper to update both mask + parent state immediately
  const commit = (newRaw: string) => {
    setRaw(newRaw);
    onChange(parseTime(newRaw));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    const input = inputRef.current;
    if (!input) return;
    const pos = input.selectionStart ?? 0;
    let newArr = raw.split("");

    // Digit input
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const idx = EDITABLE_POS.find((p) => p >= pos) ?? EDITABLE_POS[0];
      newArr[idx] = e.key;
      const newRaw = newArr.join("");
      commit(newRaw);
      const nextCaret = EDITABLE_POS[EDITABLE_POS.indexOf(idx) + 1] ?? idx + 1;
      setTimeout(() => input.setSelectionRange(nextCaret, nextCaret), 0);
    }
    // Backspace
    else if (e.key === "Backspace") {
      e.preventDefault();
      const prev =
        [...EDITABLE_POS].reverse().find((p) => p < pos) ?? EDITABLE_POS[0];
      newArr[prev] = "0";
      const newRaw = newArr.join("");
      commit(newRaw);
      setTimeout(() => input.setSelectionRange(prev, prev), 0);
    }
    // Delete
    else if (e.key === "Delete") {
      e.preventDefault();
      const cur = EDITABLE_POS.find((p) => p >= pos) ?? EDITABLE_POS[0];
      newArr[cur] = "0";
      const newRaw = newArr.join("");
      commit(newRaw);
      setTimeout(() => input.setSelectionRange(cur, cur), 0);
    }
    // Navigation
    else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      // allow
    } else {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 9);
    const padded = digits.padEnd(9, "0");
    const newRaw = `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(
      4,
      6
    )},${padded.slice(6, 9)}`;
    commit(newRaw);
    setTimeout(() => {
      const endPos = EDITABLE_POS[EDITABLE_POS.length - 1] + 1;
      inputRef.current?.setSelectionRange(endPos, endPos);
    }, 0);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={raw}
      onChange={() => {}}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      disabled={disabled}
      inputMode="numeric"
      className="input input-bordered input-md w-26 h-10 text-center focus:border-primary focus:outline-none"
    />
  );
};

export default TimeInput;
