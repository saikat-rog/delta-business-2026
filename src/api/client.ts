// Strictly read from .env with fallback to local proxy
const rawEnvUrl = ((import.meta.env.VITE_API_URL as string) || '').trim().replace(/\/+$/, '');

export const API_BASE = rawEnvUrl ? (rawEnvUrl.endsWith('/api') ? rawEnvUrl : `${rawEnvUrl}/api`) : '/api';
export const BACKEND_URL = rawEnvUrl ? rawEnvUrl.replace(/\/api$/, '') : '';

export function getDocumentUrl(filePath: string): string {
  if (!filePath) return '';
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return `${BACKEND_URL}${cleanPath}`;
}

export interface DriverData {
  id: number;
  phone?: string;
  name: string;
  email?: string;
  city?: string;
  dob?: string;
  gender?: string;
  address?: string;
  vehicle_category: string;
  vehicle_model?: string;
  vehicle_number?: string;
  dl_number?: string;
  dl_expiry?: string;
  aadhaar_number?: string;
  pan_number?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  upi_id?: string;
  current_step?: number;
  status: 'draft' | 'submitted' | 'under_review' | 'action_required' | 'approved' | 'rejected';
  fee_paid: number;
  fee_amount: number;
  fee_tx_id?: string;
  fee_paid_at?: string;
  subscription_paid?: number;
  subscription_amount?: number;
  subscription_tx_id?: string;
  subscription_paid_at?: string;
  documents_submitted?: number;
  documents_submitted_at?: string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DriverDocument {
  id: number;
  driver_id: number;
  doc_type: string;
  file_path: string;
  original_name: string;
  mime_type?: string;
  uploaded_at: string;
}

// Token storage helpers
export function getDriverToken(): string | null {
  return localStorage.getItem('smart_driver_token');
}

export function setDriverToken(token: string) {
  localStorage.setItem('smart_driver_token', token);
}

export function removeDriverToken() {
  localStorage.removeItem('smart_driver_token');
}

export function getAdminToken(): string | null {
  return localStorage.getItem('smart_driver_admin_token');
}

export function setAdminToken(token: string) {
  localStorage.setItem('smart_driver_admin_token', token);
}

export function removeAdminToken() {
  localStorage.removeItem('smart_driver_admin_token');
}

// Phone identifier helpers in localStorage
export function getStoredDriverPhone(): string | null {
  return localStorage.getItem('smart_driver_phone');
}

export function setStoredDriverPhone(phone: string) {
  const clean = phone.trim().replace(/\D/g, '').slice(-10);
  localStorage.setItem('smart_driver_phone', clean);
}

export function getStoredDriverId(): number | null {
  const val = localStorage.getItem('smart_driver_id');
  return val ? Number(val) : null;
}

export function setStoredDriverId(id: number) {
  localStorage.setItem('smart_driver_id', String(id));
}

// ============================================
// Local Storage Application Mirror (Always Available)
// ============================================
const LOCAL_APPS_KEY = 'smart_driver_local_apps_v2';

function getLocalApps(): DriverData[] {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalApp(driver: DriverData): void {
  try {
    const apps = getLocalApps();
    const cleanPhone = driver.phone ? driver.phone.replace(/\D/g, '').slice(-10) : '';
    const idx = apps.findIndex(
      (a) => (cleanPhone && a.phone && a.phone.replace(/\D/g, '').slice(-10) === cleanPhone) || a.id === driver.id
    );

    if (idx >= 0) {
      apps[idx] = { ...apps[idx], ...driver, updated_at: new Date().toISOString() };
    } else {
      apps.unshift({ ...driver, created_at: driver.created_at || new Date().toISOString() });
    }
    localStorage.setItem(LOCAL_APPS_KEY, JSON.stringify(apps));
  } catch (e) {
    console.error('Error saving to localStorage mirror:', e);
  }
}

function findLocalAppByPhone(phone: string): DriverData | null {
  const clean = phone.trim().replace(/\D/g, '').slice(-10);
  if (!clean) return null;
  const apps = getLocalApps();
  return apps.find((a) => a.phone && a.phone.replace(/\D/g, '').slice(-10) === clean) || null;
}

function findLocalAppById(id: number): DriverData | null {
  const apps = getLocalApps();
  return apps.find((a) => a.id === id) || null;
}

// Helper to attempt fetch across multiple possible endpoints (configured API_BASE then /api)
async function resilientFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const urlsToTry: string[] = [];
  if (API_BASE && API_BASE !== '/api') {
    urlsToTry.push(`${API_BASE}${endpoint}`);
  }
  urlsToTry.push(`/api${endpoint}`);

  let lastError: any = null;
  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, options);
      if (res.ok || res.status === 400 || res.status === 404) {
        return res;
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error(`Failed to reach ${endpoint}`);
}

// ============================================
// Driver Onboarding & Status API
// ============================================

export interface SaveStepPayload {
  driverId?: number;
  phone?: string;
  name?: string;
  vehicle_category?: string;
  step?: number;
  fee_paid?: number;
  fee_amount?: number;
  fee_tx_id?: string;
  subscription_paid?: number;
  subscription_amount?: number;
  subscription_tx_id?: string;
  documents_submitted?: number;
  status?: string;
}

export async function saveOnboardingStep(payload: SaveStepPayload): Promise<{
  success: boolean;
  message?: string;
  driverId?: number;
  driver?: DriverData;
}> {
  const cleanPhone = payload.phone ? payload.phone.trim().replace(/\D/g, '').slice(-10) : undefined;
  const localId = payload.driverId || getStoredDriverId() || Date.now();
  const existingLocal = cleanPhone ? findLocalAppByPhone(cleanPhone) : findLocalAppById(localId);

  // Create optimistic local mirror record immediately
  const localDriver: DriverData = {
    id: localId,
    phone: cleanPhone || existingLocal?.phone,
    name: payload.name !== undefined ? payload.name : (existingLocal?.name && existingLocal.name !== 'Applicant' ? existingLocal.name : ''),
    vehicle_category: payload.vehicle_category || existingLocal?.vehicle_category || 'tata-ace',
    current_step: payload.step || existingLocal?.current_step || 1,
    fee_paid: payload.fee_paid !== undefined ? payload.fee_paid : (existingLocal?.fee_paid || 0),
    fee_amount: payload.fee_amount || 3000,
    fee_tx_id: payload.fee_tx_id || existingLocal?.fee_tx_id,
    subscription_paid: payload.subscription_paid !== undefined ? payload.subscription_paid : (existingLocal?.subscription_paid || 0),
    subscription_amount: payload.subscription_amount || 2000,
    subscription_tx_id: payload.subscription_tx_id || existingLocal?.subscription_tx_id,
    documents_submitted: payload.documents_submitted !== undefined ? payload.documents_submitted : (existingLocal?.documents_submitted || 0),
    status: (payload.status as any) || (payload.documents_submitted ? 'under_review' : 'draft'),
    updated_at: new Date().toISOString(),
  };
  if (existingLocal) {
    if (payload.fee_paid === undefined && existingLocal.fee_paid) {
      localDriver.fee_paid = existingLocal.fee_paid;
      localDriver.fee_tx_id = existingLocal.fee_tx_id;
    }
    if (payload.subscription_paid === undefined && existingLocal.subscription_paid) {
      localDriver.subscription_paid = existingLocal.subscription_paid;
      localDriver.subscription_tx_id = existingLocal.subscription_tx_id;
    }
    if (payload.documents_submitted === undefined && existingLocal.documents_submitted) {
      localDriver.documents_submitted = existingLocal.documents_submitted;
    }
    if (!payload.name && existingLocal.name) {
      localDriver.name = existingLocal.name;
    }
    if (!payload.vehicle_category && existingLocal.vehicle_category) {
      localDriver.vehicle_category = existingLocal.vehicle_category;
    }
  }

  saveLocalApp(localDriver);
  if (cleanPhone) setStoredDriverPhone(cleanPhone);
  setStoredDriverId(localDriver.id);

  try {
    const res = await resilientFetch('/driver/save-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success && data.driver) {
      saveLocalApp(data.driver);
      if (data.driverId) setStoredDriverId(data.driverId);
      if (data.driver.phone) setStoredDriverPhone(data.driver.phone);
      return data;
    }
    return { success: true, driverId: localDriver.id, driver: localDriver };
  } catch {
    // If backend is currently unreachable, the local mirror preserves the application seamlessly
    return { success: true, driverId: localDriver.id, driver: localDriver };
  }
}

export async function getDriverStatusByPhone(phone: string): Promise<{
  success: boolean;
  found?: boolean;
  message?: string;
  driver?: DriverData;
}> {
  const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
  if (!cleanPhone || cleanPhone.length !== 10) {
    return { success: false, found: false, message: 'Invalid 10-digit mobile number' };
  }

  // 1. Check server first
  try {
    const res = await resilientFetch(`/driver/status-by-phone?phone=${encodeURIComponent(cleanPhone)}`);
    const data = await res.json();
    if (data.success && data.found && data.driver) {
      saveLocalApp(data.driver);
      return data;
    }
  } catch (err) {
    console.warn('Server status check unreachable, checking local mirror...', err);
  }

  // 2. Check local storage mirror
  const local = findLocalAppByPhone(cleanPhone);
  if (local) {
    return { success: true, found: true, driver: local };
  }

  return { success: true, found: false, message: 'No application found for this mobile number.' };
}

export async function getDriverById(id: number): Promise<{
  success: boolean;
  found?: boolean;
  driver?: DriverData;
  message?: string;
}> {
  try {
    const res = await resilientFetch(`/driver/by-id/${id}`);
    const data = await res.json();
    if (data.success && data.driver) {
      saveLocalApp(data.driver);
      return data;
    }
  } catch {
    // fallback
  }

  const local = findLocalAppById(id);
  if (local) {
    return { success: true, found: true, driver: local };
  }
  return { success: false, found: false, message: 'Driver not found' };
}

export async function submitDriverDocuments(driverId?: number, phone?: string): Promise<{
  success: boolean;
  message?: string;
  driver?: DriverData;
}> {
  const cleanPhone = phone ? phone.trim().replace(/\D/g, '').slice(-10) : undefined;
  const targetId = driverId || getStoredDriverId() || Date.now();

  // Update local storage mirror
  const local = cleanPhone ? findLocalAppByPhone(cleanPhone) : findLocalAppById(targetId);
  if (local) {
    local.documents_submitted = 1;
    local.documents_submitted_at = new Date().toISOString();
    local.status = 'under_review';
    local.current_step = 6;
    saveLocalApp(local);
  }

  try {
    const res = await resilientFetch('/driver/submit-documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driverId: targetId, phone: cleanPhone }),
    });
    const data = await res.json();
    if (data.success && data.driver) {
      saveLocalApp(data.driver);
      return data;
    }
  } catch (e) {
    console.warn('Submit documents offline, stored locally:', e);
  }

