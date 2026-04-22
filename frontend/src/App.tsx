import { useEffect, useState } from "react";

import { NoteEditor } from "./components/NoteEditor";
import { NotesList } from "./components/NotesList";
import { notesApi } from "./lib/api";
import type { Note, NotePayload } from "./types";


function sortNotesByUpdatedAt(items: Note[]) {
  return [...items].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setIsLoading(true);
      const items = await notesApi.list();
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

  async function handleSubmit(payload: NotePayload) {
    if (!payload.title.trim()) {
      setError("Please add a title before saving.");
      return;
    }

    try {
      setError(null);
      setMessage(null);
      setIsSaving(true);

      if (activeNote) {
        const updated = await notesApi.update(activeNote.id, payload);
        setNotes((current) =>
          sortNotesByUpdatedAt(
            current.map((note) => (note.id === updated.id ? updated : note)),
          ),
        );
        setActiveNote(updated);
        setMessage("Note updated successfully.");
      } else {
        const created = await notesApi.create(payload);
        setNotes((current) => sortNotesByUpdatedAt([created, ...current]));
        setMessage("Note created successfully.");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save note.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(note: Note) {
    const confirmed = window.confirm(`Delete "${note.title}"?`);
    if (!confirmed) {
      return;
    }

    try {
      setError(null);
      setMessage(null);
      await notesApi.remove(note.id);
      setNotes((current) => current.filter((item) => item.id !== note.id));
      if (activeNote?.id === note.id) {
        setActiveNote(null);
      }
      setMessage("Note deleted successfully.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete note.");
    }
  }

  return (
    <main className="min-h-screen bg-hero-radial px-4 py-8 text-ink sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-forest-700/60 bg-paper/88 px-6 py-8 shadow-glow backdrop-blur-xl sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold-300">
            Simple Notes Web App
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
            <div>
              <h1 className="max-w-3xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Quiet, focused note-taking with a darker, premium workspace feel.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-forest-200/86 sm:text-lg">
                Create, edit, and manage personal notes in a minimalist environment designed to
                feel calm, professional, and expensive without becoming visually heavy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-forest-600 bg-forest-900/80 px-4 py-2 text-sm font-medium text-forest-200">
                  Minimal interface
                </span>
                <span className="rounded-full border border-forest-600 bg-forest-900/80 px-4 py-2 text-sm font-medium text-forest-200">
                  Premium dark palette
                </span>
                <span className="rounded-full border border-forest-600 bg-forest-900/80 px-4 py-2 text-sm font-medium text-forest-200">
                  Fast note management
                </span>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-forest-700/60 bg-gradient-to-br from-forest-850 to-forest-900 p-6 text-slate-100 shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300/90">
                Built with
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-forest-200/82">
                <li>React, Vite, and TypeScript</li>
                <li>Tailwind CSS design layer</li>
                <li>Django REST Framework API</li>
                <li>PostgreSQL-ready configuration</li>
                <li>Vercel + Render deployment flow</li>
              </ul>
              <div className="mt-8 rounded-2xl border border-gold-300/15 bg-black/10 px-4 py-4">
                <p className="text-sm leading-6 text-forest-200/75">
                  Designed around restraint, contrast, and clear spacing so the interface feels
                  confident rather than crowded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-900/60 bg-rose-950/35 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="mb-6 rounded-2xl border border-emerald-900/60 bg-emerald-950/35 px-4 py-3 text-sm text-emerald-100">
            {message}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <NoteEditor
            activeNote={activeNote}
            isSaving={isSaving}
            onCancelEdit={() => setActiveNote(null)}
            onSubmit={handleSubmit}
          />
          <NotesList
            activeNoteId={activeNote?.id ?? null}
            isLoading={isLoading}
            notes={notes}
            onDelete={handleDelete}
            onSelect={setActiveNote}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
