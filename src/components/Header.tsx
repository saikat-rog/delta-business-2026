import React, { useState } from 'react';
import { ShieldIcon, XIcon } from './Icons';

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenStatus: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onOpenStatus,
  onOpenAdmin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="Header_sticky-wrapper__3GFoo" style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: '#ffffff' }}>
      {/* Main Navbar */}
      <header
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          borderBottom: '1px solid #f0f0f0',
          width: '100%',
        }}
      >
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          {/* Logo on Left */}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Smart Driver"
              style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </a>

          {/* Navigation Links Grouped on Right */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#vehicles"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.45rem] font-semibold text-gray-700 hover:text-[#0445DA] transition-colors"
            >
              Vehicles We Attach
            </a>

            <a
              href="#benefits"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.45rem] font-semibold text-gray-700 hover:text-[#0445DA] transition-colors"
            >
              Partner Benefits
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[1.45rem] font-semibold text-gray-700 hover:text-[#0445DA] transition-colors"
            >
              FAQs
            </a>

            {/* Check Application Status Button */}
            <button
              type="button"
              onClick={onOpenStatus}
              className="px-4 py-2 rounded-xl border border-[#0445DA] text-[#0445DA] text-[1.4rem] font-bold hover:bg-[#0445DA]/5 transition-all cursor-pointer"
            >
              Check Status / Login
            </button>

            {/* Admin Portal Link */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[1.35rem] font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldIcon size={16} />
              <span>Admin</span>
            </button>

            {/* Register as Driver Primary CTA */}
            <button
              type="button"
              onClick={onOpenRegister}
              style={{
                backgroundColor: '#0445DA',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(4, 69, 218, 0.35)',
              }}
              className="px-5 py-2.5 rounded-xl text-[1.45rem] font-bold hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              Register as Driver
            </button>
          </nav>

          {/* Mobile Right Actions: Status & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenStatus}
              className="px-3 py-1.5 rounded-lg border border-[#0445DA] text-[#0445DA] text-[1.25rem] font-bold"
            >
              Check Status
            </button>

            <button
              type="button"
              className="flex items-center justify-center p-2 cursor-pointer border-none bg-transparent"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <img
                alt="hamburger"
                loading="lazy"
                width="24"
                height="24"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/hamburger_black_d1bfff267e.svg"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              style={{
                width: '85%',
                maxWidth: '340px',
                height: '100%',
                backgroundColor: '#ffffff',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <img
                    src="/logo.png"
                    alt="Smart Driver"
                    style={{ height: '30px', width: 'auto', objectFit: 'contain', display: 'block' }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <XIcon size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenRegister();
                    }}
                    className="w-full py-3 rounded-xl bg-[#0445DA] text-white text-[1.5rem] font-bold text-center shadow-md cursor-pointer"
                  >
                    Register as Driver Now
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenStatus();
                    }}
                    className="w-full py-2.5 rounded-xl border border-[#0445DA] text-[#0445DA] text-[1.4rem] font-bold text-center cursor-pointer"
                  >
                    Check Application Status / Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-800 text-[1.35rem] font-bold text-center cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldIcon size={16} /> Admin Console
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <a
                    href="#vehicles"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[1.5rem] font-semibold text-gray-800"
                  >
                    Vehicles We Attach
                  </a>

                  <a
                    href="#benefits"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[1.5rem] font-semibold text-gray-800"
                  >
                    Partner Benefits
                  </a>

                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[1.5rem] font-semibold text-gray-800"
                  >
                    Driver FAQs
                  </a>
                </div>
              </div>

              <div className="text-[1.2rem] text-gray-500 text-center">
                Smart Driver Partner Helpline: 080 4410 4410
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
