// components/skills-category.tsx
'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/types/skill';
import { SkillBadge } from './skill-badge';

interface SkillsCategoryProps {
  category: string;
  skills: Skill[];
  categoryIndex: number;
}

export const SkillsCategory = ({
  category,
  skills,
  categoryIndex,
}: SkillsCategoryProps) => {
  if (skills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <h3 className="text-lg font-semibold mb-4 text-primary">{category}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillBadge key={skill.id} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};
