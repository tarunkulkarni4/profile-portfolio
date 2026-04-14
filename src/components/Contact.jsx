import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { socialLinks } from '../data/portfolioData';

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Replace this key with your actual Web3Forms access key
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      
      if (response.status === 200) {
        setToast('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setToast('error');
      }
    } catch (err) {
      setToast('error');
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const inputClass = `
    w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200
    bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]
    focus:border-[var(--muted)] placeholder:text-[var(--muted)]
  `;

  return (
    <section id="contact" className="section-container">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] mb-3"
          style={{ color: 'var(--muted)' }}
          variants={fadeUp}
        >
          Get In Touch
        </motion.p>
        <motion.h2 className="section-title mb-2" style={{ color: 'var(--text)' }} variants={fadeUp}>
          Let's Work Together
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Have a project in mind? I'd love to hear about it.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="contact-form flex flex-col gap-4"
            variants={fadeUp}
          >
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              style={{ minHeight: '48px' }}
            />
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
              style={{ minHeight: '48px' }}
            />
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className={inputClass}
              style={{ resize: 'none' }}
            />

            <motion.button
              type="submit"
              disabled={sending}
              className="btn-primary shimmer-btn justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Info + Social */}
          <motion.div className="flex flex-col gap-8" variants={fadeUp}>
            <div>
              <h3
                className="font-grotesk font-semibold text-lg mb-3"
                style={{ color: 'var(--text)' }}
              >
                Connect with me
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of
                something amazing. Feel free to reach out through any of the channels below.
              </p>
            </div>

            {/* Email */}
            <a
              href="mailto:tarunkulkarni4@gmail.com"
              className="group flex items-center gap-3 text-sm transition-all duration-200"
              style={{ color: 'var(--muted)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:border-[var(--text)] group-hover:scale-110"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <span className="group-hover:text-[var(--text)] transition-colors duration-200">
                tarunkulkarni4@gmail.com
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919632915734"
              className="group flex items-center gap-3 text-sm transition-all duration-200"
              style={{ color: 'var(--muted)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:border-[var(--text)] group-hover:scale-110"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.27z"/></svg>
              </div>
              <span className="group-hover:text-[var(--text)] transition-colors duration-200">
                +91 9632915734
              </span>
            </a>

            {/* Social Links */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Find me online
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-200"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--card-bg)',
                      color: 'var(--muted)',
                    }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl"
          style={{
            backgroundColor: 'var(--text)',
            color: 'var(--bg)',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
          Message sent! I'll get back to you soon.
        </motion.div>
      )}
    </section>
  );
}
