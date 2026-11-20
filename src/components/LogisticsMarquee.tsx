import React from 'react';

export interface Brand {
  name: string;
  category: string;
  logoSrc: string;
}

export const BRANDS: Brand[] = [
  { name: 'Uber', category: 'Cabs & Freight', logoSrc: '/partners/uber.png' },
  { name: 'Ola', category: 'Cabs & Delivery', logoSrc: '/partners/ola.svg' },
  { name: 'Porter', category: 'Trucks & Mini Cargo', logoSrc: '/partners/porter.svg' },
  { name: 'Rapido', category: 'Bike Taxi & Auto', logoSrc: '/partners/rapido.png' },
  { name: 'Zomato', category: 'Food & Quick Commerce', logoSrc: '/partners/zomato.png' },
  { name: 'Swiggy', category: 'Food & Instamart', logoSrc: '/partners/swiggy.png' },
  { name: 'Blinkit', category: '10-Min Instant Grocery', logoSrc: '/partners/blinkit.svg' },
  { name: 'Zepto', category: '10-Min Quick Delivery', logoSrc: '/partners/zepto.svg' },
  { name: 'BigBasket', category: 'Online Supermarket', logoSrc: '/partners/bigbasket.png' },
  { name: 'Delhivery', category: 'Express Cargo', logoSrc: '/partners/delhivery.png' },
  { name: 'Shadowfax', category: 'Last-Mile Delivery', logoSrc: '/partners/shadowfax.svg' },
  { name: 'Dunzo', category: 'Hyperlocal Courier', logoSrc: '/partners/dunzo.svg' },
  { name: 'Flipkart', category: 'E-commerce Supply', logoSrc: '/partners/flipkart.png' },
  { name: 'Amazon', category: 'Amazon Relay & Flex', logoSrc: '/partners/amazon.svg' },
  { name: 'Shiprocket', category: 'E-commerce Freight', logoSrc: '/partners/shiprocket.svg' },
  { name: 'Blowhorn', category: 'Mini Trucks & Cargo', logoSrc: '/partners/blowhorn.png' },
  { name: "Domino's", category: 'Delivery Fleet', logoSrc: '/partners/dominos.svg' },
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
          {/* First loop of brands (Logos Only, Large Size) */}
          {BRANDS.map((brand, i) => (
            <div
              key={`b1-${i}`}
              className="px-7 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex items-center justify-center shrink-0 cursor-default select-none group min-h-[64px]"
              title={brand.name}
            >
              <img
                src={brand.logoSrc}
                alt={brand.name}
                className="h-9 sm:h-11 md:h-12 max-w-[140px] sm:max-w-[160px] w-auto object-contain block"
                loading="lazy"
              />
            </div>
          ))}

          {/* Second cloned loop of brands for seamless infinite scrolling */}
          {BRANDS.map((brand, i) => (
            <div
              key={`b2-${i}`}
              className="px-7 py-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-gray-300 transition-all flex items-center justify-center shrink-0 cursor-default select-none group min-h-[64px]"
              title={brand.name}
            >
              <img
                src={brand.logoSrc}
                alt={brand.name}
                className="h-9 sm:h-11 md:h-12 max-w-[140px] sm:max-w-[160px] w-auto object-contain block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
