import { FormEvent, useState } from "react";

import type { ThemeOption } from "../lib/themes";
import type { LoginPayload, RegisterPayload } from "../types";


interface AuthPanelProps {
  isSubmitting: boolean;
  onLogin: (payload: LoginPayload) => Promise<void>;
  onRegister: (payload: RegisterPayload) => Promise<void>;
  theme: ThemeOption;
}

export function AuthPanel({ isSubmitting, onLogin, onRegister, theme }: AuthPanelProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState<LoginPayload>({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    username: "",
    email: "",
    display_name: "",
    password: "",
  });

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onLogin(loginForm);
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onRegister(registerForm);
  }

  return (
    <section className="theme-panel mx-auto max-w-6xl rounded-[2rem] p-6 backdrop-blur-xl sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="theme-hero rounded-[1.8rem] p-6">
          <p className="theme-soft text-xs font-semibold uppercase tracking-[0.34em]">
            C3 Notes
          </p>
          <h1 className="mt-4 max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-[var(--theme-text)] sm:text-5xl">
            {theme.id === "midnight-bloom"
              ? "Luminous notes for focused evening work."
              : "Pastel, calm note-taking for focused work."}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--theme-text-muted)]">
            Keep your notes, checklists, deadlines, and account settings in one soft, organized
            workspace that stays easy to use.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4">
              <p className="text-sm font-semibold text-[var(--theme-text)]">Private workspace</p>
              <p className="mt-2 text-sm leading-6 text-[var(--theme-text-muted)]">
                Every account gets its own secure notes, archive, and settings.
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4">
              <p className="text-sm font-semibold text-[var(--theme-text)]">Useful note tools</p>
              <p className="mt-2 text-sm leading-6 text-[var(--theme-text-muted)]">
                Search, pin, archive, manage deadlines, and add checklist items with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="theme-panel rounded-[1.8rem] p-6">
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "theme-button-primary"
                  : "theme-button-secondary"
              }`}
              onClick={() => setMode("login")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "theme-button-primary"
                  : "theme-button-secondary"
              }`}
              onClick={() => setMode("register")}
            >
              Create account
            </button>
          </div>

          {mode === "login" ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Username</label>
                <input
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, username: event.target.value }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Password</label>
                <input
                  type="password"
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
              </div>
              <button
                type="submit"
                className="theme-button-primary inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Display name</label>
                <input
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={registerForm.display_name}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      display_name: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Username</label>
                <input
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={registerForm.username}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, username: event.target.value }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Email</label>
                <input
                  type="email"
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={registerForm.email}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Password</label>
                <input
                  type="password"
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                  value={registerForm.password}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
              </div>
              <button
                type="submit"
                className="theme-button-primary inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
