import React from 'react';
import { TezLogo } from './TezLogo';
import { CITIES } from '../data/siteData';

interface FooterProps {
  onSelectCity: (city: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCity }) => {
  return (
    <footer style={{ backgroundColor: '#000000', color: '#ffffff' }} className="pt-12 md:pt-16 pb-10">
      <div className="site-container">
        {/* Row 1: Brand & Socials on Left, App Download on Right */}
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
          <div style={{ maxWidth: '400px' }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <TezLogo color="#ffffff" height={26} />
            </a>
            <p style={{ color: '#9ca3af', fontSize: '1.45rem', marginTop: '14px', lineHeight: '1.5' }}>
              Send anything, anywhere, anytime. India's favorite on-demand goods transport and packers &amp; movers service.
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

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
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
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Download App & QR Code */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '8px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className="hidden sm:flex"
            >
              <img
                alt="qr-download"
                loading="lazy"
                width="90"
                height="90"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/qr_code_6ac327e0fa/qr_code_6ac327e0fa.png"
              />
              <span style={{ fontSize: '1.05rem', color: '#1a1a1a', fontWeight: 600, marginTop: '4px' }}>
                Scan to install
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                Experience the Tez Parcel App
              </div>
              <a href="https://play.google.com" target="_blank" rel="noreferrer">
                <img
                  alt="Google Play"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/googleplay_419e81f188.png"
                  width="130"
                  height="38"
                  style={{ objectFit: 'contain' }}
                />
              </a>
              <a href="https://apple.com/app-store" target="_blank" rel="noreferrer">
                <img
                  alt="App Store"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/appstore_719627aa38.png"
                  width="130"
                  height="38"
                  style={{ objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Link Columns: 2 cols on mobile, 4 cols on desktop */}
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 md:py-12"
        >
          {/* Company */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#about" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#careers" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#blog" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Blog</a></li>
              <li><a href="#driver-partner" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Driver Partner</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#trucks" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Trucks</a></li>
              <li><a href="#two-wheelers" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Two Wheelers</a></li>
              <li><a href="#packers-movers" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Packers &amp; Movers</a></li>
              <li><a href="#enterprise" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Tez Parcel Enterprise</a></li>
              <li><a href="#api" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>API Integrations</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#contact" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#privacy" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#insurance" style={{ color: '#9ca3af', fontSize: '1.35rem', textDecoration: 'none' }}>Insurance FAQs</a></li>
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Countries
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 600 }}>🇮🇳 India (22+ Cities)</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>🇦🇪 UAE (Dubai)</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>🇹🇷 Turkey</span></li>
              <li><span style={{ color: '#9ca3af', fontSize: '1.35rem' }}>🇲🇾 Malaysia</span></li>
            </ul>
          </div>
        </div>

        {/* Row 3: Cities Directory */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }} className="py-8 md:py-10">
          <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
            We are serving in:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CITIES.map((city: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectCity(city.city_name);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#111827',
                  color: '#d1d5db',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '1.25rem',
                  textTransform: 'capitalize',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0445DA';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#111827';
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
            <div>© 2026 Tez Parcel Logistics Solutions Pvt. Ltd. All rights reserved.</div>
            <div style={{ marginTop: '4px', fontSize: '1.15rem', color: '#6b7280' }}>
              CIN: U74999MH2014PTC306120 • Universal Business Park, Andheri (East), Mumbai - 400072
            </div>
          </div>
          <div className="flex gap-5">
            <span>Email: <strong>help@tezparcel.in</strong></span>
            <span>Phone: <strong>080 4410 4410</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
