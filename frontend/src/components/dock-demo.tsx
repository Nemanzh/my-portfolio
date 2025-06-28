// src/components/dock-demo.tsx
'use client';

import {
  CalendarIcon,
  HomeIcon,
  MailIcon,
  Linkedin,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Dock, DockIcon } from '@/components/magicui/dock';

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => <Linkedin {...props} />,
  github: (props: IconProps) => <Github {...props} />,
};

export function DockDemo() {
  const t = useTranslations('general');
  const DATA = {
    navbar: [{ href: '/', icon: HomeIcon, label: t('home') }],
    contact: {
      social: {
        GitHub: {
          name: 'GitHub',
          url: 'https://github.com/Nemanzh',
          icon: Icons.github,
        },
        LinkedIn: {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/nemanja-radulovi%C4%87/',
          icon: Icons.linkedin,
        },
        email: {
          name: 'Send Email',
          url: 'mailto:nemanja.radulovic1990@gmail.com',
          icon: Icons.email,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    {...(name === 'LinkedIn' || name === 'GitHub'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />

          {/* ✅ Add Language Switcher */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <LanguageSwitcher />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('language')}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          {/* Theme Toggle */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('theme')}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
