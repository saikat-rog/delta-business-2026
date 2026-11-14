import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { StatusPage } from './pages/StatusPage';
import { StatusDetailsPage } from './pages/StatusDetailsPage';
import { AdminPage } from './pages/AdminPage';
import { detectUserState } from './utils/stateDetection';

function getPathFromLocation(): string {
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/register')) return '/register';
  if (path.startsWith('/status-details') || path.startsWith('/status/details')) return '/status-details';
  if (path.startsWith('/status') || path.startsWith('/login')) return '/status';
  if (path.startsWith('/admin')) return '/admin';

  // Also support hash fallback (e.g. #/register)
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash.startsWith('/register')) return '/register';
  if (hash.startsWith('/status-details') || hash.startsWith('/status/details')) return '/status-details';
  if (hash.startsWith('/status') || hash.startsWith('/login')) return '/status';
  if (hash.startsWith('/admin')) return '/admin';

  return '/';
}

export const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<string>(() => {
    return localStorage.getItem('smart_driver_state') || 'Punjab';
  });

  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('tata-ace');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPathFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    setCurrentPath(basePath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/register') {
    return (
      <RegisterPage
        currentState={currentState}
        initialVehicle={selectedVehicle}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPath === '/status-details' || currentPath.startsWith('/status-details') || currentPath.startsWith('/status/details')) {
    return <StatusDetailsPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/status' || currentPath.startsWith('/status')) {
    return <StatusPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/admin') {
    return <AdminPage onNavigate={handleNavigate} />;
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
