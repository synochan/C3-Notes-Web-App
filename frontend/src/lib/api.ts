import type { Note, NotePayload } from "../types";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = "Something went wrong while communicating with the server.";
    try {
      const data = (await response.json()) as { detail?: string; title?: string[] };
      message = data.detail ?? data.title?.[0] ?? message;
    } catch {
      // Keep the fallback message if the response body is not JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const notesApi = {
  list: () => request<Note[]>("/notes/"),
  create: (payload: NotePayload) =>
    request<Note>("/notes/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: number, payload: NotePayload) =>
    request<Note>(`/notes/${id}/`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (id: number) =>
    request<void>(`/notes/${id}/`, {
      method: "DELETE",
    }),
};
