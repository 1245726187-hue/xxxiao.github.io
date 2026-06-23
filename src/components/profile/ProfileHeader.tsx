'use client';

import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  memberSince?: string;
  stats: {
    totalMeals: number;
    streak: number;
    avgCalories: number;
  };
}

export function ProfileHeader({ name, email, avatarUrl, stats }: ProfileHeaderProps) {
  const router = useRouter();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="text-center mb-6">
      {/* Avatar */}
      <div className="relative inline-block mb-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-24 h-24 rounded-full object-cover shadow-card"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-accent-light flex items-center justify-center shadow-card">
            <span className="text-3xl font-bold text-accent">{initials}</span>
          </div>
        )}
        <button
          onClick={() => router.push('/profile/edit')}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-surface shadow-card
                     flex items-center justify-center border-2 border-surface
                     hover:bg-surface-secondary transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </button>
      </div>

      <h2 className="text-title text-ink font-semibold">{name}</h2>
      {email && <p className="text-caption text-ink-tertiary mt-1">{email}</p>}

      {/* Stats */}
      <div className="flex justify-center gap-8 mt-6">
        <div className="text-center">
          <p className="text-title font-bold text-ink">{stats.totalMeals}</p>
          <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">餐食</p>
        </div>
        <div className="text-center">
          <p className="text-title font-bold text-accent-green">{stats.streak}</p>
          <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">连续天数</p>
        </div>
        <div className="text-center">
          <p className="text-title font-bold text-ink">{stats.avgCalories}</p>
          <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">平均热量</p>
        </div>
      </div>
    </div>
  );
}

export function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-[10px] font-semibold text-ink-tertiary uppercase tracking-wider px-1 mb-2">
        {title}
      </h3>
      <div className="card-elevated divide-y divide-surface-tertiary overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function SettingsRow({
  label,
  value,
  onClick,
  destructive = false,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-3.5 text-left
                 hover:bg-surface-secondary/50 transition-colors"
    >
      <span className={`text-body ${destructive ? 'text-accent-red' : 'text-ink'}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {value && <span className="text-caption text-ink-tertiary">{value}</span>}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink-tertiary flex-shrink-0">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </button>
  );
}

export function StatCard({
  icon,
  label,
  value,
  color = 'accent',
}: {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="card-elevated p-4 text-center">
      <span className="text-2xl">{icon}</span>
      <p className="text-title font-bold text-ink mt-2">{value}</p>
      <p className="text-[10px] text-ink-tertiary uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}
