import { Button } from "@/components/ui/Button";
import { MAILTO_HREF } from "@/lib/constants";
import { HeroImage } from "./HeroImage";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-16 md:py-20">
      <div className="text-center md:text-left">
        <p className="font-semibold text-accent">Hey, I&apos;m Ryan! 👋</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl md:text-5xl">
          Tech Lead | <span className="text-accent">Architect</span> |
          Fullstack Developer
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-charcoal-soft md:mx-0">
          I build beautiful, user-first websites, design solid architectures,
          and lead developer teams to the finish line. Based in the
          Philippines, I turn complex technical chaos into smooth, loveable
          user experiences. (And yes, I ensure our git histories stay clean
          too).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
          <Button href={MAILTO_HREF} variant="primary">
            Get In Touch
          </Button>
          <Button href="/projects" variant="secondary">
            Browse Projects
          </Button>
        </div>
      </div>
      <HeroImage />
    </section>
  );
}
