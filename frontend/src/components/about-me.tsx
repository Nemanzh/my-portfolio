// components/about-me.tsx
import { getAbout } from '@/lib/api';
import { formatAboutContent } from '@/lib/utils';
import type { About } from '@/types/about';

export default async function AboutMe() {
  const aboutData: About | null = await getAbout();

  if (!aboutData) {
    return (
      <section id="about" className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <p className="text-muted-foreground">
          About information is currently unavailable.
        </p>
      </section>
    );
  }

  // Extract paragraphs from the rich text content
  const paragraphs = formatAboutContent(aboutData);

  return (
    <section id="about" className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
