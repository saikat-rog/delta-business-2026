import React, { useState, useEffect } from 'react';
import {
  saveOnboardingStep,
  submitDriverDocuments,
  getDriverStatusByPhone,
  getDriverById,
  setStoredDriverPhone,
  setStoredDriverId,
  getStoredDriverPhone,
  getStoredDriverId,
  type DriverData,
} from '../api/client';
import {
  CheckIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  UserIcon,
  PhoneIcon,
  CreditCardIcon,
  FileTextIcon,
  ZapIcon,
} from '../components/Icons';

interface RegisterPageProps {
  currentCity: string;
  initialVehicle?: string;
  onNavigate: (path: string) => void;
}

interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  earnings: string;
  badge?: string;
  image: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'tata-ace',
    name: 'Tata Ace',
    capacity: 'Up to 750 kg',
    earnings: 'Avg. ₹40,000 / mo',
    image: '/vehicles/tata-ace.png',
  },
  {
    id: '3-wheeler',
    name: '3 Wheeler',
    capacity: 'Up to 500 kg',
    earnings: 'Avg. ₹32,000 / mo',
    image: '/vehicles/3-wheeler.png',
  },
  {
    id: 'pickup-8ft',
    name: 'Pickup Truck',
    capacity: 'Up to 1,200 kg',
    earnings: 'Avg. ₹48,000 / mo',
    image: '/vehicles/pickup.png',
  },
  {
    id: '2-wheeler',
    name: 'Two Wheeler',
    capacity: 'Up to 20 kg',
    earnings: 'Avg. ₹25,000 / mo',
    image: '/vehicles/bike.png',
  },
  {
    id: 'tata-407',
    name: 'Heavy Truck',
    capacity: 'Up to 2,500 kg',
    earnings: 'Avg. ₹65,000 / mo',
    image: '/vehicles/truck.png',
  },
  {
    id: 'car-commercial',
    name: 'Commercial Car',
    capacity: 'Up to 4 Passengers / 300 kg',
    earnings: 'Avg. ₹42,000 / mo',
    image: '/vehicles/car.png',
  },
];

interface MockDoc {
  id: string;
  title: string;
  subtitle: string;
  required: boolean;
  status: 'pending' | 'uploading' | 'verified';
  fileName?: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  initialVehicle = 'tata-ace',
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [driverId, setDriverId] = useState<number | null>(null);

  // Form fields
  const [vehicle, setVehicle] = useState<string>(initialVehicle);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Payment states
  const [feeTxId, setFeeTxId] = useState<string>('');
  const [, setFeePaid] = useState<boolean>(false);
  const [feeCopied, setFeeCopied] = useState<boolean>(false);

  // Subscription states
  const [subTxId, setSubTxId] = useState<string>('');
  const [, setSubPaid] = useState<boolean>(false);
  const [subCopied, setSubCopied] = useState<boolean>(false);

