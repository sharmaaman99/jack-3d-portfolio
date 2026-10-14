import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { Hero3DCanvas } from './Hero3DCanvas';

export interface HeroSectionProps {
  onContactClick: () => void;
  onPricingClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onPricingClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* Interactive 3D Canvas Background */}
      <Hero3DCanvas />

      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <header className="px-6 md:px-10 pt-6 md:pt-8 w-full">
          <nav className="flex justify-between items-center w-full">
            <button
              onClick={() => scrollTo('about')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0"
            >
              About
            </button>
            <button
              onClick={onPricingClick}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0"
            >
              Price
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0"
            >
              Contact
            </button>
          </nav>
        </header>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden text-center z-10 my-auto sm:my-0">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered Absolutely) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack - 3D Creator Portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain select-none pointer-events-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
