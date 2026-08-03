'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlurText from '@/blocks/TextAnimations/BlurText/BlurText';

const socialLinks = [
  {
    platform: 'GitHub',
    href: 'https://github.com/RizkiRamadhani561',
    iconPath: '/icons/github_icon.svg',
  },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/m-rizki-ramadhani/',
    iconPath: '/icons/linkedin_icon.svg',
  },
  {
    platform: 'Gmail',
    href: 'mailto:261004ramadhani@gmail.com',
    iconPath: '/icons/gmail_icon.svg',
  },
];

const contactInfo = {
  email: '261004ramadhani@gmail.com',
  phone: '+62 851 1951 2611',
  location: 'West Jakarta, Indonesia',
};

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-nb-cream">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16 relative">
        <BlurText
          text="Get In Touch"
          delay={50}
          animateBy="letters"
          direction="top"
          className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-nb-black"
        />
        <div className="w-24 h-1 bg-nb-black mx-auto mt-4" />
      </div>

      {/* Contact Content */}
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Contact Information */}
        <div className="nb-card nb-card-purple p-6 flex flex-col space-y-6">
          <h2 className="text-2xl font-black uppercase">Contact Info</h2>

          {contactInfo.email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 nb-border bg-nb-white flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <a href={`mailto:${contactInfo.email}`} className="font-bold underline underline-offset-2 hover:bg-nb-black hover:text-nb-cream transition-all px-1">{contactInfo.email}</a>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 nb-border bg-nb-white flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <span className="font-bold">{contactInfo.phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 nb-border bg-nb-white flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <span className="font-bold">{contactInfo.location}</span>
          </div>

          {/* Social Links */}
          <div className="pt-4">
            <h3 className="text-lg font-black uppercase mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Link key={link.platform} href={link.href} target="_blank" rel="noopener noreferrer" className="nb-border bg-nb-white p-2 hover:bg-nb-black hover:text-nb-cream transition-all hover:-translate-y-1">
                  <Image src={link.iconPath} alt={link.platform} width={24} height={24} className="w-6 h-6 object-contain" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="nb-card nb-card-yellow p-6">
          <h2 className="text-2xl font-black uppercase mb-6">Send Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="name" className="block font-bold text-sm mb-1 uppercase">Name</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-nb-white nb-border font-medium focus:outline-none focus:bg-nb-black focus:text-nb-cream transition-all" required />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold text-sm mb-1 uppercase">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-nb-white nb-border font-medium focus:outline-none focus:bg-nb-black focus:text-nb-cream transition-all" required />
            </div>
            <div>
              <label htmlFor="subject" className="block font-bold text-sm mb-1 uppercase">Subject</label>
              <input type="text" id="subject" name="subject" className="w-full px-3 py-2 bg-nb-white nb-border font-medium focus:outline-none focus:bg-nb-black focus:text-nb-cream transition-all" />
            </div>
            <div>
              <label htmlFor="message" className="block font-bold text-sm mb-1 uppercase">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 bg-nb-white nb-border font-medium focus:outline-none focus:bg-nb-black focus:text-nb-cream transition-all" required></textarea>
            </div>
            <button type="submit" className="nb-btn bg-nb-black text-nb-cream hover:bg-nb-white hover:text-nb-black w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}