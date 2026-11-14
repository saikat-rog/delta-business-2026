import React, { useState, useEffect } from 'react';
import {
  loginAdmin,
  getAdminStats,
  getAdminApplications,
  getAdminApplicationDetail,
  updateAdminApplicationStatus,
  updateAdminApplicationFee,
  getAdminToken,
  setAdminToken,
  removeAdminToken,
  type DriverData,
} from '../api/client';
import {
  ShieldIcon,
  ShieldCheckIcon,
  CheckCircleFilledIcon,
  AlertTriangleIcon,
  ArrowLeftIcon,
  RefreshIcon,
  SearchIcon,
  UserIcon,
  PhoneIcon,
  IndianRupeeIcon,
  ClockIcon,
  TruckIcon,
  CheckIcon,
  XIcon,
} from '../components/Icons';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Login inputs
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Stats & Applications
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<DriverData[]>([]);
  const [selectedApp, setSelectedApp] = useState<DriverData | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [filterFee, setFilterFee] = useState<string>('');
  const [filterSub, setFilterSub] = useState<string>('');
  const [filterDocs, setFilterDocs] = useState<string>('');

  // Review state
  const [editStatus, setEditStatus] = useState<string>('under_review');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const token = getAdminToken();
    if (token) {
      setIsAdminLoggedIn(true);
      loadDashboard();
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const [statsRes, appsRes] = await Promise.all([
        getAdminStats(),
        getAdminApplications(filterStatus, filterSearch, filterFee, filterSub, filterDocs),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (appsRes.success) setApplications(appsRes.applications || []);
    } catch {
      setErrorMsg('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadDashboard();
    }
  }, [filterStatus, filterFee, filterSub, filterDocs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadDashboard();
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await loginAdmin(username, password);
      if (res.success && res.token) {
        setAdminToken(res.token);
        setIsAdminLoggedIn(true);
        await loadDashboard();
      } else {
        setErrorMsg(res.message || 'Invalid admin credentials');
      }
    } catch {
      setErrorMsg('Network error while connecting to admin backend');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = async (id: number) => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await getAdminApplicationDetail(id);
      if (res.success && res.driver) {
        setSelectedApp(res.driver);
        setEditStatus(res.driver.status || 'under_review');
        setAdminNotes(res.driver.admin_notes || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(res.message || 'Could not load application detail');
      }
    } catch {
      setErrorMsg('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStatus = async () => {
    if (!selectedApp) return;
    try {
      setUpdatingStatus(true);
      setErrorMsg('');
      const res = await updateAdminApplicationStatus(selectedApp.id, editStatus, adminNotes);
      if (res.success) {
        setSuccessMsg(`Status updated to '${editStatus}'!`);
        await loadDashboard();
        const detailRes = await getAdminApplicationDetail(selectedApp.id);
        if (detailRes.success && detailRes.driver) {
          setSelectedApp(detailRes.driver);
        }
      } else {
        setErrorMsg(res.message || 'Failed to update status');
      }
    } catch {
      setErrorMsg('Network error while updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleToggleFee = async (currentVal: number) => {
    if (!selectedApp) return;
    try {
      const newVal = currentVal === 0;
      const res = await updateAdminApplicationFee(
        selectedApp.id,
        newVal,
        selectedApp.fee_tx_id,
        undefined,
        undefined
      );
      if (res.success) {
        setSuccessMsg(`Registration fee marked as ${newVal ? 'Paid' : 'Unpaid'}`);
        await loadDashboard();
        const detailRes = await getAdminApplicationDetail(selectedApp.id);
        if (detailRes.success && detailRes.driver) {
          setSelectedApp(detailRes.driver);
        }
      }
    } catch {
      setErrorMsg('Failed to update fee status');
    }
  };

  const handleToggleSubscription = async (currentVal: number) => {
    if (!selectedApp) return;
    try {
      const newVal = currentVal === 0;
      const res = await updateAdminApplicationFee(
        selectedApp.id,
        undefined,
        undefined,
        newVal,
        selectedApp.subscription_tx_id
      );
      if (res.success) {
        setSuccessMsg(`Subscription marked as ${newVal ? 'Active' : 'Unpaid'}`);
        await loadDashboard();
        const detailRes = await getAdminApplicationDetail(selectedApp.id);
        if (detailRes.success && detailRes.driver) {
          setSelectedApp(detailRes.driver);
        }
      }
    } catch {
      setErrorMsg('Failed to update subscription status');
    }
  };

  const handleAdminLogout = () => {
    removeAdminToken();
    setIsAdminLoggedIn(false);
    setStats(null);
    setApplications([]);
    setSelectedApp(null);
  };

  const getVehicleLabel = (cat?: string) => {
    switch (cat) {
      case 'tata-ace':
        return 'Tata Ace';
      case '3-wheeler':
        return '3-Wheeler Auto';
      case 'pickup-8ft':
        return 'Pickup 8ft';
      case '2-wheeler':
        return '2-Wheeler Bike';
      case 'tata-407':
        return 'Tata 407 Truck';
      case 'ev-cargo':
        return 'EV Cargo 3W';
      default:
        return cat || 'Commercial Vehicle';
    }
  };

  const getStepLabel = (step?: number, status?: string) => {
    if (status === 'approved') return 'Approved ✓';
    if (status === 'rejected') return 'Rejected';
    if (status === 'under_review') return 'Final Review';
    switch (step) {
      case 1:
        return 'Step 1: Vehicle';
      case 2:
        return 'Step 2: Name';
      case 3:
        return 'Step 3: Mobile';
      case 4:
        return 'Step 4: Fee Paid';
      case 5:
        return 'Step 5: Subscribed';
      case 6:
        return 'Step 6: Docs';
      default:
        return 'In Progress';
    }
  };

  const getInitials = (nameStr?: string) => {
    if (!nameStr) return 'DR';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  const handleClearFilters = () => {
    setFilterStatus('');
    setFilterSearch('');
    setFilterFee('');
    setFilterSub('');
    setFilterDocs('');
    setTimeout(() => {
      loadDashboard();
    }, 50);
  };

  const hasActiveFilters = Boolean(filterStatus || filterSearch || filterFee || filterSub || filterDocs);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0F172A] font-sans flex flex-col justify-between">
      {/* Uber Fleet / Admin Navbar */}
      <header className="bg-[#0F172A] text-white border-b border-gray-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-2 group"
            >
              <img
                src="/logo2.png"
                alt="Smart Driver"
                className="h-8 w-auto brightness-0 invert object-contain transition-opacity group-hover:opacity-90"
              />
            </a>
            <span className="inline-block bg-[#F2C94C] text-gray-950 text-[1.1rem] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
              FLEET OPS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-[1.3rem] font-bold transition-all shadow-xs cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-[1.3rem] font-semibold hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-[1.35rem] flex items-center gap-3 shadow-xs">
            <AlertTriangleIcon size={18} className="text-red-600 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-[1.35rem] flex items-center gap-3 shadow-xs">
            <CheckCircleFilledIcon size={18} className="text-green-600 shrink-0" />
            <span className="font-medium">{successMsg}</span>
          </div>
        )}

        {!isAdminLoggedIn ? (
          /* Uber-Style Admin Login */
          <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-200 mt-12">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center mx-auto mb-3">
                <ShieldIcon size={32} />
              </div>
              <h1 className="text-[2.4rem] font-black text-gray-950 tracking-tight">Admin Portal</h1>
              <p className="text-[1.35rem] text-gray-500 mt-1">
                Sign in with operations credentials to manage driver onboarding
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4" autoComplete="off">
              <div>
                <label className="block text-[1.3rem] font-bold text-gray-700 mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin_test"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl border border-gray-300 text-[1.45rem] font-medium focus:outline-none focus:border-[#0445DA] bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[1.3rem] font-bold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl border border-gray-300 text-[1.45rem] font-medium focus:outline-none focus:border-[#0445DA] bg-gray-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#0F172A] hover:bg-black text-white text-[1.55rem] font-extrabold transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        ) : selectedApp ? (
          /* Driver Review View (Uber Style) */
          <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 md:p-8 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-[1.35rem] font-bold hover:bg-gray-50 cursor-pointer"
              >
                <ArrowLeftIcon size={16} /> Back to All Applications
              </button>
              <div className="text-[1.35rem] font-mono text-gray-400">
                Driver Record #{selectedApp.id}
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="p-5 bg-gray-50 border border-gray-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[1.35rem] font-bold text-gray-800">Verification Status:</span>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-[1.4rem] font-bold text-gray-900 bg-white cursor-pointer outline-none focus:border-[#0445DA]"
                >
                  <option value="draft">Draft (Incomplete)</option>
                  <option value="under_review">Under Review</option>
                  <option value="action_required">Action Required</option>
                  <option value="approved">Approved ✓</option>
                  <option value="rejected">Rejected ✗</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleFee(selectedApp.fee_paid)}
                  className={`px-4 py-2 rounded-xl text-[1.3rem] font-bold cursor-pointer transition-colors ${
                    selectedApp.fee_paid === 1
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  Fee: {selectedApp.fee_paid === 1 ? '₹3,000 Paid ✓' : '₹3,000 Unpaid'}
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleSubscription(selectedApp.subscription_paid || 0)}
                  className={`px-4 py-2 rounded-xl text-[1.3rem] font-bold cursor-pointer transition-colors ${
                    selectedApp.subscription_paid === 1
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  VIP Sub: {selectedApp.subscription_paid === 1 ? '₹2,000 Active ✓' : '₹2,000 Inactive'}
                </button>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="space-y-2">
              <label className="block text-[1.35rem] font-bold text-gray-900">
                Operations Feedback / Instructions (visible to driver):
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. Identity verified. Welcome to Smart Driver fleet!"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="flex-1 px-4.5 py-3 rounded-xl border border-gray-300 text-[1.4rem] bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0445DA]"
                />
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={handleSaveStatus}
                  className="px-6 py-3 rounded-xl bg-[#0445DA] hover:bg-[#0336aa] text-white text-[1.4rem] font-bold cursor-pointer disabled:opacity-50"
                >
                  {updatingStatus ? 'Updating...' : 'Save Remarks'}
                </button>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3 text-[1.35rem]">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 text-white font-black text-[1.6rem] flex items-center justify-center">
                    {getInitials(selectedApp.name)}
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-black text-gray-950">
                      {selectedApp.name || 'Anonymous Applicant'}
                    </h3>
                    <p className="text-[1.25rem] text-gray-500 font-mono">
                      Mobile ID: {selectedApp.phone ? `+91 ${selectedApp.phone}` : 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle Category:</span>
                  <span className="font-bold text-gray-950">{getVehicleLabel(selectedApp.vehicle_category)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Step:</span>
                  <span className="font-bold text-[#0445DA]">{getStepLabel(selectedApp.current_step, selectedApp.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Registered At:</span>
                  <span className="text-gray-700">{selectedApp.created_at || 'Just now'}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3 text-[1.35rem]">
                <h3 className="text-[1.6rem] font-black text-gray-950 pb-2 border-b border-gray-100">
                  Payment &amp; Document Summary
                </h3>

                <div className="flex justify-between">
                  <span className="text-gray-500">Registration Fee:</span>
                  {selectedApp.fee_paid === 1 ? (
                    <span className="text-emerald-700 font-bold">
                      ₹3,000 Paid ✓ {selectedApp.fee_tx_id ? `(${selectedApp.fee_tx_id})` : ''}
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid ✗</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Wallet Balance / VIP Recharge:</span>
                  {selectedApp.subscription_paid === 1 ? (
                    <span className="text-emerald-700 font-bold">
                      ₹2,000 Active in Wallet ✓ {selectedApp.subscription_tx_id ? `(${selectedApp.subscription_tx_id})` : ''}
                    </span>
                  ) : (
                    <span className="text-gray-500 font-semibold">₹0 (Pending Recharge)</span>
                  )}
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Document Upload:</span>
                  {selectedApp.documents_submitted === 1 ? (
                    <span className="text-emerald-700 font-bold">
                      Submitted by applicant ✓
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">
                      Pending Submission ✗
                    </span>
                  )}
                </div>
                <p className="text-[1.2rem] text-gray-400 italic pt-1">
                  Document upload verification happens directly on the applicant UI. No heavy binary files stored on server.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Applications Table & Summary Stats */
          <div className="space-y-6">
            {/* Uber Fleet Metric Tiles */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Total Applications */}
                <div className="p-5 bg-white border border-gray-200/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-gray-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-gray-400">
                      Total Applications
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.8rem] font-black text-gray-950 tracking-tight leading-none">
                      {stats.total}
                    </span>
                    <span className="text-[1.15rem] font-bold text-gray-400">All Time</span>
                  </div>
                </div>

                {/* 2. Under Review */}
                <div className="p-5 bg-white border border-blue-200/80 rounded-2xl shadow-[0_2px_12px_rgba(4,69,218,0.04)] flex flex-col justify-between hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-blue-700">
                      Under Review
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0445DA] flex items-center justify-center">
                      <ClockIcon size={16} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.8rem] font-black text-blue-950 tracking-tight leading-none">
                      {stats.pending}
                    </span>
                    <span className="text-[1.15rem] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Action Req.</span>
                  </div>
                </div>

                {/* 3. Approved */}
                <div className="p-5 bg-white border border-emerald-200/80 rounded-2xl shadow-[0_2px_12px_rgba(16,185,129,0.04)] flex flex-col justify-between hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-emerald-700">
                      Approved Drivers
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheckIcon size={16} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.8rem] font-black text-emerald-950 tracking-tight leading-none">
                      {stats.approved}
                    </span>
                    <span className="text-[1.15rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                  </div>
                </div>

                {/* 4. Draft / Incomplete */}
                <div className="p-5 bg-white border border-amber-200/80 rounded-2xl shadow-[0_2px_12px_rgba(245,158,11,0.04)] flex flex-col justify-between hover:border-amber-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-amber-700">
                      Draft / Incomplete
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertTriangleIcon size={16} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.8rem] font-black text-amber-950 tracking-tight leading-none">
                      {stats.draft || 0}
                    </span>
                    <span className="text-[1.15rem] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">In Progress</span>
                  </div>
                </div>

                {/* 5. Total Revenue */}
                <div className="p-5 bg-white border border-purple-200/80 rounded-2xl shadow-[0_2px_12px_rgba(168,85,247,0.04)] flex flex-col justify-between hover:border-purple-300 transition-all col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[1.2rem] font-bold uppercase tracking-wider text-purple-700">
                      Total Revenue
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                      <IndianRupeeIcon size={16} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[2.8rem] font-black text-purple-950 tracking-tight leading-none">
                      ₹{(stats.total_revenue || 0).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[1.15rem] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">Collected</span>
                  </div>
                </div>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="p-4 bg-white border border-gray-200/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full xl:w-[420px] shrink-0">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <SearchIcon size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search name, phone, or vehicle..."
                      value={filterSearch}
                      onChange={(e) => setFilterSearch(e.target.value)}
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-300 text-[1.35rem] bg-gray-50 focus:bg-white focus:outline-none focus:border-[#0445DA] transition-all"
                    />
                    {filterSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setFilterSearch('');
                          loadDashboard();
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <XIcon size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[1.3rem] font-bold hover:bg-black cursor-pointer transition-colors shrink-0"
                  >
                    Search
                  </button>
                </form>

                {/* Filter Selects & Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-[1.3rem] font-bold bg-white text-gray-800 cursor-pointer hover:border-gray-400 outline-none focus:border-[#0445DA]"
                  >
                    <option value="">All Statuses</option>
                    <option value="draft">Draft (In Progress)</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={filterFee}
                    onChange={(e) => setFilterFee(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-[1.3rem] font-bold bg-white text-gray-800 cursor-pointer hover:border-gray-400 outline-none focus:border-[#0445DA]"
                  >
                    <option value="">Registration Fee</option>
                    <option value="1">Fee Paid (₹3,000)</option>
                    <option value="0">Fee Unpaid</option>
                  </select>

                  <select
                    value={filterSub}
                    onChange={(e) => setFilterSub(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-[1.3rem] font-bold bg-white text-gray-800 cursor-pointer hover:border-gray-400 outline-none focus:border-[#0445DA]"
                  >
                    <option value="">Subscription</option>
                    <option value="1">VIP Active (₹2,000)</option>
                    <option value="0">VIP Inactive</option>
                  </select>

                  <select
                    value={filterDocs}
                    onChange={(e) => setFilterDocs(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-[1.3rem] font-bold bg-white text-gray-800 cursor-pointer hover:border-gray-400 outline-none focus:border-[#0445DA]"
                  >
                    <option value="">Documents</option>
                    <option value="1">Submitted</option>
                    <option value="0">Pending</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadDashboard}
                    className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                    title="Refresh Table"
                  >
                    <RefreshIcon size={16} />
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-[1.25rem] font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                    >
                      <XIcon size={14} /> Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-bar showing result count */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[1.25rem] text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>
                    Showing <strong className="text-gray-900 font-bold">{applications.length}</strong> {applications.length === 1 ? 'driver application' : 'driver applications'}
                  </span>
                </div>
                {hasActiveFilters && (
                  <span className="text-blue-600 font-medium">Filtered view active</span>
                )}
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white border border-gray-200/90 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1080px]">
                  <thead>
                    <tr className="bg-gray-50/90 border-b border-gray-200 text-gray-500 text-[1.2rem] font-extrabold uppercase tracking-wider">
                      <th className="py-4 px-4 text-center w-14">ID</th>
                      <th className="py-4 px-4 min-w-[160px]">Driver</th>
                      <th className="py-4 px-4 min-w-[150px]">Mobile Identifier</th>
                      <th className="py-4 px-4 min-w-[140px]">Vehicle</th>
                      <th className="py-4 px-4 min-w-[130px]">Progress</th>
                      <th className="py-4 px-3 text-center min-w-[100px]">Fee (₹3k)</th>
                      <th className="py-4 px-3 text-center min-w-[100px]">Sub (₹2k)</th>
                      <th className="py-4 px-3 text-center min-w-[110px]">Documents</th>
                      <th className="py-4 px-3 text-center min-w-[130px]">Status</th>
                      <th className="py-4 px-4 text-right sticky right-0 bg-gray-50/90 shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.03)] min-w-[110px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[1.35rem]">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-16 text-center text-gray-400 italic">
                          No driver records found matching the active filters.
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="py-4 px-4 text-center font-mono font-bold text-gray-400">
                            #{app.id}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-gray-900 text-white font-bold text-[1.2rem] flex items-center justify-center shrink-0">
                                {getInitials(app.name)}
                              </div>
                              <span className="font-bold text-gray-950 truncate max-w-[180px]">
                                {app.name || <span className="text-gray-400 italic font-normal">Pending Name</span>}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-gray-900">
                            {app.phone ? (
                              <span className="inline-flex items-center gap-1.5 text-gray-900">
                                <PhoneIcon size={14} className="text-gray-400" />
                                +91 {app.phone}
                              </span>
                            ) : (
                              <span className="text-amber-600 font-sans italic text-[1.2rem]">Pending</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-gray-700">
                            <div className="flex items-center gap-1.5">
                              <TruckIcon size={15} className="text-gray-400 shrink-0" />
                              <span className="font-medium text-gray-900">
                                {getVehicleLabel(app.vehicle_category)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            <span className="px-2.5 py-1 bg-gray-100 rounded-lg font-bold text-gray-800 text-[1.2rem] whitespace-nowrap">
                              {getStepLabel(app.current_step, app.status)}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-center">
                            {app.fee_paid === 1 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[1.2rem] font-bold">
                                Paid ✓
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[1.2rem] font-bold">
                                Unpaid
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {app.subscription_paid === 1 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[1.2rem] font-bold">
                                Active ✓
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[1.2rem] font-medium">
                                None
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {app.documents_submitted === 1 ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[1.25rem]">
                                <CheckIcon size={14} className="text-emerald-600 stroke-[3]" /> Submitted
                              </span>
                            ) : (
                              <span className="text-gray-400 text-[1.25rem]">Pending</span>
                            )}
                          </td>
                          <td className="py-4 px-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[1.2rem] font-bold capitalize whitespace-nowrap ${
                                app.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : app.status === 'under_review'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  app.status === 'approved'
                                    ? 'bg-emerald-600'
                                    : app.status === 'rejected'
                                    ? 'bg-red-600'
                                    : app.status === 'under_review'
                                    ? 'bg-blue-600'
                                    : 'bg-amber-600'
                                }`}
                              />
                              {app.status ? app.status.replace('_', ' ') : 'Draft'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right sticky right-0 bg-white group-hover:bg-[#F3F7FD] shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.03)] transition-colors">
                            <button
                              type="button"
                              onClick={() => handleOpenReview(app.id)}
                              className="px-4 py-2 bg-[#0F172A] hover:bg-[#0445DA] text-white text-[1.25rem] font-bold rounded-xl cursor-pointer transition-colors shadow-xs"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-gray-400 text-[1.25rem] border-t border-gray-200">
        Smart Driver Operations Portal © 2026. Confidential &amp; Internal.
      </footer>
    </div>
  );
};
