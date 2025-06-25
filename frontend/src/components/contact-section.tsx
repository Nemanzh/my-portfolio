'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/section-header';
import { Mail, MapPin, Coffee, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import type { Contact } from '@/types/contact';

interface ContactSectionProps {
  contactData?: Contact | null;
}

export default function ContactSection({ contactData }: ContactSectionProps) {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: contactData?.email,
      href: `mailto:${contactData?.email}`,
      description: 'Best way to reach me',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactData?.location,
      description:
        contactData?.location_description ||
        'Currently based in Belgrade, Serbia',
    },
  ];

  return (
    <section id="contact" className="max-w-3xl mx-auto py-12 px-4">
      <SectionHeader
        title={contactData?.title || ''}
        subtitle={contactData?.subtitle}
      />

      <div className="space-y-8">
        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {contactData?.project_call_to_action}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {contactData?.project_description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`mailto:${contactData?.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Send me an email
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.label}</h4>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors block mb-2"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="text-lg font-medium mb-2">{item.value}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-border/50"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Coffee className="h-6 w-6" />
            {contactData?.coffee_message}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
