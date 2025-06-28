import { getTranslations } from 'next-intl/server';
import { SectionHeader } from './section-header';
import { ExperienceCard } from './experience-card';
import { formatDate } from '@/lib/utils';
import { Experience } from '@/types/experience';

interface ExperienceSectionProps {
  experienceData?: Experience[];
}
export default async function ExperienceSection({
  experienceData,
}: ExperienceSectionProps) {
  const t = await getTranslations('experience');

  if (!experienceData || experienceData.length === 0) {
    return (
      <section id="experience" className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>
        <p className="text-muted-foreground">{t('noExperience')}</p>
      </section>
    );
  }

  return (
    <section id="experience" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />
      <div className="space-y-6">
        {experienceData?.map((experience, id) => (
          <ExperienceCard
            key={`${experience.company}-${id}`}
            company={experience.company}
            role={experience.role}
            startDate={formatDate(
              typeof experience?.start_date === 'string'
                ? experience.start_date
                : experience?.start_date
                ? experience.start_date.toISOString()
                : ''
            )}
            endDate={formatDate(
              typeof experience?.end_date === 'string'
                ? experience.end_date
                : experience?.end_date
                ? experience.end_date.toISOString()
                : ''
            )}
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
