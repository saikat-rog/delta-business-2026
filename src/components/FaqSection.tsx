import React, { useState } from 'react';
import { FAQS } from '../data/siteData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="site-narrow-container" style={{ marginTop: '80px', marginBottom: '90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: 'clamp(2.6rem, 4vw, 3.2rem)', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: '1.5rem', color: '#666666', margin: 0 }}>
          In case you have more questions, feel free to reach out to us.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {FAQS.map((faq: any, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: isOpen ? '1px solid #0445DA' : '1px solid #eef0f5',
                boxShadow: isOpen ? '0 4px 14px rgba(4, 69, 218, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                onClick={() => toggleFaq(index)}
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: isOpen ? '#f8faff' : '#ffffff',
                  gap: '16px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: isOpen ? '#0445DA' : '#1a1a1a',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {faq.question}
                </h3>
                <div
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <img
                    alt="drop down"
                    loading="lazy"
                    width="18"
                    height="18"
                    src="https://dom-content-vault-prod-cdn-assets.porter.in/Arrow_icon_6bd83d3c9e.svg"
                  />
                </div>
              </div>

              {isOpen && (
                <div
                  className="animate-fade-in"
                  style={{
                    padding: '0 24px 22px',
                    backgroundColor: isOpen ? '#f8faff' : '#ffffff',
                    borderTop: '1px solid #f0f3fa',
                  }}
                >
                  <div style={{ fontSize: '1.45rem', color: '#444444', lineHeight: '1.7', paddingTop: '16px' }}>
                    <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
