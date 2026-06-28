import { useEffect, useState } from "react";

const defaultHabits = [
  { id: 1, name: "💧 Drink 2L Water", completed: false },
  { id: 2, name: "🏃 Exercise", completed: false },
  { id: 3, name: "📖 Read 20 Minutes", completed: false },
  { id: 4, name: "🧘 Meditation", completed: false },
  { id: 5, name: "😴 Sleep 8 Hours", completed: false },
];

export default function HabitTracker() {
  const today = new Date().toLocaleDateString();

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    const savedDate = localStorage.getItem("habit-date");

    if (saved && savedDate === today) {
      return JSON.parse(saved);
    }

    localStorage.setItem("habit-date", today);
    localStorage.setItem("habits", JSON.stringify(defaultHabits));

    return defaultHabits;
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("habit-date", today);
  }, [habits, today]);

  function toggleHabit(id) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }

  function resetHabits() {
    setHabits(defaultHabits);
  }

  const completed = habits.filter((h) => h.completed).length;
  const progress = (completed / habits.length) * 100;

  return (
    <section
      className="
        rounded-3xl
        border
        border-gray-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
        shadow-lg
        p-5
        sm:p-6
        md:p-8
        transition-all
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            🎯 Habit Tracker
          </h2>

          <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {completed} of {habits.length} habits completed
          </p>
        </div>

        <button
          onClick={resetHabits}
          className="
            w-full
            sm:w-auto
            rounded-xl
            border
            border-gray-300
            dark:border-zinc-700
            px-5
            py-3
            text-sm
            font-medium
            transition
            hover:bg-gray-100
            dark:hover:bg-zinc-800
            active:scale-95
          "
        >
          Reset
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Progress
          </span>

          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Habits */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <label
            key={habit.id}
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-2xl
              bg-gray-50
              dark:bg-zinc-800
              p-4
              cursor-pointer
              transition
              hover:bg-gray-100
              dark:hover:bg-zinc-700
            "
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className="h-5 w-5 accent-emerald-500 shrink-0"
              />

              <span
                className={`
                  text-sm
                  sm:text-base
                  break-words
                  ${
                    habit.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : ""
                  }
                `}
              >
                {habit.name}
              </span>
            </div>

            {habit.completed && (
              <span className="text-xl text-emerald-500 font-bold shrink-0">
                ✓
              </span>
            )}
          </label>
        ))}
      </div>
    </section>
  );
}