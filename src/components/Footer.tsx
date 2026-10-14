import { ArrowUp } from 'lucide-react';

export interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0C0C0C] border-t border-[#1F242C] px-6 md:px-10 py-12 text-[#D7E2EA] z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-black uppercase tracking-wider text-white">
              Jack
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#B600A8]/20 border border-[#B600A8]/40 text-[#BBCCD7] font-mono">
              3D Creator
            </span>
          </div>
          <p className="text-xs text-[#D7E2EA]/60 max-w-sm font-light">
            Pushing the boundaries of 3D modeling, kinetic motion design, and immersive digital worlds.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-[#D7E2EA]/70">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://artstation.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            ArtStation
          </a>
          <button
            onClick={onContactClick}
            className="hover:text-[#B600A8] transition-colors cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

        {/* Right Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#D7E2EA]/40 font-mono">
            © {new Date().getFullYear()} Jack. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all cursor-pointer group"
          >
            <ArrowUp className="w-4 h-4 text-[#D7E2EA] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
