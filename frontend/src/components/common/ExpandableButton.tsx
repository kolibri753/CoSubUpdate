import { ReactNode } from "react";

interface AnimatedButtonProps {
  icon: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}

const AnimatedButton = ({
  icon,
  text,
  className,
  onClick,
}: AnimatedButtonProps) => {
  return (
    <button
      className={`btn btn-sm group relative flex items-center w-10 hover:w-24 transition-all duration-300 overflow-hidden ${className}`}
      onClick={onClick}
    >
      <span className="absolute left-2">{icon}</span>
      <span className="ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </span>
    </button>
  );
};

export default AnimatedButton;
