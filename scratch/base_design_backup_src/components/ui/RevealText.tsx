import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/** Line-by-line masked reveal for display headlines. */
export function RevealText({
  lines,
  className,
  lineClassName,
  as = 'h2',
  delay = 0,
  accentLast = false







}: {lines: string[];className?: string;lineClassName?: string;as?: 'h1' | 'h2' | 'h3';delay?: number;accentLast?: boolean;}) {
  const Tag = as;
  return (
    <Tag className={cn(className, 'font-display uppercase leading-[0.88]')}>
      {lines.map((line, i) =>
      <span key={line + i} className="block overflow-hidden">
          <motion.span
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.62, delay: delay + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'block',
            accentLast && i === lines.length - 1 && 'text-signal',
            lineClassName
          )}>
          
            {line}
          </motion.span>
        </span>
      )}
    </Tag>);

}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 22





}: {children: React.ReactNode;delay?: number;className?: string;y?: number;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px', amount: 0.05 }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}>
      
      {children}
    </motion.div>);

}