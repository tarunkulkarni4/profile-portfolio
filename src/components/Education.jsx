import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { education } from '../data/portfolioData';

export default function Education() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="education" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--muted)' }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            Academic Background
          </motion.p>
          <motion.h2
            className="section-title mb-2"
            style={{ color: 'var(--text)' }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            Education
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            My academic journey and qualifications.
          </motion.p>

          {/* Timeline */}
          <div className="relative pl-10 md:pl-12">
            {/* Vertical line */}
            <div className="timeline-line" />

            <div className="flex flex-col gap-10">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
                    },
                  }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot" />

                  {/* Card */}
                  <div className="card-base p-5 md:p-6 ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3
                        className="font-grotesk font-bold leading-snug"
                        style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'var(--text)' }}
                      >
                        {item.degree}
                      </h3>
                      <span
                        className="shrink-0 text-xs px-3 py-1 rounded-full border font-mono"
                        style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
                      >
                        {item.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <p
                        className="flex items-center gap-1.5 text-sm"
                        style={{ color: 'var(--muted)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 7 10-5 10 5-10 5z"/><path d="M22 7v7"/><path d="M12 22v-7M2 7v7l10 5"/></svg>
                        {item.college}
                      </p>
                      <span
                        className="text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          color: 'var(--text)',
                          backgroundColor: 'var(--bg)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {item.cgpa}
                      </span>
                    </div>
                    {item.focus && (
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        <span className="font-semibold" style={{ color: 'var(--text)' }}>Focus: </span>
                        {item.focus}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
