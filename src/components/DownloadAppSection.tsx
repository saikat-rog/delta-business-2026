import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeftIcon } from './Icons';

export const DownloadAppSection: React.FC = () => {
  const [loadingStore, setLoadingStore] = useState<string | null>(null);

  useEffect(() => {
    if (!loadingStore) return;

    document.body.style.overflow = 'hidden';
    const handlePopState = () => setLoadingStore(null);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loadingStore]);

  const handleStoreClick = (event: React.MouseEvent<HTMLAnchorElement>, storeName: string) => {
    event.preventDefault();
    setLoadingStore(storeName);
    window.history.pushState({ appStoreLoader: true }, '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseLoader = () => {
    setLoadingStore(null);
    if (window.history.state?.appStoreLoader) window.history.back();
  };

  return (
    <>
    <section id="download-app" className="site-container my-8 md:my-14">
      <div
        style={{
          background: 'linear-gradient(135deg, #ebf3ff 0%, #fff8ee 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(4, 69, 218, 0.12)',
          boxShadow: '0 6px 24px rgba(4, 69, 218, 0.06)',
        }}
        className="p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
      >
        {/* Left Side: App Icon & Heading */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <img
            alt="Smart Driver App Icon"
            src="/logo2.png"
            width="72"
            height="72"
            style={{ borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
          />
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Download the Smart Driver App
            </h2>
            <p style={{ fontSize: '1.45rem', color: '#555555', marginTop: '6px', margin: 0 }}>
              We are loved by 1 Crore+ customers for fast, reliable goods transport!
            </p>
          </div>
        </div>

        {/* Right Side: App Badges */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          {/* App Store Buttons */}
          <div>
            <p className="text-[1.25rem] font-bold text-gray-700 mb-2 text-center md:text-left">
              We are available on
            </p>
            <div className="flex flex-row gap-3 flex-wrap justify-center">
            <a
              href="https://play.google.com"
              onClick={(event) => handleStoreClick(event, 'Google Play')}
              style={{ display: 'inline-block', cursor: 'pointer' }}
              aria-label="Get Smart Driver on Google Play"
            >
              <img
                alt="Play Store"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/googleplay_419e81f188.png"
                width="135"
                height="40"
                style={{ objectFit: 'contain' }}
              />
            </a>
            <a
              href="https://apple.com/app-store"
              onClick={(event) => handleStoreClick(event, 'App Store')}
              style={{ display: 'inline-block', cursor: 'pointer' }}
              aria-label="Download Smart Driver on the App Store"
            >
              <img
                alt="App Store"
                src="https://dom-content-vault-prod-cdn-assets.porter.in/appstore_1ca72680f5.png"
                width="135"
                height="40"
                style={{ objectFit: 'contain' }}
              />
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {loadingStore && createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Loading ${loadingStore}`}
        className="fixed inset-0 z-[99999] bg-white flex flex-col justify-between"
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        <header className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 px-6 py-4 flex items-center justify-between shadow-xs">
          <button type="button" onClick={handleCloseLoader} className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-gray-300 bg-white text-gray-800 text-[1.35rem] font-bold hover:bg-gray-100 hover:border-gray-400 transition-all cursor-pointer shadow-xs active:scale-95">
            <ArrowLeftIcon size={18} />
            <span>Back</span>
          </button>
          <button type="button" onClick={handleCloseLoader} className="flex items-center cursor-pointer bg-transparent border-0">
            <img src="/logo2.png" alt="Smart Driver" className="h-8 md:h-9 w-auto object-contain" />
          </button>
          <div className="w-20 hidden sm:block" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full border-4 border-blue-100 animate-ping opacity-30 absolute inset-0 m-auto" />
            <div className="w-20 h-20 rounded-full border-4 border-gray-100 border-t-[#0445DA] border-r-[#0445DA] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0445DA] animate-pulse" />
            </div>
          </div>
          <h2 className="text-[2.2rem] md:text-[2.6rem] font-black text-gray-950 tracking-tight mb-2">
            Loading {loadingStore}
          </h2>
          <p className="text-[1.4rem] text-gray-500 max-w-sm mb-8 leading-relaxed">
            Please wait a moment while we connect to Smart Driver services...
          </p>
          <button type="button" onClick={handleCloseLoader} className="px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#0445DA] text-white text-[1.45rem] font-bold inline-flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-98">
            <ArrowLeftIcon size={18} />
            <span>Go Back to Website</span>
          </button>
        </main>

        <footer className="text-center py-6 text-gray-400 text-[1.2rem] border-t border-gray-100">
          Smart Driver Operations • Connecting to secure gateway...
        </footer>
      </div>,
      document.body
    )}
    </>
  );
};
