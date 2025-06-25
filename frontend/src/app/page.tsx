import React from 'react';
import { DockDemo } from '@/components/dock-demo';
import Skills from '@/components/skills';
import EducationSection from '@/components/education';
import ExperienceSection from '@/components/experience';
import HeroWithAbout from '@/components/hero-with-about';
import ContactWithData from '@/components/contanct-with-data';

export default function Home() {
  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* Combined Hero + About Section */}
      <HeroWithAbout />
      {/* Experience Section */}
      <ExperienceSection />
      {/* Education Section */}
      <EducationSection />
      {/* Skills & Expertise Section */}
      <Skills />
      {/* Contact Section */}
      <ContactWithData />
      {/* Fixed Dock at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 mb-5">
        <DockDemo />
      </div>
    </main>
  );
}
