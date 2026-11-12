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
      <div className="site-medium-container -mt-[44px] md:-mt-[96px] relative z-20">
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
          className="p-[14px] md:p-[20px]"
        >
          {/* City Selector Bar */}
          <div
            className="flex items-center justify-between border-b border-[#f0f2f7] pb-[10px] mb-[14px]"
          >
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="inline-flex items-center gap-2 cursor-pointer bg-transparent border-0 py-0.5 hover:opacity-80 transition-opacity"
            >
              <img
                alt="location pin"
                loading="lazy"
                width="18"
                height="18"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/location_icon_343963347b_2c5c2d74fa.svg"
              />
              <span className="text-[#64748b] text-[1.35rem]">City:</span>
              <span className="font-bold text-[1.45rem] text-[#1a1a1a] capitalize">
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

            <div className="hidden sm:flex items-center gap-5 text-[1.25rem] text-[#64748b] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#10b981]" />
                Instant Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#0445DA]" />
                Live Tracking
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#f59e0b]" />
                Lowest Fares
              </span>
            </div>
          </div>

          {/* Top 3 Service Categories: Responsive 3 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {[
              {
                id: 'trucks' as ServiceType,
                title: 'Truck',
                subtitle: 'Mini trucks up to 2500 kg',
                image: 'https://dom-content-vault-prod-cdn-assets.porter.in/trucks_india_a42dcdfc61/trucks_india_a42dcdfc61.webp',
              },
              {
                id: 'bike' as ServiceType,
                title: 'Two Wheeler',
                subtitle: 'Parcels up to 20 kg',
                image: 'https://dom-content-vault-prod-cdn-assets.porter.in/two_wheelers_ea30db4d2d/two_wheelers_ea30db4d2d.webp',
              },
              {
                id: 'packers-movers' as ServiceType,
                title: 'Packers & Movers',
                subtitle: 'Safe home shifting',
                image: 'https://dom-content-vault-prod-cdn-assets.porter.in/Pn_M_56aa8e7af2_4b05aeef37_285939a114/Pn_M_56aa8e7af2_4b05aeef37_285939a114.webp',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenEstimate(item.id)}
                className="group flex flex-col items-center justify-center py-[12px] px-[8px] md:py-[16px] md:px-[12px] rounded-xl cursor-pointer bg-[#f6f8ff] hover:bg-[#edf2ff] border border-[#e6edff] hover:border-[#0445DA]/40 hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(4,69,218,0.1)] transition-all duration-200"
              >
                <img
                  alt={item.title}
                  src={item.image}
                  className="w-[68px] h-[56px] md:w-[110px] md:h-[82px] object-contain mb-[8px] md:mb-[10px] group-hover:scale-105 transition-transform duration-200"
                />
                <div className="text-[1.25rem] md:text-[1.55rem] font-bold text-[#1a1a1a] text-center leading-tight">
                  {item.title}
                </div>
                <div className="hidden md:block text-[1.2rem] text-[#64748b] text-center mt-[3px]">
                  {item.subtitle}
                </div>
              </div>
            ))}

            {/* Card 4: Estimate Card (Desktop layout inside the grid) */}
            <div
              onClick={() => handleOpenEstimate('trucks')}
              style={{
                background: 'linear-gradient(135deg, #0041f5 0%, #0b57ff 100%)',
                boxShadow: '0 6px 18px rgba(0, 65, 245, 0.35)',
              }}
              className="hidden md:flex flex-col justify-between rounded-xl p-[18px] cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,65,245,0.45)] transition-all duration-200"
            >
              <div>
                <div className="text-white text-[1.9rem] font-extrabold leading-tight">
                  Estimate Fare
                </div>
                <div className="text-white/80 text-[1.25rem] mt-[6px] leading-snug">
                  Know estimated fare before booking
                </div>
              </div>
              <div className="bg-white/20 w-[34px] h-[34px] rounded-full flex items-center justify-center self-end">
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

      {/* Floating Sticky Get Estimate Fare Button */}
      {!isEstimateModalOpen && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 z-40"
        >
          <button
            type="button"
            onClick={() => handleOpenEstimate('trucks')}
            style={{
              backgroundColor: '#0041f5',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(0, 65, 245, 0.45)',
            }}
            className="w-full md:w-auto min-h-[54px] flex items-center justify-center gap-3 px-6 py-[14px] md:px-8 md:py-[15px] rounded-lg md:rounded-full text-[1.8rem] md:text-[1.85rem] font-bold tracking-wide whitespace-nowrap hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Get Estimate Fare</span>
            <img
              alt="Arrow"
              width="18"
              height="18"
              src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
            />
          </button>
        </div>
      )}
    </div>
  );
};
