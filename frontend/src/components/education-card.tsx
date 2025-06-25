// components/education-card.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface EducationCardProps {
  logoUrl: string;
  altText: string;
  schoolName: string;
  degree: string;
  period: string;
  href?: string;
}

export const EducationCard = ({
  logoUrl,
  altText,
  schoolName,
  degree,
  period,
  href,
}: EducationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-none mx-auto sm:mx-0">
              <div className="h-16 w-16 bg-white dark:bg-gray-900 rounded-full border p-2">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={logoUrl}
                    alt={altText}
                    className="object-contain"
                  />
                  <AvatarFallback className="text-sm font-semibold bg-transparent text-gray-900 dark:text-gray-100">
                    {altText
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex-grow min-w-0 text-center sm:text-left">
              <div className="mb-2">
                {href ? (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 hover:text-primary transition-colors justify-center sm:justify-start"
                  >
                    <h3 className="font-semibold text-lg leading-tight group-hover:underline">
                      {schoolName}
                    </h3>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ) : (
                  <h3 className="font-semibold text-lg leading-tight">
                    {schoolName}
                  </h3>
                )}
              </div>

              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <p className="text-muted-foreground text-sm order-1 sm:order-none">
                  {degree}
                </p>
                <span className="text-sm text-muted-foreground font-medium order-2 sm:order-none">
                  {period}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
