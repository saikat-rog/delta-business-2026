// Singleton instance for Cashfree Web SDK v3
declare global {
  interface Window {
    Cashfree?: (config: { mode: 'sandbox' | 'production' }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: '_modal' | '_self' | '_top' | '_blank';
      }) => Promise<{
        error?: any;
        redirect?: boolean;
        paymentDetails?: any;
      }>;
    };
  }
}

let cashfreeInstance: ReturnType<NonNullable<typeof window.Cashfree>> | null = null;

export function getCashfreeInstance() {
  if (typeof window === 'undefined') return null;

  if (!cashfreeInstance) {
    if (typeof window.Cashfree === 'function') {
      const mode = ((import.meta.env.VITE_CASHFREE_MODE as string) || 'production').toLowerCase() as
        | 'sandbox'
        | 'production';
      cashfreeInstance = window.Cashfree({ mode });
    }
  }

  return cashfreeInstance;
}

export type CheckoutOutcome =
  | { type: 'COMPLETED'; paymentDetails: any }
  | { type: 'DISMISSED'; error?: any }
  | { type: 'REDIRECT' }
  | { type: 'FAILED'; message: string };

export async function openCashfreeCheckout(paymentSessionId: string): Promise<CheckoutOutcome> {
  const cf = getCashfreeInstance();

  if (!cf) {
    // If the script is still loading, wait a brief moment and retry once
    await new Promise((resolve) => setTimeout(resolve, 600));
    const retryCf = getCashfreeInstance();
    if (!retryCf) {
      return {
        type: 'FAILED',
        message: 'Cashfree Payment Gateway SDK is loading or unavailable. Please check your internet connection.',
      };
    }
    return runCheckout(retryCf, paymentSessionId);
  }

  return runCheckout(cf, paymentSessionId);
}

async function runCheckout(
  cf: NonNullable<ReturnType<typeof getCashfreeInstance>>,
  paymentSessionId: string
): Promise<CheckoutOutcome> {
  try {
    const result = await cf.checkout({
      paymentSessionId,
      redirectTarget: '_modal',
    });

    if (result.error) {
      // User closed modal or dropped off - treat neutrally, not as bank failure
      return { type: 'DISMISSED', error: result.error };
    }

    if (result.redirect) {
      return { type: 'REDIRECT' };
    }

    if (result.paymentDetails) {
      return { type: 'COMPLETED', paymentDetails: result.paymentDetails };
    }

    return { type: 'DISMISSED' };
  } catch (err: any) {
    return {
      type: 'FAILED',
      message: err?.message || 'Unable to open Cashfree payment window.',
    };
  }
}
