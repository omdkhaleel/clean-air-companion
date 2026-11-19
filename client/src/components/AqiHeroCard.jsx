import React from 'react';
import { Activity, Thermometer, Droplets, Wind, RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { translations } from '../utils/translations';

export default function AqiHeroCard({
  airData,
  loading,
  onRefresh,
  onSelectScenario,
  activeScenario,
  language
}) {
  const t = translations[language] || translations.en;

  if (loading || !airData) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px 20px', marginBottom: '24px' }}>
        <RefreshCw size={36} className="pulse-mic" color="var(--primary)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Retrieving live ambient air quality...</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
          Connecting to CPCB Continuous Ambient Air Monitoring Station
        </p>
      </div>
    );
  }

  const {
    aqi = 150,
    category = 'Moderate',
    categoryDetails = {},
    pollutants = {},
    weather = {},
    location = {},
    station = '',
    source = '',
    timestamp = '',
    isSimulation = false
  } = airData;

  const badgeClass = `badge badge-${category.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="card" style={{ marginBottom: '24px', borderLeft: `6px solid ${categoryDetails.color || '#eab308'}` }}>
      
      {/* Top Banner: Location & CPCB Station */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '18px' }}>
        <div>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: '700' }}>
            {t.todayAir} • {location.city || 'India'}
          </span>
          <div style={{ fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ fontWeight: '600' }}>{station}</span>
            {isSimulation ? (
              <span className="badge badge-moderate" style={{ fontSize: '11px', padding: '2px 8px' }}>QA Test Mode</span>
            ) : (
              <span className="badge badge-good" style={{ fontSize: '11px', padding: '2px 8px' }}>Live CPCB Feed</span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {t.updated}: {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={onRefresh}
            className="btn btn-outline"
            style={{ padding: '6px 12px', minHeight: '34px', fontSize: '13px' }}
            title="Refresh Air Quality"
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main AQI Meter Display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '20px' }}>
        
        {/* Left: Big AQI Number & Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            minWidth: '105px',
            height: '105px',
            borderRadius: '20px',
            backgroundColor: categoryDetails.bg || '#fef9c3',
            color: categoryDetails.text || '#854d0e',
            border: `2px solid ${categoryDetails.color || '#eab308'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase' }}>CPCB AQI</span>
            <span style={{ fontSize: '42px', fontWeight: '900', lineHeight: 1 }}>{aqi}</span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className={badgeClass} style={{ fontSize: '16px', padding: '6px 14px' }}>
                {language === 'hi' ? categoryDetails.hi : language === 'ta' ? categoryDetails.ta : category}
              </span>
            </div>
            <p style={{ fontSize: '15px', color: '#334155', maxWidth: '580px', fontWeight: '500' }}>
              {t.categories[category] || category}
            </p>
          </div>
        </div>

        {/* Right: Weather & Smog Inversion Factors */}
        <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}>
              <Thermometer size={14} color="#ea580c" />
              <span>{t.temp}</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
              {weather.temperature || 22}°C
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}>
              <Droplets size={14} color="#0284c7" />
              <span>{t.humidity}</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
              {weather.humidity || 60}%
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}>
              <Wind size={14} color="#059669" />
              <span>{t.wind}</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
              {weather.windSpeed || 6} km/h ({weather.windDirection || 'NW'})
            </span>
          </div>
        </div>
      </div>

      {/* Pollutant Breakdown Pill Grid */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
          {t.pollutants} (Sub-Indices & Concentrations)
        </span>
        <div className="grid-3" style={{ gap: '10px' }}>
          
          <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>PM2.5 (Fine Particulates)</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Primary lung inhalable</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: '800', fontSize: '16px', color: pollutants.pm25?.value > 60 ? '#b91c1c' : '#15803d' }}>
                {pollutants.pm25?.value || '--'} µg/m³
              </span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Sub-index: {pollutants.pm25?.subIndex || '--'}</p>
            </div>
          </div>

          <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>PM10 (Coarse Dust)</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Road dust & construction</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: '800', fontSize: '16px', color: pollutants.pm10?.value > 100 ? '#ea580c' : '#15803d' }}>
                {pollutants.pm10?.value || '--'} µg/m³
              </span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Sub-index: {pollutants.pm10?.subIndex || '--'}</p>
            </div>
          </div>

          <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>NO₂ / SO₂ / CO</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Vehicle & industrial gases</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: '700', fontSize: '13px', color: '#334155' }}>
                NO₂: {pollutants.no2?.value || 30} | SO₂: {pollutants.so2?.value || 12}
              </span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>CO: {pollutants.co?.value || 1.1} mg/m³</p>
            </div>
          </div>

        </div>
      </div>

      {/* QA Scenario Simulator (Official CPCB Bands Testing) */}
      <div style={{
        background: '#f8fafc',
        border: '1.5px dashed #cbd5e1',
        borderRadius: '12px',
        padding: '12px 16px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              {t.simTitle}
            </span>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {t.simDesc}
            </p>
          </div>

          {activeScenario && (
            <button
              onClick={() => onSelectScenario(null)}
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '12px', minHeight: '30px' }}
            >
              Reset to Live Feed
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { val: 35, label: '35 (Good)', cls: 'badge-good' },
            { val: 75, label: '75 (Satisfactory)', cls: 'badge-satisfactory' },
            { val: 150, label: '150 (Moderate)', cls: 'badge-moderate' },
            { val: 250, label: '250 (Poor)', cls: 'badge-poor' },
            { val: 350, label: '350 (Very Poor)', cls: 'badge-very-poor' },
            { val: 450, label: '450 (Severe)', cls: 'badge-severe' }
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => onSelectScenario(item.val)}
              className={`badge ${item.cls}`}
              style={{
                cursor: 'pointer',
                border: activeScenario === item.val ? '2px solid #0f172a' : '1px solid transparent',
                transform: activeScenario === item.val ? 'scale(1.05)' : 'none',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              AQI {item.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
