import type { Note } from "../types";


interface NotesListProps {
  activeNoteId: number | null;
  isLoading: boolean;
  notes: Note[];
  onDelete: (note: Note) => Promise<void>;
  onSelect: (note: Note) => void;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function NotesList({
  activeNoteId,
  isLoading,
  notes,
  onDelete,
  onSelect,
}: NotesListProps) {
  return (
    <section className="rounded-[1.8rem] border border-forest-700/60 bg-paper/92 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            Your notes
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-[-0.03em] text-white">
            Everything in one place
          </h2>
        </div>
        <span className="rounded-full border border-forest-600 bg-forest-900/80 px-3 py-1 text-sm font-medium text-forest-200">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-forest-700 bg-forest-900/55 px-4 py-8 text-center text-forest-200/72">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-forest-700 bg-forest-900/55 px-4 py-8 text-center text-forest-200/72">
          No notes yet. Create your first note to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => {
            const isActive = activeNoteId === note.id;

            return (
              <article
                key={note.id}
                className={`rounded-2xl border p-4 transition ${
                  isActive
                    ? "border-gold-300/40 bg-gradient-to-r from-forest-700/55 to-forest-800/65 shadow-panel"
                    : "border-forest-700 bg-forest-900/62 hover:border-forest-500 hover:bg-forest-800/72"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => onSelect(note)}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="truncate text-base font-semibold text-white">{note.title}</h3>
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-forest-200/55">
                        {formatDate(note.updated_at)}
                      </span>
                    </div>
                    <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-forest-200/78">
                      {note.content || "No content added yet."}
                    </p>
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-rose-900/60 bg-rose-950/25 px-3 py-2 text-sm font-medium text-rose-100 transition hover:border-rose-700 hover:bg-rose-950/40"
                    onClick={() => onDelete(note)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
