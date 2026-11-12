import React, { useState } from 'react';

export const Header: React.FC = () => {
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
            height: '64px',
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

          {/* Navigation Links Grouped on Right - Strictly Hidden on Mobile */}
          <nav
            className="hidden md:flex items-center gap-8"
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
                alert('Join Smart Driver as a Driver Partner! Earn up to ₹35,000/month. App download link sent to your phone.');
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
                alert('Smart Driver Support: Call 080 4410 4410 or email help@smartdriver.in');
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

          {/* Mobile Hamburger Icon - Shown Only on Mobile */}
          <button
            type="button"
            className="flex md:hidden items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            style={{
              padding: '6px',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
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
                maxWidth: '320px',
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
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0', textDecoration: 'none' }}
                  >
                    For Enterprise
                  </a>
                  <a
                    href="#driver-partner"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      alert('Driver Partner inquiries: Call 080 4410 4410');
                    }}
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0', textDecoration: 'none' }}
                  >
                    Driver Partner
                  </a>
                  <a
                    href="#support"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      alert('Support inquiries: Call 080 4410 4410');
                    }}
                    style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', padding: '8px 0', textDecoration: 'none' }}
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
                  onClick={() => alert('Download Smart Driver App')}
                  style={{
                    backgroundColor: '#0445DA',
                    color: '#ffffff',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
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
