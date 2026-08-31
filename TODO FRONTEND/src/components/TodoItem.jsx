function TodoItem({
  id,
  todoName,
  todoDate,
  completed,
  onCompleteClick,
  onDeleteClick,
}) {
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <article
      className={`group grid gap-4 rounded-2xl border p-4 transition sm:grid-cols-[auto_1fr_auto_auto] sm:items-center ${
        completed
          ? "border-emerald-300/20 bg-emerald-300/[0.06]"
          : "border-white/10 bg-white/[0.08] hover:border-cyan-300/40 hover:bg-white/[0.12]"
      }`}
    >
      <button
        type="button"
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-bold transition focus:outline-none focus:ring-4 ${
          completed
            ? "border-emerald-300/40 bg-emerald-300 text-slate-950 focus:ring-emerald-300/20"
            : "border-cyan-300/40 text-cyan-200 hover:bg-cyan-300 hover:text-slate-950 focus:ring-cyan-300/20"
        }`}
        onClick={() => !completed && onCompleteClick(id)}
        disabled={completed}
        aria-label={completed ? "Completed" : "Mark completed"}
      >
        {completed ? "✓" : ""}
      </button>

      <div className="min-w-0">
        <p
          className={`truncate text-base font-semibold ${
            completed ? "text-slate-400 line-through" : "text-white"
          }`}
        >
          {todoName}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {completed ? "Completed" : "Personal task"}
        </p>
      </div>

      <time className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/50 px-4 text-sm font-medium text-slate-200">
        {formattedDate}
      </time>

      <button
        type="button"
        className="h-10 rounded-full border border-rose-300/30 px-4 text-sm font-semibold text-rose-200 transition hover:border-rose-300 hover:bg-rose-400/10 focus:outline-none focus:ring-4 focus:ring-rose-300/20"
        onClick={() => onDeleteClick(id)}
      >
        Delete
      </button>
    </article>
  );
}

export default TodoItem;
