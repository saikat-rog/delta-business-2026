import React, { useState, useEffect } from 'react';
import { IN_THE_NEWS } from '../data/siteData';
import { StarIcon } from './Icons';

export const FootprintsAndNews: React.FC = () => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % IN_THE_NEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const newsItem = IN_THE_NEWS[activeNewsIndex] || IN_THE_NEWS[0];

  const driverReviews = [
    {
      name: 'Ramesh Yadav',
      city: 'Delhi NCR',
      vehicle: 'Tata Ace Partner',
      earnings: '₹42,000 / month',
      review: 'Pehle 10-12 ghante stand par customer dhundna padta tha. Smart Driver se roz 5-6 confirmed trips milti hain aur har mangalwar ko seedha bank account me paise aate hain!',
    },
    {
      name: 'Suresh Patil',
      city: 'Pune',
      vehicle: '2-Wheeler Delivery Partner',
      earnings: '₹22,500 / month',
      review: 'Flexible timing aur regular courier trips. Har hafte time pe payout milta hai aur fuel discount se monthly ₹2,500 ki bachat ho jaati hai.',
    },
    {
      name: 'Gurpreet Singh',
      city: 'Bangalore',
      vehicle: 'Bolero Pickup Owner',
      earnings: '₹55,000 / month',
      review: 'Smart Driver par payment ki koi tension nahi. 24x7 helpline se kabhi koi problem aati hai toh turant call par solution mil jata hai. Best driver platform!',
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(154.48deg, #000000, #040a1a)',
        color: '#ffffff',
      }}
      className="py-12 md:py-20"
    >
      <div className="site-container">
        {/* Driver Partner Network Headline */}
        <div className="text-center mb-8">
          <span className="text-[1.2rem] font-bold text-[#f2c94c] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
            GROWING STRONG EVERY DAY
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.3,
            }}
            className="mt-3 mb-2"
          >
            Empowering 5 Lakh+ Driver Partners Across India
          </h2>
          <p className="text-gray-300 text-[1.5rem] max-w-[650px] mx-auto">
            Providing steady income, financial security, and dignity to commercial vehicle drivers and bike owners.
          </p>
        </div>

        {/* Growth Statistics Grid */}
        <div
          style={{
            maxWidth: '1060px',
            textAlign: 'center',
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mx-auto mb-12 md:mb-16"
        >
          {[
            { count: '5,00,000+', label: 'Registered Driver Partners' },
            { count: '₹750 Cr+', label: 'Direct Payouts Disbursed' },
            { count: '22+ Cities', label: 'Pan-India Active Network' },
            { count: '4.8', label: 'Driver Satisfaction Rating', hasStar: true },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              className="p-4 md:p-7"
            >
              <div
                style={{ fontWeight: 800, color: '#387aff' }}
                className="text-[2.6rem] md:text-[3.6rem] flex items-center gap-1.5"
              >
                <span>{stat.count}</span>
                {stat.hasStar && <StarIcon size={24} className="text-[#387aff]" />}
              </div>
              <div
                style={{ color: '#e0e0e0', marginTop: '4px' }}
                className="text-[1.3rem] md:text-[1.45rem]"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Real Driver Partner Stories */}
        <div className="mb-14">
          <h3
            style={{
              textAlign: 'center',
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            What Our Driver Partners Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driverReviews.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className="flex items-center gap-1 text-[#f2c94c] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={18} />
                    ))}
                  </div>
                  <p style={{ color: '#e5e7eb', fontSize: '1.4rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{rev.review}"
                  </p>
                </div>
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#ffffff' }}>{rev.name}</div>
                  <div style={{ color: '#387aff', fontSize: '1.25rem', fontWeight: 600 }}>{rev.vehicle} • {rev.city}</div>
                  <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>Avg. Earnings: {rev.earnings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In The News Press Mentions */}
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af', marginBottom: '8px' }}>
            SMART DRIVER IN THE NEWS
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p style={{ fontSize: '1.6rem', color: '#e0e0e0', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
              {newsItem?.content}
            </p>
            <div style={{ marginTop: '16px', color: '#387aff', fontWeight: 700, fontSize: '1.35rem' }}>
              — Published in Top Logistics &amp; Tech Media
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
