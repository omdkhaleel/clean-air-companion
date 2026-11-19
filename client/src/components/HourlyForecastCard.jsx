import React from 'react';
import { Clock, Sun, CloudRain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { translations } from '../utils/translations';

export default function HourlyForecastCard({ forecast = [], language }) {
  const t = translations[language] || translations.en;
  if (!forecast || forecast.length === 0) return null;

  // Find lowest and highest AQI
  const sorted = [...forecast].sort((a, b) => a.aqi - b.aqi);
  const bestHour = sorted[0];
  const worstHour = sorted[sorted.length - 1];

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={22} color="var(--primary)" />
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              12-Hour Pollution Outlook & Safest Activity Windows
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Ground-level thermal inversion lifts during afternoon solar warming
            </p>
          </div>
        </div>

        {/* Cleanest vs Most Polluted Callout Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {bestHour && (
            <span className="badge badge-good" style={{ fontSize: '12px', padding: '4px 10px' }}>
              <CheckCircle2 size={13} />
              Best Window: {bestHour.time} (AQI ~{bestHour.aqi})
            </span>
          )}
          {worstHour && (
            <span className="badge badge-poor" style={{ fontSize: '12px', padding: '4px 10px' }}>
              <AlertTriangle size={13} />
              Peak Smog: {worstHour.time} (AQI ~{worstHour.aqi})
            </span>
          )}
        </div>
      </div>

      {/* Hourly Timeline Horizontal Scroll */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
        paddingTop: '4px'
      }}>
        {forecast.map((item, idx) => {
          const isBest = bestHour && item.time === bestHour.time;
          const isWorst = worstHour && item.time === worstHour.time;

          let barColor = '#16a34a';
          if (item.aqi > 300) barColor = '#dc2626';
          else if (item.aqi > 200) barColor = '#f97316';
          else if (item.aqi > 100) barColor = '#eab308';
          else if (item.aqi > 50) barColor = '#84cc16';

          return (
            <div
              key={idx}
              style={{
                minWidth: '95px',
                background: isBest ? '#f0fdf4' : isWorst ? '#fef2f2' : '#f8fafc',
                border: isBest ? '2px solid #16a34a' : isWorst ? '2px solid #dc2626' : '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                flexShrink: 0
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block' }}>
                {item.time}
              </span>

              <div style={{
                fontSize: '18px',
                fontWeight: '900',
                color: barColor,
                marginTop: '4px'
              }}>
                {item.aqi}
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#64748b',
                display: 'block',
                marginTop: '2px'
              }}>
                PM2.5: {item.pm25}
              </span>

              {isBest && (
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', display: 'block', marginTop: '4px' }}>
                  ★ Cleanest
                </span>
              )}
              {isWorst && (
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#dc2626', display: 'block', marginTop: '4px' }}>
                  ⚠ Peak Smog
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
