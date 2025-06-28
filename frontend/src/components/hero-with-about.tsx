// components/hero-with-about.tsx
import type { About } from '@/types/about';
import HeroSection from './hero-section';

interface HeroSectionProps {
  aboutData?: About | null;
}

export default function HeroWithAbout({ aboutData }: HeroSectionProps) {
  return <HeroSection aboutData={aboutData} />;
}
