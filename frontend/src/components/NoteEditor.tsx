import { FormEvent, useEffect, useState } from "react";

import type { Note, NotePayload } from "../types";


interface NoteEditorProps {
  activeNote: Note | null;
  isSaving: boolean;
  onCancelEdit: () => void;
  onSubmit: (payload: NotePayload) => Promise<void>;
}

const initialForm = {
  title: "",
  content: "",
};

export function NoteEditor({
  activeNote,
  isSaving,
  onCancelEdit,
  onSubmit,
}: NoteEditorProps) {
  const [form, setForm] = useState<NotePayload>(initialForm);

  useEffect(() => {
    if (activeNote) {
      setForm({
        title: activeNote.title,
        content: activeNote.content,
      });
      return;
    }

    setForm(initialForm);
  }, [activeNote]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);

    if (!activeNote) {
      setForm(initialForm);
    }
  }

  const isEditing = Boolean(activeNote);

  return (
    <section className="rounded-[1.8rem] border border-forest-700/60 bg-paper/92 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            {isEditing ? "Edit note" : "New note"}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-[-0.03em] text-white">
            {isEditing ? "Refine your note" : "Capture something important"}
          </h2>
        </div>
        {isEditing ? (
          <button
            type="button"
            className="rounded-full border border-forest-600 bg-forest-900/70 px-4 py-2 text-sm font-medium text-forest-200 transition hover:border-forest-500 hover:bg-forest-800"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        ) : null}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-forest-200/88" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            className="w-full rounded-2xl border border-forest-700 bg-forest-900/75 px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="Meeting follow-up, shopping list, quick idea..."
            value={form.title}
            maxLength={120}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-200/88" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="min-h-52 w-full rounded-2xl border border-forest-700 bg-forest-900/75 px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="Write your note here..."
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-full border border-gold-300/20 bg-gradient-to-r from-accent to-forest-400 px-5 py-3 text-sm font-semibold text-forest-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : isEditing ? "Update note" : "Create note"}
        </button>
      </form>
    </section>
  );
}
