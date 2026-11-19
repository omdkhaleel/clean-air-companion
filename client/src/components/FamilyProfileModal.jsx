import React, { useState } from 'react';
import { X, Check, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function FamilyProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  language
}) {
  if (!isOpen) return null;

  const t = translations[language] || translations.en;

  const [formData, setFormData] = useState({
    membersCount: profile.membersCount || 4,
    hasChildren: profile.hasChildren !== undefined ? profile.hasChildren : true,
    hasSeniors: profile.hasSeniors !== undefined ? profile.hasSeniors : true,
    commuteMode: profile.commuteMode || 'metro',
    exerciseTiming: profile.exerciseTiming || 'morning',
    cookingFuel: profile.cookingFuel || 'lpg',
    hasAirPurifier: profile.hasAirPurifier || 'none',
    ventilationType: profile.ventilationType || 'split_ac',
    budgetTier: profile.budgetTier || 'low_cost'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
        padding: '24px',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                {language === 'hi' ? 'परिवार प्रोफाइल (वैकल्पिक)' : language === 'ta' ? 'குடும்ப விவரம் (விருப்பமானது)' : 'Household Profile (Optional)'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Help AI customize your daily action plan. Skip anytime.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Members & Vulnerable Groups */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
              Household Members
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: formData.hasChildren ? '#ecfdf5' : '#f8fafc', border: formData.hasChildren ? '1.5px solid var(--primary)' : '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Children Present</span>
              </label>

              <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: formData.hasSeniors ? '#ecfdf5' : '#f8fafc', border: formData.hasSeniors ? '1.5px solid var(--primary)' : '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.hasSeniors}
                  onChange={(e) => setFormData({ ...formData, hasSeniors: e.target.checked })}
                />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Seniors (60+) Present</span>
              </label>
            </div>
          </div>

          {/* Commute Mode */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Daily Commute Pattern
            </label>
            <select
              value={formData.commuteMode}
              onChange={(e) => setFormData({ ...formData, commuteMode: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
            >
              <option value="metro">Metro / Electric Train</option>
              <option value="bus">Public Bus</option>
              <option value="car">Solo Car (Petrol/Diesel)</option>
              <option value="carpool">Carpool / Shared Cab</option>
              <option value="two_wheeler">2-Wheeler (Motorcycle/Scooter)</option>
              <option value="wfh">Work from Home / Walking</option>
            </select>
          </div>

          {/* Exercise Timings */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Typical Outdoor Exercise / Walk Timing
            </label>
            <select
              value={formData.exerciseTiming}
              onChange={(e) => setFormData({ ...formData, exerciseTiming: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
            >
              <option value="morning">Early Morning (06:00 AM – 08:30 AM)</option>
              <option value="midday">Warm Midday / Afternoon (12:00 PM – 04:00 PM)</option>
              <option value="evening">Late Evening (07:00 PM – 09:30 PM)</option>
              <option value="indoor_only">Indoor Only / Gym</option>
            </select>
          </div>

          {/* Air Purifier Status */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Air Purifier Availability
            </label>
            <select
              value={formData.hasAirPurifier}
              onChange={(e) => setFormData({ ...formData, hasAirPurifier: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
            >
              <option value="none">No Air Purifier</option>
              <option value="hepa">Yes, True HEPA Purifier Available</option>
              <option value="diy">DIY Fan Filter / Box Fan</option>
            </select>
          </div>

          {/* Cooking Fuel */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Cooking Fuel Used
            </label>
            <select
              value={formData.cookingFuel}
              onChange={(e) => setFormData({ ...formData, cookingFuel: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
            >
              <option value="lpg">LPG Cylinder</option>
              <option value="png">Piped Natural Gas (PNG)</option>
              <option value="induction">Electric Induction Cooker</option>
              <option value="biomass">Biomass / Chulha</option>
            </select>
          </div>

          {/* Improvement Budget */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px' }}>
              Budget for Clean Air Improvements
            </label>
            <select
              value={formData.budgetTier}
              onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
            >
              <option value="free">Free / Zero Cost only (Behavioural changes)</option>
              <option value="low_cost">Low Cost (Under ₹1,000 for N95 masks, door seals, exhaust)</option>
              <option value="investment">Flexible (Can invest in HEPA purifier if needed)</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Check size={16} />
              <span>Save & Update Action Plan</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
