import React from 'react';

interface Brand {
  name: string;
  category: string;
  badgeBg?: string;
  renderLogo: () => React.ReactNode;
}

const BRANDS: Brand[] = [
  {
    name: 'Uber',
    category: 'Cabs & Freight',
    renderLogo: () => (
      <span className="font-sans font-black text-[2.2rem] tracking-tighter text-black leading-none">
        Uber
      </span>
    ),
  },
  {
    name: 'Ola',
    category: 'Cabs & Delivery',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A4D620]" />
        </span>
        <span className="font-sans font-extrabold text-[2rem] tracking-tight text-gray-950 leading-none">
          OLA
        </span>
      </div>
    ),
  },
  {
    name: 'Porter',
    category: 'Trucks & Two Wheeler',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0445DA" />
          <path d="M6 13C8 9 11 9 13 13C15 17 18 17 20 13" stroke="#F2C94C" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="font-sans font-black text-[2.1rem] tracking-tight text-[#0445DA] lowercase leading-none">
          porter
        </span>
      </div>
    ),
  },
  {
    name: 'Rapido',
    category: 'Bike Taxi & Auto',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-lg bg-[#F9D616] text-black font-black text-xs flex items-center justify-center shadow-2xs">
          R
        </span>
        <span className="font-sans font-black text-[1.95rem] tracking-tight text-gray-950 leading-none">
          Rapido
        </span>
      </div>
    ),
  },
  {
    name: 'Delhivery',
    category: 'Express Cargo',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-md bg-[#D9232D] text-white font-black text-xs flex items-center justify-center">
          D
        </span>
        <span className="font-sans font-black text-[1.8rem] tracking-wider text-gray-900 uppercase leading-none">
          DELHIVERY
        </span>
      </div>
    ),
  },
  {
    name: 'Shadowfax',
    category: 'Last-Mile Delivery',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-black text-[1rem]">
          ⚡
        </span>
        <span className="font-sans font-extrabold text-[1.85rem] tracking-tight text-[#1A237E] leading-none">
          shadowfax
        </span>
      </div>
    ),
  },
  {
    name: 'Borzo',
    category: 'Intra-City Courier',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center">
          b
        </span>
        <span className="font-sans font-black text-[1.9rem] tracking-tight text-gray-900 leading-none">
          borzo
        </span>
      </div>
    ),
  },
  {
    name: 'Blowhorn',
    category: 'Mini Trucks & Cargo',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-lg bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center">
          BH
        </span>
        <span className="font-sans font-black text-[1.85rem] tracking-tight text-[#0052CC] leading-none">
          blowhorn
        </span>
      </div>
    ),
  },
  {
    name: 'Shiprocket',
    category: 'E-commerce Freight',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-full bg-[#7C3AED] text-white font-bold text-xs flex items-center justify-center">
          🚀
        </span>
        <span className="font-sans font-black text-[1.85rem] tracking-tight text-gray-900 leading-none">
          Shiprocket
        </span>
      </div>
    ),
  },
  {
    name: 'LoadShare',
    category: 'Logistics Network',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-md bg-[#059669] text-white font-black text-xs flex items-center justify-center">
          LS
        </span>
        <span className="font-sans font-black text-[1.85rem] tracking-tight text-gray-900 leading-none">
          LoadShare
        </span>
      </div>
    ),
  },
  {
    name: 'Dunzo',
    category: 'Hyperlocal Delivery',
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <span className="w-6 h-6 rounded-full bg-[#00D290] text-black font-black text-xs flex items-center justify-center">
          ⚡
        </span>
        <span className="font-sans font-black text-[1.9rem] tracking-tight text-gray-900 leading-none">
          dunzo
        </span>
      </div>
    ),
  },
];

export const LogisticsMarquee: React.FC = () => {
  return (
    <section className="w-full py-10 md:py-14 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/60 border-y border-gray-100 overflow-hidden">
      <div className="site-container mb-6 text-center">
        <p className="text-[1.2rem] md:text-[1.3rem] font-black uppercase tracking-wider text-gray-400">
          PARTNER VEHICLES ATTACHED &amp; OPERATING ACROSS LEADING MOBILITY &amp; LOGISTICS ECOSYSTEMS
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 md:before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 before:pointer-events-none after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 md:after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10 after:pointer-events-none">
        <div className="animate-marquee gap-5 sm:gap-7 items-center">
          {/* First loop of brands */}
          {BRANDS.map((brand, i) => (
            <div
              key={`b1-${i}`}
              className="px-6 py-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3 shrink-0 cursor-default select-none group"
            >
              {brand.renderLogo()}
              <div className="h-6 w-px bg-gray-200 ml-1" />
              <span className="text-[1.15rem] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                {brand.category}
              </span>
            </div>
          ))}

          {/* Second cloned loop of brands for seamless infinite scrolling */}
          {BRANDS.map((brand, i) => (
            <div
              key={`b2-${i}`}
              className="px-6 py-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3 shrink-0 cursor-default select-none group"
            >
              {brand.renderLogo()}
              <div className="h-6 w-px bg-gray-200 ml-1" />
              <span className="text-[1.15rem] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
