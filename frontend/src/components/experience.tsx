import { getExperience } from '@/lib/api';
import type { Experience } from '@/types/experience';
import { formatDate } from '@/lib/utils';
import { ExperienceCard } from '@/components/experience-card';
import { SectionHeader } from '@/components/section-header';

export default async function ExperienceSection() {
  const experienceList: Experience[] = await getExperience();

  if (!experienceList || experienceList.length === 0) {
    return (
      <section id="experience" className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <p className="text-muted-foreground">
          No experience information available.
        </p>
      </section>
    );
  }

  return (
    <section id="experience" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader title="Experience" subtitle="My professional journey" />
      <div className="space-y-6">
        {experienceList.map((experience, id) => (
          <ExperienceCard
            key={`${experience.company}-${id}`}
            company={experience.company}
            role={experience.role}
            startDate={formatDate(experience.start_date)}
            endDate={formatDate(experience.end_date)}
            description={experience.description}
            link={experience.link}
            companyLogoUrl={
              experience.company_logo?.url
                ? experience.company_logo.url.startsWith('http')
                  ? experience.company_logo.url
                  : `${process.env.NEXT_PUBLIC_API_URL}${experience.company_logo.url}`
                : ''
            }
          />
        ))}
      </div>
    </section>
  );
}
