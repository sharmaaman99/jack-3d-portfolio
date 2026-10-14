import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { PricingModal } from './components/PricingModal';
import { ProjectDetailModal, ProjectData } from './components/ProjectDetailModal';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleOpenPricing = () => {
    setIsPricingOpen(true);
  };

  const handleSelectTier = (_tierName: string) => {
    setIsPricingOpen(false);
    setIsContactOpen(true);
  };

  const handleOpenProject = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleSelectService = (_serviceName: string) => {
    setIsContactOpen(true);
  };

  return (
    <div
      className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section */}
      <HeroSection
        onContactClick={handleOpenContact}
        onPricingClick={handleOpenPricing}
      />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={handleOpenContact} />

      {/* 4. Services Section */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 5. Projects Section */}
      <ProjectsSection onOpenProject={handleOpenProject} />

      {/* Footer */}
      <Footer onContactClick={handleOpenContact} />

      {/* Modals & 3D Interactive Overlays */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectTier={handleSelectTier}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
        onContactClick={handleOpenContact}
      />
    </div>
  );
};

export default App;
