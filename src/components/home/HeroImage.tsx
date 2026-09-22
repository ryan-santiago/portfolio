import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
      <div className="absolute -bottom-4 -right-4 h-full w-full rounded-4xl border-2 border-accent/40" />
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl bg-surface-alt shadow-lg">
        <Image
          src="/ryan-landing.jpg"
          alt="Ryan"
          fill
          priority
          sizes="(min-width: 640px) 384px, 320px"
          className="-scale-x-100 object-cover object-[85%_15%]"
        />
      </div>
    </div>
  );
}