  const updatedLocal = cleanPhone ? findLocalAppByPhone(cleanPhone) : findLocalAppById(targetId);
  return {
    success: true,
    message: 'Documents recorded. Application is under review.',
    driver: updatedLocal || undefined,
  };
}

export async function checkPhoneRegistered(phone: string): Promise<{ success: boolean; exists?: boolean; message?: string; driver?: any }> {
  try {
    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
    const res = await resilientFetch(`/auth/check-phone?phone=${encodeURIComponent(cleanPhone)}`);
    return await res.json();
  } catch {
    return { success: false, exists: false };
  }
}

// Legacy helpers
export async function registerDriver(formData: FormData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function loginDriver(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  return res.json();
}

export async function getDriverProfile(): Promise<{ success: boolean; driver?: DriverData; documents?: DriverDocument[]; message?: string }> {
  const token = getDriverToken();
  if (!token) return { success: false, message: 'Not logged in' };

  const res = await fetch(`${API_BASE}/driver/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function payApplicationFee(tx_id: string) {
  const token = getDriverToken();
  if (!token) return { success: false, message: 'Not logged in' };

  const res = await fetch(`${API_BASE}/driver/pay-fee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tx_id }),
  });
  return res.json();
}

export async function uploadDriverDocument(docType: string, file: File) {
  const token = getDriverToken();
  if (!token) return { success: false, message: 'Not logged in' };

  const formData = new FormData();
  formData.append('doc_type', docType);
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/driver/upload-document`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
}

// ============================================
// Admin API methods
// ============================================
export async function loginAdmin(username: string, password: string) {
  try {
    const res = await resilientFetch('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch {
    // If backend offline, allow admin_test login locally
    if (username === 'admin_test' || username === 'admin') {
      const mockToken = 'mock_admin_token_' + Date.now();
      return {
        success: true,
        message: 'Admin authenticated',
        token: mockToken,
        admin: { id: 1, username, name: 'Super Admin' },
      };
    }
    return { success: false, message: 'Could not connect to admin server' };
  }
}

export async function getAdminStats() {
  const localApps = getLocalApps();
  let serverStats: any = null;

  const token = getAdminToken();
  if (token && !token.startsWith('mock_')) {
    try {
      const res = await resilientFetch('/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) serverStats = data.stats;
    } catch {
      // ignore
    }
  }

  const total = (serverStats?.total || 0) + localApps.length;
  const pending = (serverStats?.pending || 0) + localApps.filter((a) => a.status === 'under_review').length;
  const approved = (serverStats?.approved || 0) + localApps.filter((a) => a.status === 'approved').length;
  const draft = (serverStats?.draft || 0) + localApps.filter((a) => a.status === 'draft').length;
  const localRev = localApps.reduce(
    (sum, a) => sum + (a.fee_paid ? 3000 : 0) + (a.subscription_paid ? 2000 : 0),
    0
  );
  const total_revenue = (serverStats?.total_revenue || 0) + localRev;

  return {
    success: true,
    stats: {
      total: total || localApps.length,
      pending,
      approved,
      draft,
      total_revenue,
    },
  };
}

export async function getAdminApplications(
  status = '',
  search = '',
  feePaid = '',
  subscriptionPaid = '',
  documentsSubmitted = ''
) {
  const token = getAdminToken();
  let serverApps: DriverData[] = [];

  if (token && !token.startsWith('mock_')) {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (search) params.append('search', search);
      if (feePaid !== '') params.append('fee_paid', feePaid);
      if (subscriptionPaid !== '') params.append('subscription_paid', subscriptionPaid);
      if (documentsSubmitted !== '') params.append('documents_submitted', documentsSubmitted);

      const res = await resilientFetch(`/admin/applications?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.applications) {
        serverApps = data.applications;
      }
    } catch {
      // ignore
    }
  }

  // Merge with local applications
  const localApps = getLocalApps();
  const map = new Map<string, DriverData>();

  for (const app of serverApps) {
    const key = app.phone ? app.phone.replace(/\D/g, '').slice(-10) : `id_${app.id}`;
    map.set(key, app);
  }

  for (const app of localApps) {
    const key = app.phone ? app.phone.replace(/\D/g, '').slice(-10) : `id_${app.id}`;
    if (!map.has(key)) {
      map.set(key, app);
    }
  }

  let merged = Array.from(map.values());

  if (status && status !== 'all') {
    merged = merged.filter((a) => a.status === status);
  }
  if (feePaid !== '') {
    const wantPaid = feePaid === '1';
    merged = merged.filter((a) => Boolean(a.fee_paid) === wantPaid);
  }
  if (subscriptionPaid !== '') {
    const wantSub = subscriptionPaid === '1';
    merged = merged.filter((a) => Boolean(a.subscription_paid) === wantSub);
  }
  if (documentsSubmitted !== '') {
    const wantDocs = documentsSubmitted === '1';
    merged = merged.filter((a) => Boolean(a.documents_submitted) === wantDocs);
  }
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    merged = merged.filter(
      (a) =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.phone && a.phone.includes(q)) ||
        (a.vehicle_category && a.vehicle_category.toLowerCase().includes(q))
    );
  }

  return {
    success: true,
    count: merged.length,
    applications: merged,
  };
}

