import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <main
      className="
        min-h-screen
        bg-gray-100
        text-gray-900
        dark:bg-zinc-950
        dark:text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <ThemeToggle />

        <div
          className="
            mt-10
            grid
            w-full
            max-w-4xl
            gap-6
            md:grid-cols-3
          "
        >
        </div>
      </div>
    </main>
  );
}