export function SafeArea({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`pt-safe ${className}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {children}
    </div>
  );
}

export function SafeAreaBottom({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`pb-safe ${className}`} style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {children}
    </div>
  );
}
