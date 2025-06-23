import { getAbout } from '@/lib/api';

export default async function AboutMe() {
  const about = await getAbout();

  return (
    <section id="about" className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-muted-foreground whitespace-pre-line">
        {about?.text || 'About content not available.'}
      </p>
    </section>
  );
}
