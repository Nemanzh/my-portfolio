import React from 'react';
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from '@/components/magicui/terminal';
import { DockDemo } from '@/components/dock-demo';

import AboutMe from '@/components/about-me';
import Skills from '@/components/skills';
import EducationSection from '@/components/education';

export default function Home() {
  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* Terminal Intro Section */}
      <section id="terminal" className="max-w-3xl mx-auto py-12 px-4">
        <div className="relative w-full max-w-2xl">
          <Terminal>
            <TypingAnimation className="text-black-500">
              &gt; npx create-portfolio@nemanja
            </TypingAnimation>
            <TypingAnimation delay={1200} className="text-muted-foreground">
              Installing awesomeness...
            </TypingAnimation>
            <TypingAnimation delay={2200} className="text-muted-foreground">
              Fetching creativity modules...
            </TypingAnimation>
            <TypingAnimation delay={3200} className="text-muted-foreground">
              Compiling experience...
            </TypingAnimation>
            <AnimatedSpan delay={4200} className="text-green-500">
              <span>✔ Portfolio loaded successfully!</span>
            </AnimatedSpan>
            <TypingAnimation delay={5200} className="text-muted-foreground">
              Welcome to Nemanja&apos;s portfolio!
            </TypingAnimation>
          </Terminal>
        </div>
      </section>

      {/* About Me Section */}
      <AboutMe />

      {/* Previous Work Section */}
      <section id="work" className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Previous Work</h2>
        <ul className="space-y-4">
          <li>
            <div className="font-semibold">Awesome Project 1</div>
            <div className="text-muted-foreground">
              Short description of what you did, technologies used, and impact.
            </div>
          </li>
          <li>
            <div className="font-semibold">Awesome Project 2</div>
            <div className="text-muted-foreground">
              Short description of what you did, technologies used, and impact.
            </div>
          </li>
          {/* Add more projects as needed */}
        </ul>
      </section>

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
