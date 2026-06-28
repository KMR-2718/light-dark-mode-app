import { useEffect, useState } from "react";

export default function TodoCard() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!task.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const completed = todos.filter((t) => t.completed).length;

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
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          📝 Todo List
        </h2>

        <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {completed} of {todos.length} completed
        </p>
      </div>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
          className="
            w-full
            flex-1
            rounded-xl
            border
            border-gray-300
            dark:border-zinc-700
            bg-transparent
            px-4
            py-3
            text-sm
            sm:text-base
            outline-none
            transition
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <button
          onClick={addTodo}
          className="
            w-full
            sm:w-auto
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
            active:scale-95
          "
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-gray-300
            dark:border-zinc-700
            py-12
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          🎉 No tasks yet. Add your first one!
        </div>
      ) : (
        <ul className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                bg-gray-50
                dark:bg-zinc-800
                p-4
                transition
                hover:bg-gray-100
                dark:hover:bg-zinc-700
              "
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 accent-blue-600 shrink-0"
                />

                <span
                  className={`
                    text-sm
                    sm:text-base
                    break-words
                    ${
                      todo.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : ""
                    }
                  `}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="
                  shrink-0
                  rounded-lg
                  p-2
                  text-red-500
                  transition
                  hover:bg-red-100
                  hover:text-red-600
                  dark:hover:bg-red-900/20
                "
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}