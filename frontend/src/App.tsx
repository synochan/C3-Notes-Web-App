import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import { AccountSettingsPanel } from "./components/AccountSettingsPanel";
import { AuthPanel } from "./components/AuthPanel";
import { NoteEditor } from "./components/NoteEditor";
import { NotesList } from "./components/NotesList";
import { authApi, notesApi } from "./lib/api";
import { defaultThemeId, getThemeById, themes } from "./lib/themes";
import type {
  AccountUpdatePayload,
  ChangePasswordPayload,
  LoginPayload,
  Note,
  NotePayload,
  RegisterPayload,
  User,
} from "./types";


const TOKEN_STORAGE_KEY = "c3-notes-auth-token";
const THEME_STORAGE_KEY = "c3-notes-theme";

function sortNotesByUpdatedAt(items: Note[]) {
  return [...items].sort((a, b) => {
    if (a.is_pinned !== b.is_pinned) {
      return Number(b.is_pinned) - Number(a.is_pinned);
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [activeSection, setActiveSection] = useState<"notes" | "archived" | "settings">("notes");
  const [themeId, setThemeId] = useState<string>(() => localStorage.getItem(THEME_STORAGE_KEY) ?? defaultThemeId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);

  const currentTheme = useMemo(() => getThemeById(themeId), [themeId]);
  const themeStyle = useMemo(
    () => currentTheme.variables as CSSProperties,
    [currentTheme],
  );

  useEffect(() => {
    if (!token) {
      setUser(null);
      setNotes([]);
      setActiveNote(null);
      setIsEditorOpen(false);
      setIsSidebarOpen(false);
      setActiveSection("notes");
      setIsLoading(false);
      return;
    }

    void bootstrapSession(token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
  }, [currentTheme.id]);

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    void loadNotes(token, showArchived, search);
  }, [search, showArchived, token, user]);

  useEffect(() => {
    setIsAvatarBroken(false);
  }, [user?.avatar_url]);

  useEffect(() => {
    setShowArchived(activeSection === "archived");
    if (activeSection === "settings") {
      setActiveNote(null);
      setIsEditorOpen(false);
    }
  }, [activeSection]);

  async function bootstrapSession(currentToken: string) {
    try {
      setIsLoading(true);
      const currentUser = await authApi.me(currentToken);
      setUser(currentUser);
      setError(null);
      await loadNotes(currentToken, showArchived, search);
    } catch {
      clearSession();
      setError("Your session has expired. Please sign in again.");
    } finally {
      setIsLoading(false);
    }
  }

  function saveSession(nextToken: string, nextUser: User) {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setNotes([]);
    setActiveNote(null);
    setIsEditorOpen(false);
    setActiveSection("notes");
  }

  function closeEditor() {
    setActiveNote(null);
    setIsEditorOpen(false);
  }

  function openNewNoteEditor() {
    setError(null);
    setMessage(null);
    setActiveNote(null);
    setIsEditorOpen(true);
  }

  function openExistingNote(note: Note) {
    setActiveNote(note);
    setIsEditorOpen(true);
  }

  async function loadNotes(currentToken: string, archived: boolean, query: string) {
    try {
      setIsLoading(true);
      const items = await notesApi.list(currentToken, {
        archived,
        search: query,
      });
      setNotes(sortNotesByUpdatedAt(items));
      setError(null);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to load notes right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshUser(currentToken: string) {
    const currentUser = await authApi.me(currentToken);
    setUser(currentUser);
  }

  async function handleLogin(payload: LoginPayload) {
    try {
      setIsSubmittingAuth(true);
      setError(null);
      const response = await authApi.login(payload);
      saveSession(response.token, response.user);
      setMessage("Signed in successfully.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    } finally {
      setIsSubmittingAuth(false);
    }
  }

  async function handleRegister(payload: RegisterPayload) {
    try {
      setIsSubmittingAuth(true);
      setError(null);
      const response = await authApi.register(payload);
      saveSession(response.token, response.user);
      setMessage("Account created successfully.");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to create account.",
      );
    } finally {
      setIsSubmittingAuth(false);
    }
  }

  async function handleSignOut() {
    if (token) {
      try {
        await authApi.logout(token);
      } catch {
        // Keep local sign out even if server logout fails.
      }
    }
    clearSession();
    setMessage("Signed out successfully.");
  }

  async function handleSubmitNote(payload: NotePayload) {
    if (!token) {
      return;
    }

    if (!payload.title.trim()) {
      setError("Please add a title before saving.");
      return;
    }

    try {
      setError(null);
      setMessage(null);
      setIsSavingNote(true);

      if (activeNote) {
        const updated = await notesApi.update(activeNote.id, payload, token);
        setNotes((current) =>
          sortNotesByUpdatedAt(current.map((note) => (note.id === updated.id ? updated : note))),
        );
        setMessage("Note updated successfully.");
      } else {
        const created = await notesApi.create(payload, token);
        setNotes((current) => sortNotesByUpdatedAt([created, ...current]));
        setMessage("Note created successfully.");
      }

      closeEditor();
      await refreshUser(token);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save note.");
    } finally {
      setIsSavingNote(false);
    }
  }

  async function handleDeleteNote(note: Note) {
    if (!token) {
      return;
    }

    const confirmed = window.confirm(`Delete "${note.title}"?`);
    if (!confirmed) {
      return;
    }

    try {
      setError(null);
      setMessage(null);
      await notesApi.remove(note.id, token);
      setNotes((current) => current.filter((item) => item.id !== note.id));
      if (activeNote?.id === note.id) {
        closeEditor();
      }
      await refreshUser(token);
      setMessage("Note deleted successfully.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete note.");
    }
  }

  async function handlePinToggle(note: Note) {
    if (!token) {
      return;
    }

    try {
      setError(null);
      const updated = await notesApi.update(
        note.id,
        {
          title: note.title,
          content: note.content,
          category: note.category,
          priority: note.priority,
          status: note.status,
          due_at: note.due_at,
          checklist: note.checklist,
          is_pinned: !note.is_pinned,
          is_archived: note.is_archived,
        },
        token,
      );

      setNotes((current) =>
        sortNotesByUpdatedAt(current.map((item) => (item.id === updated.id ? updated : item))),
      );

      if (activeNote?.id === note.id) {
        setActiveNote(updated);
      }

      await refreshUser(token);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to update this note.",
      );
    }
  }

  async function handleArchiveToggle(note: Note) {
    if (!token) {
      return;
    }

    try {
      setError(null);
      const updated = await notesApi.update(
        note.id,
        {
          title: note.title,
          content: note.content,
          category: note.category,
          priority: note.priority,
          status: note.status,
          due_at: note.due_at,
          checklist: note.checklist,
          is_pinned: note.is_pinned,
          is_archived: !note.is_archived,
        },
        token,
      );

      if (showArchived !== updated.is_archived) {
        setNotes((current) => current.filter((item) => item.id !== note.id));
        if (activeNote?.id === note.id) {
          closeEditor();
        }
      } else {
        setNotes((current) =>
          sortNotesByUpdatedAt(current.map((item) => (item.id === updated.id ? updated : item))),
        );
        if (activeNote?.id === note.id) {
          setActiveNote(updated);
        }
      }

      await refreshUser(token);
      setMessage(updated.is_archived ? "Note moved to archive." : "Note restored successfully.");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to update this note.",
      );
    }
  }

  async function handleSaveProfile(payload: AccountUpdatePayload) {
    if (!token) {
      return;
    }

    try {
      setIsSavingAccount(true);
      setError(null);
      const updatedUser = await authApi.updateAccount(payload, token);
      setUser(updatedUser);
      setMessage("Account details updated.");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to update account.",
      );
    } finally {
      setIsSavingAccount(false);
    }
  }

  async function handleChangePassword(payload: ChangePasswordPayload) {
    if (!token) {
      return;
    }

    try {
      setIsSavingAccount(true);
      setError(null);
      const response = await authApi.changePassword(payload, token);
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      setToken(response.token);
      setMessage(response.detail);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to update password.",
      );
    } finally {
      setIsSavingAccount(false);
    }
  }

  async function handleDeleteAccount() {
    if (!token) {
      return;
    }

    try {
      await authApi.deleteAccount(token);
      clearSession();
      setMessage("Account deleted successfully.");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to delete account.",
      );
    }
  }

  if (!token || !user) {
    return (
      <main
        className="theme-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8"
        style={themeStyle}
      >
        <div className="mx-auto mb-6 max-w-6xl">
          {error ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}
        </div>
        <AuthPanel
          isSubmitting={isSubmittingAuth}
          onLogin={handleLogin}
          onRegister={handleRegister}
          theme={currentTheme}
        />
      </main>
    );
  }

  const displayName = user.display_name || user.username;
  const joinDate = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(user.date_joined));

  return (
    <main
      className="theme-shell min-h-screen px-2 py-3 sm:px-4 lg:px-5 lg:py-5"
      style={themeStyle}
    >
      <div className="w-full">
        {error ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        <div className="mb-3 flex items-center justify-between gap-3 rounded-[1.4rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] px-4 py-3 shadow-[var(--theme-shadow)] backdrop-blur-xl lg:hidden">
          <div className="min-w-0">
            <p className="theme-soft text-[11px] font-semibold uppercase tracking-[0.3em]">C3 Notes</p>
            <p className="mt-1 truncate text-base font-semibold text-[var(--theme-text)] sm:text-lg">
              {activeSection === "settings"
                ? "Account settings"
                : activeSection === "archived"
                  ? "Archived notes"
                  : "Your notes"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeSection !== "settings" ? (
              <button
                type="button"
                className="theme-button-primary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition"
                onClick={openNewNoteEditor}
              >
                + New Note
              </button>
            ) : null}
            <button
              type="button"
              className="theme-button-secondary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition"
              onClick={() => setIsSidebarOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside
            className={`theme-panel fixed inset-y-0 left-0 z-40 w-[min(22rem,88vw)] rounded-r-[1.7rem] p-4 backdrop-blur-xl transition-transform duration-300 lg:relative lg:inset-auto lg:left-auto lg:z-auto lg:w-auto lg:translate-x-0 lg:rounded-[1.7rem] lg:p-5 lg:min-h-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-[105%]"
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="theme-soft text-xs font-semibold uppercase tracking-[0.3em]">Workspace</p>
              <button
                type="button"
                className="theme-button-secondary rounded-full px-3 py-2 text-sm font-medium transition lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="theme-hero rounded-[1.5rem] p-4 sm:p-5">
              <p className="theme-soft text-xs font-semibold uppercase tracking-[0.34em]">
                C3 Notes
              </p>
              <div className="mt-5 flex items-center gap-4">
                {user.avatar_url && !isAvatarBroken ? (
                  <img
                    src={user.avatar_url}
                    alt={`${displayName} profile`}
                    className="h-14 w-14 rounded-2xl border border-white bg-white object-cover"
                    onError={() => setIsAvatarBroken(true)}
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white/90 text-lg font-semibold text-[var(--theme-text)]">
                    {displayName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-[var(--theme-text)]">{displayName}</p>
                  <p className="truncate text-sm text-[var(--theme-text-muted)]">@{user.username}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--theme-text-muted)]">Member since {joinDate}</p>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <p className="theme-soft px-2 text-xs font-semibold uppercase tracking-[0.28em] sm:col-span-2 lg:col-span-1">
                Workspace
              </p>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === "notes"
                    ? "theme-button-primary"
                    : "theme-button-secondary"
                }`}
                onClick={() => {
                  setActiveSection("notes");
                  setIsSidebarOpen(false);
                }}
              >
                <span>Active notes</span>
                <span className="rounded-full bg-[var(--theme-card)] px-2 py-1 text-xs text-[var(--theme-text-muted)]">
                  {user.notes_count}
                </span>
              </button>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === "archived"
                    ? "theme-button-primary"
                    : "theme-button-secondary"
                }`}
                onClick={() => {
                  setActiveSection("archived");
                  setIsSidebarOpen(false);
                }}
              >
                <span>Archived notes</span>
                <span className="rounded-full bg-[var(--theme-card)] px-2 py-1 text-xs text-[var(--theme-text-muted)]">
                  View
                </span>
              </button>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <p className="theme-soft px-2 text-xs font-semibold uppercase tracking-[0.28em] sm:col-span-2 lg:col-span-1">
                Accoun
              </p>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === "settings"
                    ? "theme-button-primary"
                    : "theme-button-secondary"
                }`}
                onClick={() => {
                  setActiveSection("settings");
                  setIsSidebarOpen(false);
                }}
              >
                <span>Settings</span>
                <span className="rounded-full bg-[var(--theme-card)] px-2 py-1 text-xs text-[var(--theme-text-muted)]">
                  Manage
                </span>
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="theme-card rounded-3xl p-4">
                <p className="theme-soft text-xs uppercase tracking-[0.28em]">Active notes</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--theme-text)]">{user.notes_count}</p>
              </div>
              <div className="theme-card rounded-3xl p-4">
                <p className="theme-soft text-xs uppercase tracking-[0.28em]">Pinned</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--theme-text)]">
                  {user.pinned_notes_count}
                </p>
              </div>
            </div>
          </aside>

          {isSidebarOpen ? (
            <button
              type="button"
              aria-label="Close sidebar overlay"
              className="fixed inset-0 z-30 bg-[color:color-mix(in_srgb,var(--theme-text)_16%,transparent)] backdrop-blur-[2px] lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          ) : null}

          <section className="space-y-4">
            <div className="theme-panel rounded-[1.7rem] px-4 py-5 backdrop-blur-xl sm:px-6 sm:py-6">
              <p className="theme-soft text-xs font-semibold uppercase tracking-[0.34em]">
                {activeSection === "settings"
                  ? "Account settings"
                  : activeSection === "archived"
                    ? "Archive"
                    : "Workspace"}
              </p>
              <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-[var(--theme-text)] sm:text-4xl lg:text-5xl">
                    {activeSection === "settings"
                      ? "Your account"
                      : activeSection === "archived"
                        ? "Archived notes"
                        : "Your private notes"}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--theme-text-muted)] sm:text-base sm:leading-7">
                    {activeSection === "settings"
                      ? "Update your profile, change your password, and manage account preferences."
                      : activeSection === "archived"
                        ? "Review older notes, restore them when needed, or keep your main workspace uncluttered."
                        : "Capture ideas, manage deadlines, and keep everything organized in a clean workspace."}
                  </p>
                </div>
                {activeSection !== "settings" ? (
                  <button
                    type="button"
                    className="theme-button-primary hidden items-center rounded-full px-5 py-3 text-sm font-semibold transition lg:inline-flex"
                    onClick={openNewNoteEditor}
                  >
                    + New Note
                  </button>
                ) : null}
              </div>
            </div>

            {activeSection === "settings" ? (
              <AccountSettingsPanel
                isSaving={isSavingAccount}
                onChangePassword={handleChangePassword}
                onDeleteAccount={handleDeleteAccount}
                onSaveProfile={handleSaveProfile}
                onSignOut={handleSignOut}
                selectedThemeId={currentTheme.id}
                themeOptions={themes}
                onThemeChange={setThemeId}
                user={user}
              />
            ) : (
              <NotesList
                activeNoteId={activeNote?.id ?? null}
                isLoading={isLoading}
                notes={notes}
                onArchiveToggle={handleArchiveToggle}
                onDelete={handleDeleteNote}
                onPinToggle={handlePinToggle}
                onSearchChange={setSearch}
                onSelect={openExistingNote}
                onShowArchivedChange={setShowArchived}
                search={search}
                showArchived={showArchived}
              />
            )}
          </section>
        </div>
      </div>

      {isEditorOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[color:color-mix(in_srgb,var(--theme-text)_18%,transparent)] px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="max-h-[96vh] w-full max-w-4xl overflow-y-auto sm:max-h-[92vh]">
            <NoteEditor
              activeNote={activeNote}
              isSaving={isSavingNote}
              onCancelEdit={closeEditor}
              onSubmit={handleSubmitNote}
              showCancel
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
