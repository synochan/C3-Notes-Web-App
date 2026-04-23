import { FormEvent, useEffect, useState } from "react";

import type { ChecklistItem, Note, NotePayload } from "../types";


interface NoteEditorProps {
  activeNote: Note | null;
  isSaving: boolean;
  onCancelEdit: () => void;
  onSubmit: (payload: NotePayload) => Promise<void>;
  showCancel?: boolean;
}

const initialForm = {
  title: "",
  content: "",
  category: "",
  priority: "medium" as const,
  status: "open" as const,
  due_at: null,
  checklist: [] as ChecklistItem[],
  is_pinned: false,
  is_archived: false,
};

function toDatetimeLocalValue(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function NoteEditor({
  activeNote,
  isSaving,
  onCancelEdit,
  onSubmit,
  showCancel = true,
}: NoteEditorProps) {
  const [form, setForm] = useState<NotePayload>(initialForm);

  useEffect(() => {
    if (activeNote) {
      setForm({
        title: activeNote.title,
        content: activeNote.content,
        category: activeNote.category,
        priority: activeNote.priority,
        status: activeNote.status,
        due_at: activeNote.due_at,
        checklist: activeNote.checklist,
        is_pinned: activeNote.is_pinned,
        is_archived: activeNote.is_archived,
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

  function addChecklistItem() {
    setForm((current) => ({
      ...current,
      checklist: [
        ...current.checklist,
        {
          id: crypto.randomUUID(),
          text: "",
          completed: false,
        },
      ],
    }));
  }

  const isEditing = Boolean(activeNote);

  return (
    <section className="theme-panel rounded-[1.6rem] p-4 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="theme-soft text-xs font-semibold uppercase tracking-[0.3em]">
            {isEditing ? "Edit note" : "New note"}
          </p>
          <h2 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] text-[var(--theme-text)] sm:text-3xl">
            {isEditing ? "Refine your note" : "Create a new note"}
          </h2>
        </div>
        {showCancel ? (
          <button
            type="button"
            className="theme-button-secondary rounded-full px-4 py-2 text-sm font-medium transition"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        ) : null}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
            placeholder="Weekly priorities, launch checklist, study notes..."
            value={form.title}
            maxLength={120}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="theme-input min-h-40 w-full rounded-2xl px-4 py-3 outline-none transition"
            placeholder="Write your note here..."
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Category</label>
            <input
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
              placeholder="Work, Personal, Study..."
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Deadline</label>
            <input
              type="datetime-local"
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
              value={toDatetimeLocalValue(form.due_at)}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  due_at: event.target.value ? new Date(event.target.value).toISOString() : null,
                }))
              }
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Priority</label>
            <select
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
              value={form.priority}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  priority: event.target.value as NotePayload["priority"],
                }))
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Status</label>
            <select
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as NotePayload["status"],
                }))
              }
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="theme-card-soft rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--theme-text)]">Checklist</p>
              <p className="text-sm text-[var(--theme-text-muted)]">Track actionable tasks inside a note.</p>
            </div>
            <button
              type="button"
              className="theme-button-secondary rounded-full px-4 py-2 text-sm font-medium transition"
              onClick={addChecklistItem}
            >
              Add item
            </button>
          </div>

          {form.checklist.length === 0 ? (
            <div className="theme-card rounded-2xl border-dashed px-4 py-5 text-sm text-[var(--theme-text-muted)]">
              No checklist items yet.
            </div>
          ) : (
            <div className="space-y-3">
              {form.checklist.map((item, index) => (
                <div key={item.id} className="theme-card flex items-center gap-3 rounded-2xl px-3 py-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        checklist: current.checklist.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, completed: event.target.checked }
                            : entry,
                        ),
                      }))
                    }
                  />
                  <input
                    className="theme-input min-w-0 flex-1 rounded-xl px-3 py-2 outline-none transition"
                    placeholder={`Checklist item ${index + 1}`}
                    value={item.text}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        checklist: current.checklist.map((entry) =>
                          entry.id === item.id ? { ...entry, text: event.target.value } : entry,
                        ),
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="theme-button-danger rounded-full px-3 py-2 text-sm font-medium transition"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        checklist: current.checklist.filter((entry) => entry.id !== item.id),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="theme-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--theme-text-muted)]">
            <input
              type="checkbox"
              checked={form.is_pinned}
              onChange={(event) =>
                setForm((current) => ({ ...current, is_pinned: event.target.checked }))
              }
            />
            Pin this note
          </label>
          <label className="theme-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--theme-text-muted)]">
            <input
              type="checkbox"
              checked={form.is_archived}
              onChange={(event) =>
                setForm((current) => ({ ...current, is_archived: event.target.checked }))
              }
            />
            Save to archive
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="submit"
            className="theme-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : isEditing ? "Update note" : "Create note"}
          </button>
          <button
            type="button"
            className="theme-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
          >
            Share
          </button>
        </div>
      </form>
    </section>
  );
}
