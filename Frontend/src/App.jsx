import ThemeToggle from "./components/ThemeToggle";
import TodoCard from "./components/TodoCard";
import HabitTracker from "./components/HabitTracker";
import QuoteCard from "./components/QuoteCard";

export default function App() {
  return (
    <main
      className="
        min-h-screen
        bg-gray-100
        dark:bg-zinc-950
        text-gray-900
        dark:text-white
        transition-colors
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
          py-6
          sm:py-8
          md:py-10
        "
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 mb-8 md:mb-12">
          <ThemeToggle />

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              leading-tight
            "
          >
            Productivity Dashboard
          </h1>

          <p
            className="
              max-w-2xl
              text-sm
              sm:text-base
              md:text-lg
              text-gray-600
              dark:text-gray-400
            "
          >
            Organize your tasks, build healthy habits, and stay productive every
            day.
          </p>
        </header>

        {/* Main Cards */}
        <section
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            md:gap-8
          "
        >
          <TodoCard />
          <HabitTracker />
        </section>

        {/* Quote */}
        <section className="mt-6 md:mt-8">
          <QuoteCard />
        </section>
      </div>
    </main>
  );
}