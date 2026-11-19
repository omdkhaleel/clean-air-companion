import React, { useState } from 'react';
import { Users, Baby, HeartPulse, Briefcase, GraduationCap, HardHat, Volume2 } from 'lucide-react';
import { translations } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speechUtils';

export default function FamilyActionPlan({ familyPlan = {}, language }) {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState('children');
  const [reading, setReading] = useState(false);

  if (!familyPlan || Object.keys(familyPlan).length === 0) return null;

  const tabIcons = {
    children: <Baby size={18} />,
    seniors: <HeartPulse size={18} />,
    workingAdults: <Briefcase size={18} />,
    students: <GraduationCap size={18} />,
    outdoorWorkers: <HardHat size={18} />,
    healthPrecautions: <HeartPulse size={18} />
  };

  const currentItem = familyPlan[activeTab] || familyPlan.children;

  const handleRead = () => {
    if (reading) {
      stopSpeaking();
      setReading(false);
    } else {
      setReading(true);
      speakText(`${currentItem.title}. ${currentItem.guidance}`, language, null, () => setReading(false));
    }
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
        <div>
          <span className="badge badge-good" style={{ marginBottom: '6px' }}>
            {t.familyPlanTitle}
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
            {t.familyPlanDesc}
          </h3>
        </div>

        <button
          onClick={handleRead}
          className="btn btn-outline"
          style={{ padding: '6px 14px', fontSize: '13px' }}
        >
          <Volume2 size={16} />
          <span>{reading ? t.reading : t.readAloud}</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '12px',
        marginBottom: '16px'
      }}>
        {Object.entries(familyPlan).map(([key, plan]) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                stopSpeaking();
                setReading(false);
              }}
              className="btn"
              style={{
                backgroundColor: isActive ? 'var(--primary)' : '#f1f5f9',
                color: isActive ? '#ffffff' : '#334155',
                padding: '8px 14px',
                fontSize: '13px',
                minHeight: '38px',
                borderRadius: '8px'
              }}
            >
              {tabIcons[key]}
              <span>{t.familyGroups[key] || plan.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid var(--border)',
        borderLeft: activeTab === 'healthPrecautions' ? '5px solid #dc2626' : '5px solid var(--primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {tabIcons[activeTab]}
            <span>{t.familyGroups[activeTab] || currentItem?.title}</span>
          </h4>

          {currentItem?.priority && (
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: currentItem.priority === 'High' ? '#fee2e2' : '#e0f2fe',
              color: currentItem.priority === 'High' ? '#991b1b' : '#0369a1'
            }}>
              {currentItem.priority} Priority
            </span>
          )}
        </div>

        <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, marginTop: '8px' }}>
          {currentItem?.guidance}
        </p>

        {activeTab === 'healthPrecautions' && (
          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '12px', color: '#991b1b' }}>
            <strong>Medical Disclaimer:</strong> This application provides general environmental exposure guidance and does not replace individualized diagnosis or treatment from a qualified medical doctor. In case of severe breathing distress, call 108/112 or visit an emergency room immediately.
          </div>
        )}
      </div>
    </div>
  );
}
