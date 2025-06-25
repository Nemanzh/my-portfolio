'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  Download,
  MapPin,
  Terminal,
  Sparkles,
  Code2,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { parseAboutContent } from '@/lib/richtext-parser';
import type { About } from '@/types/about';

const TypewriterText = ({
  texts,
  speed = 100,
}: {
  texts: string[];
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 text-primary"
      >
        |
      </motion.span>
    </span>
  );
};

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0.2, 0.6, 0.2],
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    className="absolute pointer-events-none"
  >
    {children}
  </motion.div>
);

interface HeroSectionProps {
  aboutData?: About | null;
}

export default function HeroSection({ aboutData }: HeroSectionProps) {
  const [showCursor, setShowCursor] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'TypeScript Expert',
    'Problem Solver',
    'UI/UX Enthusiast',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const content = aboutData ? parseAboutContent(aboutData) : null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"
        />

        <FloatingElement delay={0}>
          <div className="top-20 left-20 text-primary/10">
            <Code2 size={24} />
          </div>
        </FloatingElement>
        <FloatingElement delay={3}>
          <div className="top-40 right-32 text-secondary/10">
            <Zap size={20} />
          </div>
        </FloatingElement>
        <FloatingElement delay={6}>
          <div className="bottom-40 left-40 text-purple-500/10">
            <Sparkles size={22} />
          </div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4">
                👋 Hello, Im
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
                <span className="block text-foreground">Nemanja</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Radulovic
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium"
            >
              <TypewriterText texts={roles} speed={120} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Passionate about creating{' '}
                <span className="text-foreground font-semibold">
                  amazing digital experiences
                </span>{' '}
                with modern technologies. I love building scalable applications
                and solving complex problems.
              </p>

              {/* Location */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Belgrade, Serbia</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('experience')}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-2">
                  View My Work Experience
                  <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 hover:bg-muted/50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            {content && (
              <div className="bg-gray-950/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-900/90 px-6 py-4 flex items-center gap-3 border-b border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Terminal className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400 font-mono">
                      about.md
                    </span>
                  </div>
                </div>

                <div className="p-6 font-mono text-sm space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-green-400"
                  >
                    <span className="text-gray-500">$</span> cat about.md
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                    className="text-gray-300 leading-relaxed prose prose-sm prose-invert max-w-none"
                  >
                    {content}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="space-y-2 pt-4 border-t border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">nemanja@dev</span>
                      <span className="text-gray-500">~</span>
                      <span className="text-green-400">$</span>
                      <span className="text-white">ls skills/</span>
                    </div>
                    <div className="text-gray-300 ml-4 grid grid-cols-2 gap-2">
                      {[
                        'react.tsx',
                        'typescript.ts',
                        'node.js',
                        'next.js',
                        'mongodb.db',
                        'tailwind.css',
                      ].map((file, i) => (
                        <motion.div
                          key={file}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 3 + i * 0.1 }}
                          className="text-cyan-300 text-xs"
                        >
                          {file}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Status Command */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">nemanja@dev</span>
                      <span className="text-gray-500">~</span>
                      <span className="text-green-400">$</span>
                      <span className="text-white">whoami</span>
                    </div>
                    <div className="text-green-400 ml-4 text-sm">
                      A developer who loves coffee and solving problems ☕
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-cyan-400">nemanja@dev</span>
                    <span className="text-gray-500">~</span>
                    <span className="text-green-400">$</span>
                    {showCursor && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="bg-white text-black px-1"
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
