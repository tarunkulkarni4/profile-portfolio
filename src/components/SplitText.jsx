import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.5,
  ease = [0.25, 0.46, 0.45, 0.94], // power3.out equivalent
  splitType = 'chars', // 'chars' or 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: rootMargin, amount: threshold, once: true });

  const elements = splitType === 'words' ? text.split(' ') : text.split('');
  const Tag = tag;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      }
    }
  };

  const item = {
    hidden: from,
    visible: {
      ...to,
      transition: { duration, ease }
    }
  };

  return (
    <Tag
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{ textAlign, wordWrap: 'break-word', willChange: 'transform, opacity' }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-wrap"
        style={{ justifyContent: textAlign === 'center' ? 'center' : (textAlign === 'right' ? 'flex-end' : 'flex-start') }}
      >
        {elements.map((el, i) => (
          <motion.span
            key={i}
            variants={item}
            className="inline-block will-change-[transform,opacity]"
            onAnimationComplete={i === elements.length - 1 ? onLetterAnimationComplete : undefined}
          >
            {el === ' ' ? '\u00A0' : el}
            {splitType === 'words' && i < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.div>
    </Tag>
  );
};

export default SplitText;
