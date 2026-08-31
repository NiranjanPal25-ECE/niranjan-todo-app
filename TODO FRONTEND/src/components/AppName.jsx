function AppName({ taskCount, activeTaskCount }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          Daily Planner
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal text-white sm:text-5xl">
          Todo App
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
          Keep your day focused with a clean list of tasks and due dates.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-left sm:text-right">
        <div className="rounded-xl bg-slate-950/30 px-4 py-3">
          <p className="text-3xl font-bold text-white">{activeTaskCount}</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Active
          </p>
        </div>
        <div className="rounded-xl bg-slate-950/30 px-4 py-3">
          <p className="text-3xl font-bold text-white">{taskCount}</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Total
          </p>
        </div>
      </div>
    </header>
  );
}

export default AppName;
