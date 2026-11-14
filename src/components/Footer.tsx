import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { INDIAN_STATES } from '../utils/stateDetection';
import { ArrowLeftIcon } from './Icons';

interface FooterProps {
  onSelectState?: (stateName: string) => void;
  onSelectCity?: (city: string) => void;
  onOpenRegister?: () => void;
  onOpenStatus?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectState,
  onSelectCity,
  onOpenRegister,
  onOpenStatus,
}) => {
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [loadingPageName, setLoadingPageName] = useState<string>('Loading');

  // Prevent background scroll when loader is active
  useEffect(() => {
    if (isLoadingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoadingOpen]);

  // Handle browser back button (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setIsLoadingOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNotWorkingLink = (e: React.MouseEvent, pageName: string) => {
    e.preventDefault();
    setLoadingPageName(pageName);
    setIsLoadingOpen(true);
    window.history.pushState({ footerLoader: true }, '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseLoader = () => {
    setIsLoadingOpen(false);
    if (window.history.state?.footerLoader) {
      window.history.back();
    }
  };
  return (
    <>
      <footer style={{ backgroundColor: '#000000', color: '#ffffff' }} className="pt-12 md:pt-16 pb-24 md:pb-10">
        <div className="site-container">
          {/* Row 1: Brand & Socials on Left */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '32px',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
            className="pb-10 md:pb-12"
          >
            {/* Brand Info */}
            <div style={{ maxWidth: '420px' }}>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  backgroundColor: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '12px',
                }}
                className="shadow-xs hover:opacity-95 transition-opacity"
              >
                <img
                  src="/logo2.png"
                  alt="Smart Driver"
                  style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </a>
              <p style={{ color: '#9ca3af', fontSize: '1.45rem', marginTop: '14px', lineHeight: '1.5' }}>
                India's leading tech-driven platform for commercial vehicle drivers and two-wheeler partners. Attach your vehicle, earn regular income, and enjoy guaranteed weekly direct bank payouts.
              </p>

              {/* Social Icons */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#e0e0e0', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Follow us
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {/* Facebook */}
                  <a
                    href="#facebook"
                    onClick={(e) => handleNotWorkingLink(e, 'Facebook')}
                    aria-label="Facebook"
                    style={{
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#1f2937',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0445DA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="#x"
                    onClick={(e) => handleNotWorkingLink(e, 'Twitter (X)')}
                    aria-label="Twitter / X"
                    style={{
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#1f2937',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0445DA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="#instagram"
                    onClick={(e) => handleNotWorkingLink(e, 'Instagram')}
                    aria-label="Instagram"
                    style={{
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#1f2937',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0445DA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Partner CTAs on Right */}
            <div className="flex flex-col gap-3">
              <div className="text-[1.35rem] font-bold text-white">Join as Driver Partner</div>
              <p className="text-[1.25rem] text-gray-400 max-w-[280px]">
                Ready to start earning up to ₹45,000 / month with your vehicle?
              </p>
              <div className="flex flex-wrap gap-2.5 mt-1">
                {onOpenRegister && (
                  <button
                    type="button"
                    onClick={onOpenRegister}
                    className="px-5 py-2.5 rounded-xl bg-[#0445DA] text-white text-[1.35rem] font-bold hover:bg-[#0336aa] transition-colors cursor-pointer"
                  >
                    Register as Driver
                  </button>
                )}
                {onOpenStatus && (
                  <button
                    type="button"
                    onClick={onOpenStatus}
                    className="px-4 py-2.5 rounded-xl border border-gray-600 text-gray-300 text-[1.35rem] font-bold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Track Application
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Link Columns */}
          <div
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 md:py-12"
          >
            {/* Driver Partner Portal */}
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                Partner Portal
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <button
                    type="button"
                    onClick={onOpenRegister}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Driver Registration
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenStatus}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Check Application Status
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Partner Benefits')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Partner Benefits
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Driver FAQs')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Driver FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Driver Handbook & Safety Guidelines')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Safety Handbook
                  </button>
                </li>
              </ul>
            </div>

            {/* Vehicles Attached */}
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                Vehicles Attached
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Tata Ace / Mini Trucks')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Tata Ace / Mini Trucks
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, '2-Wheelers & Scooters')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    2-Wheelers &amp; Scooters
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, '3-Wheeler Champions')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    3-Wheeler Champions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Bolero Pickup (8ft)')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Bolero Pickup (8ft)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Commercial Fleet Program')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Commercial Fleet Program
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Helpline */}
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                Driver Helpline
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Driver Helpline: 080 4410 4410')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Phone: 080 4410 4410
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Helpdesk Support Email')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Email: help@smartdriver.in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Driver Insurance: ₹5 Lakh Cover')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Insurance: ₹5 Lakh Cover
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Weekly Payout Details')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Weekly Payout: Every Tuesday
                  </button>
                </li>
              </ul>
            </div>

            {/* Operating Cities */}
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                Major Hubs
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Bangalore & Delhi NCR Hubs')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Bangalore • Delhi NCR
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Mumbai, Pune & Chennai Hubs')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Mumbai • Pune • Chennai
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Hyderabad & Kolkata Hubs')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Hyderabad • Kolkata
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleNotWorkingLink(e, 'Ahmedabad & Jaipur Hubs')}
                    style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    Ahmedabad • Jaipur
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 3: Operating State Buttons (Working - triggers state change) */}
          <div className="py-8 border-b border-white/10">
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#e0e0e0', marginBottom: '16px' }}>
              Driver Partner Hubs Active Across Indian States &amp; UTs:
            </div>
            <div className="flex flex-wrap gap-2">
              {INDIAN_STATES.map((state) => (
                <button
                  key={state.code}
                  type="button"
                  onClick={() => {
                    if (onSelectState) onSelectState(state.name);
                    else if (onSelectCity) onSelectCity(state.name.toLowerCase());
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: '#1f2937',
                    color: '#d1d5db',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0445DA';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1f2937';
                    e.currentTarget.style.color = '#d1d5db';
                  }}
                >
                  {state.name}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Corporate Registration Office & Legal Disclosures */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[1.25rem] text-[#9ca3af]">
            <div>
              <div>© 2026 Smart Driver Logistics Solutions Pvt. Ltd. All rights reserved.</div>
              <div style={{ marginTop: '4px', fontSize: '1.15rem', color: '#6b7280' }}>
                Driver Onboarding &amp; Verification Center • CIN: U74999MH2014PTC306120 • Mumbai - 400072
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <button
                type="button"
                onClick={(e) => handleNotWorkingLink(e, 'Privacy Policy')}
                className="text-[#9ca3af] hover:text-white transition-colors cursor-pointer underline text-[1.25rem]"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={(e) => handleNotWorkingLink(e, 'Terms of Service')}
                className="text-[#9ca3af] hover:text-white transition-colors cursor-pointer underline text-[1.25rem]"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={(e) => handleNotWorkingLink(e, 'Driver Partner Agreement')}
                className="text-[#9ca3af] hover:text-white transition-colors cursor-pointer underline text-[1.25rem]"
              >
                Driver Agreement
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Infinite Loader Fullscreen Overlay */}
      {isLoadingOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[99999] bg-white flex flex-col justify-between"
            style={{ minHeight: '100vh', width: '100vw' }}
          >
            {/* Top Bar with Back Button */}
            <header className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 px-6 py-4 flex items-center justify-between shadow-xs">
              <button
                type="button"
                onClick={handleCloseLoader}
                className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-gray-300 bg-white text-gray-800 text-[1.35rem] font-bold hover:bg-gray-100 hover:border-gray-400 transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Go back"
              >
                <ArrowLeftIcon size={18} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleCloseLoader}
                className="flex items-center cursor-pointer bg-transparent border-0"
              >
                <img
                  src="/logo2.png"
                  alt="Smart Driver"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </button>

              <div className="w-20 hidden sm:block" />
            </header>

            {/* Main Center Area with Infinite Loader */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
              {/* Infinite Spinner */}
              <div className="relative mb-8">
                {/* Outer glowing pulse ring */}
                <div className="w-20 h-20 rounded-full border-4 border-blue-100 animate-ping opacity-30 absolute inset-0 m-auto" />

                {/* Main infinite spinner */}
                <div className="w-20 h-20 rounded-full border-4 border-gray-100 border-t-[#0445DA] border-r-[#0445DA] animate-spin" />

                {/* Inner small pulsing dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0445DA] animate-pulse" />
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-[2.2rem] md:text-[2.6rem] font-black text-gray-950 tracking-tight mb-2">
                Loading {loadingPageName}
              </h2>
              <p className="text-[1.4rem] text-gray-500 max-w-sm mb-8 leading-relaxed">
                Please wait a moment while we connect to Smart Driver services...
              </p>

              {/* Secondary Big Back Button */}
              <button
                type="button"
                onClick={handleCloseLoader}
                className="px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#0445DA] text-white text-[1.45rem] font-bold inline-flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-98"
              >
                <ArrowLeftIcon size={18} />
                <span>Go Back to Website</span>
              </button>
            </main>

            {/* Bottom Footer Note */}
            <footer className="text-center py-6 text-gray-400 text-[1.2rem] border-t border-gray-100">
              Smart Driver Operations • Connecting to secure gateway...
            </footer>
          </div>,
          document.body
        )}
    </>
  );
};
