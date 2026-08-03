'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NeubrutalismCard, { type NbColor } from './NeubrutalismCard';

const cardColors: NbColor[] = ['pink', 'cyan', 'yellow', 'lime', 'purple'];

interface ProjectCardProps {
  project: {
    id: number;
    number: string;
    title: string;
    description: string;
    techstack: string[];
    imageSrc: string;
    link: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({ project, index }) => {
    const colorKey = cardColors[index % cardColors.length];

    const handleClick = () => {
      if (project.link) window.open(project.link, '_blank');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`${project.title} — open project in new tab`}
        className="cursor-pointer"
      >
        <NeubrutalismCard color={colorKey} className="flex flex-col h-full">
          {/* Project number badge */}
          <div className="inline-block self-start bg-nb-black text-nb-white font-black text-sm px-3 py-1 -mt-2 -ml-2 mb-3">
            {project.number}
          </div>

          <h3 className="text-lg font-black uppercase leading-tight">
            {project.title}
          </h3>
          <p className="text-sm font-medium mt-1 opacity-70">
            {project.description}
          </p>

          {/* Image */}
          <div className="relative w-full aspect-video mt-4 border-[3px] border-nb-black overflow-hidden">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techstack.map((icon, i) => (
              <Image
                key={i}
                src={icon}
                alt=""
                width={24}
                height={24}
                className="border-2 border-[#1a1a1a] p-1"
              />
            ))}
          </div>
        </NeubrutalismCard>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;