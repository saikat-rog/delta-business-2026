import React, { useEffect, useState } from 'react';
import { createCashfreePaymentOrder, fetchWalletBalance, getDriverStatusByPhone, getStoredDriverPhone, verifyCashfreePaymentOrder, type DriverData } from '../api/client';
import { openCashfreeCheckout } from '../services/cashfree';
import { AlertTriangleIcon, CarIcon, ChevronRightIcon, FileTextIcon, GiftIcon, IndianRupeeIcon, StarIcon, UserIcon, WalletIcon, XIcon } from '../components/Icons';

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM9 21v-7h6v7" />
    </svg>
  );
}

interface ProfilePageProps {
  onNavigate: (path: string) => void;
  view: '/profile' | '/earnings' | '/my-rides';
}

const VEHICLE_NAMES: Record<string, string> = {
  'tata-ace': 'Tata Ace',
  '2-wheeler': 'Two Wheeler',
  'e-rickshaw': 'Mahindra Treo',
  '3-wheeler': '3 Wheeler',
  'pickup-8ft': 'Pickup Truck',
  'tata-407': 'Heavy Truck',
  'car-commercial': 'Commercial Car',
  jcb: 'JCB',
  'excavator-poclain': 'Excavator / Poclain',
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, view }) => {
  const phone = getStoredDriverPhone() || '';
  const [driver, setDriver] = useState<DriverData | null>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [recharging, setRecharging] = useState<number | null>(null);
  const [balance, setBalance] = useState(0);
  const [walletMessage, setWalletMessage] = useState('');

  useEffect(() => {
    if (!phone) return;
    let active = true;
    fetchWalletBalance(phone).then((value) => {
      if (active) setBalance(value);
    }).catch(() => {
      if (active) setWalletMessage('Wallet balance is unavailable. Please try again.');
    });
    return () => { active = false; };
  }, [phone]);

  useEffect(() => {
    const cachedName = localStorage.getItem('smart_driver_profile_name');
    const cachedVehicle = localStorage.getItem('smart_driver_profile_vehicle');
    if (cachedName) {
      setDriver({ name: cachedName, vehicle_category: cachedVehicle || 'tata-ace' } as DriverData);
    }
    if (phone) {
      getDriverStatusByPhone(phone).then((res) => {
        if (res.success && res.found && res.driver) setDriver(res.driver);
      }).catch(() => undefined);
    }
  }, [phone]);

  const addFunds = async (amount: number) => {
    if (recharging !== null) return;
    if (!phone) {
      setWalletMessage('Log in with your mobile number to recharge.');
      return;
    }
    setRecharging(amount);
    setWalletMessage('');
    try {
      const order = await createCashfreePaymentOrder({
        phone,
        order_type: 'wallet_recharge',
        amount,
      });
      if (!order.success || !order.order_id || !order.payment_session_id) {
        throw new Error('Could not start recharge. Please try again.');
      }
      const outcome = await openCashfreeCheckout(order.payment_session_id);
      if (outcome.type === 'FAILED') throw new Error(outcome.message);
      const verification = await verifyCashfreePaymentOrder(order.order_id);
      if (verification.success && verification.is_paid && verification.payment_type === 'wallet_recharge') {
        setBalance(await fetchWalletBalance(phone));
        setWalletOpen(false);
      } else {
        setWalletMessage(outcome.type === 'DISMISSED'
          ? 'Checkout closed. If you paid, reopen your profile to refresh your balance.'
          : 'Payment is awaiting confirmation. Reopen your profile to refresh your balance.');
      }
    } catch (error) {
      setWalletMessage(error instanceof Error ? error.message : 'Could not confirm recharge.');
    } finally {
      setRecharging(null);
    }
  };

  const name = driver?.name && driver.name !== 'Applicant' ? driver.name : 'Smart Driver Partner';
  const vehicle = VEHICLE_NAMES[driver?.vehicle_category || ''] || 'Registered Vehicle';

  const stats = [
    { Icon: CarIcon, label: 'Total rides', value: '0' },
    { Icon: WalletIcon, label: 'Wallet balance', value: `₹${balance.toLocaleString('en-IN')}` },
    { Icon: StarIcon, label: 'Rating', value: '0.0' },
    { Icon: GiftIcon, label: 'Rewards', value: '0' },
  ];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white text-neutral-950">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-[840px] mx-auto h-18 px-5 flex items-center justify-between gap-4">
          <img src="/logo2.png" alt="Smart Driver" className="h-10 sm:h-12 w-auto object-contain" />
          <button type="button" onClick={() => onNavigate('/login')} className="rounded-full bg-blue-50 px-4 py-2 text-[1.3rem] font-semibold text-[#0445DA] hover:bg-blue-100 cursor-pointer">
            Switch account
          </button>
        </div>
      </header>

      {view === '/my-rides' ? (
        <main className="mx-auto grid min-h-0 w-full max-w-[840px] flex-1 grid-rows-[auto_1fr] overflow-y-auto px-5 py-4">
          <h1 className="text-[2.8rem] font-bold tracking-tight">My rides</h1>
          <section className="w-full max-w-[420px] place-self-center px-2 py-6 text-center">
            <div className="mx-auto mb-4 grid size-28 place-items-center text-[#0445DA]">
              <CarIcon size={72} aria-hidden="true" className={balance > 0 ? 'motion-safe:animate-bounce' : undefined} />
            </div>
            <h2 aria-live="polite" className="text-[2rem] font-semibold">
              {balance > 0 ? 'Waiting for rides' : 'No rides yet'}
            </h2>
            {!(balance > 0) && (
              <button type="button" onClick={() => setWalletOpen(true)}
                className="mt-4 inline-flex items-center gap-2 cursor-pointer rounded-lg bg-[#0445DA] px-5 py-3 text-[1.4rem] font-semibold text-white hover:bg-[#0336aa]">
                <WalletIcon size={18} aria-hidden="true" />
                Recharge wallet to start earning
              </button>
            )}
          </section>
        </main>
      ) : view === '/earnings' ? (
        <main className="mx-auto grid min-h-0 w-full max-w-[840px] flex-1 grid-rows-[auto_auto_1fr] overflow-y-auto px-5 py-6">
          <h1 className="text-[2.8rem] font-bold tracking-tight">Earnings</h1>
          <section className="mt-4 rounded-xl bg-blue-50 p-5 text-[#0445DA]">
            <h2 className="flex items-center gap-2 text-[1.4rem] font-semibold">
              <IndianRupeeIcon size={20} aria-hidden="true" />
              Total earnings
            </h2>
            <p className="text-[3rem] font-bold">₹0</p>
          </section>
          <div className="flex flex-col items-center gap-2 place-self-center py-6 text-center text-[1.4rem] text-neutral-600">
            <FileTextIcon size={24} aria-hidden="true" />
            <p>No earnings yet</p>
          </div>
        </main>
      ) : (
      <main className="flex min-h-0 w-full max-w-[900px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:gap-5 sm:py-5 mx-auto">
        <section className="flex shrink-0 flex-wrap items-center gap-4">
          <span className="size-24 shrink-0 rounded-full border-2 border-[#0445DA] bg-blue-50 text-[#0445DA] grid place-items-center">
            <UserIcon size={38} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-[2.7rem] sm:text-[3.4rem] font-bold tracking-tight leading-tight break-words text-[#072564]">{name}</h1>
            <p className="mt-1 flex items-center gap-2 text-[1.55rem] text-[#072564]"><CarIcon size={16} aria-hidden="true" />{vehicle}</p>
            <p className="mt-1 flex items-center gap-2 text-[1.35rem] text-[#072564]"><StarIcon size={15} className="text-amber-500" aria-hidden="true" />0.0</p>
          </div>
          <span role="status" className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-3 text-[1.35rem] font-medium">
            <span className={`size-2 rounded-full ${balance > 0 ? 'bg-emerald-600' : 'bg-neutral-500'}`} aria-hidden="true" />
            {balance > 0 ? 'Online' : 'Offline'}
          </span>
        </section>

        <button type="button" onClick={() => setWalletOpen(true)}
          className="flex w-full shrink-0 cursor-pointer items-center gap-3 rounded-2xl bg-gradient-to-b from-[#0875ef] to-[#063da4] px-4 py-4 text-left text-white shadow-sm hover:brightness-105 sm:px-6">
          <WalletIcon size={44} className="shrink-0" aria-hidden="true" />
          <span className="flex-1 text-[2.1rem] font-bold leading-tight sm:text-[2.4rem]">
            {balance > 0 ? 'Recharge Wallet' : 'Add Fund for Start Earning'}
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#0445DA]">
            <ChevronRightIcon size={22} aria-hidden="true" />
          </span>
        </button>

        <section aria-label="Driver activity" className="grid shrink-0 grid-cols-2 gap-2 sm:gap-3">
          {stats.map(({ Icon, label, value }, index) => (
            <button key={label} type="button" disabled={index !== 1} onClick={() => setWalletOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-white p-3 text-left shadow-sm enabled:hover:bg-blue-50 enabled:cursor-pointer sm:p-3">
              <span className={`flex min-h-15 min-w-15 shrink-0 flex-col items-center justify-center rounded-lg p-1 ${index === 1 ? 'bg-emerald-50 text-[#0445DA]' : index === 2 ? 'bg-violet-50 text-violet-700' : 'bg-blue-50 text-[#0445DA]'}`}>
                <Icon size={30} aria-hidden="true" />
                {index === 1 && <span className="text-[1.05rem] font-bold">Add Fund</span>}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.35rem] font-medium text-[#072564]">{label}</span>
                <strong className={`block break-words text-[2.5rem] leading-tight ${index === 1 ? 'text-emerald-700' : 'text-[#072564]'}`}>{value}</strong>
              </span>
              <ChevronRightIcon size={15} className="shrink-0 text-[#0445DA]" aria-hidden="true" />
            </button>
          ))}
        </section>

        <section aria-label="Service area" className="relative min-h-48 flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-blue-50">
          <iframe
            title="Kolkata service area on Google Maps"
            src="https://maps.google.com/maps?q=Kolkata%2C%20West%20Bengal&t=m&z=12&output=embed"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-[76px] h-[calc(100%+76px)] w-full border-0"
          />
        </section>
        <button type="button" onClick={() => onNavigate('/my-rides')}
          className="grid w-full shrink-0 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[2.4rem] bg-gradient-to-b from-[#086aff] via-[#0445DA] to-[#052b8b] px-3 py-3 text-white shadow-md hover:brightness-105 sm:gap-5 sm:px-6">
          <svg viewBox="0 0 48 40" fill="none" className="size-16 sm:size-20" aria-hidden="true">
            <path d="M9 18l4-10a5 5 0 0 1 5-3h12a5 5 0 0 1 5 3l4 10M7 16H4m37 0h3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path fill="currentColor" d="M10 17h28a6 6 0 0 1 6 6v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2H12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V23a6 6 0 0 1 6-6Z" />
            <path d="m9 23 7 2m23-2-7 2m-12 3h8" stroke="#0445DA" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-center text-[clamp(1.35rem,4.25vw,2.8rem)] font-black leading-tight">SELECT 1 OF 10 RIDE</span>
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#0445DA] sm:size-13">
            <ChevronRightIcon aria-hidden="true" size={24} strokeWidth={4} />
          </span>
        </button>
        <section className="flex shrink-0 items-center gap-2 rounded-[1.8rem] border border-red-200 bg-[#fff0f1] px-3 py-4 sm:gap-4 sm:px-5">
          <AlertTriangleIcon className="size-11 shrink-0 fill-[#e0000b] stroke-white sm:size-16" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 className="text-[clamp(1.4rem,4vw,2.4rem)] font-bold leading-tight text-[#d6000a]">Need Emergency Help?</h2>
            <p className="mt-0.5 text-[clamp(1.1rem,3.1vw,1.7rem)] font-semibold leading-tight text-[#072564]">Accident or Vehicle Breakdown?</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 border-l border-red-500 pl-2 sm:gap-4 sm:pl-4">
            <svg viewBox="0 0 24 24" className="size-7 shrink-0 text-[#07368d] sm:size-11" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m3 3 3 1 1 3-2 2-3-1-1-3zM7 8l4 4m5 3 5 5-2 2-5-5" />
              <path d="M21 3a5 5 0 0 1-6 7L5 21a2 2 0 0 1-3-3l11-10a5 5 0 0 1 5-6l-2 3 2 2z" />
            </svg>
            <button type="button" onClick={() => setHelpOpen(true)} className="cursor-pointer whitespace-nowrap rounded-[1.4rem] bg-gradient-to-b from-red-600 to-[#d00000] px-3 py-2.5 text-[1.2rem] font-bold text-white sm:px-6 sm:py-3 sm:text-[1.6rem]">Get Help</button>
          </div>
        </section>
      </main>
      )}

      <nav aria-label="Driver navigation" className="shrink-0 bg-white border-t border-neutral-200 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-[840px] mx-auto grid grid-cols-4">
          <a href="/" onClick={(event) => { event.preventDefault(); onNavigate('/'); }}
            className="flex flex-col items-center justify-center gap-1 py-3 text-[1.2rem] font-medium text-neutral-700 hover:bg-blue-50 hover:text-[#0445DA]">
            <HomeIcon />
            Home
          </a>
          {[
            { label: 'My rides', Icon: CarIcon, path: '/my-rides' },
            { label: 'Earnings', Icon: IndianRupeeIcon, path: '/earnings' },
            { label: 'Profile', Icon: UserIcon, path: '/profile' },
          ].map(({ label, Icon, path }) => (
            <button key={label} type="button" onClick={() => path !== view && onNavigate(path)}
              aria-current={path === view ? 'page' : undefined}
              className="flex flex-col items-center justify-center gap-1 py-3 text-[1.2rem] text-neutral-500 aria-[current=page]:text-[#0445DA] aria-[current=page]:font-bold">
              <Icon size={26} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-5"
          onClick={() => setHelpOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="help-title"
            className="w-full max-w-[480px] rounded-t-2xl bg-white p-6 sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()} onKeyDown={(event) => {
              if (event.key === 'Escape') setHelpOpen(false);
            }}>
            <div className="flex items-center justify-between gap-3">
              <h2 id="help-title" className="text-[2rem] font-bold">{balance === 0 ? 'Recharge to start earning' : 'Emergency Help'}</h2>
              <button type="button" autoFocus aria-label="Close help" onClick={() => setHelpOpen(false)} className="grid size-10 cursor-pointer place-items-center rounded-full bg-neutral-100">
                <XIcon size={18} aria-hidden="true" />
              </button>
            </div>
            {balance > 0 ? (
              <div role="status" className="flex flex-col items-center gap-3 py-6 text-center">
                <span aria-hidden="true" className="size-12 rounded-full border-4 border-blue-100 border-t-[#0445DA] motion-safe:animate-spin" />
                <p className="text-[1.5rem] font-semibold">Loading</p>
              </div>
            ) : (
              <p className="mt-3 text-[1.4rem] text-neutral-700">Please complete the recharge and earn to get the emergency help and support from Smart Driver</p>
            )}
            {balance === 0 && (
              <button type="button" onClick={() => { setHelpOpen(false); setWalletOpen(true); }}
                className="mt-4 w-full cursor-pointer rounded-xl bg-[#0445DA] px-4 py-3 text-[1.4rem] font-semibold text-white">
                Recharge wallet
              </button>
            )}
          </div>
        </div>
      )}

      {walletOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center sm:p-5"
          onClick={() => !recharging && setWalletOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="wallet-title"
            className="bg-white w-full max-w-[480px] rounded-t-2xl sm:rounded-2xl p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-between items-center gap-4 mb-2">
              <h2 id="wallet-title" className="text-[2.4rem] font-bold tracking-tight">Recharge wallet</h2>
              <button type="button" aria-label="Close wallet" disabled={!!recharging} onClick={() => setWalletOpen(false)}
                className="size-10 grid place-items-center rounded-full bg-neutral-100 cursor-pointer">
                <XIcon size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="mb-5 text-[1.4rem] text-neutral-600">Choose a recharge amount.</p>
            {walletMessage && <p role="status" className="mb-4 text-[1.35rem] text-neutral-700">{walletMessage}</p>}
            <div className="grid grid-cols-3 gap-2">
              {[5000, 8000, 12000].map((amount) => (
                <button key={amount} type="button" disabled={!!recharging} onClick={() => addFunds(amount)}
                  className="py-4 rounded-lg bg-[#0445DA] text-white text-[1.45rem] font-semibold cursor-pointer hover:bg-[#0336aa] disabled:opacity-60">
                  {recharging === amount ? 'Processing…' : `₹${amount.toLocaleString('en-IN')}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
