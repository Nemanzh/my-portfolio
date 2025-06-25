// components/hero-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <span className="text-primary">
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

export default function HeroSection() {
  const roles = [
    'Full Stack Developer',
    'React Specialist',
    'TypeScript Expert',
    'Problem Solver',
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Avatar className="h-32 w-32 mx-auto border-4 border-primary/20 shadow-2xl">
            <AvatarImage
              src="/profile.jpg" // Replace with your actual image
              alt="Nemanja Radulovic"
              className="object-cover"
            />
            <AvatarFallback className="text-4xl font-bold bg-primary/10">
              NR
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            👋 Hello, Im
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Nemanja Radulovic
          </motion.h1>

          {/* Dynamic Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium h-12 md:h-16"
          >
            Im a <TypewriterText texts={roles} speed={150} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about creating amazing digital experiences with modern
            technologies. I love building scalable applications and solving
            complex problems.
          </motion.p>

          {/* Location & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <MapPin className="h-3 w-3 mr-1" />
              Belgrade, Serbia
            </Badge>
            <Badge
              variant="outline"
              className="text-sm px-3 py-1 border-green-500 text-green-600 dark:text-green-400"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for work
            </Badge>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('about')}
              className="group"
            >
              Get to know me
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex items-center justify-center gap-4 pt-6"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary"
            >
              <Link href="mailto:your.email@example.com">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary"
            >
              <Link href="https://github.com/your-username" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary"
            >
              <Link href="https://linkedin.com/in/your-profile" target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