  // Documents illusion
  const [documents, setDocuments] = useState<MockDoc[]>([
    {
      id: 'dl',
      title: 'Driving License (DL)',
      subtitle: 'Valid commercial or private driving license',
      required: true,
      status: 'pending',
    },
    {
      id: 'rc',
      title: 'Vehicle Registration Certificate (RC)',
      subtitle: 'Vehicle registration smart card or certificate',
      required: true,
      status: 'pending',
    },
    {
      id: 'aadhaar',
      title: 'Aadhaar Card / Government ID',
      subtitle: 'Clear photo of front & back of Aadhaar',
      required: true,
      status: 'pending',
    },
    {
      id: 'photo',
      title: 'Driver Profile Photo',
      subtitle: 'Clear front-facing photo or selfie for your ID',
      required: true,
      status: 'pending',
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    const savedPhone = getStoredDriverPhone();
    const savedId = getStoredDriverId();

    if (savedPhone) {
      setPhone(savedPhone);
      getDriverStatusByPhone(savedPhone).then((res) => {
        if (res.success && res.found && res.driver) {
          hydrateDriver(res.driver);
        }
      });
    } else if (savedId) {
      getDriverById(savedId).then((res) => {
        if (res.success && res.found && res.driver) {
          hydrateDriver(res.driver);
        }
      });
    }
  }, []);

  const hydrateDriver = (d: DriverData) => {
    setDriverId(d.id);
    if (d.name && d.name !== 'Applicant') setName(d.name);
    if (d.phone) setPhone(d.phone);
    if (d.vehicle_category) setVehicle(d.vehicle_category);
    if (d.fee_paid === 1) {
      setFeePaid(true);
      if (d.fee_tx_id) setFeeTxId(d.fee_tx_id);
    }
    if (d.subscription_paid === 1) {
      setSubPaid(true);
      if (d.subscription_tx_id) setSubTxId(d.subscription_tx_id);
    }
    if (d.documents_submitted === 1) {
      setDocuments((prev) =>
        prev.map((doc) => ({
          ...doc,
          status: 'verified',
          fileName: `${doc.id}_verified.jpg`,
        }))
      );
    }

    if (d.status === 'under_review' || d.status === 'approved' || d.documents_submitted === 1) {
      setCurrentStep(7);
    } else if (d.subscription_paid === 1) {
      setCurrentStep(6);
    } else if (d.fee_paid === 1) {
      setCurrentStep(5);
    } else if (d.phone && d.phone.length === 10) {
      setCurrentStep(4);
    } else if (d.name) {
      setCurrentStep(3);
    } else if (d.vehicle_category) {
      setCurrentStep(2);
    }
  };

  const handlePhoneChange = (raw: string) => {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1);
    }
    setPhone(digits.slice(0, 10));
  };

  // Step 1: Vehicle Select
  const handleStep1Vehicle = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await saveOnboardingStep({
        driverId: driverId || undefined,
        vehicle_category: vehicle,
        step: 1,
      });

      if (res.success && res.driverId) {
        setDriverId(res.driverId);
        setStoredDriverId(res.driverId);
      }
      setCurrentStep(2);
    } catch {
      setCurrentStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Name
  const handleStep2Name = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setErrorMsg('Please enter your full name as per your ID.');
      return;
    }

    setLoading(true);
    try {
      const res = await saveOnboardingStep({
        driverId: driverId || undefined,
        vehicle_category: vehicle,
        name: trimmed,
        step: 2,
      });

      if (res.success && res.driverId) {
        setDriverId(res.driverId);
        setStoredDriverId(res.driverId);
      }
      setCurrentStep(3);
    } catch {
      setCurrentStep(3);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Phone
  const handleStep3Phone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    let cleanPhone = phone.trim().replace(/\D/g, '');
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

    setLoading(true);
    try {
      const res = await saveOnboardingStep({
        driverId: driverId || undefined,
        phone: cleanPhone,
        name: name.trim(),
        vehicle_category: vehicle,
        step: 3,
      });

      if (res.success && res.driver) {
        setDriverId(res.driver.id);
        setStoredDriverId(res.driver.id);
        setStoredDriverPhone(cleanPhone);

        if (res.driver.status === 'under_review' || res.driver.status === 'approved' || res.driver.documents_submitted === 1) {
          setCurrentStep(7);
          return;
        }
        if (res.driver.subscription_paid === 1) {
          setSubPaid(true);
          setCurrentStep(6);
          return;
        }
        if (res.driver.fee_paid === 1) {
          setFeePaid(true);
          setCurrentStep(5);
          return;
        }
      }

      setStoredDriverPhone(cleanPhone);
      setCurrentStep(4);
    } catch {
      setStoredDriverPhone(cleanPhone);
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Pay Fee (₹3000)
  const handleStep4Payment = async () => {
    setErrorMsg('');
    setLoading(true);
    const tx = feeTxId.trim() || `UPI-3000-${Date.now().toString().slice(-6)}`;

    try {
      const res = await saveOnboardingStep({
        driverId: driverId || undefined,
        phone: phone.trim().replace(/\D/g, '').slice(-10),
        fee_paid: 1,
        fee_amount: 3000,
        fee_tx_id: tx,
        step: 4,
      });

      if (res.success && res.driverId) {
        setDriverId(res.driverId);
      }
      setFeePaid(true);
      setCurrentStep(5);
    } catch {
      setFeePaid(true);
      setCurrentStep(5);
    } finally {
      setLoading(false);
    }
  };

  // Step 5: Subscription (Activate Subscription - no amount in button)
  const handleStep5Subscription = async () => {
    setErrorMsg('');
    setLoading(true);
    const tx = subTxId.trim() || `SUB-2000-${Date.now().toString().slice(-6)}`;

    try {
      const res = await saveOnboardingStep({
        driverId: driverId || undefined,
        phone: phone.trim().replace(/\D/g, '').slice(-10),
        subscription_paid: 1,
        subscription_amount: 2000,
        subscription_tx_id: tx,
        step: 5,
      });

      if (res.success && res.driverId) {
        setDriverId(res.driverId);
      }
      setSubPaid(true);
      setCurrentStep(6);
    } catch {
      setSubPaid(true);
      setCurrentStep(6);
    } finally {
      setLoading(false);
    }
  };

  // Step 6: Simulate Document Upload (Illusion)
  const handleSimulateUpload = (docId: string, file?: File) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: 'uploading',
              fileName: file ? file.name : `${docId}_verified.jpg`,
            }
          : d
      )
    );

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === docId
            ? {
                ...d,
                status: 'verified',
              }
            : d
        )
      );
    }, 1100);
  };

  // Step 6: Submit Documents
  const handleStep6Submit = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
      await submitDriverDocuments(driverId || undefined, cleanPhone);
      setCurrentStep(7);
    } catch {
      setCurrentStep(7);
    } finally {
      setLoading(false);
    }
  };

  const handleStartFresh = () => {
    if (window.confirm('Start a fresh application? Unsaved details will be cleared.')) {
      localStorage.removeItem('smart_driver_phone');
      localStorage.removeItem('smart_driver_id');
      setDriverId(null);
      setName('');
      setPhone('');
      setVehicle('tata-ace');
      setFeePaid(false);
      setFeeTxId('');
      setSubPaid(false);
      setSubTxId('');
      setDocuments((prev) => prev.map((d) => ({ ...d, status: 'pending', fileName: undefined })));
      setCurrentStep(1);
    }
  };

  const handleApplyAnother = () => {
    localStorage.removeItem('smart_driver_phone');
    localStorage.removeItem('smart_driver_id');
    setDriverId(null);
    setName('');
    setPhone('');
    setVehicle('tata-ace');
    setFeePaid(false);
    setFeeTxId('');
    setSubPaid(false);
    setSubTxId('');
    setDocuments((prev) => prev.map((d) => ({ ...d, status: 'pending', fileName: undefined })));
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedVehicleObj =
    VEHICLE_OPTIONS.find((v) => v.id === vehicle) || VEHICLE_OPTIONS[0];

  const stepTitles = [
    'Vehicle Type',
    'Personal Name',
    'Phone Verification',
    'Registration Fee',
    'Driver Subscription',
    'Required Documents',
  ];

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

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('/status')}
              className="text-[1.35rem] font-bold text-gray-700 hover:text-[#0445DA] flex items-center gap-1.5 cursor-pointer bg-transparent border-none transition-colors"
            >
              <PhoneIcon size={16} className="text-gray-500" />
              <span>Check Status</span>
            </button>

            {driverId && currentStep < 7 && (
              <button
                type="button"
                onClick={handleStartFresh}
                className="text-[1.25rem] text-gray-400 hover:text-gray-700 font-medium cursor-pointer bg-transparent border-none"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Uber Segmented Progress Bar */}
        {currentStep <= 6 && (
          <div className="w-full bg-gray-50 border-t border-gray-100">
            <div className="max-w-[1140px] mx-auto px-6 py-2.5 flex items-center justify-between text-[1.25rem] text-gray-500 font-semibold">
              <span className="uppercase tracking-wider text-gray-950 font-bold">
                Step {currentStep} of 6
              </span>
              <span className="text-gray-700 font-bold">{stepTitles[currentStep - 1]}</span>
            </div>
            <div className="max-w-[1140px] mx-auto px-6 pb-2.5">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <div
                    key={s}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      s <= currentStep ? 'bg-[#0445DA]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Container - Desktop Friendly Spacing */}
      <main className="flex-1 w-full max-w-[1140px] mx-auto px-5 sm:px-8 py-8 md:py-14 flex flex-col justify-center">
        {errorMsg && (
          <div className="max-w-[700px] mx-auto w-full mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-[1.35rem] flex items-center gap-3 animate-fade-in">
            <AlertTriangleIcon size={18} className="shrink-0 text-red-600" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: VEHICLE TYPE (Desktop 3-Column Grid) */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="w-full  p-6 sm:p-10 md:p-12">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-[#0445DA] block mb-1">
                Driver Partner Onboarding
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] md:text-[3.8rem] font-black text-gray-950 tracking-tight leading-tight">
                Choose your vehicle
              </h1>
              <p className="text-[1.5rem] text-gray-500 mt-1 max-w-xl">
                Select the vehicle category you will attach with Smart Driver to start earning.
              </p>
            </div>

            {/* 2 in a row vehicle grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-7 mb-8 md:mb-10">
              {VEHICLE_OPTIONS.map((opt) => {
                const isSelected = vehicle === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setVehicle(opt.id)}
                    className={`p-4 sm:p-6 md:p-8 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center group ${
                      isSelected
                        ? 'border-[#0445DA] bg-blue-50/40 shadow-md ring-2 ring-[#0445DA]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xs'
                    }`}
                  >
                    {/* Large Vehicle Image */}
                    <div className="w-full h-28 sm:h-36 md:h-44 flex items-center justify-center mb-3 sm:mb-4">
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    {/* Short Vehicle Name (1 or 2 words) */}
                    <h3 className="text-[1.7rem] sm:text-[2.1rem] md:text-[2.3rem] font-black text-gray-950 mb-1 leading-tight">
                      {opt.name}
                    </h3>

                    {/* Average Monthly Earning */}
                    <p className="text-[1.35rem] sm:text-[1.55rem] font-extrabold text-emerald-700">
                      {opt.earnings}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleStep1Vehicle}
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.6rem] font-extrabold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: FULL NAME (Desktop Centered Card) */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <form
            onSubmit={handleStep2Name}
            className="max-w-[620px] mx-auto w-full  p-6 sm:p-10 md:p-12"
          >
            <div className="mb-8">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-[#0445DA] block mb-1">
                Profile Setup
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                What&apos;s your full name?
              </h1>
              <p className="text-[1.45rem] text-gray-500 mt-1">
                Enter your official legal name as printed on your Driving License.
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-[1.35rem] font-bold text-gray-700 mb-2">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-5 py-4.5 text-[1.8rem] font-bold text-gray-950 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-[#0445DA] transition-all"
              />
              <div className="mt-3 flex items-center gap-2.5 text-[1.35rem] text-gray-600 font-medium">
                <img src={selectedVehicleObj.image} alt="" className="w-10 h-7 object-contain shrink-0" />
                <span>
                  Attached Vehicle: <strong>{selectedVehicleObj.name}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-4.5 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-[1.5rem] transition-colors cursor-pointer"
              >
                <ArrowLeftIcon size={20} />
              </button>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="flex-1 py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.6rem] font-extrabold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* STEP 3: MOBILE NUMBER (Desktop Centered Card) */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <form
            onSubmit={handleStep3Phone}
            className="max-w-[620px] mx-auto w-full  p-6 sm:p-10 md:p-12"
          >
            <div className="mb-8">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-[#0445DA] block mb-1">
                Account &amp; Sign-In ID
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                Enter your mobile number
              </h1>
              <p className="text-[1.45rem] text-gray-500 mt-1">
                This is your unique driver ID. You won&apos;t need any password to log in or check status.
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-[1.35rem] font-bold text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl focus-within:bg-white focus-within:border-[#0445DA] transition-all overflow-hidden">
                <div className="px-5 py-4.5 bg-gray-100/80 border-r border-gray-200 text-[1.6rem] font-extrabold text-gray-700 flex items-center gap-1.5 select-none shrink-0">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  autoFocus
                  maxLength={14}
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-5 py-4.5 text-[2rem] font-mono font-bold text-gray-950 tracking-wider outline-none bg-transparent"
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-[1.3rem] text-gray-500">
                <UserIcon size={16} className="text-gray-400" />
                <span>
                  Applicant: <strong>{name}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-4.5 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-[1.5rem] transition-colors cursor-pointer"
              >
                <ArrowLeftIcon size={20} />
              </button>

              <button
                type="submit"
                disabled={loading || phone.trim().length !== 10}
                className="flex-1 py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.6rem] font-extrabold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* STEP 4: REGISTRATION FEE (Desktop 2-Column Side-by-Side) */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <div className="max-w-[1040px] mx-auto w-full  p-6 sm:p-10 md:p-12">
            <div className="mb-8 md:mb-10">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                One-Time Onboarding
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                Pay Registration Fee
              </h1>
              <p className="text-[1.45rem] text-gray-500 mt-1">
                Complete your ₹3,000 onboarding and background verification fee.
              </p>
            </div>

            {/* Desktop 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch mb-8">
              {/* Left Column: Receipt Breakdown (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-7 space-y-4">
                  <h3 className="text-[1.6rem] font-extrabold text-gray-950 pb-3 border-b border-gray-200">
                    Payment Breakdown
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between py-1 text-[1.4rem]">
                      <span className="text-gray-500">Applicant Name</span>
                      <span className="font-bold text-gray-950">{name}</span>
                    </div>
                    <div className="flex justify-between py-1 text-[1.4rem]">
                      <span className="text-gray-500">Mobile Identifier</span>
                      <span className="font-mono font-bold text-gray-950">+91 {phone}</span>
                    </div>
                    <div className="flex justify-between py-1 text-[1.4rem]">
                      <span className="text-gray-500">Vehicle Type</span>
                      <span className="font-bold text-gray-950 flex items-center gap-2">
                        <img src={selectedVehicleObj.image} alt="" className="w-8 h-6 object-contain inline-block shrink-0" />
                        <span>{selectedVehicleObj.name}</span>
                      </span>
                    </div>
                    <div className="flex justify-between py-1 text-[1.4rem]">
                      <span className="text-gray-500">Background Verification</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                    <div className="flex justify-between py-1 text-[1.4rem]">
                      <span className="text-gray-500">Driver Kit &amp; Uniform</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-5 border-t border-gray-200 text-[2rem] font-black text-gray-950">
                    <span>Total Due</span>
                    <span className="text-emerald-700 font-mono text-[2.2rem]">₹3,000</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-[1.35rem] flex items-center gap-3">
                  <ShieldCheckIcon size={20} className="text-emerald-700 shrink-0" />
                  <span>Verified 100% Secure Smart Driver Payment Gateway</span>
                </div>
              </div>

              {/* Right Column: QR Code & Payment Confirmation (5 cols) */}
              <div className="lg:col-span-5 border border-gray-200 rounded-2xl p-6 sm:p-7 text-center bg-gray-50/70 flex flex-col justify-between">
                <div>
                  <div className="inline-block p-4 bg-white border border-gray-200 rounded-2xl shadow-xs mb-3">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=smartdriver@upi%26pn=Smart%20Driver%26am=3000%26cu=INR"
                      alt="UPI QR Code"
                      className="w-44 h-44 mx-auto"
                    />
                  </div>
                  <p className="text-[1.35rem] text-gray-500 mb-3 font-medium">
                    Scan with GPay, PhonePe, Paytm or BHIM
                  </p>

                  <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl text-[1.4rem] font-mono text-gray-900 mb-4 max-w-sm mx-auto shadow-xs">
                    <span>smartdriver@upi</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('smartdriver@upi');
                        setFeeCopied(true);
                        setTimeout(() => setFeeCopied(false), 2000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[1.2rem] font-bold text-[#0445DA] cursor-pointer"
                    >
                      {feeCopied ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>

                  <div className="text-left max-w-sm mx-auto mb-5">
                    <label className="block text-[1.25rem] font-bold text-gray-700 mb-1.5">
                      UPI UTR / Reference ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={feeTxId}
                      onChange={(e) => setFeeTxId(e.target.value)}
                      placeholder="e.g. 432109876543"
                      className="w-full px-4 py-3 text-[1.4rem] bg-white border border-gray-300 rounded-xl outline-none focus:border-[#0445DA]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-white font-bold text-[1.5rem] transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleStep4Payment}
                    disabled={loading}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[1.55rem] font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CreditCardIcon size={20} />
                    <span>Confirm Payment (₹3,000)</span>
                    <ArrowRightIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: DRIVER SUBSCRIPTION (Desktop 2-Column - No Amount in Button) */}
        {/* ========================================================= */}
        {currentStep === 5 && (
          <div className="max-w-[1040px] mx-auto w-full  p-6 sm:p-10 md:p-12">
            <div className="mb-8 md:mb-10">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                VIP Driver Membership
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                Driver Monthly Subscription
              </h1>
              <p className="text-[1.45rem] text-gray-500 mt-1">
                Zero platform commission on every trip. Keep 100% of your earnings.
              </p>
            </div>

            {/* Desktop 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch mb-8">
              {/* Left Column: Benefits & Value Proposition (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="bg-purple-50/50 rounded-2xl border border-purple-200 p-6 sm:p-7 space-y-4">
                  <h3 className="text-[1.6rem] font-black text-purple-950 flex items-center gap-2 pb-3 border-b border-purple-200/60">
                    <ZapIcon size={20} className="text-purple-600" />
                    <span>VIP Member Benefits</span>
                  </h3>

                  <div className="space-y-3.5 text-[1.4rem] text-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12} />
                      </div>
                      <span><strong>0% Commission</strong> – Keep 100% of customer trip fare</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12} />
                      </div>
                      <span><strong>Priority Dispatch</strong> – Receive local booking requests first</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12} />
                      </div>
                      <span><strong>Daily Instant Payouts</strong> – Direct wallet to bank withdrawal</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12} />
                      </div>
                      <span><strong>24x7 Roadside Support</strong> – Dedicated hotline assistance</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-purple-200 flex items-center justify-between text-[1.9rem] font-black text-purple-950">
                    <span>Monthly Subscription</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-purple-700 text-[2.2rem]">₹2,000</span>
                      <span className="text-[1.3rem] text-gray-500 font-semibold">/ mo</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-[1.35rem]">
                  Can be cancelled or renewed anytime with no lock-in period.
                </div>
              </div>

              {/* Right Column: QR Code & Action Button (5 cols) */}
              <div className="lg:col-span-5 border border-gray-200 rounded-2xl p-6 sm:p-7 text-center bg-gray-50/70 flex flex-col justify-between">
                <div>
                  <div className="inline-block p-4 bg-white border border-gray-200 rounded-2xl shadow-xs mb-3">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=smartdriver@upi%26pn=Smart%20Driver%26am=2000%26cu=INR"
                      alt="UPI QR Code"
                      className="w-44 h-44 mx-auto"
                    />
                  </div>
                  <p className="text-[1.35rem] text-gray-500 mb-3 font-medium">
                    Scan to activate your driver subscription
                  </p>

                  <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl text-[1.4rem] font-mono text-gray-900 mb-4 max-w-sm mx-auto shadow-xs">
                    <span>smartdriver@upi</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('smartdriver@upi');
                        setSubCopied(true);
                        setTimeout(() => setSubCopied(false), 2000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[1.2rem] font-bold text-[#0445DA] cursor-pointer"
                    >
                      {subCopied ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>

                  <div className="text-left max-w-sm mx-auto mb-5">
                    <label className="block text-[1.25rem] font-bold text-gray-700 mb-1.5">
                      UPI UTR / Reference ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={subTxId}
                      onChange={(e) => setSubTxId(e.target.value)}
                      placeholder="e.g. 987654321012"
                      className="w-full px-4 py-3 text-[1.4rem] bg-white border border-gray-300 rounded-xl outline-none focus:border-[#0445DA]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-white font-bold text-[1.5rem] transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon size={18} />
                  </button>

                  {/* NO AMOUNT MENTIONED IN BUTTON AS REQUESTED */}
                  <button
                    type="button"
                    onClick={handleStep5Subscription}
                    disabled={loading}
                    className="flex-1 py-4 bg-purple-700 hover:bg-purple-800 text-white text-[1.55rem] font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ZapIcon size={20} />
                    <span>Activate Subscription</span>
                    <ArrowRightIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: DOCUMENTS (Desktop 2x2 Grid) */}
        {/* ========================================================= */}
        {currentStep === 6 && (
          <div className="max-w-[1040px] mx-auto w-full  p-6 sm:p-10 md:p-12">
            <div className="mb-8 md:mb-10">
              <span className="text-[1.25rem] font-bold uppercase tracking-wider text-[#0445DA] block mb-1">
                Final Step
              </span>
              <h1 className="text-[2.6rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight">
                Required verification documents
              </h1>
              <p className="text-[1.45rem] text-gray-500 mt-1">
                Take a photo or upload clear copies of your documents.
              </p>
            </div>

            {/* Desktop 2-Column Grid for Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 md:mb-10">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-6 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    doc.status === 'verified'
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : doc.status === 'uploading'
                      ? 'border-blue-300 bg-blue-50/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-13 h-13 rounded-xl flex items-center justify-center shrink-0 ${
                        doc.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {doc.status === 'verified' ? (
                        <CheckIcon size={20} />
                      ) : (
                        <FileTextIcon size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-[1.55rem] font-bold text-gray-950">
                        {doc.title}
                      </h4>
                      <p className="text-[1.3rem] text-gray-500 mt-0.5">
                        {doc.status === 'verified'
                          ? '✓ Document verified & attached'
                          : doc.status === 'uploading'
                          ? 'Scanning document security...'
                          : doc.subtitle}
                      </p>
                    </div>
                  </div>

                  <div>
                    {doc.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[1.2rem] font-bold">
                        <CheckIcon size={12} />
                        <span>Ready</span>
                      </span>
                    ) : doc.status === 'uploading' ? (
                      <div className="flex items-center gap-2 text-blue-600 text-[1.25rem] font-bold">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span>Scanning</span>
                      </div>
                    ) : (
                      <label className="px-4.5 py-2.5 bg-gray-900 hover:bg-black text-white text-[1.3rem] font-bold rounded-xl cursor-pointer transition-colors inline-block text-center">
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleSimulateUpload(doc.id, e.target.files?.[0])}
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-6 py-4.5 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-[1.5rem] transition-colors cursor-pointer"
              >
                <ArrowLeftIcon size={20} />
              </button>

              <button
                type="button"
                onClick={handleStep6Submit}
                disabled={loading}
                className="px-10 py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.6rem] font-extrabold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheckIcon size={20} />
                <span>Submit for Final Review</span>
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: APPLICATION SUBMITTED (Minimalist Success Card) */}
        {/* ========================================================= */}
        {currentStep === 7 && (
          <div className="max-w-[540px] mx-auto w-full p-8 sm:p-12 text-center animate-fade-in my-6">
            {/* Animated Green Tick */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm animate-scale-pop">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <CheckIcon size={38} className="stroke-[3]" />
              </div>
            </div>

            {/* Success Heading & Subtitle */}
            <h1 className="text-[2.8rem] sm:text-[3.4rem] font-black text-gray-950 tracking-tight leading-tight mb-2">
              Application Successful!
            </h1>
            <p className="text-[1.5rem] text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Your driver partner application has been submitted successfully and is currently under review.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate(`/status-details?phone=${phone}`)}
                className="w-full py-4.5 bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.65rem] font-extrabold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track Status</span>
                <ArrowRightIcon size={20} />
              </button>

              <button
                type="button"
                onClick={handleApplyAnother}
                className="text-[1.45rem] font-bold text-gray-600 hover:text-gray-950 underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none py-1"
              >
                Apply Another
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
