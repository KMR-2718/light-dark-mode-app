import { useEffect, useState } from "react";

export default function QuoteCard() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] =useState(true);
  const [error, setError] = useState("");

  async function getQuote() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setQuote(data);
    } catch {
      setError("Couldn't load today's motivation.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <section
      className="
        mt-6
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
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            💡 Daily Motivation
          </h2>

          <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Refresh anytime for a new inspiring quote.
          </p>
        </div>

        <button
          onClick={getQuote}
          className="
            w-full
            sm:w-auto
            rounded-xl
            bg-blue-600
            px-6
            py-3
            text-white
            font-medium
            transition
            hover:bg-blue-700
            active:scale-95
          "
        >
          🔄 New Quote
        </button>
      </div>

      {/* Content */}
      <div
        className="
          mt-8
          min-h-[180px]
          flex
          items-center
          justify-center
        "
      >
        {loading ? (
          <div className="w-full max-w-3xl animate-pulse space-y-4">
            <div className="h-5 rounded bg-gray-200 dark:bg-zinc-800"></div>
            <div className="h-5 w-11/12 rounded bg-gray-200 dark:bg-zinc-800"></div>
            <div className="h-5 w-8/12 rounded bg-gray-200 dark:bg-zinc-800"></div>

            <div className="mt-6 h-4 w-32 mx-auto rounded bg-gray-200 dark:bg-zinc-800"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 text-sm sm:text-base">
              {error}
            </p>

            <button
              onClick={getQuote}
              className="
                mt-5
                rounded-lg
                bg-red-500
                px-6
                py-2.5
                text-white
                transition
                hover:bg-red-600
              "
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                italic
                leading-relaxed
                font-medium
              "
            >
              "{quote.quote}"
            </p>

            <p
              className="
                mt-6
                text-base
                sm:text-lg
                md:text-xl
                font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              — {quote.author}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}