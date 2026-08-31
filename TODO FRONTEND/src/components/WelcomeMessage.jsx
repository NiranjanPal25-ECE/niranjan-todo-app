const WelcomeMessage = () => {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-300/5 px-6 py-10 text-center">
      <p className="text-lg font-semibold text-white">Your list is clear.</p>
      <p className="mt-2 text-sm text-slate-400">
        Add your first task above and give the day a shape.
      </p>
    </div>
  );
};

export default WelcomeMessage;
