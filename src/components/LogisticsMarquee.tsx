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
  { name: 'BigBasket', category: 'Online Supermarket', logoSrc: '/partners/bigbasket.png' },
  { name: 'Delhivery', category: 'Express Cargo', logoSrc: '/partners/delhivery.png' },
  { name: 'Dunzo', category: 'Hyperlocal Courier', logoSrc: '/partners/dunzo.svg' },
  { name: 'Amazon', category: 'Amazon Relay & Flex', logoSrc: '/partners/amazon.svg' },
  { name: 'Shiprocket', category: 'E-commerce Freight', logoSrc: '/partners/shiprocket.svg' },
  { name: 'Ekart', category: 'E-commerce Logistics', logoSrc: '/partners/Ekart logo.jpg' },
  { name: 'BlackBuck', category: 'Trucking Platform', logoSrc: '/partners/blackbuck-original.webp' },
  { name: 'Vahak', category: 'Transport Marketplace', logoSrc: '/partners/vahak-logo.png' },
  { name: 'TruckSuvidha', category: 'Truck Marketplace', logoSrc: '/partners/logo_trucksuvidha.png' },
  { name: 'V-Trans', category: 'Cargo Logistics', logoSrc: '/partners/V-Trans-Logo-scaled-e1781517401787.jpg' },
  { name: 'Borzo', category: 'Same-day Delivery', logoSrc: '/partners/borzo.png' },
  { name: 'Grab', category: 'Mobility & Delivery', logoSrc: '/partners/Grab_Logo.svg.webp' },
  { name: 'inDrive', category: 'Urban Mobility', logoSrc: '/partners/InDrive_Logo.svg.webp' },
  { name: 'Savaari', category: 'Cab Services', logoSrc: '/partners/Savaari-logo-Hi-Res.png' },
  { name: 'GoMechanic', category: 'Vehicle Services', logoSrc: '/partners/go mechanoc.png' },
  { name: 'Ride N Repair', category: 'Vehicle Services', logoSrc: '/partners/ridenrepair.webp' },
  { name: 'TradeIndia', category: 'B2B Marketplace', logoSrc: '/partners/TradeIndia.svg.webp' },
  { name: 'Justdial', category: 'Local Services', logoSrc: '/partners/Justdial_Logo.svg.webp' },
  { name: 'MakeMyTrip', category: 'Travel Mobility', logoSrc: '/partners/Makemytrip_logo.svg.webp' },
  { name: 'Goibibo', category: 'Travel Mobility', logoSrc: '/partners/Goibibo_Logo.svg.webp' },
  { name: 'redBus', category: 'Bus Mobility', logoSrc: '/partners/RedBus_Logo_(2015-present).svg.webp' },
  { name: 'Booking.com', category: 'Travel Platform', logoSrc: '/partners/Booking-Logo.png' },
  { name: 'WheelsEye', category: 'Fleet Logistics', logoSrc: '/partners/wheelseye-logo.png' },
  { name: 'IndiaMART', category: 'B2B Marketplace', logoSrc: '/partners/indiamart-logo.png' },
  { name: 'Dabur', category: 'Consumer Goods', logoSrc: '/partners/dabur-logo.webp' },
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
