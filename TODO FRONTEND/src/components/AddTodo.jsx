import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    if (!todoName.trim() || !dueDate) {
      return;
    }

    onNewItem(todoName.trim(), dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3 sm:grid-cols-[1fr_180px_auto]">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={todoName}
        onChange={handleNameChange}
        className="h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleDateChange}
        className="h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition [color-scheme:dark] focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
      />
      <button
        type="button"
        className="h-12 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/30 active:scale-[0.98]"
        onClick={handleAddButtonClicked}
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTodo;
