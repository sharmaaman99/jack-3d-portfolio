import React from 'react';
import { motion } from 'framer-motion';

export interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Contact Me',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white cursor-pointer select-none px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base group overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {/* Light sheen animation on hover */}
      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
      <span className="relative z-10 flex items-center gap-2">
        {label}
      </span>
    </motion.button>
  );
};
