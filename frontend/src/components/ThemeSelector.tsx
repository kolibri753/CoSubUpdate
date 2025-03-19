import { THEMES } from "../config/themeConfig";
import { THEME_ICONS, DEFAULT_ICON } from "../config/themeIconsMap";
import { useThemeStore } from "../store/useThemeStore";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();
  const SelectedIcon = THEME_ICONS[theme] || DEFAULT_ICON;

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <SelectedIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl backdrop-blur-lg bg-base-200 rounded-2xl w-56 border border-base-content/10 max-h-60 overflow-y-auto"
      >
        <h3 className="px-4 py-2 text-sm font-semibold text-base-content/60">
          Theme Preferences
        </h3>

        {THEMES.map(({ name, label }) => {
          const ThemeIcon = THEME_ICONS[name] || DEFAULT_ICON;

          return (
            <button
              key={name}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                theme === name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(name)}
            >
              <ThemeIcon className="size-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeSelector;
