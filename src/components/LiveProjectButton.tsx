import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  label = 'Live Project',
  showIcon = false,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer select-none group ${className}`}
    >
      <span>{label}</span>
      {showIcon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.button>
  );
};
