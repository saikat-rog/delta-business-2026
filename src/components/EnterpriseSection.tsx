import React, { useState } from 'react';

export const EnterpriseSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="enterprise" className="site-container my-8 md:my-14">
      <div
        style={{
          display: 'flex',
          backgroundColor: '#151c28',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}
        className="flex-col md:flex-row items-center justify-between text-center md:text-left p-6 md:p-10 gap-6"
      >
        <div className="max-w-[720px]">
          <div
            style={{
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#f2c94c',
              border: '1px solid rgba(242, 201, 76, 0.4)',
              borderRadius: '20px',
              padding: '4px 14px',
              fontSize: '1.2rem',
              fontWeight: 800,
              display: 'inline-block',
              marginBottom: '12px',
            }}
          >
            TEZ PARCEL ENTERPRISE
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
              color: '#ffffff',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Manage logistics needs of your business with Tez Parcel Enterprise
          </h2>
        </div>

        <div className="w-full md:w-auto">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#0445DA',
              color: '#ffffff',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '1.5rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(4, 69, 218, 0.4)',
              whiteSpace: 'nowrap',
            }}
            className="w-full md:w-auto"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0336aa')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0445DA')}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '16px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="animate-slide-up"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '28px 24px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#1a1a1a' }}>
                Tez Parcel for Enterprise
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/cross_20_grey_142dd64290_e37e09230d.svg"
                  alt="Close"
                  width="16"
                  height="16"
                />
              </button>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                <h4 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#00875a', marginBottom: '8px' }}>
                  Thank you!
                </h4>
                <p style={{ fontSize: '1.4rem', color: '#666' }}>
                  Our enterprise logistics specialist will reach out to you within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setShowModal(false);
                  }}
                  style={{
                    marginTop: '20px',
                    backgroundColor: '#0445DA',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Logistics Pvt Ltd"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.4rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.4rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.4rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.4rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.3rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                    Estimated Monthly Shipments
                  </label>
                  <select
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.4rem', backgroundColor: '#fff' }}
                  >
                    <option>50 - 200 trips / month</option>
                    <option>200 - 1,000 trips / month</option>
                    <option>1,000+ trips / month (Dedicated fleet)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0445DA',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Request Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
