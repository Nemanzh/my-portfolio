// components/experience-card.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Building2, ChevronRight } from 'lucide-react';
import { parseRichTextToElements } from '@/lib/richtext-parser';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type RichTextNode = {
  type: string;
  [key: string]: unknown;
};

interface ExperienceCardProps {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string | unknown[];
  link?: string;
  companyLogoUrl?: string;
}

export const ExperienceCard = ({
  company,
  role,
  startDate,
  endDate,
  description,
  link,
  companyLogoUrl,
}: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionElements = parseRichTextToElements(
    description as string | RichTextNode[],
    'text-muted-foreground leading-relaxed'
  );

  const dateRange = `${startDate} - ${endDate || 'Present'}`;
  const hasDescription = descriptionElements.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      className="mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-none mx-auto sm:mx-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {companyLogoUrl ? (
              <div className="h-16 w-16 bg-white dark:bg-gray-900 rounded-lg border p-2">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={companyLogoUrl}
                    alt={`${company} logo`}
                    className="object-contain"
                  />
                  <AvatarFallback className="text-sm font-semibold bg-transparent text-gray-900 dark:text-gray-800">
                    {company
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center border">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex-grow min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-2 w-full flex justify-center sm:justify-start"
          >
            {link ? (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                <h3 className="font-semibold text-xl leading-tight group-hover:underline">
                  {company}
                </h3>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ) : (
              <h3 className="font-semibold text-xl leading-tight">{company}</h3>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex flex-col items-center gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <p className="text-primary font-medium text-lg">{role}</p>
            <span className="text-sm text-muted-foreground font-medium">
              {dateRange}
            </span>
          </motion.div>

          {hasDescription && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-center sm:justify-start mb-3"
            >
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
                <span className="group-hover:underline">
                  {isExpanded ? 'Hide details' : 'Show details'}
                </span>
              </motion.button>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isExpanded && hasDescription && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  scale: 0.95,
                  y: -10,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.3 },
                }}
                className="overflow-hidden w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="prose prose-sm max-w-none pt-3 border-t border-border/50 text-left"
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.15,
                        },
                      },
                    }}
                  >
                    {descriptionElements.map((element, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.3,
                              ease: 'easeOut',
                            },
                          },
                        }}
                      >
                        {element}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
