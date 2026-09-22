import { skillCategories } from "@/data/skills";
import { DotHeading } from "./DotHeading";

export function SkillsView() {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-10 py-20">
      <DotHeading className="text-4xl md:text-5xl">Skills</DotHeading>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((group) => (
          <div key={group.category}>
            <h3 className="font-bold text-charcoal">{group.category}</h3>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-soft">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
