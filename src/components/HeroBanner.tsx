import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <div
      className="HomeBannerWrapper_banner-wrapper__8z09n relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #031b5c, #040a1a)',
      }}
    >
      {/* Background Hero Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          alt="Smart Driver Logistics Banner"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[85%_center] md:object-[right_center]"
          src="https://dom-content-vault-prod-cdn-assets.porter.in/IND_desktop_banner_d08506ac6f/IND_desktop_banner_d08506ac6f.webp"
        />
      </div>

      {/* Gradient Overlay for Crisp Typography */}
      <div
        className="HomeBannerWrapper_banner-overlay__c5iXp absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(3,27,92,0.92) 0%, rgba(3,27,92,0.65) 50%, rgba(0,0,0,0) 90%)',
        }}
      />

      {/* Responsive Content Container */}
      <div
        className="site-container relative z-10 flex flex-col justify-start pt-[38px] md:justify-center md:pt-0 h-[250px] md:h-[500px] md:pb-[110px]"
      >
        <div className="max-w-[550px]">
          <h1
            className="text-[2.2rem] md:text-[4.6rem] text-white font-normal m-0 leading-tight"
          >
            Delivery Aapki,
          </h1>
          <h1
            className="text-[3rem] md:text-[6.2rem] text-white font-extrabold mt-1 md:mt-2 leading-none tracking-tight"
          >
            Transport Hamara
          </h1>
        </div>
      </div>
    </div>
  );
};
