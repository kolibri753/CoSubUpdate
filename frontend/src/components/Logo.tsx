import { Captions } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-4 cursor-pointer text-primary hover:text-primary/80"
    >
      <div className="relative flex items-center before:absolute before:right-[-10px] before:h-10 before:w-0.5 before:bg-current">
        <Captions className="size-8" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold uppercase tracking-wide">
          COSUBUPDATE
        </span>
        <span className="text-xs text-base-content/60">
          Update subtitles collaboratively in real-time
        </span>
      </div>
    </Link>
  );
}

export default Logo;
