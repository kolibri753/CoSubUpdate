import React from "react";
import { Mars, Venus } from "lucide-react";

interface GenderToggleProps {
  selected: string;
  onChange: (gender: string) => void;
}

const genders = [
  { value: "male", icon: <Mars size={22} /> },
  { value: "female", icon: <Venus size={22} /> },
];

const GenderToggle: React.FC<GenderToggleProps> = ({ selected, onChange }) => {
  const selectedIndex = genders.findIndex((g) => g.value === selected);

  return (
    <div className="flex items-center justify-between space-x-2">
      <label className="text-primary text-sm">
        Pick gender (purely cosmetic):
      </label>
      <div className="relative flex bg-base-200 p-1 rounded-full w-32 h-10 overflow-hidden">
        <div
          className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-primary rounded-full transition-transform duration-300"
          style={{ transform: `translateX(${selectedIndex * 100}%)` }}
        ></div>
        {genders.map(({ value, icon }) => (
          <button
            key={value}
            type="button"
            className={`relative flex items-center justify-center gap-1 w-1/2 px-3 py-1 rounded-full transition font-semibold text-sm ${
              selected === value ? "text-white" : "text-primary"
            }`}
            onClick={() => onChange(value)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderToggle;