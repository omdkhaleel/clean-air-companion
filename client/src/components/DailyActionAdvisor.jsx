import React, { useState } from 'react';
import { CheckCircle2, Shuffle, AlertOctagon, Volume2, ChevronDown, ChevronUp, Clock, DollarSign, Award, HelpCircle } from 'lucide-react';
import { translations } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speechUtils';

export default function DailyActionAdvisor({
  advisorData,
  aqi,
  language
}) {
  const t = translations[language] || translations.en;
  const [expandedItems, setExpandedItems] = useState({});
  const [readingItemKey, setReadingItemKey] = useState(null);

  if (!advisorData) return null;

  const {
    interpretation = '',
    doToday = [],
    betterAlternatives = [],
    avoidToday = []
  } = advisorData;

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleReadAloud = (key, textToSpeak) => {
    if (readingItemKey === key) {
      stopSpeaking();
      setReadingItemKey(null);
    } else {
      setReadingItemKey(key);
      speakText(
        textToSpeak,
        language,
        null,
        () => setReadingItemKey(null)
      );
    }
  };

  const renderRecommendationCard = (item, sectionPrefix, idx, colorTheme) => {
    const key = `${sectionPrefix}_${idx}`;
    const isExpanded = !!expandedItems[key];
    const isReading = readingItemKey === key;

    const fullSpeechText = `${item.what}. ${item.why}. Expected benefit: ${item.benefit}. Cost: ${item.cost}.`;

    return (
      <div
        key={key}
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          borderLeft: `5px solid ${colorTheme.border}`,
          padding: '16px 18px',
          marginBottom: '12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
        }}
      >
        {/* Header row: Action Title + Priority Pill + Audio Reader */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
            <span style={{ color: colorTheme.border, marginTop: '2px' }}>
              {colorTheme.icon}
            </span>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', lineHeight: 1.35 }}>
                {item.what}
              </h4>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Priority Badge */}
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: item.priority === 'High' ? '#fee2e2' : item.priority === 'Medium' ? '#fef3c7' : '#f1f5f9',
              color: item.priority === 'High' ? '#991b1b' : item.priority === 'Medium' ? '#92400e' : '#475569'
            }}>
              {item.priority === 'High' ? t.high : item.priority === 'Medium' ? t.medium : t.optional}
            </span>

            {/* Cost Badge */}
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: item.cost.toLowerCase().includes('free') ? '#dcfce7' : '#e0f2fe',
              color: item.cost.toLowerCase().includes('free') ? '#166534' : '#0369a1'
            }}>
              {item.cost}
            </span>

            {/* Voice Read-Aloud Button */}
            <button
              onClick={() => handleReadAloud(key, fullSpeechText)}
              className="btn"
              style={{
                padding: '4px 8px',
                minHeight: '30px',
                fontSize: '12px',
                backgroundColor: isReading ? '#10b981' : '#f1f5f9',
                color: isReading ? '#ffffff' : '#334155'
              }}
              title={isReading ? 'Stop listening' : t.readAloud}
            >
              <Volume2 size={14} />
              <span>{isReading ? t.reading : t.readAloud}</span>
            </button>
          </div>
        </div>

        {/* Why (Explanation) & Expected Benefit */}
        <div style={{ marginTop: '6px', fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
          <p style={{ marginBottom: '4px' }}>
            <strong style={{ color: '#0f172a' }}>{t.why}: </strong>
            {item.why}
          </p>
          <p style={{ color: '#047857', fontWeight: '600' }}>
            <strong>{t.expectedBenefit}: </strong>
            {item.benefit}
          </p>
        </div>

        {/* "Explain More" Toggle Button */}
        <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => toggleExpand(key)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 6px'
            }}
          >
            <span>{isExpanded ? t.hideDetails : t.explainMore}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Expanded Scientific Details */}
        {isExpanded && item.details && (
          <div style={{
            marginTop: '8px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#475569',
            borderLeft: '3px solid var(--secondary)'
          }}>
            <p><strong>Detailed Scientific Guidance:</strong> {item.details}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section aria-labelledby="daily-advisor-heading" style={{ marginBottom: '32px' }}>
      
      {/* Hero Header Section */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #ffffff 100%)',
        border: '1.5px solid #a7f3d0',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <span className="badge badge-good" style={{ marginBottom: '8px' }}>
              Central Advisor • Immediate Action Guide
            </span>
            <h2 id="daily-advisor-heading" style={{ fontSize: '26px', fontWeight: '800', color: '#064e3b' }}>
              {t.whatToDoToday}
            </h2>
          </div>
          
          <button
            onClick={() => handleReadAloud('summary', interpretation)}
            className="btn btn-primary"
            style={{ fontSize: '13px', padding: '6px 14px' }}
          >
            <Volume2 size={16} />
            <span>{readingItemKey === 'summary' ? t.reading : 'Listen to Today\'s Summary'}</span>
          </button>
        </div>

        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#1e293b',
          marginTop: '12px',
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          borderLeft: '4px solid var(--primary)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          "{interpretation}"
        </p>
      </div>

      {/* The 3 Core Action Categories */}
      <div className="grid-3" style={{ alignItems: 'start', gap: '20px' }}>
        
        {/* 1. DO TODAY */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <CheckCircle2 size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#14532d' }}>
              1. {t.doToday}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
            {t.doTodayDesc}
          </p>

          <div>
            {doToday.map((item, idx) =>
              renderRecommendationCard(item, 'do', idx, {
                border: '#16a34a',
                icon: <CheckCircle2 size={18} />
              })
            )}
          </div>
        </div>

        {/* 2. BETTER ALTERNATIVES */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
              <Shuffle size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#075985' }}>
              2. {t.betterAlternatives}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
            {t.betterAlternativesDesc}
          </p>

          <div>
            {betterAlternatives.map((item, idx) =>
              renderRecommendationCard(item, 'alt', idx, {
                border: '#0284c7',
                icon: <Shuffle size={18} />
              })
            )}
          </div>
        </div>

        {/* 3. AVOID TODAY */}
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <AlertOctagon size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#991b1b' }}>
              3. {t.avoidToday}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
            {t.avoidTodayDesc}
          </p>

          <div>
            {avoidToday.map((item, idx) =>
              renderRecommendationCard(item, 'avoid', idx, {
                border: '#dc2626',
                icon: <AlertOctagon size={18} />
              })
            )}
          </div>
        </div>

      </div>

    </section>
  );
}
