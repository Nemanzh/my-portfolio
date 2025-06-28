// components/skill-badge.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Skill } from '@/types/skill';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface SkillBadgeProps {
  skill: Skill;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200"
        >
          {skill.icon && skill.icon.url && (
            <Image
              src={
                skill.icon.url.startsWith('http')
                  ? skill.icon.url
                  : `${process.env.NEXT_PUBLIC_API_URL}${skill.icon.url}`
              }
              alt={skill.icon.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
              // ✅ Add error handling
              onError={(e) => {
                console.error('Failed to load skill icon:', skill?.icon?.url);
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <span>{skill.name}</span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-xs max-w-48">
          {skill.description || 'No description available.'}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
