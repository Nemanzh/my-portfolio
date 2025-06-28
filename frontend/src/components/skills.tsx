import type { Skill } from '@/types/skill';
import { getTranslations } from 'next-intl/server';
import { SectionHeader } from './section-header';
import { SkillsCategory } from './skills-category';

interface SkillsProps {
  skillsData?: Skill[];
}

export default async function Skills({ skillsData }: SkillsProps) {
  const t = await getTranslations('skills');

  if (!skillsData || skillsData.length === 0) {
    return (
      <section id="experience" className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>
        <p className="text-muted-foreground">{t('noSkills')}</p>
      </section>
    );
  }

  // Categorize skills based on skill names
  const categories = {
    Frontend: skillsData?.filter((skill) =>
      [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'HTML',
        'CSS',
        'Tailwind',
        'Vue',
        'Angular',
        'Svelte',
        'Sass',
        'SCSS',
        'Bootstrap',
        'Webpack',
        'Vite',
      ].some((tech) => skill.name.toLowerCase().includes(tech.toLowerCase()))
    ),

    Backend: skillsData?.filter((skill) =>
      [
        'Node.js',
        'Python',
        'PHP',
        'Java',
        'C#',
        'Database',
        'API',
        'Express',
        'Django',
        'Laravel',
        'Spring',
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'Redis',
        'Firebase',
        'Supabase',
        'GraphQL',
        'REST',
        'Docker',
        'Kubernetes',
      ].some((tech) => skill.name.toLowerCase().includes(tech.toLowerCase()))
    ),

    'Tools & DevOps': skillsData?.filter((skill) =>
      [
        'Git',
        'GitHub',
        'GitLab',
        'VS Code',
        'Docker',
        'AWS',
        'Azure',
        'Vercel',
        'Netlify',
        'Figma',
        'Photoshop',
        'Illustrator',
        'Postman',
        'Insomnia',
        'Terminal',
        'Linux',
        'macOS',
        'Windows',
        'CI/CD',
        'Jenkins',
        'GitHub Actions',
      ].some((tech) => skill.name.toLowerCase().includes(tech.toLowerCase()))
    ),

    'Mobile & Other': skillsData?.filter(
      (skill) =>
        ![
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'HTML',
          'CSS',
          'Tailwind',
          'Vue',
          'Angular',
          'Svelte',
          'Sass',
          'SCSS',
          'Bootstrap',
          'Webpack',
          'Vite',
          'Node.js',
          'Python',
          'PHP',
          'Java',
          'C#',
          'Database',
          'API',
          'Express',
          'Django',
          'Laravel',
          'Spring',
          'MongoDB',
          'PostgreSQL',
          'MySQL',
          'Redis',
          'Firebase',
          'Supabase',
          'GraphQL',
          'REST',
          'Docker',
          'Kubernetes',
          'Git',
          'GitHub',
          'GitLab',
          'VS Code',
          'AWS',
          'Azure',
          'Vercel',
          'Netlify',
          'Figma',
          'Photoshop',
          'Illustrator',
          'Postman',
          'Insomnia',
          'Terminal',
          'Linux',
          'macOS',
          'Windows',
          'CI/CD',
          'Jenkins',
          'GitHub Actions',
        ].some((tech) => skill.name.toLowerCase().includes(tech.toLowerCase()))
    ),
  };

  const filteredCategories = Object.entries(categories).filter(
    ([, categorySkills]) => categorySkills.length > 0
  );

  return (
    <section id="skills" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="space-y-8">
        {filteredCategories.map(([category, categorySkills], categoryIndex) => (
          <SkillsCategory
            key={category}
            category={category}
            skills={categorySkills}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>

      {skillsData?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noSkills')}</p>
        </div>
      )}

      {filteredCategories.length === 0 && skillsData?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">
            {t('allSkills')}
          </h3>
          <SkillsCategory
            category="All Skills"
            skills={skillsData}
            categoryIndex={0}
          />
        </div>
      )}
    </section>
  );
}
