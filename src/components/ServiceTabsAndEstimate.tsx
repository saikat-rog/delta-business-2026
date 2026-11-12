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
          title: 'Smart Driver Enterprise',
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

      {/* Floating Category Card Section (Half overlapping hero banner) */}
      <div className="site-medium-container -mt-[44px] md:-mt-[105px] relative z-20">
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            padding: '16px 16px 20px',
            border: '1px solid rgba(0,0,0,0.04)',
          }}
          className="md:!p-6"
        >
          {/* City Selector Bar */}
          <div
            style={{
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '12px',
              marginBottom: '16px',
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
                padding: '2px 0',
              }}
            >
              <img
                alt="location pin"
                loading="lazy"
                width="18"
                height="18"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/location_icon_343963347b_2c5c2d74fa.svg"
              />
              <span style={{ color: '#757575', fontSize: '1.35rem' }}>City:</span>
              <span style={{ fontWeight: 700, fontSize: '1.45rem', color: '#1a1a1a', textTransform: 'capitalize' }}>
                {currentCity}
              </span>
              <img
                alt="drop down"
                loading="lazy"
                width="12"
                height="12"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/drop_down_25e36a8740.svg"
              />
            </button>
          </div>

          {/* Top 3 Service Categories: Responsive 3 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {/* Card 1: Truck */}
            <div
              onClick={() => handleOpenEstimate('trucks')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
                className="md:!w-20 md:!h-20"
              >
                <img
                  alt="Truck"
                  width="48"
                  height="48"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/trucks_india_a42dcdfc61/trucks_india_a42dcdfc61.webp"
                  className="md:!w-16 md:!h-16"
                />
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center' }} className="md:!text-[1.5rem]">
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
                padding: '12px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
                className="md:!w-20 md:!h-20"
              >
                <img
                  alt="Two Wheeler"
                  width="48"
                  height="48"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/two_wheelers_ea30db4d2d/two_wheelers_ea30db4d2d.webp"
                  className="md:!w-16 md:!h-16"
                />
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center' }} className="md:!text-[1.5rem]">
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
                padding: '12px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                transition: 'all 0.2s ease',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
                className="md:!w-20 md:!h-20"
              >
                <img
                  alt="Packers & Movers"
                  width="48"
                  height="48"
                  style={{ objectFit: 'contain' }}
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/Pn_M_56aa8e7af2_4b05aeef37_285939a114/Pn_M_56aa8e7af2_4b05aeef37_285939a114.webp"
                  className="md:!w-16 md:!h-16"
                />
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', textAlign: 'center', lineHeight: '1.2' }} className="md:!text-[1.5rem]">
                Packers &amp; Movers
              </div>
            </div>

            {/* Card 4: Estimate Card (Desktop layout inside the grid) */}
            <div
              onClick={() => handleOpenEstimate('trucks')}
              style={{
                backgroundColor: '#0041f5',
                borderRadius: '12px',
                padding: '20px 18px',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0, 65, 245, 0.35)',
                transition: 'all 0.2s ease',
                minHeight: '135px',
              }}
              className="hidden md:flex"
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

          {/* Full-width Estimate Card for Mobile (Shown only on Mobile) */}
          <div
            onClick={() => handleOpenEstimate('trucks')}
            style={{
              backgroundColor: '#0041f5',
              borderRadius: '12px',
              padding: '14px 18px',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0, 65, 245, 0.3)',
              marginTop: '12px',
            }}
            className="flex md:hidden"
          >
            <div>
              <div style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 800 }}>
                Estimate Fare
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>
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
                flexShrink: 0,
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

      {/* Services in City - Horizontal Gradient Promo Cards */}
      <section className="site-container my-10 md:my-16">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <img
            alt="wave"
            width="28"
            height="28"
            className="md:!w-9 md:!h-9"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
          />
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            Services in {cityNameCapitalized}
          </h2>
          <img
            alt="wave"
            width="28"
            height="28"
            className="md:!w-9 md:!h-9"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/Wave_Light_56c89daa20.svg"
          />
        </div>

        <div className="no-scrollbar" style={{ overflowX: 'auto', paddingBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-start',
              padding: '4px',
              minWidth: 'max-content',
            }}
            className="md:gap-6"
          >
            {promoCards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.gradient} md:!w-[250px] md:!h-[250px] md:!p-6 md:!rounded-3xl`}
                onClick={() => handleOpenEstimate(card.serviceType)}
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '20px',
                  padding: '20px 18px',
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
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.2)';
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
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: '1.35', color: '#ffffff' }} className="md:!text-[1.85rem]">
                    {card.text}
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    alt="Arrow"
                    width="14"
                    height="14"
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
