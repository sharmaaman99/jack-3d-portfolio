import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectData } from './ProjectDetailModal';

export const PROJECTS_DATA: ProjectData[] = [
  {
    number: '01',
    category: 'Client',
    title: 'Nextlevel Studio',
    clientType: 'Commercial Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      'A boundary-breaking 3D brand identity and kinetic motion design system for Nextlevel Studio. Engineered bespoke procedural textures and futuristic typography sculptures to communicate cutting-edge design leadership.',
    deliverables: [
      'Interactive 3D Art Direction',
      'Cinema 4D & Octane Lighting System',
      '4K Kinetic Video Ident',
      'Multi-Format WebGL Asset Pipeline',
    ],
    techStack: ['Blender 4.2', 'Cinema 4D', 'Octane Render', 'Three.js', 'Figma'],
  },
  {
    number: '02',
    category: 'Personal',
    title: 'Aura Brand Identity',
    clientType: 'Self-Initiated Exploration',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'An organic exploration in glass refraction, iridescent luminescence, and sculptural typography. Aura investigates emotional responses to chromatic dispersion and hyper-tactile surfaces in virtual space.',
    deliverables: [
      'Glass Refraction Shader Experiments',
      'Abstract Procedural Sculptures',
      'Editorial Print & Digital Design System',
      'Dynamic Physics Simulation',
    ],
    techStack: ['Houdini', 'Redshift', 'After Effects', 'Substance Painter'],
  },
  {
    number: '03',
    category: 'Client',
    title: 'Solaris Digital',
    clientType: 'Commercial Client',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    description:
      'Solaris Digital is a next-generation decentralized infrastructure platform. Jack developed the high-fidelity 3D assets, futuristic hardware renders, and WebGL-ready models for their global launch campaign.',
    deliverables: [
      'Futuristic Hard-Surface 3D Modeling',
      'Real-time PBR Texturing Pipeline',
      '3D Interactive Landing Page Renders',
      'Hero Product Teaser Animation',
    ],
    techStack: ['Blender', 'Unreal Engine 5', 'GLSL', 'React Three Fiber'],
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
  onOpenProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  range,
  targetScale,
  progress,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden origin-top"
      >
        {/* Top Row: Number, category label, project name, Live Project button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/20">
          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-wider text-sm sm:text-base">
                ({project.category})
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA] tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveProjectButton
              onClick={() => onOpenProject(project)}
              showIcon={true}
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="pt-4 sm:pt-6 flex flex-col md:flex-row gap-4 sm:gap-6 w-full items-stretch">
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6">
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181D] border border-white/10 group cursor-pointer"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Img1}
                alt={`${project.title} preview 1`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181D] border border-white/10 group cursor-pointer"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Img2}
                alt={`${project.title} preview 2`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image */}
          <div
            className="w-full md:w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16181D] border border-white/10 group cursor-pointer flex-1 min-h-[280px]"
            onClick={() => onOpenProject(project)}
          >
            <img
              src={project.col2Img}
              alt={`${project.title} main showcase`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export interface ProjectsSectionProps {
  onOpenProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS_DATA.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-8 md:px-10 pt-20 pb-40"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-24">
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards Container */}
      <div className="relative w-full">
        {PROJECTS_DATA.map((project, index) => {
          const targetScale = 1 - (totalCards - 1 - index) * 0.03;
          const range: [number, number] = [index * 0.33, 1];

          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={totalCards}
              range={range}
              targetScale={targetScale}
              progress={scrollYProgress}
              onOpenProject={onOpenProject}
            />
          );
        })}
      </div>
    </section>
  );
};
