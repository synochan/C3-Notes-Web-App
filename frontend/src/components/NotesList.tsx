import type { Note } from "../types";


interface NotesListProps {
  activeNoteId: number | null;
  isLoading: boolean;
  notes: Note[];
  onArchiveToggle: (note: Note) => Promise<void>;
  onDelete: (note: Note) => Promise<void>;
  onPinToggle: (note: Note) => Promise<void>;
  onSelect: (note: Note) => void;
  search: string;
  showArchived: boolean;
  onSearchChange: (value: string) => void;
  onShowArchivedChange: (value: boolean) => void;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatDeadline(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusLabel(value: Note["status"]) {
  if (value === "in_progress") {
    return "In Progress";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function NotesList({
  activeNoteId,
  isLoading,
  notes,
  onArchiveToggle,
  onDelete,
  onPinToggle,
  onSelect,
  search,
  showArchived,
  onSearchChange,
  onShowArchivedChange,
}: NotesListProps) {
  return (
    <section className="theme-panel flex h-[70vh] min-h-[30rem] max-h-[70vh] flex-col overflow-hidden rounded-[1.7rem] p-4 backdrop-blur-xl sm:h-[calc(100vh-12rem)] sm:min-h-[36rem] sm:max-h-[calc(100vh-12rem)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="theme-soft text-xs font-semibold uppercase tracking-[0.3em]">
            Your notes
          </p>
          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] text-[var(--theme-text)] sm:text-3xl">
            Everything in one place
          </h2>
        </div>
        <span className="theme-pill w-fit rounded-full px-3 py-1 text-sm font-medium">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button
          type="button"
          className="theme-button-secondary rounded-full px-4 py-2 text-sm font-medium transition"
          onClick={() => onShowArchivedChange(!showArchived)}
        >
          {showArchived ? "Show active" : "Show archived"}
        </button>
      </div>

      {isLoading ? (
        <div className="theme-card-soft flex flex-1 items-center justify-center rounded-2xl border-dashed px-4 py-8 text-center text-[var(--theme-text-muted)]">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="theme-card-soft flex flex-1 items-center justify-center rounded-2xl border-dashed px-4 py-8 text-center text-[var(--theme-text-muted)]">
          No notes yet. Create your first note to get started.
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="notes-scroll theme-notes-scroll h-full space-y-3 overflow-y-auto pr-1 sm:pr-2">
          {notes.map((note) => {
            const isActive = activeNoteId === note.id;

            return (
              <article
                key={note.id}
                className={`rounded-2xl border p-4 transition ${
                  isActive
                    ? "border-[var(--theme-border-strong)] bg-[var(--theme-accent)] shadow-[var(--theme-shadow-soft)]"
                    : "border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-card-soft)]"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => onSelect(note)}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-base font-semibold text-[var(--theme-text)]">{note.title}</h3>
                      {note.is_pinned ? (
                        <span className="theme-pill-pink rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                          Pinned
                        </span>
                      ) : null}
                      <span className="theme-pill rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                        {statusLabel(note.status)}
                      </span>
                      <span className="theme-pill rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                        {note.priority}
                      </span>
                      {note.category ? (
                        <span className="theme-pill-green rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                          {note.category}
                        </span>
                      ) : null}
                      <span className="theme-soft text-xs font-medium uppercase tracking-[0.16em]">
                        {formatDate(note.updated_at)}
                      </span>
                    </div>
                    <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-[var(--theme-text-muted)]">
                      {note.content || "No content added yet."}
                    </p>
                    <div className="theme-soft mt-3 flex flex-wrap gap-3 text-xs">
                      {formatDeadline(note.due_at) ? <span>Due {formatDeadline(note.due_at)}</span> : null}
                      <span>
                        {note.checklist.filter((item) => item.completed).length}/{note.checklist.length} checklist items completed
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-wrap gap-2 sm:flex-col">
                    <button
                      type="button"
                      className="theme-button-secondary rounded-full px-3 py-2 text-sm font-medium transition"
                      onClick={() => onPinToggle(note)}
                    >
                      {note.is_pinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                      type="button"
                      className="theme-button-secondary rounded-full px-3 py-2 text-sm font-medium transition"
                      onClick={() => onArchiveToggle(note)}
                    >
                      {note.is_archived ? "Restore" : "Archive"}
                    </button>
                    <button
                      type="button"
                      className="theme-button-danger rounded-full px-3 py-2 text-sm font-medium transition"
                      onClick={() => onDelete(note)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      )}
    </section>
  );
}
