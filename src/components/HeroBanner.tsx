import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <div
      className="HomeBannerWrapper_banner-wrapper__8z09n"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '520px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #031b5c, #040a1a)',
      }}
    >
      {/* Background Hero Banner Image */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
        <img
          alt="Tez Parcel Logistics Banner"
          fetchPriority="high"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
            objectPosition: 'right center',
          }}
          src="https://dom-content-vault-prod-cdn-assets.porter.in/IND_desktop_banner_d08506ac6f/IND_desktop_banner_d08506ac6f.webp"
        />
      </div>

      {/* Gradient Overlay for Crisp Typography */}
      <div
        className="HomeBannerWrapper_banner-overlay__c5iXp"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(3,27,92,0.92) 0%, rgba(3,27,92,0.6) 45%, rgba(0,0,0,0) 85%)',
        }}
      />

      {/* Centered Content Container matching the Site Grid */}
      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: '100px', // Leaves breathing room for the floating card
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
              color: '#ffffff',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Delivery Aapki,
          </h1>
          <h1
            style={{
              fontSize: 'clamp(3.6rem, 5.5vw, 6.4rem)',
              color: '#ffffff',
              fontWeight: 800,
              margin: '6px 0 0',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            Transport Hamara
          </h1>
        </div>
      </div>
    </div>
  );
};
