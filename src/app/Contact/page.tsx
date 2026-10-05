'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPhone } from 'react-icons/fa6';

const email = 'm.rizki.ramadhani@gmail.com';
const phone = '+62 851 1951 2611';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const subject = String(data.get('subject') ?? 'Portfolio inquiry');
    const message = String(data.get('message') ?? '');
    const body = `Name: ${name}\n\n${message}`;
    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main className="route-page">
      <section className="container route-hero">
        <motion.div
          className="route-title-card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55, ease: 'easeOut' }}
        >
          <span className="section-index">PROFILE / CONTACT</span>
          <h1>Let&apos;s build something <span>useful.</span></h1>
          <p>
            Open to web development, data workflow, IT support, operations, internships,
            collaborations, and practical digital projects.
          </p>
        </motion.div>

        <div className="contact-route-grid">
          <motion.div
            className="route-info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .1, duration: .55 }}
          >
            <div className="route-card-label">DIRECT CHANNELS</div>

            <a className="route-contact-row" href={`mailto:${email}`} data-cursor>
              <span><FaEnvelope /></span>
              <div><small>EMAIL</small><strong>{email}</strong></div>
              <FaArrowRight />
            </a>

            <a className="route-contact-row" href={`tel:${phone.replaceAll(' ', '')}`} data-cursor>
              <span><FaPhone /></span>
              <div><small>PHONE</small><strong>{phone}</strong></div>
              <FaArrowRight />
            </a>

            <div className="route-contact-row">
              <span><FaLocationDot /></span>
              <div><small>LOCATION</small><strong>Jakarta Barat, Indonesia</strong></div>
            </div>

            <div className="route-socials">
              <a href="https://github.com/RizkiRamadhani561" target="_blank" rel="noreferrer" data-cursor aria-label="GitHub">
                <FaGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/m-rizki-ramadhani" target="_blank" rel="noreferrer" data-cursor aria-label="LinkedIn">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            className="route-form-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .18, duration: .55 }}
          >
            <div className="route-card-label">SEND A MESSAGE</div>
            <label>
              <span>Your name</span>
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              <span>Subject</span>
              <input name="subject" placeholder="Project / collaboration" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={6} required placeholder="Tell me what you are building..." />
            </label>
            <button type="submit" className="route-submit" data-cursor>
              {sent ? 'OPENING EMAIL…' : 'SEND VIA EMAIL'} <FaArrowRight />
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
