import React, { useState, useEffect } from 'react';
import {
  getDriverStatusByPhone,
  getStoredDriverPhone,
  setStoredDriverPhone,
  type DriverData,
} from '../api/client';
import {
  CheckCircleFilledIcon,
  ClockIcon,
  AlertTriangleIcon,
  RefreshIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  XIcon,
  SearchIcon,
  WalletIcon,
} from '../components/Icons';

interface StatusDetailsPageProps {
  onNavigate: (path: string) => void;
}

const PendingBlinkDot: React.FC = () => (
  <div className="absolute -left-8 top-1 w-7 h-7 flex items-center justify-center">
    <span className="w-4 h-4 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
  </div>
);

export const StatusDetailsPage: React.FC<StatusDetailsPageProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [driver, setDriver] = useState<DriverData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [phoneLookedUp, setPhoneLookedUp] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check query params first, then localStorage
    const params = new URLSearchParams(window.location.search);
    const queryPhone = params.get('phone');
    const storedPhone = getStoredDriverPhone();

    let targetPhone = queryPhone || storedPhone || '';
    let clean = targetPhone.replace(/\D/g, '');
    if (clean.startsWith('91') && clean.length > 10) {
      clean = clean.slice(2);
    } else if (clean.startsWith('0') && clean.length > 10) {
      clean = clean.slice(1);
    }
    clean = clean.slice(-10);

    if (clean && clean.length === 10) {
      setPhoneLookedUp(clean);
      fetchStatus(clean);
    } else {
      setLoading(false);
      setErrorMsg('No mobile number provided. Please enter your mobile number.');
    }
  }, []);

  const fetchStatus = async (phone: string) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await getDriverStatusByPhone(phone);
      if (res.success && res.found && res.driver) {
        setDriver(res.driver);
        setStoredDriverPhone(phone);
      } else {
        setDriver(null);
      }
    } catch {
      setErrorMsg('Unable to connect to server. Please try again.');
      setDriver(null);
    } finally {
      setLoading(false);
    }
  };

  const getVehicleLabel = (cat?: string) => {
    switch (cat) {
      case 'tata-ace':
        return 'Tata Ace (Chota Hathi)';
      case '3-wheeler':
        return '3 Wheeler Auto Cargo';
      case 'pickup-8ft':
        return 'Pickup 8ft / Bolero';
      case '2-wheeler':
        return '2 Wheeler Bike Express';
      case 'tata-407':
        return 'Tata 407 Heavy Truck';
      case 'ev-cargo':
        return 'Electric Cargo 3W';
      case 'car-commercial':
      case 'car':
        return 'Commercial Car / Cab';
      default:
        return cat || 'Commercial Vehicle';
    }
  };

  const getVehicleImage = (cat?: string) => {
    switch (cat) {
      case 'tata-ace':
        return '/vehicles/tata-ace.png';
      case '3-wheeler':
      case 'ev-cargo':
        return '/vehicles/3-wheeler.png';
      case 'pickup-8ft':
        return '/vehicles/pickup.png';
      case '2-wheeler':
        return '/vehicles/bike.png';
      case 'tata-407':
        return '/vehicles/truck.png';
      case 'car-commercial':
      case 'car':
        return '/vehicles/car.png';
      default:
        return '/vehicles/tata-ace.png';
    }
  };

  const hasIncompleteSteps =
    driver &&
    (driver.fee_paid !== 1 ||
      driver.subscription_paid !== 1 ||
      driver.documents_submitted !== 1);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A] font-sans flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1140px] w-full mx-auto px-6 h-18 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 cursor-pointer border-none bg-transparent"
            >
              <img src="/logo2.png" alt="Smart Driver" className="h-10 sm:h-11 md:h-12 w-auto object-contain" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1140px] w-full mx-auto px-5 sm:px-8 py-8 md:py-14">
        {/* Loading State */}
        {loading && (
          <div className="max-w-[620px] mx-auto  p-12 text-center animate-fade-in my-10">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0445DA] flex items-center justify-center mx-auto mb-5 border border-blue-100">
              <RefreshIcon size={28} className="animate-spin text-[#0445DA]" />
            </div>
            <h2 className="text-[2.2rem] font-black text-gray-950 mb-2">
              Looking up application...
            </h2>
            <p className="text-[1.45rem] text-gray-500 font-mono">
              Checking status for +91 {phoneLookedUp || '...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && errorMsg && !driver && (
          <div className="max-w-[620px] mx-auto  p-10 text-center animate-fade-in my-10">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertTriangleIcon size={30} />
            </div>
            <h2 className="text-[2.2rem] font-black text-gray-950 mb-2">Lookup Error</h2>
            <p className="text-[1.45rem] text-red-600 mb-6">{errorMsg}</p>
            <button
              type="button"
              onClick={() => onNavigate('/status')}
              className="px-8 py-4 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.55rem] font-bold rounded-2xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeftIcon size={18} />
              <span>Back to Search</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* DRIVER APPLICATION STATUS TIMELINE CARD */}
        {/* ========================================================= */}
        {!loading && driver && (
          <div className="max-w-[760px] mx-auto  p-6 sm:p-10 md:p-12 animate-fade-in">
            {/* Header Status Bar */}
            <div className="pb-6 border-b border-gray-200 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
                <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                  {driver.name || 'Driver Partner'}
                </h1>

                {/* Status Badge in same row as name */}
                <div>
                  {driver.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-[1.25rem]">
                      <CheckCircleFilledIcon size={16} className="text-emerald-700" />
                      <span>Approved &amp; Active Partner</span>
                    </span>
                  ) : driver.status === 'rejected' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-900 font-black text-[1.25rem]">
                      <XIcon size={16} className="text-red-700" />
                      <span>Action Required</span>
                    </span>
                  ) : hasIncompleteSteps ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-[1.25rem]">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                      <span>Application In Progress</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-[1.25rem]">
                      <ClockIcon size={16} className="text-amber-700 animate-pulse" />
                      <span>Under Verification Review</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[1.4rem] text-gray-500 font-medium mt-1">
                <span className="font-mono text-gray-800 font-bold">+91 {driver.phone}</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-2 text-gray-800 font-semibold">
                  <img
                    src={getVehicleImage(driver.vehicle_category)}
                    alt=""
                    className="w-10 h-7 sm:w-12 sm:h-8 object-contain inline-block shrink-0"
                  />
                  <span>{getVehicleLabel(driver.vehicle_category)}</span>
                </span>
              </div>
            </div>

            {/* Operations Remarks if any */}
            {driver.admin_notes && (
              <div className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-2xl text-[1.35rem] text-blue-950">
                <strong className="block font-extrabold text-blue-900 mb-1">Operations Remarks:</strong>
                <p className="text-blue-800 leading-relaxed">{driver.admin_notes}</p>
              </div>
            )}

            {/* Driver Wallet Balance Card */}
            {driver.subscription_paid === 1 ? (
              <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200/80 text-gray-700 flex items-center justify-center shrink-0">
                    <WalletIcon size={24} />
                  </div>
                  <div>
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Driver Wallet Balance
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[2.6rem] font-black text-gray-950 leading-none">
                        ₹2,000
                      </span>
                      <span className="text-[1.25rem] text-gray-500 font-medium">
                        Available Balance
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[1.2rem] font-bold border border-emerald-200/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Active
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200/80 text-gray-500 flex items-center justify-center shrink-0">
                    <WalletIcon size={24} />
                  </div>
                  <div>
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Driver Wallet Balance
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[2.6rem] font-black text-gray-950 leading-none">
                        ₹0
                      </span>
                      <span className="text-[1.2rem] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                        ₹2,000 Recharge Pending
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[1.2rem] text-gray-500">
                    Recharge ₹2,000 to activate wallet &amp; 0% commission
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Application Timeline */}
            <div className="space-y-4">
              <span className="text-[1.3rem] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Application Timeline:
              </span>

              <div className="relative pl-8 space-y-7 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {/* 1. Application Created */}
                <div className="relative flex items-start gap-4">
                  {/* Done: Green Tick */}
                  <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-[1.6rem] font-black text-gray-950">Application Created</h4>
                    <p className="text-[1.3rem] text-gray-500 mt-0.5">
                      Vehicle category ({getVehicleLabel(driver.vehicle_category)}) and driver profile registered.
                    </p>
                  </div>
                </div>

                {/* 2. Registration Fee Confirmed */}
                <div className="relative flex items-start gap-4">
                  {driver.fee_paid === 1 ? (
                    /* Done: Green Tick */
                    <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-xs">
                      ✓
                    </div>
                  ) : (
                    /* Not Done: Borderless Blinking Dot */
                    <PendingBlinkDot />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[1.6rem] font-black text-gray-950">
                        {driver.fee_paid === 1 ? 'Registration Fee Confirmed' : 'Registration Fee Pending'}
                      </h4>
                      {driver.fee_paid !== 1 && (
                        <span className="px-2 py-0.5 rounded text-[1.1rem] font-extrabold bg-amber-100 text-amber-900">
                          ₹3,000 Pending
                        </span>
                      )}
                    </div>
                    <p className="text-[1.3rem] text-gray-500 mt-0.5">
                      {driver.fee_paid === 1
                        ? '₹3,000 onboarding and driver background check payment verified.'
                        : 'One-time onboarding and driver kit fee pending payment.'}
                    </p>

                    {/* Resume Button if not done */}
                    {driver.fee_paid !== 1 && (
                      <button
                        type="button"
                        onClick={() => onNavigate('/register')}
                        className="mt-3 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.35rem] font-extrabold rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
                      >
                        <span>Pay ₹3,000 Fee Now</span>
                        <ArrowRightIcon size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. VIP 0% Commission Active */}
                <div className="relative flex items-start gap-4">
                  {driver.subscription_paid === 1 ? (
                    /* Done: Green Tick */
                    <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-xs">
                      ✓
                    </div>
                  ) : (
                    /* Not Done: Borderless Blinking Dot */
                    <PendingBlinkDot />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[1.6rem] font-black text-gray-950">
                        {driver.subscription_paid === 1
                          ? 'VIP 0% Commission Active'
                          : 'VIP 0% Commission Pending'}
                      </h4>
                      {driver.subscription_paid !== 1 && (
                        <span className="px-2 py-0.5 rounded text-[1.1rem] font-extrabold bg-amber-100 text-amber-900">
                          ₹2,000/mo Pending
                        </span>
                      )}
                    </div>
                    <p className="text-[1.3rem] text-gray-500 mt-0.5">
                      {driver.subscription_paid === 1
                        ? '₹2,000 recharge confirmed & credited to your driver wallet. Keep 100% of trip fares with 0% commission.'
                        : 'Recharge ₹2,000 to activate driver wallet and 0% commission on every trip.'}
                    </p>

                    {/* Resume Button if not done and fee is paid */}
                    {driver.subscription_paid !== 1 && driver.fee_paid === 1 && (
                      <button
                        type="button"
                        onClick={() => onNavigate('/register')}
                        className="mt-3 inline-flex items-center gap-1.5 px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-[1.35rem] font-extrabold rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
                      >
                        <span>Activate Subscription Now</span>
                        <ArrowRightIcon size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. KYC & RC Documents Received */}
                <div className="relative flex items-start gap-4">
                  {driver.documents_submitted === 1 ? (
                    /* Done: Green Tick */
                    <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-xs">
                      ✓
                    </div>
                  ) : (
                    /* Not Done: Borderless Blinking Dot */
                    <PendingBlinkDot />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[1.6rem] font-black text-gray-950">
                        {driver.documents_submitted === 1
                          ? 'KYC & RC Documents Received'
                          : 'KYC & RC Documents Pending'}
                      </h4>
                      {driver.documents_submitted !== 1 && (
                        <span className="px-2 py-0.5 rounded text-[1.1rem] font-extrabold bg-amber-100 text-amber-900">
                          Upload Pending
                        </span>
                      )}
                    </div>
                    <p className="text-[1.3rem] text-gray-500 mt-0.5">
                      {driver.documents_submitted === 1
                        ? 'Driving license, RC, and Aadhaar submitted for compliance audit.'
                        : 'Driving license, RC, and Aadhaar required for identity verification.'}
                    </p>

                    {/* Resume Button if not done and subscription is paid */}
                    {driver.documents_submitted !== 1 && driver.subscription_paid === 1 && (
                      <button
                        type="button"
                        onClick={() => onNavigate('/register')}
                        className="mt-3 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.35rem] font-extrabold rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
                      >
                        <span>Upload Documents Now</span>
                        <ArrowRightIcon size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 5. Operations Final Verification */}
                <div className="relative flex items-start gap-4">
                  {driver.status === 'approved' ? (
                    /* Done: Green Tick */
                    <div className="absolute -left-8 top-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-xs">
                      ✓
                    </div>
                  ) : (
                    /* In Progress: Borderless Blinking Dot */
                    <PendingBlinkDot />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[1.6rem] font-black text-gray-950">
                        {driver.status === 'approved'
                          ? 'Account Activated & Approved'
                          : 'Operations Final Verification'}
                      </h4>
                      {driver.status !== 'approved' && (
                        <span className="px-2 py-0.5 rounded text-[1.1rem] font-extrabold bg-amber-100 text-amber-900">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-[1.3rem] text-gray-500 mt-0.5">
                      {driver.status === 'approved'
                        ? 'Your driver partner profile is active. You can now accept local trip requests.'
                        : 'Estimated verification completion within 24 to 48 hours.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[1.3rem] text-gray-400">
                  Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Master Resume Button if application is still in progress */}
                  {hasIncompleteSteps && (
                    <button
                      type="button"
                      onClick={() => onNavigate('/register')}
                      className="flex-1 sm:flex-initial px-6 py-3 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.4rem] font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Resume Application</span>
                      <ArrowRightIcon size={18} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-[1.35rem] font-bold cursor-pointer transition-colors text-center"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CASE 3: NO RECORD FOUND */}
        {/* ========================================================= */}
        {!loading && !driver && !errorMsg && (
          <div className=" p-8 sm:p-12 text-center max-w-[620px] mx-auto animate-fade-in my-10">
            <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-5 border border-gray-200">
              <SearchIcon size={32} />
            </div>

            <h2 className="text-[2.4rem] font-black text-gray-950 tracking-tight mb-2">
              No Application Found
            </h2>
            <p className="text-[1.45rem] text-gray-500 max-w-sm mx-auto mb-8">
              No driver partner application is registered for{' '}
              <strong className="text-gray-900 font-mono">+91 {phoneLookedUp}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate('/register')}
                className="px-8 py-4 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.55rem] font-extrabold rounded-2xl transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply to Drive Now</span>
                <ArrowRightIcon size={20} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/status')}
                className="px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 text-[1.55rem] font-bold transition-colors cursor-pointer text-center"
              >
                <span>Try Another Number</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-gray-400 text-[1.25rem]">
        Smart Driver Partner Network © 2026. All rights reserved.
      </footer>
    </div>
  );
};