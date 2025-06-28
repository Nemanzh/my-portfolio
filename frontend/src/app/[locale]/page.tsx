import React from 'react';
import { getLocale } from 'next-intl/server';
import { prefetchAllData } from '@/lib/api';
import { DockDemo } from '@/components/dock-demo';
import Skills from '@/components/skills';
import EducationSection from '@/components/education';
import ExperienceSection from '@/components/experience';
import HeroSection from '@/components/hero-section';
import ContactSection from '@/components/contact-section';

export default async function Home() {
  const locale = await getLocale();
  const data = await prefetchAllData(locale);

  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* Combined Hero + About Section */}
      <HeroSection aboutData={data?.about} />
      {/* Experience Section */}
      <ExperienceSection experienceData={data?.experience} />
      {/* Education Section */}
      <EducationSection educationData={data?.education} />
      {/* Skills & Expertise Section */}
      <Skills skillsData={data?.skills} />
      {/* Contact Section */}
      <ContactSection contactData={data.contact} />
      {/* Fixed Dock at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 mb-5">
        <DockDemo />
      </div>
    </main>
  );
}
