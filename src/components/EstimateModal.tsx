import React, { useState } from 'react';

export type ServiceType = 'trucks' | 'bike' | 'packers-movers';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  currentCity: string;
}

interface FareResult {
  vehicleName: string;
  vehicleImage: string;
  capacity: string;
  price: string;
  timeEstimate: string;
  distance: string;
}

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  onClose,
  initialService = 'trucks',
  currentCity,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceType>(initialService);
  const [userType, setUserType] = useState<'personal' | 'business'>('personal');

  const cityNameCapitalized = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

  // Form states
  const [pickup, setPickup] = useState(`Indiranagar, ${cityNameCapitalized}`);
  const [drop, setDrop] = useState(`Koramangala, ${cityNameCapitalized}`);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState('Personal Goods');
  const [houseSize, setHouseSize] = useState('1 BHK');
  const [truckType, setTruckType] = useState('Tata Ace');
  const [consent, setConsent] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const calculateEstimate = (): FareResult => {
    switch (selectedService) {
      case 'bike':
        return {
          vehicleName: 'Two Wheeler (20 kg)',
          vehicleImage: 'https://dom-content-vault-prod-cdn-assets.porter.in/two_wheelers_ea30db4d2d/two_wheelers_ea30db4d2d.webp',
          capacity: 'Up to 20 kg • 40 x 40 x 40 cm',
          price: '₹149 - ₹189',
          timeEstimate: '18 mins away • 25 mins trip',
          distance: '7.8 km',
        };
      case 'trucks':
        return {
          vehicleName: truckType,
          vehicleImage: 'https://dom-content-vault-prod-cdn-assets.porter.in/trucks_india_a42dcdfc61/trucks_india_a42dcdfc61.webp',
          capacity: '750 kg payload • 7ft x 4ft x 5ft',
          price: '₹489 - ₹599',
          timeEstimate: '12 mins away • 35 mins trip',
          distance: '7.8 km',
        };
      case 'packers-movers':
        return {
          vehicleName: `Smart Driver Packers & Movers (${houseSize})`,
          vehicleImage: 'https://dom-content-vault-prod-cdn-assets.porter.in/Pn_M_56aa8e7af2_4b05aeef37_285939a114/Pn_M_56aa8e7af2_4b05aeef37_285939a114.webp',
          capacity: 'Dedicated Truck + 2 Helpers + Complete Packing',
          price: houseSize === '1 RK' ? '₹3,499' : houseSize === '1 BHK' ? '₹4,999' : houseSize === '2 BHK' ? '₹7,499' : '₹10,999',
          timeEstimate: 'Slot: Morning 9:00 AM',
          distance: `Intracity Shifting in ${cityNameCapitalized}`,
        };
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        padding: '12px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up p-5 md:p-7"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '94vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Get an Estimate
            </h3>
            <p style={{ fontSize: '1.3rem', color: '#666', marginTop: '2px', margin: 0 }}>
              Hassle-free goods transportation in <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#0445DA' }}>{currentCity}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img
              src="https://dom-content-vault-prod-cdn-assets.porter.in/cross_20_grey_142dd64290_e37e09230d.svg"
              alt="Close"
              width="16"
              height="16"
            />
          </button>
        </div>

        {/* Service Tabs */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => { setSelectedService('trucks'); setShowResult(false); }}
            style={{
              flex: 1,
              padding: '8px 4px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '1.25rem',
              cursor: 'pointer',
              backgroundColor: selectedService === 'trucks' ? '#0445DA' : '#f5f7fa',
              color: selectedService === 'trucks' ? '#ffffff' : '#555',
              transition: 'all 0.2s ease',
              textAlign: 'center',
            }}
          >
            🚚 Trucks
          </button>
          <button
            type="button"
            onClick={() => { setSelectedService('bike'); setShowResult(false); }}
            style={{
              flex: 1,
              padding: '8px 4px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '1.25rem',
              cursor: 'pointer',
              backgroundColor: selectedService === 'bike' ? '#0445DA' : '#f5f7fa',
              color: selectedService === 'bike' ? '#ffffff' : '#555',
              transition: 'all 0.2s ease',
              textAlign: 'center',
            }}
          >
            🛵 2-Wheeler
          </button>
          <button
            type="button"
            onClick={() => { setSelectedService('packers-movers'); setShowResult(false); }}
            style={{
              flex: 1,
              padding: '8px 4px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 700,
              fontSize: '1.25rem',
              cursor: 'pointer',
              backgroundColor: selectedService === 'packers-movers' ? '#0445DA' : '#f5f7fa',
              color: selectedService === 'packers-movers' ? '#ffffff' : '#555',
              transition: 'all 0.2s ease',
              textAlign: 'center',
            }}
          >
            📦 Packers &amp; Movers
          </button>
        </div>

        {/* User Type Toggle */}
        <div style={{ display: 'inline-flex', backgroundColor: '#f0f2f7', padding: '3px', borderRadius: '8px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setUserType('personal')}
            style={{
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '1.2rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: userType === 'personal' ? '#ffffff' : 'transparent',
              color: userType === 'personal' ? '#0445DA' : '#666',
              boxShadow: userType === 'personal' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            Personal User
          </button>
          <button
            type="button"
            onClick={() => setUserType('business')}
            style={{
              padding: '5px 14px',
              borderRadius: '6px',
              fontSize: '1.2rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: userType === 'business' ? '#ffffff' : 'transparent',
              color: userType === 'business' ? '#0445DA' : '#666',
              boxShadow: userType === 'business' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            Business User
          </button>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Pickup & Drop Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Pickup Location
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '9px 12px', backgroundColor: '#fafafa' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00875a', marginRight: '8px', flexShrink: 0 }} />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder={`Sending From (e.g. Indiranagar, ${cityNameCapitalized})`}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1.35rem', color: '#1a1a1a' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Drop Location
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '9px 12px', backgroundColor: '#fafafa' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#de350b', marginRight: '8px', flexShrink: 0 }} />
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder={`Sending To (e.g. Koramangala, ${cityNameCapitalized})`}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1.35rem', color: '#1a1a1a' }}
                />
              </div>
            </div>
          </div>

          {/* Service-Specific Options */}
          <div>
            <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
              What describes your cargo?
            </label>
            <select
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1.35rem',
                outline: 'none',
                backgroundColor: '#fafafa',
              }}
            >
              <option value="Personal Goods">Personal Goods / Home Shifting</option>
              <option value="Business Delivery">Business Delivery / B2B Commercial Goods</option>
              <option value="Electronics">Electronics &amp; Appliances</option>
              <option value="Industrial Materials">Hardware &amp; Industrial Equipment</option>
            </select>
          </div>

          {selectedService === 'trucks' && (
            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Select Truck Type
              </label>
              <select
                value={truckType}
                onChange={(e) => setTruckType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1.35rem',
                  outline: 'none',
                  backgroundColor: '#fafafa',
                }}
              >
                <option value="Tata Ace">Tata Ace / Chota Hathi (Payload: 750 kg)</option>
                <option value="3 Wheeler / Champion">3 Wheeler / Champion (Payload: 500 kg)</option>
                <option value="Pickup 8ft">Pickup 8ft (Payload: 1200 kg)</option>
                <option value="Tata 407">Tata 407 (Payload: 2500 kg)</option>
              </select>
            </div>
          )}

          {selectedService === 'packers-movers' && (
            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Select House Size
              </label>
              <select
                value={houseSize}
                onChange={(e) => setHouseSize(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1.35rem',
                  outline: 'none',
                  backgroundColor: '#fafafa',
                }}
              >
                <option value="1 RK">1 RK (Single room shifting)</option>
                <option value="1 BHK">1 BHK (Standard 1 bedroom flat)</option>
                <option value="2 BHK">2 BHK (Complete household shifting)</option>
                <option value="3 BHK">3 BHK / Villa (Large home relocation)</option>
              </select>
            </div>
          )}

          {/* Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1.35rem',
                  outline: 'none',
                  backgroundColor: '#fafafa',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '1.25rem', fontWeight: 600, color: '#333', marginBottom: '4px' }}>
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit number"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1.35rem',
                  outline: 'none',
                  backgroundColor: '#fafafa',
                }}
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '1.15rem', color: '#666', cursor: 'pointer', marginTop: '2px' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: '2px' }}
            />
            <span>
              By checking this, you give consent to Smart Driver to reach out to you via phone/WhatsApp to help with booking, etc.
            </span>
          </label>

          {/* Action Buttons */}
          <div style={{ marginTop: '10px' }}>
            {!showResult ? (
              <button
                type="button"
                onClick={() => {
                  if (!pickup || !drop) {
                    alert('Please enter pickup and drop locations to get an accurate estimate.');
                    return;
                  }
                  setShowResult(true);
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#0445DA',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(4, 69, 218, 0.35)',
                }}
              >
                <span>Get Estimate</span>
                <span>→</span>
              </button>
            ) : (
              /* Estimate Breakdown Result */
              <div
                className="animate-fade-in"
                style={{
                  backgroundColor: '#f8faff',
                  border: '2px solid #0445DA',
                  borderRadius: '14px',
                  padding: '16px',
                  marginTop: '6px',
                }}
              >
                {bookingSuccess ? (
                  <div style={{ textAlign: 'center', padding: '14px 0' }}>
                    <div style={{ fontSize: '2.8rem', marginBottom: '6px' }}>🎉</div>
                    <h4 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#00875a', marginBottom: '4px' }}>
                      Booking Confirmed!
                    </h4>
                    <p style={{ fontSize: '1.35rem', color: '#555', margin: 0 }}>
                      Your Smart Driver partner will be assigned shortly. Live tracking link sent to your mobile.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setBookingSuccess(false);
                        setShowResult(false);
                      }}
                      style={{
                        marginTop: '14px',
                        backgroundColor: '#0445DA',
                        color: '#ffffff',
                        padding: '8px 22px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  (() => {
                    const est = calculateEstimate();
                    return (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div>
                            <span style={{ fontSize: '1.15rem', color: '#666', textTransform: 'uppercase', fontWeight: 700 }}>
                              Estimated Fare
                            </span>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0445DA' }}>
                              {est.price}
                            </div>
                          </div>
                          <img
                            src={est.vehicleImage}
                            alt={est.vehicleName}
                            width="60"
                            height="60"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>

                        <div style={{ borderTop: '1px solid #e0e7ff', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '1.25rem', color: '#444' }}>
                          <div><strong>Vehicle:</strong> {est.vehicleName}</div>
                          <div><strong>Capacity:</strong> {est.capacity}</div>
                          <div><strong>Estimated Time:</strong> {est.timeEstimate}</div>
                          <div><strong>Distance:</strong> {est.distance}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setBookingSuccess(true)}
                          style={{
                            width: '100%',
                            marginTop: '14px',
                            backgroundColor: '#00875a',
                            color: '#ffffff',
                            padding: '11px',
                            borderRadius: '8px',
                            fontSize: '1.45rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 135, 90, 0.3)',
                          }}
                        >
                          Book Now with Smart Driver
                        </button>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
