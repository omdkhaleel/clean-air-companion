import React, { useState, useEffect } from 'react';
import { Home, Wind, AlertTriangle, CheckSquare, Square, Calculator, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';

export default function IndoorAirAssistant({
  ventilationAdvice = {},
  language
}) {
  const t = translations[language] || translations.en;

  // HEPA Purifier CADR Calculator state
  const [roomArea, setRoomArea] = useState(150); // sq ft
  const [ceilingHeight, setCeilingHeight] = useState(10); // ft
  const [calculatedCadrM3, setCalculatedCadrM3] = useState(212);
  const [calculatedCadrCfm, setCalculatedCadrCfm] = useState(125);

  // Household Checklist state (stored in localStorage)
  const defaultChecklist = [
    { id: 'exhaust', text: 'Run kitchen exhaust fan during and 5 minutes after cooking', done: true },
    { id: 'wetmop', text: 'Wet mop floors with microfiber cloth instead of dry broom sweeping', done: true },
    { id: 'noincense', text: 'Avoid burning agarbatti, dhoop, and mosquito coils indoors', done: false },
    { id: 'acfilter', text: 'Wash split AC dust filter mesh every 2 weeks', done: false },
    { id: 'doorgap', text: 'Seal exterior door threshold gap with door draft stopper', done: true },
    { id: 'cleanroom', text: 'Keep bedroom doors closed to maintain purified air zone', done: false }
  ];

  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanair_indoor_checklist');
      return saved ? JSON.parse(saved) : defaultChecklist;
    } catch {
      return defaultChecklist;
    }
  });

  const toggleChecklistItem = (id) => {
    const updated = checklist.map(item => item.id === id ? { ...item, done: !item.done } : item);
    setChecklist(updated);
    try {
      localStorage.setItem('cleanair_indoor_checklist', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleCalculateCadr = (area, height) => {
    const a = parseFloat(area) || 150;
    const h = parseFloat(height) || 10;
    // Volume in cubic feet = a * h
    // Volume in cubic meters = volume_cuft * 0.0283168
    // Recommended ACH (Air Changes per Hour) for polluted seasons = 5 ACH
    const volumeCuFt = a * h;
    const volumeM3 = volumeCuFt * 0.0283168;
    const requiredCadrM3h = Math.round(volumeM3 * 5);
    const requiredCadrCfm = Math.round(requiredCadrM3h / 1.699);

    setCalculatedCadrM3(requiredCadrM3h);
    setCalculatedCadrCfm(requiredCadrCfm);
  };

  const doneCount = checklist.filter(i => i.done).length;
  const progressPercent = Math.round((doneCount / checklist.length) * 100);

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: '#ecfdf5',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Home size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>
            {t.indoorTitle}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t.indoorDesc}
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        
        {/* Left: Smart Ventilation Advisor */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Wind size={20} color="var(--primary)" />
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              {t.smartVentilation}
            </h4>
          </div>

          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', borderLeft: '4px solid var(--primary)', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: '700' }}>
              {t.windowAction}
            </span>
            <p style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
              {ventilationAdvice.windowAction || 'Keep Closed during Rush Hours'}
            </p>
          </div>

          <div style={{ marginBottom: '12px', fontSize: '14px', color: '#334155' }}>
            <strong>{t.bestVentHour}: </strong>
            <span style={{ color: 'var(--primary-dark)', fontWeight: '700' }}>
              {ventilationAdvice.bestHour || '12:30 PM - 03:00 PM'}
            </span>
            <p style={{ marginTop: '4px', fontSize: '13px', color: '#64748b' }}>
              {ventilationAdvice.explanation}
            </p>
          </div>

          <div style={{ background: '#fef3c7', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '12px', color: '#92400e' }}>
            <strong>Scientific Note:</strong> HEPA air purifiers filter solid particulate matter (PM2.5/PM10) but DO NOT generate oxygen or remove carbon dioxide. Do not permanently seal rooms without brief scheduled air exchange.
          </div>
        </div>

        {/* Right: HEPA CADR & Room Sizing Calculator */}
        <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Calculator size={20} color="var(--secondary)" />
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              {t.purifierCalculator}
            </h4>
          </div>

          <div className="grid-2" style={{ gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                {t.roomSize}
              </label>
              <input
                type="number"
                min="50"
                max="1000"
                value={roomArea}
                onChange={(e) => {
                  setRoomArea(e.target.value);
                  handleCalculateCadr(e.target.value, ceilingHeight);
                }}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                {t.ceilingHeight}
              </label>
              <input
                type="number"
                min="7"
                max="16"
                value={ceilingHeight}
                onChange={(e) => {
                  setCeilingHeight(e.target.value);
                  handleCalculateCadr(roomArea, e.target.value);
                }}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '10px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#065f46', fontWeight: '700' }}>
              {t.cadrResult} (for 5 Air Changes/Hour)
            </span>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary-dark)', marginTop: '2px' }}>
              {calculatedCadrM3} m³/hour <span style={{ fontSize: '15px', fontWeight: '600', color: '#059669' }}>({calculatedCadrCfm} CFM)</span>
            </div>
            <p style={{ fontSize: '11px', color: '#047857', marginTop: '4px' }}>
              Ensure filter says "True HEPA (H13/H14)". Avoid ionizers that emit ozone.
            </p>
          </div>
        </div>

      </div>

      {/* Daily Home Clean Air Checklist */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
            {t.indoorChecklist} ({doneCount}/{checklist.length} Complete - {progressPercent}%)
          </h4>

          {/* Progress bar */}
          <div style={{ width: '160px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '10px' }}>
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: item.done ? '#f0fdf4' : '#ffffff',
                border: item.done ? '1px solid #bbf7d0' : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.done ? (
                <CheckSquare size={18} color="var(--primary)" />
              ) : (
                <Square size={18} color="#94a3b8" />
              )}
              <span style={{
                fontSize: '13px',
                fontWeight: '500',
                color: item.done ? '#166534' : '#334155',
                textDecoration: item.done ? 'line-through' : 'none'
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
