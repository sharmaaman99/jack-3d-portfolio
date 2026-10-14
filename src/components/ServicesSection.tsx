import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section className="relative w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C] z-0 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service items in vertical list */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className="border-b border-[rgba(12,12,12,0.15)] group"
            >
              <div
                onClick={() => onSelectService && onSelectService(service.name)}
                className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 cursor-pointer transition-colors duration-300 hover:pl-2"
              >
                {/* Number on left */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0 select-none group-hover:text-[#B600A8] transition-colors duration-300"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description stacked on right */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-4 mb-2 sm:mb-3">
                    <h3
                      className="font-medium uppercase text-[#0C0C0C] group-hover:translate-x-1 transition-transform duration-300"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    >
                      {service.name}
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-[#0C0C0C] text-white hidden sm:flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
