import { FormEvent, useEffect, useMemo, useState } from "react";

import type { ThemeOption } from "../lib/themes";
import type { AccountUpdatePayload, ChangePasswordPayload, User } from "../types";


interface AccountSettingsPanelProps {
  isSaving: boolean;
  onDeleteAccount: () => Promise<void>;
  onSaveProfile: (payload: AccountUpdatePayload) => Promise<void>;
  onChangePassword: (payload: ChangePasswordPayload) => Promise<void>;
  onSignOut: () => Promise<void>;
  onThemeChange: (themeId: string) => void;
  selectedThemeId: string;
  themeOptions: ThemeOption[];
  user: User;
}

export function AccountSettingsPanel({
  isSaving,
  onDeleteAccount,
  onSaveProfile,
  onChangePassword,
  onSignOut,
  onThemeChange,
  selectedThemeId,
  themeOptions,
  user,
}: AccountSettingsPanelProps) {
  const [profileForm, setProfileForm] = useState<AccountUpdatePayload>({
    username: user.username,
    email: user.email,
    display_name: user.display_name,
    marketing_emails: user.marketing_emails,
    avatar: null,
    clear_avatar: false,
  });
  const [passwordForm, setPasswordForm] = useState<ChangePasswordPayload>({
    current_password: "",
    new_password: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar_url);
  const [isAvatarPreviewBroken, setIsAvatarPreviewBroken] = useState(false);

  useEffect(() => {
    setProfileForm({
      username: user.username,
      email: user.email,
      display_name: user.display_name,
      marketing_emails: user.marketing_emails,
      avatar: null,
      clear_avatar: false,
    });
    setAvatarPreview(user.avatar_url);
    setIsAvatarPreviewBroken(false);
  }, [user]);

  const displayInitial = useMemo(
    () => (profileForm.display_name || profileForm.username || "U").slice(0, 1).toUpperCase(),
    [profileForm.display_name, profileForm.username],
  );

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSaveProfile(profileForm);
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onChangePassword(passwordForm);
    setPasswordForm({
      current_password: "",
      new_password: "",
    });
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete your account permanently? This will also delete all of your notes.",
    );
    if (!confirmed) {
      return;
    }
    await onDeleteAccount();
  }

  function handleAvatarChange(file: File | null) {
    setProfileForm((current) => ({
      ...current,
      avatar: file,
      clear_avatar: false,
    }));

    if (!file) {
      setAvatarPreview(user.avatar_url);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    setIsAvatarPreviewBroken(false);
  }

  function handleRemoveAvatar() {
    setProfileForm((current) => ({
      ...current,
      avatar: null,
      clear_avatar: true,
    }));
    setAvatarPreview("");
    setIsAvatarPreviewBroken(false);
  }

  return (
    <section className="theme-panel rounded-[1.9rem] p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="theme-soft text-xs font-semibold uppercase tracking-[0.3em]">
            Account settings
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold tracking-[-0.03em] text-[var(--theme-text)]">
            Manage your workspace
          </h2>
        </div>
        <button
          type="button"
          className="theme-button-secondary rounded-full px-4 py-2 text-sm font-medium transition"
          onClick={() => void onSignOut()}
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form
          className="theme-card-tint space-y-5 rounded-[1.7rem] p-5"
          onSubmit={handleProfileSubmit}
        >
          <p className="text-sm font-semibold text-[var(--theme-text)]">Profile</p>

          <div className="theme-card rounded-[1.5rem] bg-white/85 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {avatarPreview && !isAvatarPreviewBroken ? (
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-[1.4rem] border border-white object-cover shadow-sm"
                  onError={() => setIsAvatarPreviewBroken(true)}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-white bg-[var(--theme-hero)] text-xl font-semibold text-[var(--theme-text)] shadow-sm">
                  {displayInitial}
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--theme-text)]">Profile picture</p>
                <p className="mt-1 text-sm leading-6 text-[var(--theme-text-muted)]">
                  Upload a clear square photo or illustration for the sidebar profile card.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <label className="theme-button-primary inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold transition">
                    Upload photo
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={(event) => handleAvatarChange(event.target.files?.[0] ?? null)}
                    />
                  </label>
                  {(avatarPreview || user.avatar_url) && (
                    <button
                      type="button"
                      className="theme-button-secondary inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition"
                      onClick={handleRemoveAvatar}
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#6a5d79]">Display name</label>
              <input
                className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                value={profileForm.display_name}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, display_name: event.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Username</label>
              <input
                className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                value={profileForm.username}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, username: event.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Email</label>
            <input
              type="email"
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
              value={profileForm.email}
              onChange={(event) =>
                setProfileForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </div>

          <label className="theme-card flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--theme-text-muted)]">
            <input
              type="checkbox"
              checked={profileForm.marketing_emails}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  marketing_emails: event.target.checked,
                }))
              }
            />
            Receive product updates by email
          </label>

          <button
            type="submit"
            className="theme-button-primary inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSaving}
          >
            Save profile
          </button>
        </form>

        <div className="space-y-6">
          <form
            className="theme-card-tint-secondary space-y-4 rounded-[1.7rem] p-5"
            onSubmit={handlePasswordSubmit}
          >
            <p className="text-sm font-semibold text-[var(--theme-text)]">Security</p>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">Current password</label>
              <input
                type="password"
                className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                value={passwordForm.current_password}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    current_password: event.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--theme-text-muted)]">New password</label>
              <input
                type="password"
                className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition"
                value={passwordForm.new_password}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    new_password: event.target.value,
                  }))
                }
              />
            </div>

            <button
              type="submit"
              className="theme-button-secondary inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSaving}
            >
              Update password
            </button>
          </form>

          <div className="rounded-[1.7rem] border border-[var(--theme-danger-border)] bg-[var(--theme-danger-bg)] p-5">
            <p className="text-sm font-semibold text-[var(--theme-danger-text)]">Danger zone</p>
            <p className="mt-2 text-sm leading-6 text-[color:color-mix(in_srgb,var(--theme-danger-text)_82%,transparent)]">
              Permanently delete your account and every note stored inside it.
            </p>
            <button
              type="button"
              className="theme-button-danger mt-4 inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition"
              onClick={() => void handleDelete()}
            >
              Delete account
            </button>
          </div>

          <div className="theme-card rounded-[1.7rem] p-5">
            <p className="text-sm font-semibold text-[var(--theme-text)]">Color theme</p>
            <p className="mt-2 text-sm leading-6 text-[var(--theme-text-muted)]">
              Switch between curated palette sets and gradients to match your workspace mood.
            </p>
            <div className="mt-4 grid gap-3">
              {themeOptions.map((theme) => {
                const isSelected = theme.id === selectedThemeId;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    className={`rounded-[1.3rem] border p-4 text-left transition ${
                      isSelected
                        ? "border-[var(--theme-border-strong)] bg-[var(--theme-accent)]"
                        : "border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-card-soft)]"
                    }`}
                    onClick={() => onThemeChange(theme.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--theme-text)]">{theme.name}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--theme-text-muted)]">
                          {theme.description}
                        </p>
                      </div>
                      {isSelected ? (
                        <span className="theme-pill rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {theme.palette.map((color) => (
                        <span
                          key={color}
                          className="h-6 w-6 rounded-full border border-white/70 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div
                      className="mt-4 h-14 rounded-2xl border border-white/60"
                      style={{ background: theme.gradient }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
