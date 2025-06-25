// components/about-terminal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Terminal, MapPin, Code, Coffee } from 'lucide-react';

interface AboutTerminalProps {
  content: React.ReactNode;
}

export const AboutTerminal = ({ content }: AboutTerminalProps) => {
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { cmd: 'whoami', output: 'nemanja-radulovic' },
    { cmd: 'pwd', output: '/home/nemanja/portfolio' },
    { cmd: 'cat about.txt', output: 'content' },
  ];

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="lg:col-span-1"
      >
        <div className="bg-card border rounded-lg p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="h-32 w-32 border-2 border-primary/20">
                <AvatarImage
                  src="/profile.jpg" // Replace with your actual image
                  alt="Nemanja Radulovic"
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-primary/10">
                  NR
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div>
              <h3 className="text-xl font-semibold mb-1">Nemanja Radulovic</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Full Stack Developer
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Belgrade, Serbia</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Full Stack Developer</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Coffee className="h-4 w-4" />
                  <span>Coffee Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="lg:col-span-2"
      >
        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border shadow-lg">
          {/* Terminal Header */}
          <div className="bg-gray-800 dark:bg-gray-900 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400 font-mono">terminal</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-4 min-h-[400px]">
            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-400"
            >
              Welcome to Nemanjas Portfolio Terminal v1.0.0
            </motion.div>

            {/* Commands */}
            <AnimatePresence>
              {commands.map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 1.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400">nemanja@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-purple-400">~</span>
                    <span className="text-white">$</span>
                    <span className="text-green-300">{command.cmd}</span>
                    {index === commands.length - 1 && showCursor && (
                      <span className="text-white bg-white">_</span>
                    )}
                  </div>

                  {command.output === 'content' ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 1.5 + index * 1.5, duration: 0.5 }}
                      className="text-gray-300 ml-4 mb-4 leading-relaxed"
                    >
                      <div className="prose prose-sm prose-invert max-w-none">
                        {content}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + index * 1.5 }}
                      className="text-gray-300 ml-4 mb-2"
                    >
                      {command.output}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Additional fun commands */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="text-gray-500 text-xs mt-8"
            >
              Try: ls, cat skills.json, echo Hello World!, git status
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
