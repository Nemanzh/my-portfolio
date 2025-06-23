import { getSkills } from '@/lib/api';
import type { Skill } from '@/types/skill';
import { Marquee } from '@/components/magicui/marquee';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

const SkillFigure = ({ skill }: { skill: Skill }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <figure
        className={cn(
          'group relative flex items-center gap-2 px-4 py-2 bg-muted rounded-xl border shadow min-w-[120px] mx-2 transition-all duration-300',
          'border-gray-950/[.1] dark:border-gray-50/[.1]'
        )}
      >
        {skill.icon && skill.icon.url && (
          <Image
            src={
              skill.icon.url.startsWith('http')
                ? skill.icon.url
                : `${process.env.NEXT_PUBLIC_API_URL}${skill.icon.url}`
            }
            alt={skill.icon.name}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        )}
        <figcaption className="text-sm font-semibold">{skill.name}</figcaption>
      </figure>
    </TooltipTrigger>
    <TooltipContent>
      <div className="text-xs">
        {skill.description || 'No description available.'}
      </div>
    </TooltipContent>
  </Tooltip>
);

export default async function Skills() {
  const skills: Skill[] = await getSkills();

  const half = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, half);
  const secondRow = skills.slice(half);

  return (
    <section id="skills" className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills Marquee</h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((skill) => (
            <SkillFigure key={skill.id} skill={skill} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((skill) => (
            <SkillFigure key={skill.id} skill={skill} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
