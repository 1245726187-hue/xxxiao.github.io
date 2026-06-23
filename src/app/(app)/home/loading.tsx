export default function HomeLoading() {
  return (
    <div className="space-y-5 pt-2 animate-pulse-soft">
      {/* Date strip skeleton */}
      <div className="flex gap-1.5 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="min-w-[52px] h-[72px] rounded-card-sm bg-surface animate-shimmer" />
        ))}
      </div>

      {/* AI Summary skeleton */}
      <div className="glass-card p-6 space-y-4">
        <div className="h-6 w-2/3 bg-surface-tertiary rounded animate-shimmer" />
        <div className="h-4 w-full bg-surface-tertiary rounded animate-shimmer" />
        <div className="flex justify-center gap-6">
          {[72, 72, 72].map((size, i) => (
            <div key={i} className="rounded-full bg-surface-tertiary animate-shimmer" style={{ width: size, height: size }} />
          ))}
        </div>
        <div className="flex justify-between pt-3 border-t border-surface-tertiary">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-1">
              <div className="h-6 w-12 bg-surface-tertiary rounded animate-shimmer mx-auto" />
              <div className="h-3 w-8 bg-surface-tertiary rounded animate-shimmer mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-elevated p-4 flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-tertiary animate-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 bg-surface-tertiary rounded animate-shimmer" />
              <div className="h-3 w-1/2 bg-surface-tertiary rounded animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
