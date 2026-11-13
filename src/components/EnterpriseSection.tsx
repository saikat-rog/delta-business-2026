import React, { useState } from 'react';
import { XIcon, CheckCircleIcon } from './Icons';
import { OPERATING_CITIES } from '../data/siteData';

interface EnterpriseSectionProps {
  onOpenRegister?: () => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onOpenRegister: _onOpenRegister }) => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fleetName, setFleetName] = useState('');
  const [fleetPhone, setFleetPhone] = useState('');
  const [fleetSize, setFleetSize] = useState('2-5 Vehicles');
  const [fleetCity, setFleetCity] = useState('');

  const handleFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setFleetName('');
      setFleetPhone('');
    }, 2500);
  };

  return (
    <section id="fleet" className="site-container my-8 md:my-14">
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
            SMART DRIVER FLEET PROGRAM
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
            Own multiple vehicles or a transport fleet? Attach your fleet with Smart Driver
          </h2>
          <p className="text-gray-300 text-[1.4rem] mt-2 mb-0">
            Dedicated fleet manager, bulk trip allocation, fuel credit, and weekly guaranteed company disbursements.
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#0445DA',
              color: '#ffffff',
              padding: '12px 30px',
              borderRadius: '10px',
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
            Attach Fleet Vehicles
          </button>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
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
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f5f5f5',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <XIcon size={16} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <CheckCircleIcon size={56} className="text-green-600" />
                </div>
                <h3 style={{ fontSize: '2rem', color: '#1a1a1a', fontWeight: 800 }}>Fleet Request Submitted!</h3>
                <p style={{ color: '#666', fontSize: '1.4rem', marginTop: '8px' }}>
                  Our Fleet Relations team will contact you within 2 working hours.
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 6px 0' }}>
                  Attach Your Fleet with Smart Driver
                </h3>
                <p style={{ color: '#666', fontSize: '1.35rem', margin: '0 0 20px 0' }}>
                  Boost fleet utilization with reliable, round-the-clock enterprise orders.
                </p>

                <form onSubmit={handleFleetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                      Fleet Owner / Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Transport"
                      value={fleetName}
                      onChange={(e) => setFleetName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '1.4rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={fleetPhone}
                      onChange={(e) => setFleetPhone(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '1.4rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                        Number of Vehicles
                      </label>
                      <select
                        value={fleetSize}
                        onChange={(e) => setFleetSize(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1.35rem',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="2-5 Vehicles">2 - 5 Vehicles</option>
                        <option value="6-15 Vehicles">6 - 15 Vehicles</option>
                        <option value="16-50 Vehicles">16 - 50 Vehicles</option>
                        <option value="50+ Vehicles">50+ Vehicles</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                        Operating City
                      </label>
                      <select
                        required
                        value={fleetCity}
                        onChange={(e) => setFleetCity(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1.35rem',
                          boxSizing: 'border-box',
                          backgroundColor: '#fafafa',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>Select Operating City</option>
                        {OPERATING_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#0445DA',
                      color: '#ffffff',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(4, 69, 218, 0.4)',
                    }}
                  >
                    Submit Fleet Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
