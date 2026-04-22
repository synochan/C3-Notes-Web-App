export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "completed";
  due_at: string | null;
  checklist: ChecklistItem[];
  is_pinned: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface NotePayload {
  title: string;
  content: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "completed";
  due_at: string | null;
  checklist: ChecklistItem[];
  is_pinned: boolean;
  is_archived: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string;
  avatar_url: string;
  marketing_emails: boolean;
  date_joined: string;
  notes_count: number;
  pinned_notes_count: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  email: string;
  display_name: string;
  avatar_url: string;
}

export interface AccountUpdatePayload {
  username: string;
  email: string;
  display_name: string;
  marketing_emails: boolean;
  avatar?: File | null;
  clear_avatar?: boolean;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
