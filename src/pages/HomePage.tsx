import React from 'react';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { ServiceTabsAndEstimate } from '../components/ServiceTabsAndEstimate';
import { EnterpriseSection } from '../components/EnterpriseSection';
import { FootprintsAndNews } from '../components/FootprintsAndNews';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { DownloadAppSection } from '../components/DownloadAppSection';

interface HomePageProps {
  currentState: string;
  onStateChange: (stateName: string) => void;
  onNavigate: (path: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentState,
  onStateChange,
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#0445DA] selection:text-white">
      {/* Top Header with Navigation */}
      <Header
        onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        onOpenStatus={() => onNavigate('/login')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Banner Section */}
        <HeroBanner
          onOpenRegister={() => onNavigate('/register', 'tata-ace')}
          onOpenStatus={() => onNavigate('/login')}
        />

        {/* Operating State Selector, Vehicle Categories & Sticky Register Now Button */}
        <div id="book-now">
          <ServiceTabsAndEstimate
            currentState={currentState}
            onStateChange={onStateChange}
            onOpenRegister={(vehicle) => onNavigate('/register', vehicle || 'tata-ace')}
            onOpenStatus={() => onNavigate('/login')}
          />
        </div>

        {/* Promotional Feature Banner Section (banner2.png with original dimensions) */}
        <section className="site-container my-10 md:my-16">
          <div
            onClick={() => onNavigate('/register', 'tata-ace')}
            className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white border border-gray-200/80 group"
          >
            <img
              src="/banner2.png"
              alt="Smart Driver Partner Opportunities"
              className="w-full h-auto max-w-[1536px] mx-auto block transition-transform duration-500 group-hover:scale-[1.005]"
              loading="lazy"
            />
          </div>
        </section>

        {/* Fleet Owners / Enterprise Vehicle Attachment */}
        <EnterpriseSection
          onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        />

        {/* Driver Partner Footprints, Reviews & Media Highlights */}
        <FootprintsAndNews />

        {/* Driver Partner FAQs */}
        <FaqSection />

        {/* Mobile app availability badges */}
        <DownloadAppSection />
      </main>

      {/* Footer with Driver Quick Links, Hubs, and Helpline */}
      <Footer
        onSelectState={onStateChange}
        onOpenRegister={() => onNavigate('/register', 'tata-ace')}
        onOpenStatus={() => onNavigate('/login')}
      />
    </div>
  );
};
