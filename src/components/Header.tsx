import React, { useState } from 'react';
import { TezLogo } from './TezLogo';

export const Header: React.FC = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="Header_sticky-wrapper__3GFoo" style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: '#ffffff' }}>
      {showTopBar && (
        <div
          className="DownloadApp_wrapper__hsWY5"
          style={{
            backgroundColor: '#031b5c',
            color: '#ffffff',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="site-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                alt="app-icon"
                loading="lazy"
                width="34"
                height="34"
                style={{ borderRadius: '8px' }}
                src="https://dom-content-vault-prod-cdn-assets.porter.in/app_icon_compressed_a1d65eb06f.png"
              />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff' }}>
                  Install Tez Parcel
                </div>
                <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                  for efficient goods transportation
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="#download-app"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: '#0445DA',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                OPEN APP
              </a>
              <button
                type="button"
                onClick={() => setShowTopBar(false)}
                aria-label="Hide top bar"
                style={{ padding: '4px', cursor: 'pointer', opacity: 0.8 }}
              >
                <img
                  alt="hide"
                  loading="lazy"
                  width="12"
                  height="12"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/close_b3c513a007.png"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header
        className="Header_header-wrapper__D6ekp"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          borderBottom: '1px solid #f0f0f0',
          padding: 0,
        }}
      >
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo on Left */}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <TezLogo height={26} color="#0445DA" />
          </a>

          {/* Navigation Links Grouped on Right */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="hidden md:flex"
          >
            <a
              href="#enterprise"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#222222',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0445DA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#222222')}
            >
              For Enterprise
            </a>
            <a
              href="#driver-partner"
              onClick={(e) => {
                e.preventDefault();
                alert('Join Tez Parcel as a Driver Partner! Earn up to ₹35,000/month. App download link sent to your phone.');
              }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#222222',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0445DA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#222222')}
            >
              Driver Partner
            </a>
            <a
              href="#support"
              onClick={(e) => {
                e.preventDefault();
                alert('Tez Parcel Support: Call 080 4410 4410 or email help@tezparcel.in');
              }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#222222',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0445DA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#222222')}
            >
              Support
            </a>
          </nav>

          {/* Mobile Hamburger Icon */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            style={{
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(3px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="animate-slide-up"
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
                  <TezLogo height={22} color="#0445DA" />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    <img
                      alt="close"
                      width="18"
                      height="18"
                      src="https://dom-content-vault-prod-cdn-assets.porter.in/close_b3c513a007.png"
                    />
                  </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <a
                    href="#enterprise"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0' }}
                  >
                    For Enterprise
                  </a>
                  <a
                    href="#driver-partner"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      alert('Driver Partner inquiries: Call 080 4410 4410');
                    }}
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0' }}
                  >
                    Driver Partner
                  </a>
                  <a
                    href="#support"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      alert('Support inquiries: Call 080 4410 4410');
                    }}
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0' }}
                  >
                    Support
                  </a>
                </nav>
              </div>

              {/* App download promo card inside drawer */}
              <div
                style={{
                  backgroundColor: '#f4f6fa',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>
                  We are better on the app!
                </div>
                <button
                  type="button"
                  onClick={() => alert('Download Tez Parcel App')}
                  style={{
                    backgroundColor: '#0445DA',
                    color: '#ffffff',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                  }}
                >
                  Download Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
