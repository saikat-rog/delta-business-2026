export interface StateInfo {
  name: string;
  code: string;
  lat: number;
  lng: number;
  capital?: string;
  badge?: string;
}

export const INDIAN_STATES: StateInfo[] = [
  // 28 States
  { name: 'Andhra Pradesh', code: 'AP', lat: 15.9129, lng: 79.7400, capital: 'Amaravati' },
  { name: 'Arunachal Pradesh', code: 'AR', lat: 28.2180, lng: 94.7278, capital: 'Itanagar' },
  { name: 'Assam', code: 'AS', lat: 26.2006, lng: 92.9376, capital: 'Dispur' },
  { name: 'Bihar', code: 'BR', lat: 25.0961, lng: 85.3131, capital: 'Patna' },
  { name: 'Chhattisgarh', code: 'CG', lat: 21.2787, lng: 81.8661, capital: 'Raipur' },
  { name: 'Goa', code: 'GA', lat: 15.2993, lng: 74.1240, capital: 'Panaji' },
  { name: 'Gujarat', code: 'GJ', lat: 22.2587, lng: 71.1924, capital: 'Gandhinagar', badge: 'High Demand' },
  { name: 'Haryana', code: 'HR', lat: 29.0588, lng: 76.0856, capital: 'Chandigarh', badge: 'Popular' },
  { name: 'Himachal Pradesh', code: 'HP', lat: 31.1048, lng: 77.1734, capital: 'Shimla' },
  { name: 'Jharkhand', code: 'JH', lat: 23.6102, lng: 85.2799, capital: 'Ranchi' },
  { name: 'Karnataka', code: 'KA', lat: 15.3173, lng: 75.7139, capital: 'Bengaluru', badge: 'Popular' },
  { name: 'Kerala', code: 'KL', lat: 10.8505, lng: 76.2711, capital: 'Thiruvananthapuram' },
  { name: 'Madhya Pradesh', code: 'MP', lat: 22.9734, lng: 78.6569, capital: 'Bhopal' },
  { name: 'Maharashtra', code: 'MH', lat: 19.7515, lng: 75.7139, capital: 'Mumbai', badge: 'High Demand' },
  { name: 'Manipur', code: 'MN', lat: 24.6637, lng: 93.9063, capital: 'Imphal' },
  { name: 'Meghalaya', code: 'ML', lat: 25.4670, lng: 91.3662, capital: 'Shillong' },
  { name: 'Mizoram', code: 'MZ', lat: 23.1645, lng: 92.9376, capital: 'Aizawl' },
  { name: 'Nagaland', code: 'NL', lat: 26.1584, lng: 94.5624, capital: 'Kohima' },
  { name: 'Odisha', code: 'OR', lat: 20.9517, lng: 85.0985, capital: 'Bhubaneswar' },
  { name: 'Punjab', code: 'PB', lat: 31.1471, lng: 75.3412, capital: 'Chandigarh', badge: 'Popular' },
  { name: 'Rajasthan', code: 'RJ', lat: 27.0238, lng: 74.2179, capital: 'Jaipur' },
  { name: 'Sikkim', code: 'SK', lat: 27.5330, lng: 88.5122, capital: 'Gangtok' },
  { name: 'Tamil Nadu', code: 'TN', lat: 11.1271, lng: 78.6569, capital: 'Chennai', badge: 'High Demand' },
  { name: 'Telangana', code: 'TG', lat: 18.1124, lng: 79.0193, capital: 'Hyderabad', badge: 'Popular' },
  { name: 'Tripura', code: 'TR', lat: 23.9408, lng: 91.9882, capital: 'Agartala' },
  { name: 'Uttar Pradesh', code: 'UP', lat: 26.8467, lng: 80.9462, capital: 'Lucknow', badge: 'High Demand' },
  { name: 'Uttarakhand', code: 'UK', lat: 30.0668, lng: 79.0193, capital: 'Dehradun' },
  { name: 'West Bengal', code: 'WB', lat: 22.9868, lng: 87.8550, capital: 'Kolkata', badge: 'Popular' },

  // 8 Union Territories
  { name: 'Andaman and Nicobar', code: 'AN', lat: 11.7401, lng: 92.6586, capital: 'Port Blair' },
  { name: 'Chandigarh', code: 'CH', lat: 30.7333, lng: 76.7794, capital: 'Chandigarh', badge: 'Active' },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', code: 'DN', lat: 20.4283, lng: 72.8397, capital: 'Daman' },
  { name: 'Delhi (NCT)', code: 'DL', lat: 28.7041, lng: 77.1025, capital: 'New Delhi', badge: 'High Demand' },
  { name: 'Jammu and Kashmir', code: 'JK', lat: 33.7782, lng: 76.5762, capital: 'Srinagar' },
  { name: 'Ladakh', code: 'LA', lat: 34.1526, lng: 77.5771, capital: 'Leh' },
  { name: 'Lakshadweep', code: 'LD', lat: 10.5667, lng: 72.6417, capital: 'Kavaratti' },
  { name: 'Puducherry', code: 'PY', lat: 11.9416, lng: 79.8083, capital: 'Puducherry' },
];