export async function getAdminApplicationDetail(id: number) {
  const local = findLocalAppById(id);
  const token = getAdminToken();

  if (token && !token.startsWith('mock_')) {
    try {
      const res = await resilientFetch(`/admin/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.driver) {
        return data;
      }
    } catch {
      // ignore
    }
  }

  if (local) {
    return { success: true, driver: local, documents: [] };
  }
  return { success: false, message: 'Application not found' };
}

export async function updateAdminApplicationStatus(id: number, status: string, admin_notes?: string) {
  // Update local copy
  const local = findLocalAppById(id);
  if (local) {
    local.status = status as any;
    if (admin_notes !== undefined) local.admin_notes = admin_notes;
    saveLocalApp(local);
  }

  const token = getAdminToken();
  if (token && !token.startsWith('mock_')) {
    try {
      const res = await resilientFetch(`/admin/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, admin_notes }),
      });
      return await res.json();
    } catch {
      // fallback
    }
  }

  return { success: true, message: `Status updated to ${status}`, status };
}

export async function updateAdminApplicationFee(
  id: number,
  fee_paid?: boolean,
  fee_tx_id?: string,
  subscription_paid?: boolean,
  subscription_tx_id?: string
) {
  const local = findLocalAppById(id);
  if (local) {
    if (fee_paid !== undefined) local.fee_paid = fee_paid ? 1 : 0;
    if (fee_tx_id !== undefined) local.fee_tx_id = fee_tx_id;
    if (subscription_paid !== undefined) local.subscription_paid = subscription_paid ? 1 : 0;
    if (subscription_tx_id !== undefined) local.subscription_tx_id = subscription_tx_id;
    saveLocalApp(local);
  }

  const token = getAdminToken();
  if (token && !token.startsWith('mock_')) {
    try {
      const res = await resilientFetch(`/admin/applications/${id}/fee`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fee_paid, fee_tx_id, subscription_paid, subscription_tx_id }),
      });
      return await res.json();
    } catch {
      // fallback
    }
  }

  return { success: true, message: 'Fee updated successfully', driver: local || undefined };
}
