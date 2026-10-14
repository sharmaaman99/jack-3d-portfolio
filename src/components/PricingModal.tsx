import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Sparkles, Box } from 'lucide-react';

export interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  const tiers = [
    {
      name: 'Essential 3D',
      price: '$1,800',
      description: 'Ideal for startups needing hero 3D assets or product packshots.',
      features: [
        'Single hero 3D model with custom textures',
        '4K photorealistic renders (up to 4 angles)',
        'Standard lighting & material setup',
        'Commercial usage rights included',
        'Turnaround: 5-7 business days',
      ],
      popular: false,
      icon: Box,
    },
    {
      name: 'Pro Motion & 3D',
      price: '$4,200',
      description: 'Complete 3D visual language with kinetic motion design.',
      features: [
        'Up to 3 high-detail 3D models',
        '15-30s kinetic 3D motion loop / teaser',
        '8K renders + transparent alpha channels',
        'Brand colorway & material explorations',
        'Source files (Blender / C4D / GLTF)',
        'Turnaround: 2-3 weeks',
      ],
      popular: true,
      icon: Zap,
    },
    {
      name: 'Custom WebGL / Studio',
      price: '$8,500+',
      description: 'End-to-end interactive 3D web experience or brand universe.',
      features: [
        'Custom interactive Three.js / WebGL build',
        'Full brand identity integration',
        'Multi-scene animations and camera choreography',
        'Real-time shaders and reactive physics',
        'Direct 1-on-1 sprint with Jack',
        'Priority turnaround & ongoing support',
      ],
      popular: false,
      icon: Sparkles,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#101216] border border-[#262B34] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#7621B0]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">
                Transparent Investment
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#D7E2EA] mt-1">
                Pricing & Engagements
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/60 mt-2 font-light">
                Tailored creative partnerships built for game-changers, high-growth studios, and boundary-pushing brands.
              </p>
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.name}
                    className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                      tier.popular
                        ? 'bg-[#181B22] border-2 border-[#B600A8] shadow-lg shadow-[#B600A8]/20 -translate-y-1'
                        : 'bg-[#14161C] border border-[#262B34] hover:border-[#D7E2EA]/40'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-white/5 text-[#D7E2EA]">
                          <Icon className="w-5 h-5 text-[#BBCCD7]" />
                        </div>
                        <span className="text-2xl font-black text-[#D7E2EA]">
                          {tier.price}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold uppercase text-[#D7E2EA] tracking-wide mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-[#D7E2EA]/60 font-light mb-6 min-h-[36px]">
                        {tier.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-[#D7E2EA]/80 font-light">
                            <Check className="w-4 h-4 text-[#B600A8] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectTier(tier.name)}
                      className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                        tier.popular
                          ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow hover:brightness-110'
                          : 'border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-white/10'
                      }`}
                    >
                      Select Tier
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
