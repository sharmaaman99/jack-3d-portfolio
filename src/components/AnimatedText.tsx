import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-0 select-none">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 pointer-events-none"
      >
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const total = chars.length;

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => {
        // Calculate scroll window for this character
        const start = index / total;
        // give a slight overlapping window for buttery smooth transitions
        const step = 1 / total;
        const end = Math.min(1, start + step * 2.5);

        return (
          <Char
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
