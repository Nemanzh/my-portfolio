import type { Education } from '@/types/education';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from './section-header';
import { EducationCard } from './education-card';
import { formatDate } from '@/lib/utils';

interface EducationSectionProps {
  educationData?: Education[];
}

export default async function EducationSection({
  educationData,
}: EducationSectionProps) {
  const t = await getTranslations('education');

  if (!educationData || educationData.length === 0) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>
        <p className="text-muted-foreground">{t('noEducation')}</p>
      </section>
    );
  }

  return (
    <section id="education" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader title="Education" subtitle="My academic background" />
      <div className="space-y-4">
        {educationData?.map((education, id) => (
          <EducationCard
            key={`${education.school}-${id}`}
            logoUrl={
              education.school_logo?.url
                ? education.school_logo.url.startsWith('http')
                  ? education.school_logo.url
                  : `${process.env.NEXT_PUBLIC_API_URL}${education.school_logo.url}`
                : ''
            }
            altText={education.school}
            schoolName={education.school}
            degree={education.degree}
            period={`${formatDate(
              typeof education.start === 'string'
                ? education.start
                : education.start
                ? education.start.toISOString()
                : ''
            )} - ${formatDate(
              typeof education.end === 'string'
                ? education.end
                : education.end
                ? education.end.toISOString()
                : ''
            )}`}
            href={education.href ? education.href : '#'}
          />
        ))}
      </div>
    </section>
  );
}
