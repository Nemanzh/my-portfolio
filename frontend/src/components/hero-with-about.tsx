// components/hero-with-about.tsx
import { getAbout } from '@/lib/api';
import type { About } from '@/types/about';
import HeroSection from './hero-section';

export default async function HeroWithAbout() {
  const aboutData: About | null = await getAbout();

  return <HeroSection aboutData={aboutData} />;
}
