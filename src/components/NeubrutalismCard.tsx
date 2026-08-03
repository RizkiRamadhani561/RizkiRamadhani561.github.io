'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type NbColor = 'pink' | 'cyan' | 'yellow' | 'lime' | 'orange' | 'purple' | 'black';

interface NeubrutalismCardProps {
  children: React.ReactNode;
  color?: NbColor;
  className?: string;
  noPadding?: boolean;
  as?: 'div' | 'motion-div';
  motionProps?: Record<string, unknown>;
}

const NeubrutalismCard: React.FC<NeubrutalismCardProps> = ({
  children,
  color = 'cyan',
  className = '',
  noPadding = false,
  as = 'div',
  motionProps = {},
}) => {
  const colorClass = color !== 'black' ? `nb-card-${color}` : '';
  const base = `nb-card ${colorClass} ${noPadding ? '' : 'p-6'} ${className}`;

  if (as === 'motion-div') {
    return (
      <motion.div className={base} {...(motionProps as any)}>
        {children}
      </motion.div>
    );
  }

  return <div className={base}>{children}</div>;
};

export default NeubrutalismCard;