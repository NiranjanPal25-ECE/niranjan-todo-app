import { loginWithGoogle } from "../services/AuthService";

function Login() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 flex items-center justify-center">
      <section className="w-full max-w-md">
        <div className="rounded-4xl border border-white/10 bg-white/6 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur">
          
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              Daily Planner
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Todo App
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Sign in to manage your personal tasks.
            </p>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <span className="text-lg font-bold">
              G
            </span>

            Continue with Google
          </button>

        </div>
      </section>
    </main>
  );
}

export default Login;