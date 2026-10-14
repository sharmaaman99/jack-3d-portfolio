import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Copy, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Modeling',
    budget: '$3k - $5k',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B600A8', '#7621B0', '#BE4C00', '#D7E2EA'],
      });
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jack@3dcreator.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      service: '3D Modeling',
      budget: '$3k - $5k',
      message: '',
    });
    onClose();
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#111317] border border-[#262B34] rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#B600A8]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#7621B0]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black uppercase text-[#D7E2EA] mb-3">
                  Message Transmitted!
                </h3>
                <p className="text-[#D7E2EA]/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
                  Thanks for reaching out, <span className="text-white font-medium">{formData.name}</span>! Jack will review your project specs and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full px-8 py-3 bg-[#D7E2EA] text-[#0C0C0C] font-semibold uppercase tracking-wider text-sm hover:bg-white transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/80 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>Let's collaborate</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#D7E2EA]">
                    Initiate Project
                  </h2>
                  <p className="text-sm sm:text-base text-[#D7E2EA]/60 mt-1 font-light">
                    Have a vision for 3D art, high-fidelity rendering, or interactive design? Let's bring it to life.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full bg-[#181B22] border border-[#282F3B] focus:border-[#B600A8] rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@studio.co"
                        className="w-full bg-[#181B22] border border-[#282F3B] focus:border-[#B600A8] rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#181B22] border border-[#282F3B] focus:border-[#B600A8] rounded-xl px-4 py-3 text-[#D7E2EA] outline-none transition-colors text-sm cursor-pointer"
                      >
                        <option value="3D Modeling">01 - 3D Modeling</option>
                        <option value="Rendering">02 - High-Fidelity Rendering</option>
                        <option value="Motion Design">03 - Motion Design</option>
                        <option value="Branding">04 - Visual Identity & Branding</option>
                        <option value="Web Design">05 - 3D Web Design & Dev</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#181B22] border border-[#282F3B] focus:border-[#B600A8] rounded-xl px-4 py-3 text-[#D7E2EA] outline-none transition-colors text-sm cursor-pointer"
                      >
                        <option value="< $3k">&lt; $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Jack about your deliverables, timeline, or creative direction..."
                      className="w-full bg-[#181B22] border border-[#282F3B] focus:border-[#B600A8] rounded-xl p-4 text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 text-xs text-[#D7E2EA]/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>jack@3dcreator.design</span>
                      <Copy className="w-3 h-3 ml-1" />
                      {copied && <span className="text-emerald-400 font-semibold">Copied!</span>}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-widest text-white px-8 py-3.5 text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }}
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