const STATE_ALIASES: Record<string, string> = {
  pb: 'Punjab',
  punjab: 'Punjab',
  hr: 'Haryana',
  haryana: 'Haryana',
  dl: 'Delhi (NCT)',
  delhi: 'Delhi (NCT)',
  'new delhi': 'Delhi (NCT)',
  nct: 'Delhi (NCT)',
  'national capital territory of delhi': 'Delhi (NCT)',
  mh: 'Maharashtra',
  maharashtra: 'Maharashtra',
  ka: 'Karnataka',
  karnataka: 'Karnataka',
  wb: 'West Bengal',
  'west bengal': 'West Bengal',
  bengal: 'West Bengal',
  up: 'Uttar Pradesh',
  'uttar pradesh': 'Uttar Pradesh',
  tn: 'Tamil Nadu',
  'tamil nadu': 'Tamil Nadu',
  tamilnadu: 'Tamil Nadu',
  gj: 'Gujarat',
  gujarat: 'Gujarat',
  rj: 'Rajasthan',
  rajasthan: 'Rajasthan',
  tg: 'Telangana',
  ts: 'Telangana',
  telangana: 'Telangana',
  ap: 'Andhra Pradesh',
  'andhra pradesh': 'Andhra Pradesh',
  kl: 'Kerala',
  kerala: 'Kerala',
  mp: 'Madhya Pradesh',
  'madhya pradesh': 'Madhya Pradesh',
  br: 'Bihar',
  bihar: 'Bihar',
  or: 'Odisha',
  odisha: 'Odisha',
  orissa: 'Odisha',
  as: 'Assam',
  assam: 'Assam',
  jh: 'Jharkhand',
  jharkhand: 'Jharkhand',
  cg: 'Chhattisgarh',
  chhattisgarh: 'Chhattisgarh',
  uk: 'Uttarakhand',
  uttarakhand: 'Uttarakhand',
  uttaranchal: 'Uttarakhand',
  hp: 'Himachal Pradesh',
  'himachal pradesh': 'Himachal Pradesh',
  ga: 'Goa',
  goa: 'Goa',
  jk: 'Jammu and Kashmir',
  'jammu and kashmir': 'Jammu and Kashmir',
  'jammu & kashmir': 'Jammu and Kashmir',
  ch: 'Chandigarh',
  chandigarh: 'Chandigarh',
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestState(lat: number, lng: number): string {
  let closest = INDIAN_STATES[0];
  let minDist = Infinity;

  for (const state of INDIAN_STATES) {
    const dist = haversineKm(lat, lng, state.lat, state.lng);
    if (dist < minDist) {
      minDist = dist;
      closest = state;
    }
  }
  return closest.name;
}

export function matchStateByName(rawName: string): string | null {
  const normalized = rawName.trim().toLowerCase();
  if (!normalized) return null;

  if (STATE_ALIASES[normalized]) {
    return STATE_ALIASES[normalized];
  }

  const exact = INDIAN_STATES.find(
    (s) =>
      s.name.toLowerCase() === normalized ||
      s.code.toLowerCase() === normalized ||
      normalized.includes(s.name.toLowerCase())
  );
  return exact ? exact.name : null;
}

function getBrowserPosition(timeoutMs = 4000): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: timeoutMs,
      maximumAge: 300000,
    });
  });
}

export async function detectUserState(): Promise<string | null> {
  // 1. Try Browser GPS coordinates
  try {
    const pos = await getBrowserPosition(3500);
    const closest = findNearestState(pos.coords.latitude, pos.coords.longitude);
    if (closest) return closest;
  } catch {
    // Continue to IP detection
  }

  // 2. Try IP-based lookup (ipapi.co provides state in data.region)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (typeof data.region === 'string') {
        const matched = matchStateByName(data.region);
        if (matched) return matched;
      }
      if (typeof data.region_code === 'string') {
        const matched = matchStateByName(data.region_code);
        if (matched) return matched;
      }
      if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        return findNearestState(data.latitude, data.longitude);
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Secondary CORS-friendly IP lookup
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data.success && typeof data.region === 'string') {
        const matched = matchStateByName(data.region);
        if (matched) return matched;
      }
      if (data.success && typeof data.region_code === 'string') {
        const matched = matchStateByName(data.region_code);
        if (matched) return matched;
      }
      if (data.success && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        return findNearestState(data.latitude, data.longitude);
      }
    }
  } catch {
    return null;
  }

  return null;
}
