'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  alignment?: 'left' | 'center' | 'right';
}

export const SectionHeader = ({
  title,
  subtitle,
  className = 'mb-12',
  titleClassName = 'text-3xl font-bold mb-4',
  subtitleClassName = 'text-muted-foreground',
  alignment = 'center',
}: SectionHeaderProps) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }} // ✅ Already has once: true
      className={`${alignmentClass} ${className}`}
    >
      <motion.h2
        className={titleClassName}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }} // ✅ Add this
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={subtitleClassName}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }} // ✅ Add this
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
