'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  schoolName: string;
  degree: string;
  period: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  schoolName,
  degree,
  period,
}: ResumeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card className="w-full">
        <CardContent className="flex items-center p-6">
          <div className="flex-none mr-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback className="text-lg font-semibold">
                {altText
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg leading-tight">
                  {schoolName}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{degree}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm text-muted-foreground font-medium">
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
