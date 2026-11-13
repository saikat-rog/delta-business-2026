// Strictly read from .env with no fallback
const envApiUrl = ((import.meta.env.VITE_API_URL as string) || '').trim().replace(/\/+$/, '');

export const API_BASE = envApiUrl.endsWith('/api') ? envApiUrl : `${envApiUrl}/api`;
export const BACKEND_URL = envApiUrl.replace(/\/api$/, '');

export function getDocumentUrl(filePath: string): string {
  if (!filePath) return '';
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return `${BACKEND_URL}${cleanPath}`;
}

export interface DriverData {
  id: number;
  phone: string;
  name: string;
  email?: string;
  city: string;
  dob?: string;
  gender?: string;
  address?: string;
  vehicle_category: string;
  vehicle_model?: string;
  vehicle_number: string;
  dl_number: string;
  dl_expiry?: string;
  aadhaar_number?: string;
  pan_number?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  upi_id?: string;
  status: 'submitted' | 'under_review' | 'action_required' | 'approved' | 'rejected';
  fee_paid: number;
  fee_amount: number;
  fee_tx_id?: string;
  fee_paid_at?: string;
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

// Driver API methods
export async function checkPhoneRegistered(phone: string): Promise<{ success: boolean; exists?: boolean; message?: string; driver?: any }> {
  try {
    const res = await fetch(`${API_BASE}/auth/check-phone?phone=${encodeURIComponent(phone)}`);
    return await res.json();
  } catch {
    return { success: false, exists: false };
  }
}

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

// Admin API methods
export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getAdminStats() {
  const token = getAdminToken();
  if (!token) return { success: false, message: 'Admin not logged in' };

  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getAdminApplications(status = '', search = '', feePaid = '') {
  const token = getAdminToken();
  if (!token) return { success: false, message: 'Admin not logged in' };

  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  if (feePaid !== '') params.append('fee_paid', feePaid);

  const res = await fetch(`${API_BASE}/admin/applications?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getAdminApplicationDetail(id: number) {
  const token = getAdminToken();
  if (!token) return { success: false, message: 'Admin not logged in' };

  const res = await fetch(`${API_BASE}/admin/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateAdminApplicationStatus(id: number, status: string, admin_notes?: string) {
  const token = getAdminToken();
  if (!token) return { success: false, message: 'Admin not logged in' };

  const res = await fetch(`${API_BASE}/admin/applications/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, admin_notes }),
  });
  return res.json();
}

export async function updateAdminApplicationFee(id: number, fee_paid: boolean, fee_tx_id?: string) {
  const token = getAdminToken();
  if (!token) return { success: false, message: 'Admin not logged in' };

  const res = await fetch(`${API_BASE}/admin/applications/${id}/fee`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fee_paid, fee_tx_id }),
  });
  return res.json();
}
