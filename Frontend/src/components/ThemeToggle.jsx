import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="
        relative
        flex
        h-12
        w-24
        items-center
        rounded-full
        border
        border-zinc-300
        bg-white
        p-1
        shadow-md
        transition-all
        duration-300
        hover:scale-105
        dark:border-zinc-700
        dark:bg-zinc-900
      "
    >
      <div
        className={`
          absolute
          h-10
          w-10
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-purple-500
          shadow-lg
          transition-all
          duration-300
          ${theme === "dark" ? "translate-x-12" : "translate-x-0"}
        `}
      />

      <span className="z-10 flex-1 text-lg">
        ☀️
      </span>

      <span className="z-10 flex-1 text-lg">
        🌙
      </span>
    </button>
  );
}