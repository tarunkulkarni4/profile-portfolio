import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--muted)' }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            Tech Stack
          </motion.p>
          <motion.h2
            className="section-title mb-2"
            style={{ color: 'var(--text)' }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            Tools I use to build fast, scalable, and accessible products.
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      className="card-base skill-icon p-6 flex flex-col items-center justify-center gap-3 cursor-default"
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, delay: index * 0.05, ease: 'easeOut' },
        },
      }}
      whileHover={{ scale: 1.07, y: -5 }}
      transition={{ type: 'spring', stiffness: 280 }}
    >
      <i
        className={`${skill.icon} colored`}
        style={{ fontSize: '2.5rem', lineHeight: 1 }}
      />
      <span
        className="text-xs font-semibold text-center uppercase tracking-widest"
        style={{ color: 'var(--muted)' }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}
