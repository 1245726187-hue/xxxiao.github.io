'use client';

import { useRef, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search meals...',
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-11 pr-10 py-3.5 bg-surface border border-surface-tertiary rounded-card-sm
                   text-body text-ink placeholder:text-ink-tertiary
                   focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                   transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
                     bg-surface-tertiary flex items-center justify-center
                     hover:bg-ink-tertiary/20 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function FilterChips({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string }[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(selected === opt.id ? null : opt.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-pill text-caption font-medium transition-all
            ${selected === opt.id
              ? 'bg-accent text-white shadow-sm'
              : 'bg-surface text-ink-secondary hover:bg-surface-secondary'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
