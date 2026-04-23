interface WorkspaceSidebarProps {
  activeSection: "notes" | "archived" | "settings";
  displayName: string;
  isAvatarBroken: boolean;
  isMobileOpen: boolean;
  joinDate: string;
  onAvatarError: () => void;
  onCloseMobile: () => void;
  onSelectSection: (section: "notes" | "archived" | "settings") => void;
  pinnedNotesCount: number;
  userAvatarUrl: string;
  username: string;
  userNotesCount: number;
}

interface NavItem {
  badge: string | number;
  id: "notes" | "archived" | "settings";
  label: string;
}

interface NavGroup {
  items: NavItem[];
  title: string;
}

function SidebarNavButton({
  isActive,
  item,
  onSelect,
}: {
  isActive: boolean;
  item: NavItem;
  onSelect: (section: "notes" | "archived" | "settings") => void;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
        isActive ? "theme-button-primary" : "theme-button-secondary"
      }`}
      onClick={() => onSelect(item.id)}
    >
      <span>{item.label}</span>
      <span className="rounded-full bg-[var(--theme-card)] px-2 py-1 text-xs text-[var(--theme-text-muted)]">
        {item.badge}
      </span>
    </button>
  );
}

export function WorkspaceSidebar({
  activeSection,
  displayName,
  isAvatarBroken,
  isMobileOpen,
  joinDate,
  onAvatarError,
  onCloseMobile,
  onSelectSection,
  pinnedNotesCount,
  userAvatarUrl,
  username,
  userNotesCount,
}: WorkspaceSidebarProps) {
  const navGroups: NavGroup[] = [
    {
      title: "Workspace",
      items: [
        { id: "notes", label: "Active notes", badge: userNotesCount },
        { id: "archived", label: "Archived notes", badge: "View" },
      ],
    },
    {
      title: "Account",
      items: [{ id: "settings", label: "Settings", badge: "Manage" }],
    },
  ];

  return (
    <aside
      className={`theme-panel fixed inset-y-0 left-0 z-40 w-[min(22rem,88vw)] rounded-r-[1.7rem] p-4 backdrop-blur-xl transition-transform duration-300 lg:relative lg:inset-auto lg:left-auto lg:z-auto lg:w-auto lg:translate-x-0 lg:rounded-[1.7rem] lg:p-5 lg:min-h-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-[105%]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="theme-soft text-xs font-semibold uppercase tracking-[0.3em]">Workspace</p>
        <button
          type="button"
          className="theme-button-secondary rounded-full px-3 py-2 text-sm font-medium transition lg:hidden"
          onClick={onCloseMobile}
        >
          Close
        </button>
      </div>

      <div className="theme-hero rounded-[1.5rem] p-4 sm:p-5">
        <p className="theme-soft text-xs font-semibold uppercase tracking-[0.34em]">C3 Notes</p>
        <div className="mt-5 flex items-center gap-4">
          {userAvatarUrl && !isAvatarBroken ? (
            <img
              src={userAvatarUrl}
              alt={`${displayName} profile`}
              className="h-14 w-14 rounded-2xl border border-white bg-white object-cover"
              onError={onAvatarError}
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white/90 text-lg font-semibold text-[var(--theme-text)]">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-[var(--theme-text)]">{displayName}</p>
            <p className="truncate text-sm text-[var(--theme-text-muted)]">@{username}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--theme-text-muted)]">Member since {joinDate}</p>
      </div>

      {navGroups.map((group) => (
        <div key={group.title} className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <p className="theme-soft px-2 text-xs font-semibold uppercase tracking-[0.28em] sm:col-span-2 lg:col-span-1">
            {group.title}
          </p>
          {group.items.map((item) => (
            <SidebarNavButton
              key={item.id}
              isActive={activeSection === item.id}
              item={item}
              onSelect={(section) => {
                onSelectSection(section);
                onCloseMobile();
              }}
            />
          ))}
        </div>
      ))}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="theme-card rounded-3xl p-4">
          <p className="theme-soft text-xs uppercase tracking-[0.28em]">Active notes</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--theme-text)]">{userNotesCount}</p>
        </div>
        <div className="theme-card rounded-3xl p-4">
          <p className="theme-soft text-xs uppercase tracking-[0.28em]">Pinned</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--theme-text)]">{pinnedNotesCount}</p>
        </div>
      </div>
    </aside>
  );
}
