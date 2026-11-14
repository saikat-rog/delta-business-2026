import React, { useState } from 'react';
import { StateModal } from './StateModal';
import { LogisticsMarquee } from './LogisticsMarquee';

interface ServiceTabsAndEstimateProps {
  currentState: string;
  onStateChange: (stateName: string) => void;
  onOpenRegister: (vehicleCategory?: string) => void;
  onOpenStatus: () => void;
}

export const ServiceTabsAndEstimate: React.FC<ServiceTabsAndEstimateProps> = ({
  currentState,
  onStateChange,
  onOpenRegister,
}) => {
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

  const partnerBenefits = [
    {
      gradient: 'gradient-red-to-purple',
      title: 'Guaranteed Weekly Payouts',
      text: 'Earnings and performance incentives directly credited to your bank account every week.',
      category: 'tata-ace',
    },
    {
      gradient: 'gradient-green-to-blue',
      title: `High Trip Demand in ${currentState}`,
      text: `Non-stop order flow across ${currentState} from local merchants, e-commerce, and households with zero idle time.`,
      category: '2-wheeler',
    },
    {
      gradient: 'gradient-blue-to-red',
      title: '₹5 Lakh Accident Insurance',
      text: 'Comprehensive medical and accidental insurance coverage provided to every registered driver.',
      category: 'tata-ace',
    },
    {
      gradient: 'gradient-cyan-to-blue',
      title: 'Fuel & Maintenance Savings',
      text: 'Exclusive partner tie-ups for discounted petrol, diesel, CNG and vehicle servicing.',
      category: 'pickup',
    },
    {
      gradient: 'gradient-red-to-purple',
      title: '24x7 Driver Partner Support',
      text: 'Dedicated helpline, local partner hubs, and on-ground SOS assistance whenever you need it.',
      category: 'packers-movers',
    },
  ];

  return (
    <div className="w-full">
      {/* State Modal */}
      <StateModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
        selectedState={currentState}
        onSelectState={(stateName) => {
          onStateChange(stateName);
          setIsStateModalOpen(false);
        }}
      />

      {/* Floating Category Card Section (Positioned cleanly below hero text) */}
      <div id="vehicles" className="site-medium-container -mt-4 sm:-mt-6 md:-mt-8 relative z-20">
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
          className="p-[14px] md:p-[20px]"
        >
          {/* Operating State Selector Bar */}
          <div
            className="flex items-center justify-between border-b border-[#f0f2f7] pb-[10px] mb-[14px]"
          >
            <button
              type="button"
              onClick={() => setIsStateModalOpen(true)}
              className="inline-flex items-center gap-2 cursor-pointer bg-transparent border-0 py-0.5 hover:opacity-80 transition-opacity"
            >
              <img
                alt="location pin"
                loading="lazy"
                width="18"
                height="18"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/location_icon_343963347b_2c5c2d74fa.svg"
              />
              <span className="text-[#64748b] text-[1.35rem]">Operating State:</span>
              <span className="font-bold text-[1.45rem] text-[#0445DA]">
                {currentState}
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
                Daily Trips
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#0445DA]" />
                Weekly Direct Deposit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#f59e0b]" />
                Free Insurance
              </span>
            </div>
          </div>

          {/* Vehicle Attachment Categories: Responsive 3 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {[
              {
                id: 'tata-ace',
                title: 'Truck / Ace',
                subtitle: 'Earn up to ₹45k/mo',
                image: '/vehicles/tata-ace.png',
              },
              {
                id: '2-wheeler',
                title: 'Two Wheeler',
                subtitle: 'Earn up to ₹25k/mo',
                image: '/vehicles/bike.png',
              },
              {
                id: 'packers-movers',
                title: 'Packers & Movers',
                subtitle: 'Earn up to ₹60k/mo',
                image: '/vehicles/truck.png',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenRegister(item.id)}
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
                <div className="text-[1.15rem] md:text-[1.25rem] font-semibold text-[#0445DA] text-center mt-[3px]">
                  {item.subtitle}
                </div>
              </div>
            ))}

            {/* Card 4: Register Now Card (Desktop layout inside the grid) */}
            <div
              onClick={() => onOpenRegister('tata-ace')}
              style={{
                background: 'linear-gradient(135deg, #0041f5 0%, #0b57ff 100%)',
                boxShadow: '0 6px 18px rgba(0, 65, 245, 0.35)',
              }}
              className="hidden md:flex flex-col justify-between rounded-xl p-[18px] cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,65,245,0.45)] transition-all duration-200"
            >
              <div>
                <span className="inline-block bg-white/20 text-white text-[1.1rem] font-bold uppercase px-2 py-0.5 rounded-full mb-1">
                  JOIN PLATFORM
                </span>
                <div className="text-white text-[1.9rem] font-extrabold leading-tight mt-1">
                  Register Now
                </div>
                <div className="text-white/85 text-[1.25rem] mt-[6px] leading-snug">
                  Attach vehicle &amp; start earning within 24 hours
                </div>
              </div>
              <div className="bg-white/20 w-[36px] h-[36px] rounded-full flex items-center justify-center self-end">
                <img
                  alt="arrow"
                  width="18"
                  height="18"
                  src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
                />
              </div>
            </div>
          </div>

          {/* Full-width Register Now Card for Mobile */}
          <div
            onClick={() => onOpenRegister('tata-ace')}
            style={{
              background: 'linear-gradient(135deg, #0041f5 0%, #0b57ff 100%)',
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
              <div style={{ color: '#ffffff', fontSize: '1.65rem', fontWeight: 800 }}>
                Register Now as Driver
              </div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem' }}>
                Attach vehicle &amp; earn up to ₹45,000/month
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                width: '34px',
                height: '34px',
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

      {/* Logistics & Mobility Platforms Marquee */}
      <LogisticsMarquee />

      {/* Driver Partner Benefits Carousel Section */}
      <section id="benefits" className="site-container my-12 md:my-16">
        <div>
          <div className="text-center mb-8">
            <span className="text-[1.2rem] font-bold text-[#0445DA] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              WHY JOIN SMART DRIVER
            </span>
            <h2 className="text-[2.2rem] md:text-[3.2rem] font-extrabold text-gray-900 mt-2 mb-1">
              Top Benefits for Driver Partners in {currentState}
            </h2>
            <p className="text-[1.4rem] md:text-[1.55rem] text-gray-600 max-w-[680px] mx-auto">
              Join thousands of vehicle owners earning steady income across {currentState} with India&apos;s fastest growing logistics network.
            </p>
          </div>

          {/* Horizontal scroll cards */}
          <div
            className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-2"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {partnerBenefits.map((benefit, idx) => (
              <div
                key={idx}
                onClick={() => onOpenRegister(benefit.category)}
                className={`${benefit.gradient} rounded-2xl p-6 md:p-8 flex-shrink-0 flex flex-col justify-between cursor-pointer text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-300`}
                style={{
                  width: 'min(310px, 80vw)',
                  minHeight: '230px',
                  scrollSnapAlign: 'start',
                }}
              >
                <div>
                  <div className="text-white/80 text-[1.2rem] font-bold uppercase tracking-wider mb-2">
                    SMART DRIVER ADVANTAGE
                  </div>
                  <h3 className="text-[1.85rem] font-extrabold leading-tight text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/90 text-[1.3rem] leading-snug">
                    {benefit.text}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/20">
                  <span className="text-[1.25rem] font-bold text-white">Join Now</span>
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                    <img
                      alt="Arrow"
                      width="14"
                      height="14"
                      src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Sticky Register Now Button */}
      <div
        className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 z-40"
      >
        <button
          type="button"
          onClick={() => onOpenRegister('tata-ace')}
          style={{
            backgroundColor: '#0041f5',
            color: '#ffffff',
            boxShadow: '0 8px 26px rgba(0, 65, 245, 0.45)',
          }}
          className="w-full md:w-auto min-h-[54px] flex items-center justify-center gap-3 px-6 py-[14px] md:px-8 md:py-[15px] rounded-lg md:rounded-full text-[1.8rem] md:text-[1.85rem] font-bold tracking-wide whitespace-nowrap hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Register Now</span>
          <img
            alt="Arrow"
            width="18"
            height="18"
            src="https://dom-content-vault-prod-cdn-assets.porter.in/Common_Arrows_East_82100c25a3.svg"
          />
        </button>
      </div>
    </div>
  );
};
