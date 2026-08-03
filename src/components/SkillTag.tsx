'use client';

import React from 'react';

const colors = ['pink', 'cyan', 'yellow', 'lime', 'purple', 'orange'] as const;
type NbColor = (typeof colors)[number];

interface SkillTagProps {
  skillName: string;
  color?: NbColor;
}

const SkillTag: React.FC<SkillTagProps> = ({ skillName, color }) => {
  const c =
    color ??
    colors[
      skillName.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
        colors.length
    ];

  return <span className={`nb-tag nb-tag-${c}`}>{skillName}</span>;
};

export default SkillTag;