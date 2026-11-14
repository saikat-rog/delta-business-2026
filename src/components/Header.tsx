import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, PhoneIcon, MenuIcon, ChevronRightIcon, ArrowRightIcon } from './Icons';

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenStatus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onOpenStatus,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-50 w-full bg-white">
      {/* Main Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/90 w-full shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="site-container h-18 md:h-20 flex items-center justify-between">
          {/* Logo on Left */}
          <a href="/" className="inline-flex items-center text-inherit no-underline">
            <img
              src="/logo2.png"
              alt="Smart Driver"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain block"
            />
          </a>

          {/* Navigation Links Grouped on Right */}
          <nav className="hidden md:flex items-center gap-7">
            <a
              href="#vehicles"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.4rem] font-bold text-gray-700 hover:text-black transition-colors"
            >
              Vehicles
            </a>

            <a
              href="#benefits"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.4rem] font-bold text-gray-700 hover:text-black transition-colors"
            >
              Benefits
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.4rem] font-bold text-gray-700 hover:text-black transition-colors"
            >
              FAQs
            </a>

            {/* Check Application Status */}
            <button
              type="button"
              onClick={onOpenStatus}
              className="px-4 py-2 rounded-xl text-gray-800 text-[1.35rem] font-bold hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <PhoneIcon size={16} className="text-gray-500" />
              <span>Check Status</span>
            </button>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-[#0445DA] text-white text-[1.4rem] font-extrabold hover:bg-[#0336aa] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Apply to Drive
            </button>
          </nav>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="flex items-center justify-center p-2.5 rounded-xl text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer border-none bg-transparent"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <MenuIcon size={26} className="text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Portal to document.body to prevent parent backdrop-filter clipping) */}
        {isMobileMenuOpen &&
          createPortal(
            <div
              className="fixed inset-0 bg-slate-950/60 z-[9999] flex justify-end backdrop-blur-xs animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className="w-[88%] max-w-[340px] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-in-right"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <img
                      src="/logo2.png"
                      alt="Smart Driver"
                      className="h-9 w-auto object-contain block"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close menu"
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors cursor-pointer border-none"
                    >
                      <XIcon size={20} />
                    </button>
                  </div>

                  {/* Status Portal Card (Prominent & Dedicated) */}
                  <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border border-blue-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[1.15rem] font-extrabold uppercase tracking-wider text-[#0445DA] bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                        Driver Portal
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h3 className="text-[1.65rem] font-black text-gray-950 mb-1 leading-snug">
                      Check Application Status
                    </h3>
                    <p className="text-[1.3rem] text-gray-600 mb-3.5 leading-snug">
                      Track approval, document verification &amp; onboarding live.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenStatus();
                      }}
                      className="w-full py-3 px-4 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.45rem] font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <PhoneIcon size={16} />
                      <span>Check Status</span>
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenRegister();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-[1.45rem] font-extrabold text-center shadow-xs cursor-pointer flex items-center justify-center gap-2 mb-5"
                  >
                    <span>Apply to Drive Partner</span>
                    <ArrowRightIcon size={18} />
                  </button>

                  {/* Navigation Links */}
                  <div className="border-t border-gray-100 pt-3 space-y-1">
                    <span className="text-[1.15rem] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-1">
                      Explore
                    </span>

                    <a
                      href="#vehicles"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-[1.5rem] font-bold text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      <span>Vehicles We Attach</span>
                      <ChevronRightIcon size={16} className="text-gray-400" />
                    </a>

                    <a
                      href="#benefits"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-[1.5rem] font-bold text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      <span>Partner Benefits</span>
                      <ChevronRightIcon size={16} className="text-gray-400" />
                    </a>

                    <a
                      href="#faq"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-[1.5rem] font-bold text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      <span>Driver FAQs</span>
                      <ChevronRightIcon size={16} className="text-gray-400" />
                    </a>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="pt-4 mt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-[1.25rem] text-gray-500 mb-2">
                    <span className="font-semibold">Driver Hotline</span>
                    <a href="tel:18004197627" className="font-bold text-[#0445DA] hover:underline">1800-419-7627</a>
                  </div>
                  <div className="text-[1.15rem] text-gray-400 text-center font-medium">
                    Smart Driver Partner Network © 2026
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </header>
    </div>
  );
};
