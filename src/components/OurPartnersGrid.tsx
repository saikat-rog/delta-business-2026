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

      {/* Fixed Non-Scrolling Grid of Partner Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col items-center justify-center text-center gap-2.5 min-h-[105px] group cursor-default select-none hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-center min-h-[32px]">
              {brand.renderLogo()}
            </div>
            <span className="text-[1.15rem] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
              {brand.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
