import type {
  AccountUpdatePayload,
  AuthResponse,
  ChangePasswordPayload,
  LoginPayload,
  Note,
  NotePayload,
  RegisterPayload,
  User,
} from "../types";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";

function buildHeaders(token?: string, initHeaders?: HeadersInit, body?: BodyInit | null) {
  const headers = new Headers(initHeaders ?? {});

  if (token) {
    headers.set("Authorization", `Token ${token}`);
  }

  if (!(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

function readErrorMessage(data: Record<string, unknown>) {
  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.non_field_errors) && typeof data.non_field_errors[0] === "string") {
    return data.non_field_errors[0];
  }

  for (const value of Object.values(data)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0];
    }
  }

  return "Something went wrong while communicating with the server.";
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
    throw new Error(
      "The API returned HTML instead of JSON. Check that the Django backend is running and VITE_API_BASE_URL points to the API server.",
    );
  }

  throw new Error("The server returned an unsupported response format.");
}

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(token, init?.headers, init?.body ?? null),
  });

  if (!response.ok) {
    try {
      const data = await parseResponse<Record<string, unknown>>(response);
      throw new Error(readErrorMessage(data));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Something went wrong while communicating with the server.");
    }
  }

  return parseResponse<T>(response);
}

function buildAccountFormData(payload: AccountUpdatePayload) {
  const formData = new FormData();
  formData.set("username", payload.username);
  formData.set("email", payload.email);
  formData.set("display_name", payload.display_name);
  formData.set("marketing_emails", String(payload.marketing_emails));

  if (payload.avatar) {
    formData.set("avatar", payload.avatar);
  }

  if (payload.clear_avatar) {
    formData.set("clear_avatar", "true");
  }

  return formData;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    request<AuthResponse>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: LoginPayload) =>
    request<AuthResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: (token: string) => request<User>("/auth/me/", undefined, token),
  updateAccount: (payload: AccountUpdatePayload, token: string) =>
    request<User>(
      "/auth/me/",
      {
        method: "PATCH",
        body: buildAccountFormData(payload),
      },
      token,
    ),
  changePassword: (payload: ChangePasswordPayload, token: string) =>
    request<{ detail: string; token: string }>(
      "/auth/change-password/",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    ),
  logout: (token: string) =>
    request<void>(
      "/auth/logout/",
      {
        method: "POST",
      },
      token,
    ),
  deleteAccount: (token: string) =>
    request<void>(
      "/auth/account/",
      {
        method: "DELETE",
      },
      token,
    ),
};

export const notesApi = {
  list: (token: string, params?: { archived?: boolean; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (typeof params?.archived === "boolean") {
      searchParams.set("archived", String(params.archived));
    }
    if (params?.search?.trim()) {
      searchParams.set("search", params.search.trim());
    }
    const query = searchParams.toString();
    return request<Note[]>(`/notes/${query ? `?${query}` : ""}`, undefined, token);
  },
  create: (payload: NotePayload, token: string) =>
    request<Note>(
      "/notes/",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    ),
  update: (id: number, payload: NotePayload, token: string) =>
    request<Note>(
      `/notes/${id}/`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
      token,
    ),
  remove: (id: number, token: string) =>
    request<void>(
      `/notes/${id}/`,
      {
        method: "DELETE",
      },
      token,
    ),
};
