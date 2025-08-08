'use client';

import Link from 'next/link';
import { motion, easeInOut } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
  position?: 'absolute' | 'relative';
}

export default function BackButton({ 
  href, 
  label = 'Back', 
  className = '',
  position = 'relative'
}: BackButtonProps) {
  const containerStyles = position === 'absolute' 
    ? 'absolute top-24 sm:top-28 left-4 sm:left-6 md:left-8 z-40' 
    : 'mt-4 sm:mt-6 mb-6 sm:mb-8';
  
  return (
    <motion.div 
      className={`${containerStyles} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: easeInOut }}
    >
      <Link 
        href={href} 
        className={ 'inline-flex items-center text-white/80 hover:text-white transition-colors text-sm sm:text-base font-medium'}
      >
        <motion.div
          whileHover={{ x: -4 }}
          whileTap={{ x: -2 }}
          transition={{ duration: 0.2 }}
          className="rounded-full bg-black/40 p-1.5 backdrop-blur-sm mr-2"
        >
          <ChevronLeft 
            size={20} 
            className="text-white" 
          />
        </motion.div>
        {label}
      </Link>
    </motion.div>
  );
}
