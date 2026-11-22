import React from 'react';
import { BRANDS } from './LogisticsMarquee';

export const OurPartnersGrid: React.FC = () => {
  return (
    <section className="site-container my-10 md:my-14">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-[2.6rem] sm:text-[3.2rem] md:text-[3.8rem] font-black text-gray-950 tracking-tight leading-tight">
          Our Partners
        </h2>
        <p className="text-[1.4rem] md:text-[1.55rem] text-gray-500 mt-2 leading-relaxed">
          Smart Driver vehicles operate seamlessly across India&apos;s premier ride-hailing, intra-city freight, and e-commerce logistics networks.
        </p>
      </div>

      {/* Fixed Non-Scrolling Grid of Partner Logos (Logos Only, Large Size) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="p-3 sm:p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all overflow-hidden h-[110px] sm:h-[125px] group cursor-default select-none hover:-translate-y-1 flex items-center justify-center"
            title={brand.name}
          >
            <img
              src={brand.logoSrc}
              alt={brand.name}
              className="w-full h-full object-contain block transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
