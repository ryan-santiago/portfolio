// TODO: Replace the placeholder circle below with Ryan's real photo
// (swap the inner <div> for a `next/image` using `fill` + `object-cover`).
export function HeroImage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-65 sm:max-w-xs">
      <div className="absolute -inset-4 rounded-full border-2 border-accent/40" />
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-surface-alt text-6xl font-extrabold text-charcoal-soft/40">
        R
      </div>
    </div>
  );
}
