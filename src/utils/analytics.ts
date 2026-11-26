type AnalyticsValue = string | number | boolean;
type AnalyticsParameters = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => number;
    };
    _fbq?: Window['fbq'];
  }
}

const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID?.trim();
const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

let initialized = false;
let lastTrackedPath = '';

function appendScript(id: string, src: string): void {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function initializeAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (googleAnalyticsId) {
    appendScript(
      'google-analytics-script',
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`,
    );
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag('js', new Date());
    window.gtag('config', googleAnalyticsId, { send_page_view: false });
  }

  if (metaPixelId) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    }) as NonNullable<Window['fbq']>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;
    appendScript('meta-pixel-script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', metaPixelId);
  }
}

export function trackPageView(): void {
  if (typeof window === 'undefined') return;

  // Query strings can contain a phone number on the status page, so never send
  // them to analytics providers.
  const pagePath = window.location.pathname;
  if (pagePath === lastTrackedPath) return;
  lastTrackedPath = pagePath;

  if (googleAnalyticsId) {
    window.gtag?.('event', 'page_view', {
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
      page_title: document.title,
    });
  }

  if (metaPixelId) window.fbq?.('track', 'PageView');
}

export function trackEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
  metaEventName?: string,
): void {
  if (googleAnalyticsId) window.gtag?.('event', eventName, parameters);
  if (metaPixelId) {
    window.fbq?.('trackCustom', metaEventName || eventName, parameters);
  }
}

