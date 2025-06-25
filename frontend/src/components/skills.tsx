// components/skills.tsx
import { getSkills } from '@/lib/api';
import type { Skill } from '@/types/skill';
import { SkillsCategory } from '@/components/skills-category';
import { SectionHeader } from '@/components/section-header';

export default async function Skills() {
  const skills: Skill[] = await getSkills();

  // Categorize skills based on skill names
  const categories = {
    Frontend: skills.filter((skill) =>
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

    Backend: skills.filter((skill) =>
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

    'Tools & DevOps': skills.filter((skill) =>
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

    'Mobile & Other': skills.filter(
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

  // Filter out empty categories
  const filteredCategories = Object.entries(categories).filter(
    ([, categorySkills]) => categorySkills.length > 0
  );

  return (
    <section id="skills" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader
        title="Skills & Technologies"
        subtitle="Technologies I love working with"
      />

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

      {/* Fallback if no skills are found */}
      {skills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No skills available at the moment.
          </p>
        </div>
      )}

      {/* Show all skills if categorization doesn't work well */}
      {filteredCategories.length === 0 && skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">
            All Skills
          </h3>
          <SkillsCategory
            category="All Skills"
            skills={skills}
            categoryIndex={0}
          />
        </div>
      )}
    </section>
  );
}
