import { Metadata } from 'next'
import { getPageMetadata } from '@/config/metadata'
import { ContactSection } from '@/components/layout/sections/contact/contact-section'

export const metadata: Metadata = getPageMetadata('contact')

export default function ContactPage() {
  return <ContactSection />;
}
