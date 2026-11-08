import React from 'react';
import { CITIES } from '../data/siteData';

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CityModal: React.FC<CityModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
              Choose your city
            </h2>
            <p style={{ fontSize: '1.4rem', color: '#666', marginTop: '4px' }}>
              Select your city to check available vehicles &amp; live rates
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="https://dom-content-vault-prod-cdn-assets.porter.in/cross_20_grey_142dd64290_e37e09230d.svg"
              alt="Close"
              width="20"
              height="20"
            />
          </button>
        </div>

        {/* Cities Grid */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
            gap: '16px',
          }}
        >
          {CITIES.map((city: any) => {
            const isSelected = city.city_name.toLowerCase() === selectedCity.toLowerCase();
            const displayName = city.city_name.charAt(0).toUpperCase() + city.city_name.slice(1);

            return (
              <div
                key={city.city_name}
                onClick={() => {
                  onSelectCity(city.city_name);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px 8px',
                  borderRadius: '12px',
                  border: isSelected ? '2px solid #0445DA' : '1px solid #e0e0e0',
                  backgroundColor: isSelected ? '#edf2ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <img
                    src={city.city_image?.path || 'https://dom-content-vault-prod-cdn-assets.porter.in/Ahmedabad_888095801a/Ahmedabad_888095801a.webp'}
                    alt={displayName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#0445DA' : '#333333',
                  }}
                >
                  {displayName}
                </span>
                {isSelected && (
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#0445DA',
                      marginTop: '2px',
                    }}
                  >
                    ✓ Selected
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
