import React, { useState, useEffect } from 'react';
import {
  getDriverProfile,
  loginDriver,
  payApplicationFee,
  uploadDriverDocument,
  setDriverToken,
  removeDriverToken,
  getDriverToken,
  getDocumentUrl,
  type DriverData,
  type DriverDocument,
} from '../api/client';
import {
  CheckCircleFilledIcon,
  ShieldCheckIcon,
  FileCheckIcon,
  IndianRupeeIcon,
  CreditCardIcon,
  ZapIcon,
  IdCardIcon,
  ClockIcon,
  HashIcon,
  CalendarIcon,
  QrCodeIcon,
  AlertTriangleIcon,
  InfoIcon,
  TruckIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  SearchIcon,
  RefreshIcon,
  CameraIcon,
  ShieldIcon,
  PackageIcon,
  ShirtIcon,
  BadgeIcon,
  SmartphoneIcon,
  TagIcon,
  RocketIcon,
  GiftIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ExternalLinkIcon,
} from '../components/Icons';

interface StatusPageProps {
  onNavigate: (path: string) => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Profile data
  const [driver, setDriver] = useState<DriverData | null>(null);
  const [documents, setDocuments] = useState<DriverDocument[]>([]);

  // Active step tab (1, 2, 3, 4) to view details
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // Fee payment state
  const [txIdInput, setTxIdInput] = useState('');
  const [payingFee, setPayingFee] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Document upload state
  const [uploadingDocType, setUploadingDocType] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const token = getDriverToken();
    if (token) {
      fetchProfile();
    } else {
      setIsLoggedIn(false);
      setDriver(null);

      // Pre-fill last registered/checked mobile number if available
      const savedPhone = localStorage.getItem('smart_driver_last_phone');
      if (savedPhone) {
        setLoginPhone(savedPhone);
      }
      const notice = localStorage.getItem('smart_driver_redirect_notice');
      if (notice) {
        setErrorMsg(notice);
        localStorage.removeItem('smart_driver_redirect_notice');
      }
    }
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await getDriverProfile();
      if (res.success && res.driver) {
        setDriver(res.driver);
        setDocuments(res.documents || []);
        setIsLoggedIn(true);

        // Auto-select the most relevant step tab on initial load
        if (res.driver.status === 'approved') {
          setActiveStepTab(4);
        } else if (res.driver.fee_paid === 0) {
          setActiveStepTab(3);
        } else if (res.driver.status === 'under_review' || res.driver.status === 'action_required') {
          setActiveStepTab(2);
        } else {
          setActiveStepTab(1);
        }
      } else {
        setIsLoggedIn(false);
        removeDriverToken();
      }
    } catch {
      setErrorMsg('Failed to fetch application details');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await loginDriver(loginPhone, loginPassword);
      if (res.success && res.token) {
        setDriverToken(res.token);
        setIsLoggedIn(true);
        await fetchProfile();
      } else {
        setErrorMsg(res.message || 'Login failed. Please check phone and password.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txIdInput.trim()) {
      setErrorMsg('Please enter transaction reference or UTR ID');
      return;
    }
    try {
      setPayingFee(true);
      setErrorMsg('');
      const res = await payApplicationFee(txIdInput.trim());
      if (res.success) {
        setSuccessMsg('Payment submitted successfully! Your application is in priority verification queue.');
        setTxIdInput('');
        await fetchProfile();
      } else {
        setErrorMsg(res.message || 'Failed to submit payment details.');
      }
    } catch {
      setErrorMsg('Network error while recording payment.');
    } finally {
      setPayingFee(false);
    }
  };

  const handleDocUpload = async (docType: string, file: File) => {
    try {
      setUploadingDocType(docType);
      setErrorMsg('');
      const res = await uploadDriverDocument(docType, file);
      if (res.success) {
        setSuccessMsg(`${docType.replace(/_/g, ' ').toUpperCase()} uploaded successfully!`);
        await fetchProfile();
      } else {
        setErrorMsg(res.message || 'Failed to upload document.');
      }
    } catch {
      setErrorMsg('Network error during file upload.');
    } finally {
      setUploadingDocType(null);
    }
  };

  const handleLogout = () => {
    removeDriverToken();
    setIsLoggedIn(false);
    setDriver(null);
    setDocuments([]);
  };

  const copyUpiId = () => {
    navigator.clipboard?.writeText('pay.smartdriver@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-green-100 text-green-800 rounded-full text-[1.3rem] font-bold">
            <ZapIcon size={16} className="text-green-700" /> Approved &amp; Active
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-100 text-blue-800 rounded-full text-[1.3rem] font-bold">
            <RefreshIcon size={15} className="text-blue-600" /> Under Verification
          </span>
        );
      case 'action_required':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[1.3rem] font-bold">
            <AlertTriangleIcon size={15} className="text-amber-700" /> Action Required
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-red-100 text-red-800 rounded-full text-[1.3rem] font-bold">
            <AlertTriangleIcon size={15} className="text-red-700" /> Application Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-100 text-purple-800 rounded-full text-[1.3rem] font-bold">
            <FileCheckIcon size={15} className="text-purple-700" /> Application Submitted
          </span>
        );
    }
  };

  // Step definition details for stepper with dedicated corresponding step icons
  const stepsList = [
    {
      step: 1,
      title: 'Submitted',
      tag: 'Completed',
      isCompleted: true,
      desc: 'Application received & profile created',
      icon: FileCheckIcon,
    },
    {
      step: 2,
      title: 'Verification',
      tag: driver?.status === 'approved' ? 'Verified' : driver?.status === 'action_required' ? 'Action Req' : 'In Review',
      isCompleted: driver?.status === 'approved',
      isActive: driver?.status === 'under_review' || driver?.status === 'submitted' || driver?.status === 'action_required',
      desc: 'DL, RC & background compliance check',
      icon: ShieldCheckIcon,
    },
    {
      step: 3,
      title: 'Fee Payment',
      tag: driver?.fee_paid === 1 ? 'Fee Paid' : 'Fee Pending',
      isCompleted: driver?.fee_paid === 1,
      isActive: driver?.fee_paid === 0,
      desc: driver?.fee_paid === 1 ? '₹99 Processing Fee Paid' : '₹99 Verification Fee Required',
      icon: IndianRupeeIcon,
    },
    {
      step: 4,
      title: 'Activation',
      tag: driver?.status === 'approved' ? 'Activated' : 'Pending',
      isCompleted: driver?.status === 'approved',
      isActive: driver?.status === 'approved',
      desc: driver?.status === 'approved' ? 'Account Active • Ready to Earn' : 'Final Activation & Kit Handover',
      icon: ZapIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1a1a1a] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="site-container h-[68px] flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Smart Driver"
              className="h-[36px] w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <button
                type="button"
                onClick={() => onNavigate('/register')}
                className="px-4 py-2 rounded-xl bg-[#0445DA] text-white text-[1.35rem] font-bold hover:bg-[#0336aa] transition-colors cursor-pointer"
              >
                Register as Driver
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-[1.35rem] font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeftIcon size={16} /> Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container with Rich Geometric Background & Patterns */}
      <main className="flex-1 py-8 md:py-14 px-4 relative overflow-hidden bg-gradient-to-br from-[#061438] via-[#092055] to-[#040e29]">
        {/* Ambient Glowing Orbs / Gradient Meshes */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/25 blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-500/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-[60%] left-[-5%] w-[350px] h-[350px] rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

        {/* Crisp Geometric Tech Grid & Dot Matrix Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.18) 1.2px, transparent 1.2px),
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px, 144px 144px, 144px 144px',
          }}
        />

        {/* Decorative Floating Geometric Shapes & Route Line Accents */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-left decorative concentric rings */}
          <circle cx="8%" cy="12%" r="80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="8%" cy="12%" r="140" fill="none" stroke="rgba(4,69,218,0.25)" strokeWidth="1.5" />
          <circle cx="8%" cy="12%" r="200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="6 8" />

          {/* Bottom-right radar rings */}
          <circle cx="92%" cy="85%" r="100" fill="none" stroke="rgba(242,201,76,0.15)" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="92%" cy="85%" r="180" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="92%" cy="85%" r="260" fill="none" stroke="rgba(14,165,233,0.18)" strokeWidth="1" strokeDasharray="8 6" />

          {/* Floating Geometric Hexagons */}
          <polygon points="120,280 150,230 180,280 180,340 150,390 120,340" fill="rgba(4,69,218,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <polygon points="1100,180 1140,120 1180,180 1180,260 1140,320 1100,260" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.25)" strokeWidth="1.5" />

          {/* Logistics Route Trail Line with Waypoint Nodes */}
          <path
            d="M -50 480 Q 200 420 280 560 T 500 620"
            fill="none"
            stroke="rgba(242,201,76,0.25)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle cx="280" cy="560" r="5" fill="#f2c94c" opacity="0.6" />
          <circle cx="280" cy="560" r="10" fill="none" stroke="#f2c94c" strokeWidth="1.5" opacity="0.3" />

          <path
            d="M 900 680 Q 1050 780 1150 840 T 1280 950"
            fill="none"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <circle cx="1150" cy="840" r="4" fill="#3b82f6" opacity="0.7" />
        </svg>

        {/* Floating Subtle Geometric Cards / Polyhedral Accents */}
        <div className="hidden lg:block absolute top-[14%] left-[3%] w-24 h-24 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xs rotate-12 pointer-events-none shadow-2xl" />
        <div className="hidden lg:block absolute bottom-[18%] left-[4%] w-32 h-32 rounded-3xl border border-blue-400/15 bg-blue-500/[0.04] backdrop-blur-xs -rotate-6 pointer-events-none" />
        <div className="hidden lg:block absolute top-[22%] right-[3%] w-28 h-28 rounded-2xl border border-amber-400/15 bg-amber-400/[0.03] backdrop-blur-xs rotate-45 pointer-events-none" />
        <div className="hidden lg:block absolute bottom-[25%] right-[4%] w-20 h-20 rounded-xl border border-cyan-400/20 bg-cyan-500/[0.04] backdrop-blur-xs -rotate-12 pointer-events-none" />

        {/* Central Card with Elevated 3D Shadow & Border Glow */}
        <div className="max-w-[880px] mx-auto bg-white rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)] border border-gray-100 overflow-hidden relative z-10">
          {/* Header Banner */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#031b5c] to-[#0445DA] text-white">
            <span className="inline-block bg-[#f2c94c] text-[#031b5c] text-[1.15rem] font-extrabold uppercase px-3 py-0.5 rounded-full mb-2 tracking-wider">
              PARTNER PORTAL
            </span>
            <h1 className="text-[2.4rem] md:text-[3rem] font-extrabold leading-tight m-0 text-white">
              {isLoggedIn ? 'Driver Application Status' : 'Driver Partner Sign In'}
            </h1>
            <p className="text-[1.4rem] md:text-[1.55rem] text-white/85 mt-2 mb-0">
              {isLoggedIn ? `Logged in as ${driver?.name || 'Partner'}` : 'Check your application verification status & manage documents'}
            </p>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mx-6 md:mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-[1.35rem] flex items-center gap-3">
              <AlertTriangleIcon size={20} className="text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mx-6 md:mx-8 mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-[1.35rem] flex items-center gap-3">
              <CheckCircleFilledIcon size={20} className="text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 md:p-8">
            {!isLoggedIn ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="max-w-[420px] mx-auto py-6 space-y-5">
                <div>
                  <label className="block text-[1.35rem] font-semibold text-gray-700 mb-1.5">
                    Registered Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.45rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                  />
                </div>

                <div>
                  <label className="block text-[1.35rem] font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.45rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.55rem] font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? 'Logging in...' : 'Sign In & Check Status'}
                </button>

                <div className="text-center pt-4 border-t border-gray-200 mt-6">
                  <span className="text-[1.35rem] text-gray-600">Not registered yet? </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/register')}
                    className="inline-flex items-center gap-1 text-[1.35rem] text-[#0445DA] font-bold hover:underline cursor-pointer"
                  >
                    Register as Driver Partner <ArrowRightIcon size={16} />
                  </button>
                </div>
              </form>
            ) : (
              /* Status Dashboard */
              <div className="space-y-6">
                {/* Profile Card Header */}
                <div className="p-5 bg-[#f8faff] border border-blue-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-[2rem] font-extrabold text-gray-900 m-0">{driver?.name}</h2>
                      {driver && getStatusBadge(driver.status)}
                    </div>
                    <div className="text-[1.35rem] text-gray-600 mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <PhoneIcon size={16} className="text-gray-500" />
                        {driver?.phone}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPinIcon size={16} className="text-gray-500" />
                        {driver?.city}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <TruckIcon size={16} className="text-gray-500" />
                        {driver?.vehicle_category.toUpperCase()} ({driver?.vehicle_number})
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-[1.3rem] text-gray-700 font-semibold hover:bg-gray-100 self-start sm:self-auto cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                {/* Progress Stepper - Clickable Tabs with corresponding step icons */}
                <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[1.65rem] font-bold text-gray-900 m-0">Application Progress</h3>
                    <span className="inline-flex items-center gap-1.5 text-[1.25rem] text-gray-500 font-medium">
                      <InfoIcon size={16} className="text-[#0445DA]" /> Click any step to inspect details
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stepsList.map((s) => {
                      const isSelected = activeStepTab === s.step;
                      const StepIcon = s.icon;
                      return (
                        <button
                          key={s.step}
                          type="button"
                          onClick={() => setActiveStepTab(s.step)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue-50/90 border-[#0445DA] ring-2 ring-[#0445DA]/30 shadow-md transform -translate-y-0.5'
                              : s.isCompleted
                              ? 'bg-green-50/60 border-green-200 hover:border-green-400 hover:bg-green-50'
                              : s.isActive
                              ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                              : 'bg-gray-50/80 border-gray-200 hover:border-gray-300 text-gray-400'
                          }`}
                        >
                          {/* Active Tab Top Bar Indicator */}
                          {isSelected && (
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0445DA]" />
                          )}

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`text-[1.1rem] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                                  isSelected
                                    ? 'bg-[#0445DA] text-white'
                                    : s.isCompleted
                                    ? 'bg-green-100 text-green-800'
                                    : s.isActive
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                Step {s.step}
                              </span>

                              {/* Corresponding Step Icon */}
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-[#0445DA] text-white shadow-xs'
                                    : s.isCompleted
                                    ? 'bg-green-100 text-green-700'
                                    : s.isActive
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-200/70 text-gray-400'
                                }`}
                              >
                                <StepIcon size={17} />
                              </div>
                            </div>

                            <div
                              className={`text-[1.45rem] font-bold ${
                                isSelected ? 'text-[#0445DA]' : 'text-gray-900'
                              }`}
                            >
                              {s.title}
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-gray-200/50">
                            {/* Status tag with corresponding indicator */}
                            <div className="flex items-center justify-between">
                              {s.isCompleted ? (
                                <span className="inline-flex items-center gap-1 text-[1.15rem] font-bold text-green-700">
                                  <CheckCircleFilledIcon size={13} className="text-green-600" />
                                  <span>Completed</span>
                                </span>
                              ) : s.isActive ? (
                                <span className="inline-flex items-center gap-1 text-[1.15rem] font-bold text-blue-700">
                                  <RefreshIcon size={13} className="text-blue-600" />
                                  <span>In Review</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[1.15rem] font-medium text-gray-400">
                                  <ClockIcon size={13} />
                                  <span>Pending</span>
                                </span>
                              )}

                              <span
                                className={`text-[1.1rem] font-bold ${
                                  isSelected ? 'text-[#0445DA]' : 'text-gray-400'
                                }`}
                              >
                                {isSelected ? 'Viewing' : 'View →'}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP DETAILS CONTAINER (Drawn based on activeStepTab) */}
                <div className="bg-white border-2 border-[#0445DA]/20 rounded-3xl p-6 md:p-8 shadow-sm">
                  {/* Step Detail Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0445DA] text-white text-[1.15rem] font-extrabold uppercase tracking-wide">
                          Step {activeStepTab} Details
                        </span>
                        <h3 className="text-[2rem] font-black text-gray-900 m-0">
                          {activeStepTab === 1 && 'Application Submission & Profile'}
                          {activeStepTab === 2 && 'Document Verification & Compliance'}
                          {activeStepTab === 3 && 'Verification & Processing Fee'}
                          {activeStepTab === 4 && 'Driver Activation & Partner Kit'}
                        </h3>
                      </div>
                      <p className="text-[1.35rem] text-gray-600 mt-1 mb-0">
                        {activeStepTab === 1 && 'Review registered personal, vehicle, and contact information'}
                        {activeStepTab === 2 && 'Check status of uploaded documents or upload clearer copies'}
                        {activeStepTab === 3 && 'Pay onboarding processing fee (₹99) to expedite verification'}
                        {activeStepTab === 4 && 'Account activation status, app setup, and partner kit'}
                      </p>
                    </div>

                    {/* Quick navigation pill */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        disabled={activeStepTab === 1}
                        onClick={() => setActiveStepTab((prev) => Math.max(1, prev - 1))}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-[1.2rem] font-bold hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowLeftIcon size={14} /> Prev Step
                      </button>
                      <button
                        type="button"
                        disabled={activeStepTab === 4}
                        onClick={() => setActiveStepTab((prev) => Math.min(4, prev + 1))}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-[1.2rem] font-bold hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      >
                        Next Step <ArrowRightIcon size={14} />
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: SUBMISSION DETAILS */}
                  {activeStepTab === 1 && (
                    <div className="mt-6 space-y-6">
                      <div className="p-5 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                            <FileCheckIcon size={26} />
                          </div>
                          <div>
                            <div className="text-[1.5rem] font-extrabold text-green-950">
                              Application Successfully Submitted
                            </div>
                            <div className="text-[1.3rem] text-green-800 flex items-center gap-1 mt-0.5">
                              <HashIcon size={15} />
                              <span>Application Ref: </span>
                              <strong className="font-mono">#SD-DRV-{driver?.id?.toString().padStart(5, '0')}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[1.25rem] text-green-800 bg-white/70 px-3 py-1 rounded-xl border border-green-200/60 font-medium">
                          <CalendarIcon size={15} />
                          <span>Submitted: {driver?.created_at ? new Date(driver.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}</span>
                        </div>
                      </div>

                      {/* Information Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Info Box */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                          <h4 className="text-[1.5rem] font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <UserIcon size={18} className="text-[#0445DA]" /> Personal Details
                          </h4>
                          <div className="space-y-2 text-[1.35rem]">
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">Full Name</span>
                              <span className="font-semibold text-gray-900">{driver?.name}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">Phone Number</span>
                              <span className="font-semibold text-gray-900">{driver?.phone}</span>
                            </div>
                            {driver?.email && (
                              <div className="flex justify-between py-1 border-b border-gray-200/60">
                                <span className="text-gray-500">Email Address</span>
                                <span className="font-semibold text-gray-900">{driver.email}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">City of Operation</span>
                              <span className="font-semibold text-gray-900">{driver?.city}</span>
                            </div>
                            {driver?.dob && (
                              <div className="flex justify-between py-1 border-b border-gray-200/60">
                                <span className="text-gray-500">Date of Birth</span>
                                <span className="font-semibold text-gray-900">{driver.dob}</span>
                              </div>
                            )}
                            {driver?.address && (
                              <div className="flex justify-between py-1">
                                <span className="text-gray-500">Address</span>
                                <span className="font-semibold text-gray-900 text-right max-w-[200px] truncate">{driver.address}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Vehicle Info Box */}
                        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                          <h4 className="text-[1.5rem] font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <TruckIcon size={18} className="text-[#0445DA]" /> Vehicle &amp; License Details
                          </h4>
                          <div className="space-y-2 text-[1.35rem]">
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">Vehicle Category</span>
                              <span className="font-semibold text-gray-900 uppercase">{driver?.vehicle_category}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">Vehicle Number</span>
                              <span className="font-semibold font-mono text-[#0445DA]">{driver?.vehicle_number}</span>
                            </div>
                            {driver?.vehicle_model && (
                              <div className="flex justify-between py-1 border-b border-gray-200/60">
                                <span className="text-gray-500">Make / Model</span>
                                <span className="font-semibold text-gray-900">{driver.vehicle_model}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-500">Driving License No.</span>
                              <span className="font-semibold font-mono text-gray-900">{driver?.dl_number}</span>
                            </div>
                            {driver?.dl_expiry && (
                              <div className="flex justify-between py-1 border-b border-gray-200/60">
                                <span className="text-gray-500">DL Expiry</span>
                                <span className="font-semibold text-gray-900">{driver.dl_expiry}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-1">
                              <span className="text-gray-500">Application Status</span>
                              <span className="font-semibold text-purple-700">Registered</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next step prompt */}
                      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between">
                        <div className="text-[1.35rem] text-blue-950 flex items-center gap-2">
                          <InfoIcon size={18} className="text-[#0445DA] shrink-0" />
                          <span><strong>Next Stage:</strong> Verify your documents in Step 2 to ensure speedy approval.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveStepTab(2)}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-[#0445DA] text-white rounded-xl text-[1.3rem] font-bold hover:bg-[#0336aa] cursor-pointer"
                        >
                          Check Step 2 <ArrowRightIcon size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: DOCUMENT VERIFICATION DETAILS */}
                  {activeStepTab === 2 && (
                    <div className="mt-6 space-y-6">
                      {/* Verification Status Banner with dedicated corresponding icon */}
                      {driver?.status === 'approved' ? (
                        <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-[1.35rem] text-green-900 flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                            <ShieldCheckIcon size={26} />
                          </div>
                          <div>
                            <strong className="text-[1.5rem] block text-green-950">All Documents Verified &amp; Compliant</strong>
                            <span>Your driving license, vehicle RC, Aadhaar, and insurance have been validated and approved by our compliance team.</span>
                          </div>
                        </div>
                      ) : driver?.status === 'action_required' ? (
                        <div className="p-5 bg-amber-50 border border-amber-300 rounded-2xl text-[1.35rem] text-amber-900 flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                            <AlertTriangleIcon size={24} />
                          </div>
                          <div>
                            <strong className="block text-[1.5rem] text-amber-950">Action Required on Uploaded Documents:</strong>
                            <p className="mt-1 mb-0 leading-normal">
                              {driver.admin_notes || 'Some documents were unclear or mismatched. Please re-upload clearer copies below.'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-[1.35rem] text-blue-900 flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <SearchIcon size={24} />
                          </div>
                          <div>
                            <strong className="text-[1.5rem] block text-blue-950">Verification Underway by Compliance Team</strong>
                            <span>Our compliance officers are verifying your Driving License, RC, and Identity records. (Typically completed within 2 to 4 hours).</span>
                          </div>
                        </div>
                      )}

                      {/* Admin Feedback (if any) */}
                      {driver?.admin_notes && driver.status !== 'action_required' && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-[1.35rem] text-gray-800">
                          <strong>Admin Verification Remarks:</strong> {driver.admin_notes}
                        </div>
                      )}

                      {/* Documents Upload & Replace List with corresponding document icons */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-[1.6rem] font-bold text-gray-900 m-0">
                            Uploaded Documents Checklist ({documents.length} / 7 Uploaded)
                          </h4>
                          <span className="text-[1.25rem] text-gray-500 font-medium">
                            {documents.length >= 3 ? 'Requirements Met' : 'Pending Uploads'}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {[
                            { key: 'dl_front', label: 'Driving License (Front Side)', req: true, icon: IdCardIcon },
                            { key: 'dl_back', label: 'Driving License (Back Side)', req: false, icon: IdCardIcon },
                            { key: 'rc_front', label: 'Vehicle RC (Front Page)', req: true, icon: TruckIcon },
                            { key: 'rc_back', label: 'Vehicle RC (Back Page)', req: false, icon: TruckIcon },
                            { key: 'aadhaar_card', label: 'Aadhaar Card / ID Proof', req: true, icon: BadgeIcon },
                            { key: 'insurance', label: 'Vehicle Insurance Certificate', req: false, icon: ShieldIcon },
                            { key: 'driver_photo', label: 'Driver Passport Photo / Selfie', req: false, icon: CameraIcon },
                          ].map((doc) => {
                            const uploaded = documents.find((d) => d.doc_type === doc.key);
                            const DocIcon = doc.icon;
                            return (
                              <div
                                key={doc.key}
                                className={`flex items-center justify-between p-4 rounded-2xl border text-[1.35rem] transition-all ${
                                  uploaded
                                    ? 'bg-[#fafcff] border-blue-200/80 shadow-2xs'
                                    : 'bg-gray-50/70 border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-3.5">
                                  {/* Corresponding Document Icon Badge */}
                                  <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                      uploaded
                                        ? 'bg-blue-50 text-[#0445DA] border border-blue-100'
                                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                                    }`}
                                  >
                                    <DocIcon size={20} />
                                  </div>

                                  <div>
                                    <div className="font-bold text-gray-900 flex items-center gap-2">
                                      <span>{doc.label}</span>
                                      {doc.req && <span className="text-red-500 font-black">*</span>}
                                      {uploaded ? (
                                        <span className="inline-flex items-center gap-1 text-[1.15rem] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full ml-1">
                                          <CheckCircleFilledIcon size={12} className="text-green-600" /> Uploaded
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-[1.15rem] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full ml-1">
                                          <ClockIcon size={12} className="text-amber-600" /> Pending
                                        </span>
                                      )}
                                    </div>

                                    {uploaded ? (
                                      <div className="text-[1.2rem] text-gray-500 flex items-center gap-2 mt-0.5">
                                        <span className="truncate max-w-[200px]">{uploaded.original_name}</span>
                                        <span>•</span>
                                        <a
                                          href={getDocumentUrl(uploaded.file_path)}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1 text-[#0445DA] font-bold hover:underline"
                                        >
                                          View Document <ExternalLinkIcon size={13} />
                                        </a>
                                      </div>
                                    ) : (
                                      <div className="text-[1.2rem] text-amber-600 font-medium">
                                        {doc.req ? 'Mandatory for onboarding approval' : 'Optional document'}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <label className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-[1.25rem] font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors shadow-2xs">
                                  {uploadingDocType === doc.key ? 'Uploading...' : uploaded ? 'Replace' : 'Upload File'}
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleDocUpload(doc.key, file);
                                    }}
                                  />
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Document Guidelines Tip */}
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-[1.25rem] text-gray-600 flex items-start gap-2">
                        <InfoIcon size={18} className="text-[#0445DA] shrink-0 mt-0.5" />
                        <div>
                          <strong>Upload Guidelines:</strong> Please ensure documents are well-lit, all 4 corners are visible, text and vehicle numbers are readable, and file sizes are below 10MB (JPG, PNG, or PDF).
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FEE & INSPECTION DETAILS */}
                  {activeStepTab === 3 && (
                    <div className="mt-6 space-y-6">
                      {/* Fee Status Card with IndianRupeeIcon & CreditCardIcon */}
                      {driver?.fee_paid === 1 ? (
                        <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                              <div className="w-13 h-13 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                                <IndianRupeeIcon size={28} />
                              </div>
                              <div>
                                <span className="inline-flex items-center gap-1.5 text-[1.15rem] font-extrabold text-green-800 uppercase tracking-wider bg-green-100 px-3 py-0.5 rounded-full">
                                  <CheckCircleFilledIcon size={13} className="text-green-700" /> VERIFIED &amp; PAID
                                </span>
                                <h4 className="text-[1.85rem] font-extrabold text-green-950 mt-1.5 mb-0">
                                  Application Processing Fee Paid (₹{driver.fee_amount || 99})
                                </h4>
                                <p className="text-[1.3rem] text-green-800 mt-1 mb-0 flex items-center gap-1">
                                  <HashIcon size={14} />
                                  <span>Transaction Reference / UTR:</span>
                                  <strong className="font-mono">{driver.fee_tx_id || 'ONLINE-VERIFIED'}</strong>
                                </p>
                              </div>
                            </div>

                            <div className="text-[2.2rem] font-black text-green-700 inline-flex items-center gap-1.5 bg-white/70 px-4 py-2 rounded-2xl border border-green-200">
                              <span>₹99</span>
                              <CheckCircleFilledIcon size={22} className="text-green-600" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                                <CreditCardIcon size={26} />
                              </div>
                              <div>
                                <span className="inline-flex items-center gap-1.5 text-[1.15rem] font-bold text-orange-700 uppercase tracking-wider bg-orange-100 px-3 py-0.5 rounded-full">
                                  <ClockIcon size={13} /> PAYMENT PENDING
                                </span>
                                <h4 className="text-[1.85rem] font-extrabold text-gray-900 mt-1.5 mb-0">
                                  Pay Application Processing Fee (₹99)
                                </h4>
                                <p className="text-[1.3rem] text-gray-700 mt-0.5 mb-0">
                                  Complete your one-time ₹99 background verification fee to speed up activation.
                                </p>
                              </div>
                            </div>
                            <div className="text-[2.6rem] font-black text-orange-600">₹99</div>
                          </div>

                          <div className="mt-4 p-4 bg-white rounded-xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-[1.3rem] text-gray-700 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0445DA] flex items-center justify-center shrink-0">
                                <QrCodeIcon size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>UPI ID:</span>
                                  <strong className="font-mono text-[#0445DA]">pay.smartdriver@upi</strong>
                                  <button
                                    type="button"
                                    onClick={copyUpiId}
                                    className="text-[1.15rem] px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-semibold cursor-pointer"
                                  >
                                    {copiedUpi ? 'Copied!' : 'Copy'}
                                  </button>
                                </div>
                                <div className="text-[1.15rem] text-gray-500 mt-0.5">
                                  Works with Google Pay, PhonePe, Paytm, or BHIM
                                </div>
                              </div>
                            </div>

                            <a
                              href="https://rzp.io/l/smartdriver-verify"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0445DA] text-white rounded-xl text-[1.3rem] font-bold hover:bg-[#0336aa] transition-colors"
                            >
                              Pay ₹99 Online <ExternalLinkIcon size={14} />
                            </a>
                          </div>

                          <form onSubmit={handlePayFee} className="mt-4 flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="Enter 12-digit UPI / UTR Transaction ID"
                                value={txIdInput}
                                onChange={(e) => setTxIdInput(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-[1.35rem] focus:outline-none focus:border-[#0445DA] bg-white font-mono"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={payingFee}
                              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-[1.35rem] font-bold cursor-pointer disabled:opacity-50"
                            >
                              {payingFee ? 'Submitting...' : 'Verify Payment'}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: ACTIVATION & ONBOARDING DETAILS */}
                  {activeStepTab === 4 && (
                    <div className="mt-6 space-y-6">
                      {/* Active / Inactive Status with ZapIcon and CheckCircleFilledIcon */}
                      {driver?.status === 'approved' ? (
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 text-[#f2c94c] flex items-center justify-center shrink-0">
                              <ZapIcon size={26} />
                            </div>
                            <div>
                              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[1.2rem] font-extrabold uppercase px-3 py-1 rounded-full">
                                <CheckCircleFilledIcon size={13} className="text-white" /> PROFILE ACTIVE
                              </span>
                              <h4 className="text-[2.2rem] font-black mt-1 mb-0 text-white flex items-center gap-2">
                                Congratulations! Your Driver Profile is Active!
                              </h4>
                            </div>
                          </div>

                          <p className="text-[1.4rem] text-white/90 mt-3 mb-0">
                            You are officially ready to accept deliveries, ride requests, and earn daily payouts.
                          </p>
                          <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap gap-4 text-[1.3rem]">
                            <span>Partner ID: <strong className="font-mono">SD-{driver.id?.toString().padStart(6, '0')}</strong></span>
                            <span>Vehicle: <strong className="font-mono">{driver.vehicle_number}</strong></span>
                            <span>City: <strong>{driver.city}</strong></span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                            <ClockIcon size={24} />
                          </div>
                          <div>
                            <span className="bg-amber-200 text-amber-900 text-[1.15rem] font-extrabold uppercase px-3 py-0.5 rounded-full">
                              ACTIVATION PENDING
                            </span>
                            <h4 className="text-[1.8rem] font-extrabold mt-1.5 mb-1">
                              Final Approval in Progress
                            </h4>
                            <p className="text-[1.35rem] text-amber-800 mb-0">
                              Once your document verification (Step 2) and fee processing (Step 3) are completed, your account will be activated within 2 hours.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Partner Kit & Perks */}
                      <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                        <h4 className="text-[1.6rem] font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <PackageIcon size={22} className="text-[#0445DA]" /> Smart Driver Welcome Kit
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col items-center">
                            <ShirtIcon size={32} className="text-[#0445DA] mb-2" />
                            <div className="text-[1.3rem] font-bold text-gray-900">2x T-Shirts</div>
                            <div className="text-[1.15rem] text-gray-500">Official Uniform</div>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col items-center">
                            <BadgeIcon size={32} className="text-[#0445DA] mb-2" />
                            <div className="text-[1.3rem] font-bold text-gray-900">Partner ID</div>
                            <div className="text-[1.15rem] text-gray-500">Badge &amp; Lanyard</div>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col items-center">
                            <SmartphoneIcon size={32} className="text-[#0445DA] mb-2" />
                            <div className="text-[1.3rem] font-bold text-gray-900">Phone Mount</div>
                            <div className="text-[1.15rem] text-gray-500">Vehicle Holder</div>
                          </div>
                          <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col items-center">
                            <TagIcon size={32} className="text-[#0445DA] mb-2" />
                            <div className="text-[1.3rem] font-bold text-gray-900">Vehicle Decal</div>
                            <div className="text-[1.15rem] text-gray-500">Reflective Decal</div>
                          </div>
                        </div>
                        <div className="text-[1.25rem] text-gray-600 mt-3 text-center">
                          Collect your kit at our local city onboarding hub upon showing your active Driver ID.
                        </div>
                      </div>

                      {/* Next Steps to Start Earning */}
                      <div className="p-5 rounded-2xl bg-[#031b5c] text-white">
                        <h4 className="text-[1.65rem] font-bold text-white mb-2 flex items-center gap-2">
                          <RocketIcon size={22} className="text-[#f2c94c]" /> How to Start Earning
                        </h4>
                        <div className="space-y-2 text-[1.35rem] text-white/90">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-[#f2c94c]">1.</span>
                            <span>Download the <strong>Smart Driver Partner App</strong> on Android or iOS.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-[#f2c94c]">2.</span>
                            <span>Log in with your registered phone number <strong>{driver?.phone}</strong> and password.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-[#f2c94c]">3.</span>
                            <span>Toggle the status switch to <strong>Online</strong> to start receiving delivery bookings nearby.</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-[#f2c94c]">4.</span>
                            <span>Earn daily payouts directly transferred to your bank account or UPI ID.</span>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-white/10 rounded-xl text-[1.25rem] text-[#f2c94c] font-semibold flex items-center gap-2">
                          <GiftIcon size={18} className="text-[#f2c94c] shrink-0" />
                          <span>Joining Incentive: Complete 5 deliveries within 7 days of activation to get an extra ₹500 bonus!</span>
                        </div>
                      </div>

                      {/* Driver Helpline */}
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[1.35rem]">
                        <div>
                          <strong>Need Assistance?</strong> Dedicated 24x7 Driver Support Hotline
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href="tel:18004197627"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-xl text-[1.3rem] font-bold hover:bg-green-700 cursor-pointer"
                          >
                            <PhoneIcon size={16} /> 1800-419-7627
                          </a>
                          <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white rounded-xl text-[1.3rem] font-bold hover:opacity-90"
                          >
                            <MessageSquareIcon size={16} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
