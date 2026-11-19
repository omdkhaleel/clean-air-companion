import React, { useState, useEffect } from 'react';
import { Award, TrendingDown, Fuel, TreePine, Info, Plus, Minus, Check, RefreshCw } from 'lucide-react';
import { translations } from '../utils/translations';

export default function ImpactTracker({ language }) {
  const t = translations[language] || translations.en;

  const defaultInputs = {
    carKmAvoided: 24,
    metroKm: 40,
    carpoolKm: 15,
    kwhSaved: 18,
    lpgKgSaved: 3,
    wasteSegregatedDays: 7,
    compostingKg: 5,
    burningAvoidedKg: 8
  };

  const [inputs, setInputs] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanair_impact_inputs');
      return saved ? JSON.parse(saved) : defaultInputs;
    } catch {
      return defaultInputs;
    }
  });

  const [results, setResults] = useState({
    totalCo2AvoidedKg: 38.6,
    fuelSavedLitres: 3.2,
    treeEquivalentMonths: 21.4,
    breakdown: { transport: 11.2, electricity: 14.8, cooking: 8.9, wasteManagement: 3.7 }
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const calculateImpact = async (currentInputs) => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/impact/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentInputs)
      });
      const data = await res.json();
      if (data.success) {
        setResults(data);
      }
    } catch (err) {
      console.warn('Local calculation fallback');
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateImpact(inputs);
  }, []);

  const updateValue = (key, delta) => {
    const updated = {
      ...inputs,
      [key]: Math.max(0, (inputs[key] || 0) + delta)
    };
    setInputs(updated);
    try {
      localStorage.setItem('cleanair_impact_inputs', JSON.stringify(updated));
    } catch (e) {}
    calculateImpact(updated);
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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
          <Award size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>
            {t.impactTitle}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t.impactSubtitle}
          </p>
        </div>
      </div>

      {/* Metrics Result Cards */}
      <div className="grid-3" style={{ gap: '14px', marginBottom: '20px' }}>
        
        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#16a34a', marginBottom: '4px' }}>
            <TrendingDown size={18} />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>CO₂ Emissions Avoided</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#14532d' }}>
            {results.totalCo2AvoidedKg} <span style={{ fontSize: '16px', fontWeight: '600' }}>kg CO₂e</span>
          </div>
          <p style={{ fontSize: '11px', color: '#15803d', marginTop: '2px' }}>
            Estimated cumulative carbon abatement
          </p>
        </div>

        <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#0284c7', marginBottom: '4px' }}>
            <Fuel size={18} />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Fuel Conserved</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#0369a1' }}>
            {results.fuelSavedLitres} <span style={{ fontSize: '16px', fontWeight: '600' }}>Litres</span>
          </div>
          <p style={{ fontSize: '11px', color: '#0284c7', marginTop: '2px' }}>
            Petrol & diesel saved from entering the atmosphere
          </p>
        </div>

        <div style={{ background: '#fefce8', padding: '16px', borderRadius: '12px', border: '1px solid #fef08a', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ca8a04', marginBottom: '4px' }}>
            <TreePine size={18} />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Tree Equivalent</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#854d0e' }}>
            {results.treeEquivalentMonths} <span style={{ fontSize: '16px', fontWeight: '600' }}>Tree-Months</span>
          </div>
          <p style={{ fontSize: '11px', color: '#a16207', marginTop: '2px' }}>
            Equivalent to months of mature tree absorption
          </p>
        </div>

      </div>

      {/* Action Logging Controls */}
      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          Log Your Sustainable Everyday Actions:
        </h4>

        <div className="grid-2" style={{ gap: '12px' }}>
          
          {/* Car km avoided */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Solo Car km Avoided (Walk/WFH)</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>0.171 kg CO₂e saved per km</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => updateValue('carKmAvoided', -5)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Minus size={14} /></button>
              <span style={{ fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>{inputs.carKmAvoided} km</span>
              <button onClick={() => updateValue('carKmAvoided', 5)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Metro km taken */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Shifted to Metro / Electric Train</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>0.138 kg CO₂e saved per km</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => updateValue('metroKm', -5)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Minus size={14} /></button>
              <span style={{ fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>{inputs.metroKm} km</span>
              <button onClick={() => updateValue('metroKm', 5)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Electricity saved */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Electricity Saved (kWh)</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>0.82 kg CO₂e per kWh (CEA India Grid)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => updateValue('kwhSaved', -2)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Minus size={14} /></button>
              <span style={{ fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>{inputs.kwhSaved} kWh</span>
              <button onClick={() => updateValue('kwhSaved', 2)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Plus size={14} /></button>
            </div>
          </div>

          {/* Open burning avoided */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Waste / Dry Leaves NOT Burned</span>
              <p style={{ fontSize: '11px', color: '#64748b' }}>3.5 kg CO₂e & dense PM2.5 prevented/kg</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => updateValue('burningAvoidedKg', -2)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Minus size={14} /></button>
              <span style={{ fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>{inputs.burningAvoidedKg} kg</span>
              <button onClick={() => updateValue('burningAvoidedKg', 2)} className="btn btn-outline" style={{ padding: '4px 8px', minHeight: '30px' }}><Plus size={14} /></button>
            </div>
          </div>

        </div>
      </div>

      {/* Transparent Documentation Note */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', fontSize: '12px', color: '#64748b', border: '1px solid #e2e8f0' }}>
        <Info size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
        <p>
          <strong>Scientific Calculation Notice:</strong> Emission reductions are calculated using official Central Electricity Authority (CEA) India baseline factors (0.82 kg CO₂e/kWh) and CPCB transport emission models. Individual sustainability choices reduce regional emissions loads over time, but do not directly or instantaneously alter your neighborhood's momentary ambient AQI.
        </p>
      </div>

    </div>
  );
}
