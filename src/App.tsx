import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { StatusPage } from './pages/StatusPage';
import { AdminPage } from './pages/AdminPage';
import { detectUserCity } from './utils/cityDetection';
import { getDriverToken } from './api/client';

function getPathFromLocation(): string {
  const token = getDriverToken();
  const path = window.location.pathname.toLowerCase();
  // If someone already started/has a registration, show them the status page instead of register
  if (path.startsWith('/register')) return token ? '/status' : '/register';
  if (path.startsWith('/status') || path.startsWith('/login')) return '/status';
  if (path.startsWith('/admin')) return '/admin';

  // Also support hash fallback (e.g. #/register)
  const hash = window.location.hash.toLowerCase().replace('#', '');
  if (hash.startsWith('/register')) return token ? '/status' : '/register';
  if (hash.startsWith('/status') || hash.startsWith('/login')) return '/status';
  if (hash.startsWith('/admin')) return '/admin';

  return '/';
}

export const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState<string>(() => {
    return localStorage.getItem('smart_driver_city') || 'bangalore';
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

  // Auto-detect city once on initial load
  useEffect(() => {
    const isManual = localStorage.getItem('smart_driver_city_manual') === 'true';
    if (isManual) return;

    let cancelled = false;
    detectUserCity().then((detectedCity) => {
      if (!cancelled && detectedCity) {
        setCurrentCity(detectedCity);
        localStorage.setItem('smart_driver_city', detectedCity);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
    localStorage.setItem('smart_driver_city', city);
    localStorage.setItem('smart_driver_city_manual', 'true');
  };

  const handleNavigate = (path: string, vehicle?: string) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    // If user has already registered / started, don't show register form again, send to status
    if (path === '/register' && getDriverToken()) {
      path = '/status';
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/register') {
    if (getDriverToken()) {
      return <StatusPage onNavigate={handleNavigate} />;
    }
    return (
      <RegisterPage
        currentCity={currentCity}
        initialVehicle={selectedVehicle}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentPath === '/status') {
    return <StatusPage onNavigate={handleNavigate} />;
  }

  if (currentPath === '/admin') {
    return <AdminPage onNavigate={handleNavigate} />;
  }

  return (
    <HomePage
      currentCity={currentCity}
      onCityChange={handleCityChange}
      onNavigate={handleNavigate}
    />
  );
};

export default App;
