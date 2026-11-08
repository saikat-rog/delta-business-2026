import React, { useState, useEffect } from 'react';
import { FOOTPRINTS, IN_THE_NEWS } from '../data/siteData';

export const FootprintsAndNews: React.FC = () => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % IN_THE_NEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const newsItem = IN_THE_NEWS[activeNewsIndex] || IN_THE_NEWS[0];

  const customerReviews = [
    {
      name: 'Rohan Sharma',
      city: 'Bangalore',
      service: 'Two Wheeler',
      rating: 5,
      review: 'Sent urgent office documents from Indiranagar to Whitefield. Delivered in 35 mins flat! Super impressed with Tez Parcel speed.',
    },
    {
      name: 'Priya Iyer',
      city: 'Mumbai',
      service: 'Packers & Movers',
      rating: 5,
      review: 'Shifted my 2 BHK flat without a single scratch. The team was prompt, professional, and took care of all fragile items. Highly recommended!',
    },
    {
      name: 'Amit Patel',
      city: 'Ahmedabad',
      service: 'Tata Ace (Trucks)',
      rating: 5,
      review: 'I use Tez Parcel mini trucks weekly for my wholesale hardware business. Real-time driver tracking and pocket-friendly rates make it seamless.',
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0',
        background: 'linear-gradient(154.48deg, #000000, #040a1a)',
        color: '#ffffff',
      }}
    >
      <div className="site-container">
        {/* Tez Parcel Footprints Title */}
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '28px',
            fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.3,
          }}
        >
          {FOOTPRINTS?.text?.text || 'And thanks to you, we are growing each & every day!'}
        </h2>

        {/* Dubai Expansion Banner */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto 48px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(242, 201, 76, 0.35)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={FOOTPRINTS.image.path}
            alt={FOOTPRINTS.description}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </div>

        {/* Growth Statistics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '1060px',
            margin: '0 auto 70px',
            textAlign: 'center',
          }}
        >
          {FOOTPRINTS?.achievements?.map((ach: any, idx: number) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '28px 20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)', fontWeight: 800, color: '#387aff' }}>
                {ach.text}
              </div>
              <div style={{ fontSize: '1.5rem', color: '#e0e0e0', marginTop: '6px' }}>
                {ach.sub_text}
              </div>
            </div>
          ))}
        </div>

        {/* Customer Reviews */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
            <img
              alt="wave icon"
              loading="lazy"
              width="36"
              height="36"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
            />
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
              What Our Customers Say
            </h2>
            <img
              alt="wave icon"
              loading="lazy"
              width="36"
              height="36"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {customerReviews.map((rev, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <p style={{ fontSize: '1.5rem', lineHeight: '1.6', color: '#e5e7eb', margin: 0, fontStyle: 'italic' }}>
                  "{rev.review}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#ffffff' }}>{rev.name}</div>
                    <div style={{ fontSize: '1.2rem', color: '#9ca3af' }}>{rev.service} • {rev.city}</div>
                  </div>
                  <div style={{ color: '#f59e0b', fontSize: '1.6rem', letterSpacing: '2px' }}>
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In The News */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            <img
              alt="wave icon"
              loading="lazy"
              width="36"
              height="36"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
            />
            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
              In The News
            </h2>
            <img
              alt="wave icon"
              loading="lazy"
              width="36"
              height="36"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
            />
          </div>

          {/* Article Card */}
          <div
            className="animate-fade-in"
            key={activeNewsIndex}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px 36px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
              color: '#1a1a1a',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1.75rem',
                lineHeight: '1.65',
                color: '#333333',
                fontStyle: 'italic',
                marginBottom: '24px',
              }}
            >
              {newsItem.content}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img
                alt={newsItem.publisher_logo?.alt_text || 'press'}
                loading="lazy"
                width="220"
                height="36"
                style={{ objectFit: 'contain' }}
                src={newsItem.publisher_logo?.path}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href={newsItem.source?.href || '#'}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0445DA',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                }}
              >
                <span>Read Article</span>
                <img
                  alt="Redirect icon"
                  loading="lazy"
                  width="16"
                  height="16"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
                />
              </a>
            </div>
          </div>

          {/* Carousel Dot Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {IN_THE_NEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNewsIndex(idx)}
                style={{
                  width: activeNewsIndex === idx ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: activeNewsIndex === idx ? '#0445DA' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
