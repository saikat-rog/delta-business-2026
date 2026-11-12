import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ServiceTabsAndEstimate } from './components/ServiceTabsAndEstimate';
import { EnterpriseSection } from './components/EnterpriseSection';
import { FootprintsAndNews } from './components/FootprintsAndNews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { detectUserCity } from './utils/cityDetection';

export const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<string>(() => {
    return localStorage.getItem('smart_driver_city') || 'bangalore';
  });

  useEffect(() => {
    const isManual = localStorage.getItem('smart_driver_city_manual') === 'true';
    if (isManual) return;

    let cancelled = false;
    detectUserCity().then((detectedCity) => {
      if (!cancelled && detectedCity) {
        setCurrentCity(detectedCity);
        localStorage.setItem('smart_driver_city', detectedCity);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
    localStorage.setItem('smart_driver_city', city);
    localStorage.setItem('smart_driver_city_manual', 'true');
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#0445DA] selection:text-white">
      {/* Top Header with App Install Bar and Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Banner Section */}
        <HeroBanner />

        {/* City Selector, Service Tabs & Live Fare Estimate Form / Interactive Booking */}
        <div id="book-now">
          <ServiceTabsAndEstimate
            currentCity={currentCity}
            onCityChange={handleCityChange}
          />
        </div>

        {/* Enterprise Growth Card */}
        <EnterpriseSection />

        {/* Smart Driver Footprints & In The News Carousel */}
        <FootprintsAndNews />

        {/* FAQs Accordion */}
        <FaqSection />
      </main>

      {/* Footer with City Links, Corporate Info and Socials */}
      <Footer onSelectCity={handleCityChange} />
    </div>
  );
};

export default App;
