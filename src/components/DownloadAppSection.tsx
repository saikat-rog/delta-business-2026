import React from 'react';

export const DownloadAppSection: React.FC = () => {
  return (
    <section id="download-app" className="site-container" style={{ marginTop: '40px', marginBottom: '70px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ebf3ff 0%, #fff8ee 100%)',
          borderRadius: '20px',
          padding: '40px 48px',
          border: '1px solid rgba(4, 69, 218, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          boxShadow: '0 6px 24px rgba(4, 69, 218, 0.06)',
        }}
      >
        {/* Left Side: App Icon & Heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <img
            alt="Tez Parcel App Icon"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/app_icon_compressed_a1d65eb06f.png"
            width="80"
            height="80"
            style={{ borderRadius: '18px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
          />
          <div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 3vw, 2.8rem)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Download the Tez Parcel App
            </h2>
            <p style={{ fontSize: '1.5rem', color: '#555555', marginTop: '6px', margin: 0 }}>
              We are loved by 1 Crore+ customers for fast, reliable goods transport!
            </p>
          </div>
        </div>

        {/* Right Side: QR Code and App Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* QR Code */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '8px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt="QR Code"
              width="88"
              height="88"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/qr_code_6ac327e0fa/qr_code_6ac327e0fa.png"
            />
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#666', marginTop: '4px' }}>
              Scan to install
            </span>
          </div>

          {/* App Store Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                alt="Play Store"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/googleplay_419e81f188.png"
                width="145"
                height="44"
                style={{ objectFit: 'contain' }}
              />
            </a>
            <a
              href="https://apple.com/app-store"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                alt="App Store"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/appstore_1ca72680f5.png"
                width="145"
                height="44"
                style={{ objectFit: 'contain' }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
