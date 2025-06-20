'use client';

import React from 'react';
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from '@/components/magicui/terminal';
import { DockDemo } from '@/components/dock-demo';

export default function Home() {
  return (
    <main className="relative min-h-screen pb-32 bg-background">
      {/* Terminal Intro Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-muted/50 to-transparent">
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
              Welcome to my portfolio!
            </TypingAnimation>
          </Terminal>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-muted-foreground">
          I&apos;m Nemanja Radulovic, a passionate software engineer
          specializing in building modern web applications with React, Next.js,
          and TypeScript. I love solving complex problems and creating
          delightful user experiences.
        </p>
      </section>

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
      <section id="education" className="max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Education</h2>
        <ul>
          <li>
            <div className="font-semibold">BSc in Computer Science</div>
            <div className="text-muted-foreground">
              University Name, 2018 - 2022
            </div>
          </li>
          {/* Add more education as needed */}
        </ul>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-muted rounded-full">React</span>
          <span className="px-4 py-2 bg-muted rounded-full">Next.js</span>
          <span className="px-4 py-2 bg-muted rounded-full">TypeScript</span>
          <span className="px-4 py-2 bg-muted rounded-full">Node.js</span>
          <span className="px-4 py-2 bg-muted rounded-full">Tailwind CSS</span>
          {/* Add more skills as needed */}
        </div>
      </section>

      {/* Fixed Dock at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-50 mb-5">
        <DockDemo />
      </div>
    </main>
  );
}
