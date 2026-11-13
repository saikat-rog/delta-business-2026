import React from 'react';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { ServiceTabsAndEstimate } from '../components/ServiceTabsAndEstimate';
import { EnterpriseSection } from '../components/EnterpriseSection';
import { FootprintsAndNews } from '../components/FootprintsAndNews';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';

interface HomePageProps {
  currentCity: string;
  onCityChange: (city: string) => void;
  onNavigate: (path: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentCity,
  onCityChange,
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#0445DA] selection:text-white">
      {/* Top Header with Navigation */}
      <Header
        onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        onOpenStatus={() => onNavigate('/status')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Banner Section */}
        <HeroBanner
          onOpenRegister={() => onNavigate('/register', 'tata-ace')}
          onOpenStatus={() => onNavigate('/status')}
        />

        {/* Operating City Selector, Vehicle Categories & Sticky Register Now Button */}
        <div id="book-now">
          <ServiceTabsAndEstimate
            currentCity={currentCity}
            onCityChange={onCityChange}
            onOpenRegister={(vehicle) => onNavigate('/register', vehicle || 'tata-ace')}
            onOpenStatus={() => onNavigate('/status')}
          />
        </div>

        {/* Fleet Owners / Enterprise Vehicle Attachment */}
        <EnterpriseSection
          onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        />

        {/* Driver Partner Footprints, Reviews & Media Highlights */}
        <FootprintsAndNews />

        {/* Driver Partner FAQs */}
        <FaqSection />
      </main>

      {/* Footer with Driver Quick Links, Hubs, and Helpline */}
      <Footer
        onSelectCity={onCityChange}
        onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        onOpenStatus={() => onNavigate('/status')}
      />
    </div>
  );
};
