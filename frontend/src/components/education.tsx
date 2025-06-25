import { getEducation } from '@/lib/api';
import type { Education } from '@/types/education';
import { formatDate } from '@/lib/utils';
import { SectionHeader } from '@/components/section-header';
import { EducationCard } from '@/components/education-card';

export default async function EducationSection() {
  const educationList: Education[] = await getEducation();

  if (!educationList || educationList.length === 0) {
    return (
      <section id="education" className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <p className="text-muted-foreground">
          No education information available.
        </p>
      </section>
    );
  }

  return (
    <section id="education" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader title="Education" subtitle="My academic background" />
      <div className="space-y-4">
        {educationList.map((education, id) => (
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
            period={`${formatDate(education.start)} - ${formatDate(
              education.end
            )}`}
            href={education.href ? education.href : '#'}
          />
        ))}
      </div>
    </section>
  );
}
