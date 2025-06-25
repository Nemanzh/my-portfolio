import React from 'react';
import { DockDemo } from '@/components/dock-demo';
import AboutMe from '@/components/about-me';
import Skills from '@/components/skills';
import EducationSection from '@/components/education';
import ExperienceSection from '@/components/experience';
import HeroSection from '@/components/hero-section';
import ContactSection from '@/components/contact-section';
// import ProjectsSection from '@/components/project-section';
// import TestimonialsSection from '@/components/testimonials-section';

export default function Home() {
  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* About Me Section */}
      <AboutMe />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Skills & Expertise Section */}
      <Skills />

      {/* Projects Portfolio */}
      {/* <ProjectsSection /> */}

      {/* Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* Contact Section */}
      <ContactSection />

      {/* Fixed Dock at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 mb-5">
        <DockDemo />
      </div>
    </main>
  );
}
