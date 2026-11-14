import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, ShieldCheckIcon, ZapIcon, CreditCardIcon } from './Icons';

interface HeroBannerProps {
  onOpenRegister: () => void;
  onOpenStatus: () => void;
}

const HERO_SLIDES = ['/slide1.png', '/slide2.png'];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenRegister,
  onOpenStatus,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #031b5c, #040a1a)',
      }}
    >
      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {HERO_SLIDES.map((slideSrc, idx) => (
          <div
            key={slideSrc}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              alt={`Smart Driver Slide ${idx + 1}`}
              src={slideSrc}
              fetchPriority={idx === 0 ? 'high' : 'low'}
              className="absolute inset-0 w-full h-full object-cover object-[85%_center] md:object-[right_center]"
            />
          </div>
        ))}
      </div>

      {/* Dark Contrast Overlays */}
      <div
        className="absolute inset-0 z-2 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(90deg, rgba(2, 18, 66, 0.95) 0%, rgba(3, 27, 92, 0.65) 50%, rgba(3, 27, 92, 0) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-2 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, rgba(3,27,92,0.96) 0%, rgba(3,27,92,0.85) 55%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Hero Content */}
      <div className="site-container relative z-10 flex flex-col justify-center pt-10 sm:pt-12 md:pt-18 pb-10 sm:pb-14 md:pb-24">
        <div className="max-w-[640px]">
          {/* Uber-Style Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[1.25rem] font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F2C94C] animate-pulse" />
            <span>Driver Partners Welcomed Across All Cities</span>
          </div>

          <h1 className="text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] text-white font-black leading-[1.08] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            Drive and earn on your schedule.
          </h1>

          <p className="text-white text-[1.45rem] sm:text-[1.6rem] md:text-[1.75rem] mt-4 leading-relaxed font-medium max-w-[540px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
            Attach your vehicle with Smart Driver. Earn up to <strong className="text-white font-extrabold underline decoration-[#F2C94C] decoration-2">₹45,000 / month</strong> with 0% platform commission and daily direct payouts.
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onOpenRegister}
              className="px-7 py-4 rounded-2xl bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.55rem] font-black transition-all shadow-[0_6px_20px_rgba(4,69,218,0.45)] cursor-pointer flex items-center gap-2.5 active:scale-[0.98]"
            >
              <span>Apply to Drive</span>
              <ArrowRightIcon size={20} />
            </button>

            <button
              type="button"
              onClick={onOpenStatus}
              className="px-6 py-4 rounded-2xl border-2 border-white/70 hover:border-white text-white text-[1.45rem] font-bold hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            >
              Check Status
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-3 max-w-lg text-white">
            <div className="flex items-center gap-2">
              <ZapIcon size={18} className="text-[#F2C94C] shrink-0" />
              <span className="text-[1.2rem] font-bold leading-tight">0% Commission Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCardIcon size={18} className="text-[#F2C94C] shrink-0" />
              <span className="text-[1.2rem] font-bold leading-tight">Instant Daily Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon size={18} className="text-[#F2C94C] shrink-0" />
              <span className="text-[1.2rem] font-bold leading-tight">₹5 Lakh Insurance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute top-4 right-4 md:top-auto md:bottom-6 md:right-12 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlideIndex
                ? 'w-6 bg-[#F2C94C]'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
