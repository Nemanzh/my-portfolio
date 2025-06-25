// components/about-me.tsx
import { getAbout } from '@/lib/api';
import { parseAboutContent } from '@/lib/richtext-parser';
import type { About } from '@/types/about';
import { SectionHeader } from '@/components/section-header';
import { AboutTerminal } from '@/components/about-terminal';

export default async function AboutMe() {
  const aboutData: About | null = await getAbout();

  if (!aboutData) {
    return (
      <section id="about" className="max-w-4xl mx-auto py-12 px-4">
        <SectionHeader title="About Me" subtitle="Get to know me better" />
        <div className="bg-card border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            About information is currently unavailable.
          </p>
        </div>
      </section>
    );
  }

  const content = parseAboutContent(aboutData);

  return (
    <section id="about" className="max-w-4xl mx-auto py-12 px-4">
      <SectionHeader title="About Me" subtitle="Get to know me better" />
      <AboutTerminal content={content} />
    </section>
  );
}
