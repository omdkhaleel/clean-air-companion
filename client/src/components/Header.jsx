import React from 'react';
import { Wind, MapPin, Globe, UserCheck, ShieldCheck, Accessibility, Navigation } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Header({
  language,
  setLanguage,
  isSeniorMode,
  setIsSeniorMode,
  selectedCity,
  onSelectCity,
  onDetectLocation,
  citiesList,
  onOpenProfile,
  hasProfile
}) {
  const t = translations[language] || translations.en;

  return (
    <header className="card" style={{ marginBottom: '20px', borderRadius: '16px', borderBottom: '3px solid var(--primary)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Wind size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t.appName}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          
          {/* City / Locality Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '10px' }}>
            <MapPin size={18} color="var(--primary)" />
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                fontWeight: '600',
                color: 'var(--text-main)',
                cursor: 'pointer',
                outline: 'none',
                padding: '6px 4px'
              }}
              aria-label={t.locationLabel}
            >
              {citiesList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>

            <button
              onClick={onDetectLocation}
              className="btn btn-outline"
              title={t.detectLocation}
              aria-label={t.detectLocation}
              style={{ padding: '6px 10px', minHeight: '36px', border: 'none', background: '#e2e8f0', borderRadius: '8px' }}
            >
              <Navigation size={15} />
            </button>
          </div>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '10px' }}>
            <Globe size={18} color="var(--secondary)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                fontWeight: '600',
                color: 'var(--text-main)',
                cursor: 'pointer',
                outline: 'none',
                padding: '6px 4px'
              }}
              aria-label={t.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Senior Mode One-Click Toggle */}
          <button
            onClick={() => setIsSeniorMode(!isSeniorMode)}
            className="btn"
            style={{
              backgroundColor: isSeniorMode ? '#1e293b' : '#f8fafc',
              color: isSeniorMode ? '#ffffff' : 'var(--text-main)',
              border: isSeniorMode ? '2px solid #0f172a' : '1.5px solid var(--border)',
              fontWeight: '700'
            }}
            title={isSeniorMode ? t.exitSeniorMode : t.seniorMode}
          >
            <Accessibility size={19} color={isSeniorMode ? '#fbbf24' : '#059669'} />
            <span>{isSeniorMode ? t.exitSeniorMode : t.seniorMode}</span>
          </button>

          {/* Household Profile Button */}
          <button
            onClick={onOpenProfile}
            className="btn btn-outline"
            style={{ position: 'relative' }}
            title="Configure Household Profile"
          >
            <UserCheck size={18} color="var(--primary)" />
            <span>{language === 'hi' ? 'परिवार प्रोफाइल' : language === 'ta' ? 'குடும்ப சுயவிவரம்' : 'Family Profile'}</span>
            {hasProfile && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)'
              }} />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
