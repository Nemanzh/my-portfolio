// components/projects-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { ExternalLink, Github, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  year: string;
  category: 'web' | 'mobile' | 'desktop' | 'api';
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      longDescription:
        'Modern e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, payment processing with Stripe, and admin dashboard.',
      image: '/projects/ecommerce.jpg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Stripe',
        'Tailwind CSS',
      ],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/ecommerce',
      featured: true,
      status: 'completed',
      year: '2024',
      category: 'web',
    },
    {
      id: '2',
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates.',
      longDescription:
        'Real-time task management application with drag-and-drop functionality, team collaboration features, and live notifications using Socket.io.',
      image: '/projects/taskapp.jpg',
      technologies: [
        'React',
        'Socket.io',
        'Express',
        'PostgreSQL',
        'Material-UI',
      ],
      demoUrl: 'https://tasks.example.com',
      githubUrl: 'https://github.com/username/taskapp',
      featured: true,
      status: 'completed',
      year: '2024',
      category: 'web',
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description:
        'A beautiful weather dashboard with location-based forecasts.',
      longDescription:
        'Interactive weather dashboard featuring location-based forecasts, weather maps, and historical data visualization using Chart.js.',
      image: '/projects/weather.jpg',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Vuetify'],
      demoUrl: 'https://weather.example.com',
      githubUrl: 'https://github.com/username/weather',
      featured: false,
      status: 'completed',
      year: '2023',
      category: 'web',
    },
    {
      id: '4',
      title: 'Mobile Fitness App',
      description: 'React Native fitness tracking app with workout plans.',
      longDescription:
        'Cross-platform mobile fitness application with workout tracking, nutrition logging, and progress analytics.',
      image: '/projects/fitness.jpg',
      technologies: ['React Native', 'Redux', 'Firebase', 'Expo'],
      githubUrl: 'https://github.com/username/fitness',
      featured: false,
      status: 'in-progress',
      year: '2024',
      category: 'mobile',
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'planned':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto py-12 px-4">
      <SectionHeader
        title="Featured Projects"
        subtitle="A showcase of my recent work and contributions"
      />

      {/* Featured Projects */}
      <div className="space-y-12 mb-16">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative h-64 lg:h-80 ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <div
                        className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(
                          project.status
                        )}`}
                      />
                      {getStatusText(project.status)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.year}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3 pt-2">
                      {project.demoUrl && (
                        <Button variant="default" size="sm" asChild>
                          <Link href={project.demoUrl} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.githubUrl} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Other Projects Grid */}
      {otherProjects.length > 0 && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Other Projects
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <div
                          className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(
                            project.status
                          )}`}
                        />
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <Link href={project.demoUrl} target="_blank">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </Link>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <Link href={project.githubUrl} target="_blank">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
