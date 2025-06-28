// src/components/language-switcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTransition } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸', short: 'SR' },
  { code: 'sr-Cyrl', name: 'Српски', flag: '🇷🇸', short: 'СР' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      const supportedLocales = ['en', 'sr', 'sr-Cyrl'];
      let pathWithoutLocale = pathname;

      for (const loc of supportedLocales) {
        const localePrefix = `/${loc}`;
        if (
          pathname === localePrefix ||
          pathname.startsWith(`${localePrefix}/`)
        ) {
          pathWithoutLocale = pathname.substring(localePrefix.length) || '/';
          break;
        }
      }

      if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale;
      }

      const newPath = `/${newLocale}${
        pathWithoutLocale === '/' ? '' : pathWithoutLocale
      }`;

      console.log('Current pathname:', pathname);
      console.log('Path without locale:', pathWithoutLocale);
      console.log('New path:', newPath);

      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-12 rounded-full"
          disabled={isPending}
        >
          <Languages className="size-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`cursor-pointer ${
              locale === language.code ? 'bg-accent' : ''
            }`}
            disabled={isPending}
          >
            <span className="mr-2">{language.flag}</span>
            <span className="mr-2">{language.name}</span>
            <span className="text-xs text-muted-foreground">
              {language.short}
            </span>
            {locale === language.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
