import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './Icons';

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

  // Auto slide between slide1.png and slide2.png every 4.5 seconds
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
      {/* Auto-sliding Background Images (slide1.png and slide2.png) */}
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

      {/* Mobile Dark Contrast Overlay (Ensures text is 100% sharp and readable over bright truck graphics) */}
      <div
        className="absolute inset-0 z-2 pointer-events-none md:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(2, 18, 66, 0.95) 0%, rgba(3, 27, 92, 0.88) 50%, rgba(2, 13, 46, 0.96) 100%)',
        }}
      />

      {/* Desktop Horizontal Gradient Overlay for Crisp Typography & Right-side Visual Preview */}
      <div
        className="absolute inset-0 z-2 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, rgba(3,27,92,0.96) 0%, rgba(3,27,92,0.85) 55%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Responsive Content Container:
          Ample padding ensures all text, badge, description, and CTA buttons are 100% visible
          and comfortably finish well above the vehicle category card on both mobile and desktop. */}
      <div
        className="site-container relative z-10 flex flex-col justify-center pt-8 sm:pt-10 md:pt-14 pb-8 sm:pb-12 md:pb-24"
      >
        <div className="max-w-[620px]">
          <h1
            className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.2rem] text-white font-normal m-0 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            Apni Gaadi, Apna Kaam.
          </h1>
          <h1
            className="text-[2.6rem] sm:text-[3.2rem] md:text-[4.8rem] text-white font-extrabold mt-1 md:mt-2 leading-none tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
          >
            Earn up to ₹45,000 / mo
          </h1>

          <p className="text-white/95 text-[1.35rem] sm:text-[1.45rem] md:text-[1.6rem] mt-3 md:mt-4 leading-relaxed font-medium max-w-[560px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            Attach your 2-Wheeler, 3-Wheeler, Tata Ace or Pickup truck with Smart Driver. Enjoy regular trips, guaranteed weekly payouts, and comprehensive accident insurance.
          </p>

          {/* Quick CTA buttons in hero */}
          <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={onOpenRegister}
              style={{
                backgroundColor: '#0445DA',
                boxShadow: '0 6px 20px rgba(4, 69, 218, 0.45)',
              }}
              className="px-6 py-2.5 md:px-7 md:py-3.5 rounded-xl text-white text-[1.35rem] md:text-[1.55rem] font-bold hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Register as Driver</span>
              <ArrowRightIcon size={18} />
            </button>

            <button
              type="button"
              onClick={onOpenStatus}
              className="px-5 py-2.5 md:px-6 md:py-3.5 rounded-xl border-2 border-white/80 text-white text-[1.3rem] md:text-[1.45rem] font-bold hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
            >
              Track Application Status
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots (Placed top-right on mobile and bottom-right on desktop to avoid any overlap) */}
      <div className="absolute top-4 right-4 md:top-auto md:bottom-6 md:right-12 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlideIndex
                ? 'w-7 bg-[#f2c94c]'
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
