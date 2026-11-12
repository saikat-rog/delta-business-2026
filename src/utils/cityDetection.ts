interface CityCoords {
  name: string;
  lat: number;
  lng: number;
}

const SUPPORTED_CITY_COORDS: CityCoords[] = [
  { name: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'visakhapatnam', lat: 17.6868, lng: 83.2185 },
  { name: 'kanpur', lat: 26.4499, lng: 80.3319 },
  { name: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { name: 'delhi', lat: 28.6139, lng: 77.209 },
  { name: 'hyderabad', lat: 17.385, lng: 78.4867 },
  { name: 'jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'ludhiana', lat: 30.901, lng: 75.8573 },
  { name: 'mumbai', lat: 19.076, lng: 72.8777 },
  { name: 'nagpur', lat: 21.1458, lng: 79.0882 },
  { name: 'nashik', lat: 19.9975, lng: 73.7898 },
  { name: 'pune', lat: 18.5204, lng: 73.8567 },
  { name: 'surat', lat: 21.1702, lng: 72.8311 },
  { name: 'trivandrum', lat: 8.5241, lng: 76.9366 },
  { name: 'vadodara', lat: 22.3072, lng: 73.1812 },
  { name: 'indore', lat: 22.7196, lng: 75.8577 },
];

const CITY_ALIASES: Record<string, string> = {
  bengaluru: 'bangalore',
  'new delhi': 'delhi',
  gurgaon: 'delhi',
  gurugram: 'delhi',
  noida: 'delhi',
  ghaziabad: 'delhi',
  faridabad: 'delhi',
  'navi mumbai': 'mumbai',
  thane: 'mumbai',
  bombay: 'mumbai',
  calcutta: 'kolkata',
  howrah: 'kolkata',
  madras: 'Chennai',
  thiruvananthapuram: 'trivandrum',
  vizag: 'visakhapatnam',
  baroda: 'vadodara',
  cochin: 'kochi',
  secunderabad: 'hyderabad',
  mohali: 'chandigarh',
  panchkula: 'chandigarh',
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

export function findNearestSupportedCity(lat: number, lng: number): string {
  let closest = SUPPORTED_CITY_COORDS[0];
  let minDist = Infinity;

  for (const city of SUPPORTED_CITY_COORDS) {
    const dist = haversineKm(lat, lng, city.lat, city.lng);
    if (dist < minDist) {
      minDist = dist;
      closest = city;
    }
  }
  return closest.name;
}

export function matchCityByName(rawName: string): string | null {
  const normalized = rawName.trim().toLowerCase();
  if (!normalized) return null;

  if (CITY_ALIASES[normalized]) {
    return CITY_ALIASES[normalized];
  }

  const exact = SUPPORTED_CITY_COORDS.find((c) => c.name.toLowerCase() === normalized);
  return exact ? exact.name : null;
}

function getBrowserPosition(timeoutMs = 5000): Promise<GeolocationPosition> {
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

export async function detectUserCity(): Promise<string | null> {
  try {
    const pos = await getBrowserPosition();
    return findNearestSupportedCity(pos.coords.latitude, pos.coords.longitude);
  } catch {
    // Fallback to IP-based geolocation if browser geolocation is denied/unavailable
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) return null;
      const data = await res.json();

      if (typeof data.city === 'string') {
        const matched = matchCityByName(data.city);
        if (matched) return matched;
      }
      if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        return findNearestSupportedCity(data.latitude, data.longitude);
      }
    } catch {
      return null;
    }
    return null;
  }
}
