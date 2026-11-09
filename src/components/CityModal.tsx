import React, { useState } from 'react';
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
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredCities = CITIES.filter((c: any) =>
    c.city_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '12px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '640px',
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
            padding: '18px 20px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Choose your city
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666', marginTop: '2px', margin: 0 }}>
              Select city to check live vehicles &amp; rates
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="https://dom-content-vault-prod-cdn-assets.porter.in/cross_20_grey_142dd64290_e37e09230d.svg"
              alt="Close"
              width="18"
              height="18"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '12px 20px 4px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your city..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1.35rem',
              outline: 'none',
              backgroundColor: '#f8faff',
            }}
          />
        </div>

        {/* Cities Grid: 3 columns on mobile, 4 columns on desktop */}
        <div
          style={{
            padding: '16px 20px',
            overflowY: 'auto',
          }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-3"
        >
          {filteredCities.map((city: any) => {
            const isSelected = selectedCity.toLowerCase() === city.city_name.toLowerCase();

            return (
              <div
                key={city.city_name}
                onClick={() => onSelectCity(city.city_name)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 6px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #0445DA' : '1px solid #eee',
                  backgroundColor: isSelected ? '#f0f5ff' : '#ffffff',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '6px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    alt={city.city_name}
                    loading="lazy"
                    width="48"
                    height="48"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    src={city.city_image?.path || 'https://dom-content-vault-prod-cdn-assets.porter.in/Ahmedabad_888095801a/Ahmedabad_888095801a.webp'}
                  />
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? '#0445DA' : '#333333',
                    textTransform: 'capitalize',
                  }}
                >
                  {city.city_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
