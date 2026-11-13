import React from 'react';
import { CITIES } from '../data/siteData';
import { ShieldIcon } from './Icons';

interface FooterProps {
  onSelectCity: (city: string) => void;
  onOpenRegister?: () => void;
  onOpenStatus?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCity,
  onOpenRegister,
  onOpenStatus,
  onOpenAdmin,
}) => {
  return (
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
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="Smart Driver"
                style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }}
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
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
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
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
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
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
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
                  style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Driver Registration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenStatus}
                  style={{ color: '#9ca3af', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Check Application Status
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  style={{ color: '#f2c94c', fontSize: '1.35rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ShieldIcon size={15} /> Admin Console
                </button>
              </li>
              <li><a href="#benefits" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Partner Benefits</a></li>
              <li><a href="#faq" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Driver FAQs</a></li>
            </ul>
          </div>

          {/* Vehicles Attached */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Vehicles Attached
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#vehicles" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Tata Ace / Mini Trucks</a></li>
              <li><a href="#vehicles" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>2-Wheelers &amp; Scooters</a></li>
              <li><a href="#vehicles" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>3-Wheeler Champions</a></li>
              <li><a href="#vehicles" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Bolero Pickup (8ft)</a></li>
              <li><a href="#fleet" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Commercial Fleet Program</a></li>
            </ul>
          </div>

          {/* Support & Helpline */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Driver Helpline
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Phone: 080 4410 4410</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Email: help@smartdriver.in</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Insurance: ₹5 Lakh Cover</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Weekly Payout: Every Tuesday</span></li>
            </ul>
          </div>

          {/* Operating Cities */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Major Hubs
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Bangalore • Delhi NCR</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Mumbai • Pune • Chennai</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Hyderabad • Kolkata</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>Ahmedabad • Jaipur</span></li>
            </ul>
          </div>
        </div>

        {/* Row 3: Operating City Buttons */}
        <div className="py-8 border-b border-white/10">
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#e0e0e0', marginBottom: '16px' }}>
            Driver Hubs Active in 22+ Cities:
          </div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectCity(city.city_name.toLowerCase())}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: '#1f2937',
                  color: '#d1d5db',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
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
                {city.city_name}
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
          <div className="flex gap-5">
            <span>Email: <strong>help@smartdriver.in</strong></span>
            <span>Helpline: <strong>080 4410 4410</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
