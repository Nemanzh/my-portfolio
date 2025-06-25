import React from 'react';
import { DockDemo } from '@/components/dock-demo';
import AboutMe from '@/components/about-me';
import Skills from '@/components/skills';
import EducationSection from '@/components/education';
import ExperienceSection from '@/components/experience';

export default function Home() {
  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* About Me Section */}
      <AboutMe />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Skills & Expertise Section */}
      <Skills />

      {/* Fixed Dock at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 mb-5">
        <DockDemo />
      </div>
    </main>
  );
}
