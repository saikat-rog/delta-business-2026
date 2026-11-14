import React, { useState, useEffect } from 'react';
import {
  getStoredDriverPhone,
  setStoredDriverPhone,
} from '../api/client';
import {
  AlertTriangleIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../components/Icons';

interface StatusPageProps {
  onNavigate: (path: string) => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({ onNavigate }) => {
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const savedPhone = getStoredDriverPhone();
    if (savedPhone) {
      const clean = savedPhone.replace(/\D/g, '').slice(-10);
      if (clean.length === 10) {
        setPhoneInput(clean);
      }
    }
  }, []);

  const handlePhoneInputChange = (raw: string) => {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1);
    }
    setPhoneInput(digits.slice(0, 10));
    if (errorMsg) setErrorMsg('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanPhone = phoneInput.trim().replace(/\D/g, '');
    if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.startsWith('0') && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(1);
    }
    cleanPhone = cleanPhone.slice(-10);

    if (!cleanPhone || cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setStoredDriverPhone(cleanPhone);
    // Navigate to dedicated Status Details Page as requested
    onNavigate(`/status-details?phone=${cleanPhone}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A] font-sans flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1140px] w-full mx-auto px-6 h-18 md:h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 cursor-pointer border-none bg-transparent"
          >
            <img src="/logo2.png" alt="Smart Driver" className="h-10 sm:h-11 md:h-12 w-auto object-contain" />
          </button>
        </div>
      </header>

      {/* Main Content - Centered Lookup Experience */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-5 sm:px-8 py-10 md:py-16 flex flex-col items-center justify-center">
        {/* Lookup Box (Uber Minimalist Style) */}
        <div className=" p-8 sm:p-12 w-full max-w-[620px] mx-auto animate-fade-in">
          <div className="mb-8 text-center">
            <span className="text-[1.25rem] font-bold uppercase tracking-wider text-[#0445DA] block mb-1">
              Driver Partner Portal
            </span>
            <h1 className="text-[2.8rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
              Track your application
            </h1>
            <p className="text-[1.45rem] text-gray-500 mt-2 max-w-md mx-auto">
              Enter your registered mobile number to view live status, continue your registration, or check approval.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-5">
            <div>
              <label className="block text-[1.35rem] font-bold text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:bg-white focus-within:border-[#0445DA] transition-all overflow-hidden">
                <div className="px-5 py-4 bg-gray-100/80 border-r border-gray-200 text-[1.6rem] font-extrabold text-gray-700 flex items-center gap-1.5 select-none shrink-0">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  autoFocus
                  maxLength={14}
                  value={phoneInput}
                  onChange={(e) => handlePhoneInputChange(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-5 py-4 text-[2rem] font-mono font-bold text-gray-950 tracking-wider outline-none bg-transparent"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[1.3rem] rounded-xl flex items-center gap-2 animate-fade-in">
                <AlertTriangleIcon size={18} className="text-red-600 shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={phoneInput.length !== 10}
              className="w-full py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.65rem] font-extrabold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <SearchIcon size={20} />
              <span>Check Status</span>
              <ArrowRightIcon size={20} />
            </button>
          </form>

          {/* Value Props Strip */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-2.5 text-[1.3rem] text-gray-600">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckIcon size={12} />
              </div>
              <span><strong>Password-free login:</strong> No password or OTP required</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <CheckIcon size={12} />
              </div>
              <span><strong>Auto-resume:</strong> Continue exactly where you left off</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <CheckIcon size={12} />
              </div>
              <span><strong>Real-time verification:</strong> Instant sync with operations team</span>
            </div>
          </div>
        </div>

        {/* Quick Help Card */}
        <div className="mt-8 max-w-[620px] w-full p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shrink-0">
              <img src="/vehicles/tata-ace.png" alt="Commercial Vehicle" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-[1.45rem] font-bold text-gray-950">New driver partner?</h4>
              <p className="text-[1.3rem] text-gray-500">Attach your vehicle and start earning up to ₹75,000/mo.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="px-4.5 py-2.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.35rem] font-bold rounded-xl transition-all cursor-pointer shrink-0"
          >
            Apply Now
          </button>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-400 text-[1.25rem]">
        Smart Driver Partner Network © 2026. All rights reserved.
      </footer>
    </div>
  );
};