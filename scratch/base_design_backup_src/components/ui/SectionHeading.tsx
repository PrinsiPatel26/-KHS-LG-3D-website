import React from 'react';
import { RevealText, Reveal } from './RevealText';
import { cn } from '../../utils/cn';

export function TechnicalLabel({
  code,
  children,
  className




}: {code?: string;children: React.ReactNode;className?: string;}) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-tech text-steel-500',
        className
      )}>
      
      <span className="inline-block h-px w-8 bg-signal" />
      {code && <span className="text-signal">{code}</span>}
      {children}
    </p>);

}

export function SectionHeading({
  code,
  eyebrow,
  lines,
  body,
  className,
  align = 'left',
  accentLast = true,
  size = 'lg'









}: {code?: string;eyebrow?: string;lines: string[];body?: string;className?: string;align?: 'left' | 'center';accentLast?: boolean;size?: 'md' | 'lg';}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}>
      
      {eyebrow &&
      <Reveal>
          <TechnicalLabel code={code} className={align === 'center' ? 'justify-center' : ''}>
            {eyebrow}
          </TechnicalLabel>
        </Reveal>
      }
      <RevealText
        lines={lines}
        accentLast={accentLast}
        className={cn(
          'mt-5 font-bold text-steel-50',
          size === 'lg' ?
          'text-[clamp(2.4rem,6vw,5.2rem)]' :
          'text-[clamp(1.9rem,4vw,3.4rem)]'
        )} />
      
      {body &&
      <Reveal delay={0.12}>
          <p
          className={cn(
            'mt-6 max-w-xl text-[15px] leading-relaxed text-steel-400',
            align === 'center' && 'mx-auto'
          )}>
          
            {body}
          </p>
        </Reveal>
      }
    </div>);

}