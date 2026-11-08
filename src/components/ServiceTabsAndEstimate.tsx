import React, { useState } from 'react';
import { CityModal } from './CityModal';
import { EstimateModal, type ServiceType } from './EstimateModal';
import { CITIES } from '../data/siteData';

interface ServiceTabsAndEstimateProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

export const ServiceTabsAndEstimate: React.FC<ServiceTabsAndEstimateProps> = ({
  currentCity,
  onCityChange,
}) => {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [estimateService, setEstimateService] = useState<ServiceType>('trucks');

  const cityNameCapitalized = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
  const currentCityData = CITIES.find((c: any) => c.city_name.toLowerCase() === currentCity.toLowerCase()) || CITIES[0];

  const handleOpenEstimate = (service: ServiceType) => {
    setEstimateService(service);
    setIsEstimateModalOpen(true);
  };

  const promoCards = (currentCityData && currentCityData.city_services_promo && currentCityData.city_services_promo.length > 0)
    ? currentCityData.city_services_promo.map((promo: any, idx: number) => ({
        gradient: ['gradient-red-to-purple', 'gradient-green-to-blue', 'gradient-blue-to-red', 'gradient-cyan-to-blue', 'gradient-red-to-purple'][idx % 5],
        title: promo.sub_text,
        text: promo.text,
        serviceType: (promo.service_type === 'packers-movers' ? 'packers-movers' : promo.service_type === 'bike' ? 'bike' : 'trucks') as ServiceType,
      }))
    : [
        {
          gradient: 'gradient-red-to-purple',
          title: 'Tez Parcel Enterprise',
          text: 'Streamlining operations to drive business growth',
          serviceType: 'trucks' as ServiceType,
        },
        {
          gradient: 'gradient-green-to-blue',
          title: 'API Integration',
          text: 'Automate the transportation of your goods by integrating our APIs',
          serviceType: 'bike' as ServiceType,
        },
        {
          gradient: 'gradient-blue-to-red',
          title: 'Two-Wheelers',
          text: 'Reliable goods transportation services for up to 20 kg',
          serviceType: 'bike' as ServiceType,
        },
        {
          gradient: 'gradient-cyan-to-blue',
          title: 'Trucks',
          text: 'Hassle-free goods transportation up to 2500 kg',
          serviceType: 'trucks' as ServiceType,
        },
        {
          gradient: 'gradient-red-to-purple',
          title: 'Packers & Movers',
          text: 'House shifting hai? Ho Jayega',
          serviceType: 'packers-movers' as ServiceType,
        },
      ];

  return (
    <div className="w-full">
      {/* City Modal */}
      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={currentCity}
        onSelectCity={(city) => {
          onCityChange(city);
          setIsCityModalOpen(false);
        }}
      />

      {/* Estimate Modal */}
      <EstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        initialService={estimateService}
        currentCity={currentCity}
      />

      {/* Floating Category Card Section */}
      <div className="site-medium-container" style={{ marginTop: '-75px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            padding: '20px 28px 24px',
            border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {/* City Selector Bar */}
          <div
            style={{
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: '4px 0',
              }}
            >
              <img
                alt="location pin"
                loading="lazy"
                width="20"
                height="20"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/location_icon_343963347b_2c5c2d74fa.svg"
              />
              <span style={{ color: '#757575', fontSize: '1.4rem' }}>City:</span>
              <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1a1a1a', textTransform: 'capitalize' }}>
                {currentCity}
              </span>
              <img
                alt="drop down"
                loading="lazy"
                width="14"
                height="14"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/drop_down_25e36a8740.svg"
              />
            </button>
          </div>

          {/* Service Category Cards + Estimate Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              alignItems: 'stretch',
            }}
          >
            {/* Card 1: Truck */}
            <div
              onClick={() => handleOpenEstimate('trucks')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt="Truck"
                  width="60"
                  height="60"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/trucks_india_a42dcdfc61/trucks_india_a42dcdfc61.webp"
                />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                Truck
              </div>
            </div>

            {/* Card 2: Two Wheeler */}
            <div
              onClick={() => handleOpenEstimate('bike')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt="Two Wheeler"
                  width="60"
                  height="60"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/two_wheelers_ea30db4d2d/two_wheelers_ea30db4d2d.webp"
                />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                Two Wheeler
              </div>
            </div>

            {/* Card 3: Packers & Movers */}
            <div
              onClick={() => handleOpenEstimate('packers-movers')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  alt="Packers & Movers"
                  width="60"
                  height="60"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/Pn_M_56aa8e7af2_4b05aeef37_285939a114/Pn_M_56aa8e7af2_4b05aeef37_285939a114.webp"
                />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                Packers &amp; Movers
              </div>
            </div>

            {/* Card 4: Estimate Card (Solid Blue) */}
            <div
              onClick={() => handleOpenEstimate('trucks')}
              style={{
                backgroundColor: '#0041f5',
                borderRadius: '12px',
                padding: '20px 18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0, 65, 245, 0.35)',
                transition: 'all 0.2s ease',
                minHeight: '135px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 65, 245, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 65, 245, 0.35)';
              }}
            >
              <div>
                <div style={{ color: '#ffffff', fontSize: '1.9rem', fontWeight: 800, lineHeight: '1.2' }}>
                  Estimate Fare
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.2rem', marginTop: '6px' }}>
                  Know estimated fare before booking
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}
              >
                <img
                  alt="arrow"
                  width="16"
                  height="16"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services in City - Horizontal Gradient Promo Cards */}
      <section className="site-container" style={{ marginTop: '50px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          <img
            alt="wave"
            width="36"
            height="36"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
          />
          <h2 style={{ fontSize: '2.6rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            Services in {cityNameCapitalized}
          </h2>
          <img
            alt="wave"
            width="36"
            height="36"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
          />
        </div>

        <div className="no-scrollbar" style={{ overflowX: 'auto', paddingBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'flex-start',
              padding: '8px 4px',
              minWidth: 'max-content',
            }}
          >
            {promoCards.map((card, idx) => (
              <div
                key={idx}
                className={card.gradient}
                onClick={() => handleOpenEstimate(card.serviceType)}
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '24px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    borderRadius: '16px',
                    padding: '4px 12px',
                  }}
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {card.title}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: '1.35', color: '#ffffff' }}>
                    {card.text}
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    alt="Arrow"
                    width="16"
                    height="16"
                    src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
