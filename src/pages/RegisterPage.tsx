import React, { useState, useRef, useEffect } from 'react';
import { registerDriver, setDriverToken, getDriverToken, checkPhoneRegistered } from '../api/client';
import { OPERATING_CITIES } from '../data/siteData';
import {
  CheckIcon,
  CheckCircleFilledIcon,
  AlertTriangleIcon,
  CameraIcon,
  FileTextIcon,
  XIcon,
  InfoIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SendIcon,
} from '../components/Icons';

interface RegisterPageProps {
  currentCity: string;
  initialVehicle?: string;
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  currentCity,
  initialVehicle = 'tata-ace',
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  // Form Fields - Step 1: Personal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const matchedCity = OPERATING_CITIES.find(
    (c) => c.toLowerCase() === (currentCity || '').toLowerCase()
  ) || 'Bangalore';
  const [city, setCity] = useState<string>(matchedCity);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');

  // Step 2: Vehicle & License
  const [vehicleCategory, setVehicleCategory] = useState(initialVehicle);
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [dlExpiry, setDlExpiry] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // Step 3: Documents
  const [dlFront, setDlFront] = useState<File | null>(null);
  const [dlBack, setDlBack] = useState<File | null>(null);
  const [rcFront, setRcFront] = useState<File | null>(null);
  const [rcBack, setRcBack] = useState<File | null>(null);
  const [aadhaarCard, setAadhaarCard] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);

  // Step 4: Bank Payout
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [upiId, setUpiId] = useState('');

  // Step 5: Fee & Consent
  const [feeTxId, setFeeTxId] = useState('');
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    // If someone already started/has an active registration, don't show the register form again
    if (getDriverToken()) {
      onNavigate('/status');
    }
  }, []);

  useEffect(() => {
    if (errorMsg && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errorMsg]);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentStep === 1) {
      if (!name.trim()) return setErrorMsg('Please enter your full name as per DL (*)');
      const cleanPhone = phone.trim().replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length !== 10) return setErrorMsg('Please enter a valid 10-digit mobile number (*)');
      if (!password || password.length < 6) return setErrorMsg('Please create a password with at least 6 characters (*)');
      if (!city.trim()) return setErrorMsg('Please specify your operating city (*)');

      // Check if registration already exists for this phone number
      try {
        setLoading(true);
        const check = await checkPhoneRegistered(cleanPhone);
        setLoading(false);
        if (check.exists) {
          localStorage.setItem('smart_driver_last_phone', cleanPhone);
          localStorage.setItem('smart_driver_redirect_notice', 'An application has already been registered with this mobile number. Here is your application status:');
          onNavigate('/status');
          return;
        }
      } catch {
        setLoading(false);
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!vehicleCategory) return setErrorMsg('Please select a vehicle category to attach (*)');
      if (!vehicleNumber.trim()) return setErrorMsg('Please enter your Vehicle Registration Number (RC) (*)');
      if (!dlNumber.trim()) return setErrorMsg('Please enter your Driving License (DL) number (*)');
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!dlFront) return setErrorMsg('Please upload your Driving License Front document (*)');
      if (!rcFront) return setErrorMsg('Please upload your Vehicle RC Front document (*)');
      if (!aadhaarCard) return setErrorMsg('Please upload your Aadhaar Card / ID Proof document (*)');
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!bankAccountName.trim()) return setErrorMsg('Please enter the Bank Account Holder Name (*)');
      if (!bankAccountNumber.trim() || bankAccountNumber.trim().length < 8) return setErrorMsg('Please enter a valid Bank Account Number (*)');
      if (!bankIfsc.trim() || bankIfsc.trim().length < 8) return setErrorMsg('Please enter a valid Bank IFSC Code (*)');
      setCurrentStep(5);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!feeTxId.trim()) {
      setErrorMsg('Please pay the ₹99 application verification fee and enter the Payment Transaction ID / UTR (*)');
      return;
    }

    if (!consent) {
      setErrorMsg('Please accept the partner declaration checkbox to proceed.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('address', address);

      formData.append('vehicle_category', vehicleCategory);
      formData.append('vehicle_model', vehicleModel);
      formData.append('vehicle_number', vehicleNumber);
      formData.append('dl_number', dlNumber);
      formData.append('dl_expiry', dlExpiry);
      formData.append('aadhaar_number', aadhaarNumber);
      formData.append('pan_number', panNumber);

      formData.append('bank_account_name', bankAccountName);
      formData.append('bank_account_number', bankAccountNumber);
      formData.append('bank_ifsc', bankIfsc);
      formData.append('upi_id', upiId);

      formData.append('fee_tx_id', feeTxId);

      // Attach documents
      if (dlFront) formData.append('dl_front', dlFront);
      if (dlBack) formData.append('dl_back', dlBack);
      if (rcFront) formData.append('rc_front', rcFront);
      if (rcBack) formData.append('rc_back', rcBack);
      if (aadhaarCard) formData.append('aadhaar_card', aadhaarCard);
      if (insurance) formData.append('insurance', insurance);
      if (driverPhoto) formData.append('driver_photo', driverPhoto);

      const res = await registerDriver(formData);
      if (!res.success) {
        if (res.message && res.message.toLowerCase().includes('already exists')) {
          const cleanPhone = phone.trim().replace(/\D/g, '');
          localStorage.setItem('smart_driver_last_phone', cleanPhone);
          localStorage.setItem('smart_driver_redirect_notice', 'An application has already been registered with this mobile number. Here is your application status:');
          setLoading(false);
          onNavigate('/status');
          return;
        }
        setErrorMsg(res.message || 'Registration failed. Please check your inputs.');
        setLoading(false);
        return;
      }

      if (res.token) {
        setDriverToken(res.token);
      }

      setLoading(false);
      onNavigate('/status');
    } catch {
      setErrorMsg('Network error while submitting registration. Please try again.');
      setLoading(false);
    }
  };

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
            <button
              type="button"
              onClick={() => onNavigate('/status')}
              className="text-[1.35rem] font-semibold text-gray-700 hover:text-[#0445DA] px-3 py-1.5 transition-colors"
            >
              Already Registered? Login
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-[1.35rem] font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="flex-1 py-8 md:py-12 px-4">
        <div className="max-w-[820px] mx-auto bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-gray-200/80 overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#031b5c] to-[#0445DA] text-white">
            <span className="inline-block bg-[#f2c94c] text-[#031b5c] text-[1.15rem] font-extrabold uppercase px-3 py-0.5 rounded-full mb-2 tracking-wider">
              DRIVER PARTNER REGISTRATION
            </span>
            <h1 className="text-[2.4rem] md:text-[3rem] font-extrabold leading-tight m-0 text-white">
              Attach Your Vehicle &amp; Start Earning
            </h1>
            <p className="text-[1.4rem] md:text-[1.55rem] text-white/85 mt-2 mb-0">
              Complete your verification in 5 simple steps to get active trips and guaranteed weekly payouts.
            </p>
          </div>

          {/* Stepper Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 md:p-5">
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { s: 1, title: 'Personal' },
                { s: 2, title: 'Vehicle & DL' },
                { s: 3, title: 'Documents' },
                { s: 4, title: 'Bank' },
                { s: 5, title: 'Fee & Submit' },
              ].map((step) => (
                <div key={step.s} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[1.3rem] font-bold transition-all ${
                      step.s < currentStep
                        ? 'bg-emerald-600 text-white'
                        : step.s === currentStep
                        ? 'bg-[#0445DA] text-white ring-4 ring-blue-100 shadow-sm'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.s < currentStep ? <CheckIcon size={14} /> : step.s}
                  </div>
                  <div
                    className={`text-[1.15rem] md:text-[1.25rem] mt-1.5 font-bold truncate max-w-full ${
                      step.s === currentStep ? 'text-[#0445DA]' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
            {/* Progress line */}
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-[#0445DA] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Error Alert */}
          <div ref={topRef}>
            {errorMsg && (
              <div className="mx-6 md:mx-8 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-[1.35rem] flex items-center gap-3">
                <AlertTriangleIcon size={20} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Step Form Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* STEP 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h2 className="text-[1.8rem] font-bold text-gray-900 border-b pb-2">
                  Step 1: Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name as per DL"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Create Login Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters (used to check status)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Operating City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] font-semibold text-gray-900 focus:outline-none focus:border-[#0445DA] bg-[#fafafa] cursor-pointer appearance-none pr-10 shadow-2xs"
                      >
                        <option value="" disabled>Select Operating City</option>
                        {OPERATING_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="driver@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                    Current Residential Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House/Street, Area, City & PIN Code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Vehicle & License Details */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-[1.8rem] font-bold text-gray-900 border-b pb-2">
                  Step 2: Vehicle &amp; License Details
                </h2>

                <div>
                  <label className="block text-[1.3rem] font-semibold text-gray-700 mb-2">
                    Select Vehicle Category to Attach <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: '2-wheeler', label: '2-Wheeler / Bike', desc: 'Earn up to ₹25,000/mo' },
                      { id: '3-wheeler', label: '3-Wheeler / Champion', desc: 'Earn up to ₹35,000/mo' },
                      { id: 'tata-ace', label: 'Tata Ace / Mini Truck', desc: 'Earn up to ₹45,000/mo' },
                      { id: 'pickup', label: 'Pickup / Bolero (8ft)', desc: 'Earn up to ₹55,000/mo' },
                      { id: 'truck', label: '14ft / Heavy Truck', desc: 'Earn up to ₹75,000/mo' },
                    ].map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setVehicleCategory(v.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          vehicleCategory === v.id
                            ? 'border-[#0445DA] bg-[#eef3ff] shadow-sm'
                            : 'border-gray-200 bg-[#fafafa] hover:border-gray-300'
                        }`}
                      >
                        <div className="text-[1.35rem] font-bold text-gray-900">{v.label}</div>
                        <div className="text-[1.2rem] font-bold text-[#0445DA] mt-1">{v.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tata Ace Gold, Hero Splendor"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Vehicle Registration Number (RC) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MH02AB1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Driving License (DL) Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KA0120150012345"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      DL Expiry Date
                    </label>
                    <input
                      type="date"
                      value={dlExpiry}
                      onChange={(e) => setDlExpiry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Aadhaar Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="12-digit Aadhaar number"
                      maxLength={14}
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      PAN Card Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ABCDE1234F"
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Document Uploads */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-[1.8rem] font-bold text-gray-900 m-0">
                    Step 3: Document Uploads
                  </h2>
                  <span className="text-[1.25rem] text-gray-500 font-medium">
                    Fast verification via original photos or PDFs
                  </span>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3">
                  <CameraIcon size={24} className="text-[#0445DA] shrink-0" />
                  <p className="text-[1.3rem] text-blue-900 m-0 leading-normal">
                    Please upload clear photos or scanned PDFs of your original documents. Files marked with <span className="text-red-500 font-bold">*</span> are required.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Driving License Front',
                      subtitle: 'Clear front photo showing DL number & photo',
                      required: true,
                      file: dlFront,
                      setFile: setDlFront,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Driving License Back',
                      subtitle: 'Back side showing transport vehicle authorization',
                      required: false,
                      file: dlBack,
                      setFile: setDlBack,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Vehicle RC Front',
                      subtitle: 'Registration Certificate front page with chassis/engine no.',
                      required: true,
                      file: rcFront,
                      setFile: setRcFront,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Vehicle RC Back',
                      subtitle: 'Back side of registration certificate',
                      required: false,
                      file: rcBack,
                      setFile: setRcBack,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Aadhaar Card / ID Proof',
                      subtitle: 'Government ID showing full name & address',
                      required: true,
                      file: aadhaarCard,
                      setFile: setAadhaarCard,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Vehicle Insurance',
                      subtitle: 'Valid commercial or third-party insurance certificate',
                      required: false,
                      file: insurance,
                      setFile: setInsurance,
                      accept: 'image/*,application/pdf',
                    },
                    {
                      title: 'Driver Profile Photo',
                      subtitle: 'Clear selfie or passport size photo facing camera',
                      required: false,
                      file: driverPhoto,
                      setFile: setDriverPhoto,
                      accept: 'image/*',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl border-2 transition-all p-4 flex flex-col justify-between ${
                        item.file
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                          : 'border-dashed border-gray-300 hover:border-[#0445DA] bg-[#fbfcfd] hover:bg-[#f4f7ff]'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="text-[1.35rem] font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{item.title}</span>
                            {item.required ? (
                              <span className="text-red-500 text-[1.4rem] font-black">*</span>
                            ) : (
                              <span className="text-[1.1rem] text-gray-500 font-normal bg-gray-100 px-2 py-0.5 rounded-full">
                                Optional
                              </span>
                            )}
                          </div>
                          <div className="text-[1.15rem] text-gray-500 mt-0.5 leading-tight">
                            {item.subtitle}
                          </div>
                        </div>

                        {item.file && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[1.15rem] font-bold px-2 py-0.5 rounded-full">
                            <CheckCircleFilledIcon size={12} className="text-emerald-700" /> Attached
                          </span>
                        )}
                      </div>

                      {/* Upload Drop Area */}
                      {item.file ? (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-300 flex items-center justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileTextIcon size={24} className="text-emerald-700 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[1.25rem] font-bold text-gray-900 truncate">
                                {item.file.name}
                              </div>
                              <div className="text-[1.1rem] text-gray-500">
                                {(item.file.size / 1024 < 1024)
                                  ? `${(item.file.size / 1024).toFixed(1)} KB`
                                  : `${(item.file.size / (1024 * 1024)).toFixed(1)} MB`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <label className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[1.2rem] font-bold cursor-pointer transition-colors">
                              Change
                              <input
                                type="file"
                                accept={item.accept}
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) item.setFile(f);
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => item.setFile(null)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 text-[1.3rem] transition-colors cursor-pointer flex items-center justify-center"
                              title="Remove file"
                            >
                              <XIcon size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="mt-3 group cursor-pointer border-2 border-dashed border-[#0445DA]/30 hover:border-[#0445DA] bg-white hover:bg-blue-50/40 rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all">
                          <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-[#0445DA] group-hover:text-white text-[#0445DA] flex items-center justify-center transition-all mb-2">
                            <FileTextIcon size={22} />
                          </div>
                          <div className="text-[1.4rem] font-bold text-[#0445DA] group-hover:underline">
                            Click to Upload or Drag File Here
                          </div>
                          <div className="text-[1.15rem] text-gray-500 mt-1">
                            Supports JPG, PNG, WEBP, PDF (Max 10MB)
                          </div>
                          <input
                            type="file"
                            accept={item.accept}
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) item.setFile(f);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Bank Payout Details */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h2 className="text-[1.8rem] font-bold text-gray-900 border-b pb-2">
                  Step 4: Bank Details for Weekly Direct Deposit
                </h2>

                <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl text-[1.35rem] flex items-start gap-2.5">
                  <InfoIcon size={20} className="text-[#0445DA] shrink-0 mt-0.5" />
                  <span>All your trip earnings and weekly performance incentives are deposited directly into this bank account every Tuesday.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Bank Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name as registered with bank"
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Bank Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter bank account number"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      Bank IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HDFC0001234"
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[1.3rem] font-semibold text-gray-700 mb-1">
                      UPI ID for Instant Payouts (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-[#fafafa]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Fee & Final Submit */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <h2 className="text-[1.8rem] font-bold text-gray-900 border-b pb-2">
                  Step 5: Verification Fee &amp; Final Submission
                </h2>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f8faff] to-[#eef4ff] border-2 border-[#0445DA]/30 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[1.2rem] font-bold text-[#0445DA] uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full">
                        FINAL STAGE
                      </span>
                      <h3 className="text-[2rem] font-extrabold text-gray-900 mt-2 mb-0">
                        Application &amp; Verification Fee
                      </h3>
                      <p className="text-[1.3rem] text-gray-600 mt-1 mb-0">
                        Covers document background checks, partner kit &amp; priority activation.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[1.4rem] line-through text-gray-400">₹299</div>
                      <div className="text-[2.8rem] font-black text-[#0445DA]">₹99</div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="mt-5 pt-5 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-blue-100">
                    <div className="text-[1.3rem] text-gray-700">
                      <div><strong>Pay via UPI:</strong> <span className="text-[#0445DA] font-mono font-bold">pay.smartdriver@upi</span></div>
                      <div className="text-[1.2rem] text-gray-500 mt-0.5">Or use the payment gateway link:</div>
                    </div>
                    <a
                      href="https://rzp.io/l/smartdriver-verify"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0041f5] text-white px-5 py-2.5 rounded-xl text-[1.35rem] font-bold hover:brightness-110 shadow-sm transition-all"
                    >
                      <span>Pay ₹99 Online</span>
                      <span>↗</span>
                    </a>
                  </div>

                  {/* UTR / Transaction Input */}
                  <div className="mt-4">
                    <label className="block text-[1.3rem] font-semibold text-gray-800 mb-1">
                      Enter UPI Reference / Payment Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 403218942104 or pay_O9kL2..."
                      value={feeTxId}
                      onChange={(e) => setFeeTxId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[1.4rem] focus:outline-none focus:border-[#0445DA] bg-white font-mono"
                    />
                    <p className="text-[1.2rem] text-gray-500 mt-1.5">
                      Please complete the payment above and enter the transaction reference / UTR to submit your application.
                    </p>
                  </div>
                </div>

                {/* Declarations */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <input
                    type="checkbox"
                    id="partnerConsent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#0445DA] rounded focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="partnerConsent" className="text-[1.3rem] text-gray-700 cursor-pointer select-none leading-relaxed">
                    I certify that all personal information and vehicle documents provided are authentic and valid. I agree to the Smart Driver Partner Agreement and background verification policy.
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-[1.4rem] font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <ArrowLeftIcon size={16} /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-[1.35rem] text-gray-600 hover:text-gray-900 font-semibold"
              >
                Cancel
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3.5 rounded-xl bg-[#0445DA] text-white text-[1.5rem] font-bold hover:bg-[#0336aa] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRightIcon size={16} />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="px-9 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-[1.55rem] font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <SendIcon size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
