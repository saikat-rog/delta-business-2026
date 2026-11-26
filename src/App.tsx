import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { StatusPage } from './pages/StatusPage';
import { StatusDetailsPage } from './pages/StatusDetailsPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';
import { detectUserState } from './utils/stateDetection';
import { trackPageView } from './utils/analytics';
import { getStoredDriverPhone, removeDriverToken } from './api/client';
import { UserIcon } from './components/Icons';

const DRIVER_SESSION_KEY = 'smart_driver_logged_in_phone';

function getPathFromLocation(): string {
  const path = window.location.pathname.toLowerCase();
  if (path === '/earnings') return '/earnings';
  if (path === '/my-rides') return '/my-rides';
  if (path.startsWith('/register')) return '/register';
  if (path.startsWith('/status-details') || path.startsWith('/status/details')) return '/status-details';
  if (path === '/status' || path === '/status/' || path === '/login' || path === '/login/') return '/login';
  if (path.startsWith('/admin')) return '/admin';
  if (path.startsWith('/profile')) return '/profile';

  // Also support hash fallback (e.g. #/register)
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash === '/earnings') return '/earnings';
  if (hash === '/my-rides') return '/my-rides';
  if (hash.startsWith('/register')) return '/register';
  if (hash.startsWith('/status-details') || hash.startsWith('/status/details')) return '/status-details';
  if (hash === '/status' || hash === '/login') return '/login';
  if (hash.startsWith('/admin')) return '/admin';
  if (hash.startsWith('/profile')) return '/profile';

  return '/';
}

export const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<string>(() => {
    return localStorage.getItem('smart_driver_state') || 'Punjab';
  });

  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('tata-ace');
  const [applicationVersion, setApplicationVersion] = useState(0);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPathFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const phone = getStoredDriverPhone();
    if (currentPath === '/profile' && phone) {
      localStorage.setItem(DRIVER_SESSION_KEY, phone);
    }
    if (currentPath === '/login' && /^\/status\/?$/i.test(window.location.pathname)) {
      window.history.replaceState(window.history.state, '', `/login${window.location.search}`);
    }
    trackPageView();
  }, [currentPath]);

  // Auto-detect state once on initial load
  useEffect(() => {
    const isManual = localStorage.getItem('smart_driver_state_manual') === 'true';
    if (isManual) return;

    let cancelled = false;
    detectUserState().then((detectedState) => {
      if (!cancelled && detectedState) {
        setCurrentState(detectedState);
        localStorage.setItem('smart_driver_state', detectedState);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStateChange = (stateName: string) => {
    setCurrentState(stateName);
    localStorage.setItem('smart_driver_state', stateName);
    localStorage.setItem('smart_driver_state_manual', 'true');
  };

  const handleNavigate = (path: string, vehicle?: string) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    window.history.pushState({}, '', path);
    const basePath = path.split('?')[0].toLowerCase();
    const phone = getStoredDriverPhone();
    if (basePath === '/profile' && phone) {
      localStorage.setItem(DRIVER_SESSION_KEY, phone);
    }
    setCurrentPath(basePath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/register') {
    const phone = getStoredDriverPhone();
    if (phone && localStorage.getItem(DRIVER_SESSION_KEY) === phone) {
      const logOutAndApply = () => {
        localStorage.removeItem(DRIVER_SESSION_KEY);
        localStorage.removeItem('smart_driver_phone');
        localStorage.removeItem('smart_driver_id');
        localStorage.removeItem('smart_driver_profile_name');
        localStorage.removeItem('smart_driver_profile_vehicle');
        removeDriverToken();
        setApplicationVersion((version) => version + 1);
      };

      return (
        <div className="flex min-h-dvh flex-col bg-white">
          <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto flex h-18 max-w-[1140px] items-center px-5">
              <a href="/" aria-label="Smart Driver home">
                <img src="/logo2.png" alt="Smart Driver" className="h-10 w-auto" />
              </a>
            </div>
          </header>
          <main className="grid flex-1 place-items-center px-6 py-12">
            <section aria-labelledby="signed-in-title" className="w-full max-w-[440px] text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-blue-50 text-[#0445DA]">
                <UserIcon size={34} aria-hidden="true" />
              </div>
              <h1 id="signed-in-title" className="mt-6 text-[2.8rem] font-bold leading-tight tracking-tight text-neutral-950">You’re already logged in</h1>
              <p className="mx-auto mt-3 max-w-[320px] text-[1.5rem] leading-relaxed text-neutral-600">To apply as a new driver, log out of your current account first.</p>
              <div className="mx-auto mt-8 grid max-w-[380px] grid-cols-2 gap-2">
                <button type="button" onClick={() => handleNavigate('/profile')} className="flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0445DA] px-4 py-3 text-[1.5rem] font-semibold text-white hover:bg-[#0336aa]">
                  Cancel
                </button>
                <button type="button" onClick={logOutAndApply} className="min-h-12 cursor-pointer rounded-xl bg-red-700 px-4 py-3 text-[1.45rem] font-semibold text-white hover:bg-red-800">
                  Logout
                </button>
              </div>
            </section>
          </main>
        </div>
      );
    }
    return (
      <RegisterPage
        key={applicationVersion}
        currentState={currentState}
        initialVehicle={selectedVehicle}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPath === '/status-details' || currentPath.startsWith('/status-details') || currentPath.startsWith('/status/details')) {
    return <StatusDetailsPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/login') {
    return <StatusPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/admin') {
    return <AdminPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/profile' || currentPath === '/earnings' || currentPath === '/my-rides') {
    return <ProfilePage key={currentPath} onNavigate={handleNavigate} view={currentPath} />;
  }

  return (
    <HomePage
      currentState={currentState}
      onStateChange={handleStateChange}
      onNavigate={handleNavigate}
    />
  );
};

export default App;
