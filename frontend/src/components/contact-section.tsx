// components/contact-section.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader } from '@/components/section-header';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'nemanja@example.com',
      href: 'mailto:nemanja@example.com',
      description: 'Send me an email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+381 60 123 4567',
      href: 'tel:+381601234567',
      description: 'Call me directly',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Belgrade, Serbia',
      href: 'https://maps.google.com/?q=Belgrade,Serbia',
      description: 'Find me here',
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      description: "I'll get back to you soon",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/your-username',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/your-profile',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/your-handle',
      color: 'hover:text-blue-400',
    },
    {
      icon: Calendar,
      label: 'Schedule a Call',
      href: 'https://calendly.com/your-profile',
      color: 'hover:text-green-600',
    },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto py-12 px-4">
      <SectionHeader
        title="Get In Touch"
        subtitle="Let's work together on your next project"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4">Lets Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Im always open to discussing new opportunities, interesting
              projects, or just having a chat about technology. Feel free to
              reach out through any of the channels below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm text-muted-foreground">
                          {item.label}
                        </h4>
                        {item.href ? (
                          <Link
                            href={item.href}
                            target={
                              item.href.startsWith('http') ? '_blank' : '_self'
                            }
                            className="text-lg font-semibold hover:text-primary transition-colors"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-lg font-semibold">{item.value}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-6"
          >
            <h4 className="font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className={`transition-colors ${social.color}`}
                >
                  <Link href={social.href} target="_blank" title={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. Ill get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hello..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
