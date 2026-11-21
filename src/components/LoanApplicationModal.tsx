import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitLoanApplication } from '../api/client';
import { CheckCircleFilledIcon, PhoneIcon, TruckIcon, UserIcon, XIcon } from './Icons';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const result = await submitLoanApplication({ name: name.trim(), phone: cleanPhone, vehicle_name: vehicleName.trim() });
      if (!result.success) throw new Error(result.message || 'Unable to submit application');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setName(''); setPhone(''); setVehicleName(''); setSubmitted(false); setError('');
    }, 200);
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" onClick={closeAndReset}>
      <div role="dialog" aria-modal="true" aria-labelledby="loan-dialog-title" className="w-full max-w-[520px] rounded-3xl bg-white p-6 shadow-2xl md:p-8 animate-slide-up" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-[1.15rem] font-extrabold uppercase tracking-wider text-[#0445DA]">Vehicle Finance</span>
            <h2 id="loan-dialog-title" className="text-[2.4rem] font-black leading-tight text-gray-950">Apply for a vehicle loan</h2>
            <p className="mt-1 text-[1.35rem] text-gray-500">Share your details and our loan team will contact you.</p>
          </div>
          <button type="button" onClick={closeAndReset} aria-label="Close loan application" className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"><XIcon size={19} /></button>
        </div>

        {submitted ? (
          <div className="py-5 text-center">
            <CheckCircleFilledIcon size={58} className="mx-auto mb-4 text-emerald-600" />
            <h3 className="text-[2rem] font-black text-gray-950">Application submitted!</h3>
            <p className="mx-auto mt-2 max-w-sm text-[1.35rem] text-gray-600">Thank you, {name}. Our team will call you shortly about financing your {vehicleName}.</p>
            <button type="button" onClick={closeAndReset} className="mt-6 w-full cursor-pointer rounded-xl bg-[#0445DA] px-5 py-3.5 text-[1.45rem] font-extrabold text-white hover:bg-[#0336aa]">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-[1.3rem] font-bold text-gray-800">Full name
              <span className="relative mt-1.5 flex"><span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-gray-400"><UserIcon size={18} /></span><input required autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="block w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-[1.4rem] font-medium outline-none focus:border-[#0445DA] focus:bg-white focus:ring-2 focus:ring-blue-100" /></span>
            </label>
            <label className="block text-[1.3rem] font-bold text-gray-800">Phone number
              <span className="relative mt-1.5 flex"><span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-gray-400"><PhoneIcon size={18} /></span><input required inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" className="block w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-[1.4rem] font-medium outline-none focus:border-[#0445DA] focus:bg-white focus:ring-2 focus:ring-blue-100" /></span>
            </label>
            <label className="block text-[1.3rem] font-bold text-gray-800">Vehicle you want to finance
              <span className="relative mt-1.5 flex"><span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-gray-400"><TruckIcon size={18} /></span><input required value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} placeholder="e.g. Tata Ace Gold" className="block w-full rounded-xl border border-gray-300 bg-gray-50 py-3.5 pl-11 pr-4 text-[1.4rem] font-medium outline-none focus:border-[#0445DA] focus:bg-white focus:ring-2 focus:ring-blue-100" /></span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[1.25rem] font-semibold text-red-700">{error}</p>}
            <button disabled={submitting} type="submit" className="w-full cursor-pointer rounded-xl bg-[#0445DA] px-5 py-3.5 text-[1.45rem] font-extrabold text-white shadow-sm hover:bg-[#0336aa] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit loan application'}</button>
            <p className="text-center text-[1.1rem] text-gray-400">By submitting, you agree to be contacted about your loan enquiry.</p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
