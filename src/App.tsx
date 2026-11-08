import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ServiceTabsAndEstimate } from './components/ServiceTabsAndEstimate';
import { EnterpriseSection } from './components/EnterpriseSection';
import { DownloadAppSection } from './components/DownloadAppSection';
import { FootprintsAndNews } from './components/FootprintsAndNews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<string>('bangalore');

  useEffect(() => {
    // Try to get saved city from localStorage if available
    const savedCity = localStorage.getItem('tez_parcel_city');
    if (savedCity) {
      setCurrentCity(savedCity);
    }
  }, []);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
    localStorage.setItem('tez_parcel_city', city);
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

        {/* Download App Section */}
        <DownloadAppSection />

        {/* Tez Parcel Footprints & In The News Carousel */}
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
