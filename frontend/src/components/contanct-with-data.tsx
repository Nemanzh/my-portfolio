// components/contact-with-data.tsx
import { getContact } from '@/lib/api';
import type { Contact } from '@/types/contact';
import ContactSection from '@/components/contact-section';

export default async function ContactWithData() {
  const contactData: Contact | null = await getContact();

  return <ContactSection contactData={contactData} />;
}
