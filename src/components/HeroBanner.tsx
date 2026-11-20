import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface HeroBannerProps {
  onOpenRegister: () => void;
  onOpenStatus?: () => void;
}

const HERO_SLIDES = ['/banner1.png'];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenRegister,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Preload slides for instant switching
    HERO_SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={onOpenRegister}
      className="relative w-full bg-black cursor-pointer group overflow-hidden"
      aria-label="Smart Driver Hero Banner"
    >
      {/* Slides Container maintaining natural height and width */}
      <div className="relative w-full flex items-center justify-center">
        {HERO_SLIDES.map((slideSrc, idx) => (
          <div
            key={slideSrc}
            className={`w-full transition-opacity duration-700 ease-in-out ${
              idx === currentSlideIndex
                ? 'opacity-100 z-1 relative'
                : 'opacity-0 z-0 pointer-events-none absolute inset-0'
            }`}
          >
            <img
              alt={`Smart Driver Slide ${idx + 1}`}
              src={slideSrc}
              fetchPriority={idx === 0 ? 'high' : 'low'}
              className="w-full h-auto block select-none"
            />
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation Arrows (only if multiple slides) */}
      {HERO_SLIDES.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            }}
            aria-label="Previous Slide"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          >
            <ArrowLeftIcon size={18} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
            }}
            aria-label="Next Slide"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          >
            <ArrowRightIcon size={18} />
          </button>

          {/* Slide Navigation Dots */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20"
          >
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
        </>
      )}
    </div>
  );
};
