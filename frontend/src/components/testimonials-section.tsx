// components/testimonials-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { Quote, Star, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  linkedinUrl?: string;
  featured: boolean;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: '/testimonials/sarah.jpg',
      content:
        'Nemanja delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise exceeded our expectations. The project was completed on time and within budget.',
      rating: 5,
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      featured: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      avatar: '/testimonials/michael.jpg',
      content:
        'Working with Nemanja was a game-changer for our startup. He built our MVP from scratch and helped us scale efficiently. His full-stack expertise is truly impressive.',
      rating: 5,
      linkedinUrl: 'https://linkedin.com/in/michael-chen',
      featured: true,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Design Lead',
      company: 'Creative Agency',
      avatar: '/testimonials/emily.jpg',
      content:
        'Nemanja perfectly translated our designs into pixel-perfect, responsive web applications. His collaboration skills and technical knowledge made the entire process smooth.',
      rating: 5,
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
      featured: false,
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Founder',
      company: 'InnovateLab',
      avatar: '/testimonials/david.jpg',
      content:
        'Exceptional developer with great communication skills. Nemanja helped us modernize our legacy system and the results speak for themselves.',
      rating: 5,
      featured: false,
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      role: 'Project Manager',
      company: 'Digital Solutions',
      avatar: '/testimonials/lisa.jpg',
      content:
        'Professional, reliable, and skilled. Nemanja consistently delivers high-quality code and meets all deadlines. Would definitely work with him again.',
      rating: 5,
      featured: false,
    },
    {
      id: '6',
      name: 'Alex Martinez',
      role: 'Senior Developer',
      company: 'DevTeam Pro',
      avatar: '/testimonials/alex.jpg',
      content:
        "Great team player with excellent problem-solving skills. Nemanja's code quality and architectural decisions always impress me.",
      rating: 5,
      featured: false,
    },
  ];

  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const otherTestimonials = testimonials.filter((t) => !t.featured);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="max-w-6xl mx-auto py-12 px-4">
      <SectionHeader
        title="What People Say"
        subtitle="Feedback from clients and colleagues I've worked with"
      />

      {/* Featured Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {featuredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full relative group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8" />
                </div>

                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg leading-relaxed italic">
                    {testimonial.content}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        {testimonial.linkedinUrl && (
                          <Link
                            href={testimonial.linkedinUrl}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Other Testimonials - Compact Grid */}
      {otherTestimonials.length > 0 && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            More Reviews
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Content */}
                      <blockquote className="text-sm leading-relaxed italic">
                        {testimonial.content}
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm">
                              {testimonial.name}
                            </h5>
                            {testimonial.linkedinUrl && (
                              <Link
                                href={testimonial.linkedinUrl}
                                target="_blank"
                                className="text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <Linkedin className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-2">
              Ready to work together?
            </h3>
            <p className="text-muted-foreground mb-4">
              Join these satisfied clients and lets build something amazing.
            </p>
            <Badge variant="secondary" className="text-sm">
              100% Client Satisfaction Rate
            </Badge>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
