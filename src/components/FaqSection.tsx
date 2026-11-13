import React, { useState } from 'react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const driverFaqs = [
    {
      question: 'What documents are required to register as a Smart Driver partner?',
      answer: 'To register as a driver partner, you need:\n1. Valid Driving License (DL)\n2. Vehicle Registration Certificate (RC)\n3. Aadhaar Card / Voter ID for identity & address verification\n4. Active Bank Account or UPI ID for weekly payouts\n5. Commercial vehicle insurance (optional at registration, can be verified later).',
    },
    {
      question: 'How and when do I receive my trip earnings?',
      answer: 'All your trip earnings and daily incentives are accumulated and deposited directly into your registered bank account or UPI every Tuesday. You can also view trip-by-trip earnings breakdowns in real time.',
    },
    {
      question: 'What is the ₹99 application verification fee and why is it charged?',
      answer: 'The ₹99 one-time application fee covers the administrative cost of government document verification, background checks, and setup of your driver partner profile. It ensures only genuine and certified drivers join the platform.',
    },
    {
      question: 'How long does it take for my application to be approved?',
      answer: 'Once you submit your application and upload clear documents, our verification team reviews your profile within 2 to 24 hours. You can log in anytime using your registered phone number and password to check your live application status.',
    },
    {
      question: 'Can I drive part-time or flexible hours?',
      answer: 'Yes! As an independent partner, you are your own boss. You can log into the platform whenever you wish to accept trips—whether full-time, weekends, or a few hours in the morning or evening.',
    },
    {
      question: 'Do driver partners get free accidental insurance?',
      answer: 'Yes! Every active Smart Driver partner is covered under a comprehensive ₹5,00,000 accidental insurance policy from day one of onboarding, keeping you and your family protected.',
    },
    {
      question: 'Which vehicles can be attached on Smart Driver?',
      answer: 'We accept 2-Wheelers (motorcycles, scooters), 3-Wheeler autos/champions, mini-trucks (Tata Ace, Mahindra Jeeto, Maruti Super Carry), 8ft/Pickup trucks (Bolero Maxi Truck, Dost), and 14ft container trucks.',
    },
  ];

  return (
    <section id="faq" className="site-narrow-container" style={{ marginTop: '70px', marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="text-[1.2rem] font-bold text-[#0445DA] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
          HAVE QUESTIONS?
        </span>
        <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 800, color: '#1a1a1a', marginTop: '10px', marginBottom: '8px' }}>
          Driver Partner FAQs
        </h2>
        <p style={{ fontSize: '1.5rem', color: '#666666', margin: 0 }}>
          Everything you need to know about registering, earnings, and working with Smart Driver.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {driverFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: isOpen ? '1px solid #0445DA' : '1px solid #eef0f5',
                boxShadow: isOpen ? '0 4px 14px rgba(4, 69, 218, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                onClick={() => toggleFaq(index)}
                style={{
                  padding: '18px 22px',
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
                    fontSize: '1.55rem',
                    fontWeight: 700,
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
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt="toggle"
                    width="14"
                    height="14"
                    src="https://dom-content-vault-prod-cdn-assets.porter.in/drop_down_25e36a8740.svg"
                  />
                </div>
              </div>

              {isOpen && (
                <div
                  style={{
                    padding: '0 22px 20px 22px',
                    color: '#4b5563',
                    fontSize: '1.4rem',
                    lineHeight: '1.7',
                    borderTop: '1px solid #f0f4ff',
                    paddingTop: '16px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
