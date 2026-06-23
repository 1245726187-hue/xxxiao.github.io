interface OnboardingSlideProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export function OnboardingSlide({
  title,
  description,
  illustration,
  slideNumber,
  totalSlides,
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12">
      {/* Illustration container */}
      <div className="relative mb-12">
        <div className="w-52 h-52 rounded-full bg-accent-light flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card">
            <span className="text-7xl">{illustration}</span>
          </div>
        </div>
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-accent/10 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-accent/5 -z-10" />
      </div>

      {/* Content */}
      <h2 className="text-hero text-ink text-center mb-4">{title}</h2>
      <p className="text-body text-ink-secondary text-center max-w-xs leading-relaxed">
        {description}
      </p>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-12">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === slideNumber
                ? 'w-8 bg-accent'
                : 'w-2 bg-surface-tertiary'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
