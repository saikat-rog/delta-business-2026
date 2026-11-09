import React from 'react';

export const DownloadAppSection: React.FC = () => {
  return (
    <section id="download-app" className="site-container my-8 md:my-14">
      <div
        style={{
          background: 'linear-gradient(135deg, #ebf3ff 0%, #fff8ee 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(4, 69, 218, 0.12)',
          boxShadow: '0 6px 24px rgba(4, 69, 218, 0.06)',
        }}
        className="p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
      >
        {/* Left Side: App Icon & Heading */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <img
            alt="Tez Parcel App Icon"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/app_icon_compressed_a1d65eb06f.png"
            width="72"
            height="72"
            style={{ borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
          />
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Download the Tez Parcel App
            </h2>
            <p style={{ fontSize: '1.45rem', color: '#555555', marginTop: '6px', margin: 0 }}>
              We are loved by 1 Crore+ customers for fast, reliable goods transport!
            </p>
          </div>
        </div>

        {/* Right Side: QR Code and App Badges */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          {/* QR Code (hidden on small mobile, shown on md screens) */}
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
            className="hidden sm:flex"
          >
            <img
              alt="QR Code"
              width="80"
              height="80"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/qr_code_6ac327e0fa/qr_code_6ac327e0fa.png"
            />
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#666', marginTop: '4px' }}>
              Scan to install
            </span>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-row md:flex-col gap-3">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                alt="Play Store"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/googleplay_419e81f188.png"
                width="135"
                height="40"
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
                width="135"
                height="40"
                style={{ objectFit: 'contain' }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
