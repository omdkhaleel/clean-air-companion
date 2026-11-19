import React, { useState } from 'react';
import { Leaf, Bus, Zap, Flame, Trash2, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

export default function LifestyleAdvisor({ language }) {
  const t = translations[language] || translations.en;
  const [activeCategory, setActiveCategory] = useState('transport');

  const categories = [
    { id: 'transport', label: 'Transportation', icon: <Bus size={18} /> },
    { id: 'energy', label: 'Household Energy', icon: <Zap size={18} /> },
    { id: 'cooking', label: 'Clean Cooking', icon: <Flame size={18} /> },
    { id: 'waste', label: 'Waste Management', icon: <Trash2 size={18} /> }
  ];

  const recommendations = {
    transport: [
      {
        title: "Shift 2 Days Weekly Commute to Metro / Shared Transit",
        existing: "Driving a solo petrol/diesel passenger car in peak traffic jams.",
        alternative: "Take Metro or carpool with 2 colleagues twice a week.",
        whyBetter: "Bumper-to-bumper car idling produces 3x toxic hydrocarbons; shifting 2 days removes 25 kg of tailpipe emissions each month.",
        impact: "~24 kg CO₂e saved per month + drastic drop in street-level PM2.5.",
        costSavings: "Saves ₹2,500 - ₹3,800 monthly on fuel and parking."
      },
      {
        title: "Anti-Idling Rule at Traffic Signals & School Pickups",
        existing: "Leaving engine running continuously during red lights > 15 seconds.",
        alternative: "Switch off ignition at traffic signals longer than 15 seconds and while waiting outside schools.",
        whyBetter: "Engine idling burns fuel without distance, releasing concentrated benzene and soot right at child lung height.",
        impact: "Saves up to 1.5 litres of fuel per week; cuts neighbourhood soot.",
        costSavings: "Free (Saves ₹150/week on wasted fuel)."
      }
    ],
    energy: [
      {
        title: "Optimized AC Temperature Setting (24°C - 26°C)",
        existing: "Setting AC to 18°C - 20°C with heavy blankets.",
        alternative: "Set thermostat to 25°C with ceiling fan on low speed.",
        whyBetter: "Every 1°C increase saves 6% electricity. In India, 70% grid power comes from thermal coal plants.",
        impact: "Reduces ~3.2 kg CO₂e and coal particulate emissions daily.",
        costSavings: "Cuts summer electricity bill by 18-24% (₹900 - ₹1,400/month)."
      },
      {
        title: "BEE 5-Star Appliances & Eliminating Phantom Loads",
        existing: "Leaving TV set-top boxes, chargers, and geysers permanently on standby.",
        alternative: "Use switchboard master cut-offs and turn off water geyser after 15 minutes.",
        whyBetter: "Geysers left on continuous reheat consume up to 3 kWh unnecessarily per day.",
        impact: "Cuts ~2.4 kg CO₂e per day.",
        costSavings: "Saves ₹400 - ₹600 monthly."
      }
    ],
    cooking: [
      {
        title: "Induction Cooking for Boiling & Simmering",
        existing: "Using LPG burner for all boiling, heating milk, and pressure cooking.",
        alternative: "Use an electric induction plate for water, tea, and milk boiling.",
        whyBetter: "Induction has 84% thermal efficiency compared to 40% for gas stoves, producing zero combustion byproducts inside the kitchen.",
        impact: "Eliminates indoor nitrogen dioxide (NO₂) emissions from burning gas.",
        costSavings: "LPG cylinder lasts 3 weeks longer."
      },
      {
        title: "Kitchen Exhaust Chimney Maintenance",
        existing: "Allowing mesh grease filters to clog for months without cleaning.",
        alternative: "Soak and degrease metal exhaust filters in hot water and detergent every 3 weeks.",
        whyBetter: "Clogged filters reduce airflow velocity by up to 60%, forcing cooking smoke into living areas.",
        impact: "Restores 100% suction efficiency for oily cooking soot.",
        costSavings: "Free (DIY hot water cleaning)."
      }
    ],
    waste: [
      {
        title: "Dry Leaf & Garden Waste Composting (Zero Burning)",
        existing: "Sweeping fallen dry leaves into piles and lighting them on fire.",
        alternative: "Pile dried leaves in a corner garden bin or compost pit with soil.",
        whyBetter: "Burning 10 kg of dry leaves releases 1.2 kg of toxic carbon monoxide and concentrated PM2.5 directly into neighbours' bedrooms.",
        impact: "Prevents acute asthma attacks in your neighbourhood and generates free organic soil mulch.",
        costSavings: "Free (Provides organic garden fertilizer)."
      },
      {
        title: "2-Bin Source Waste Segregation (Wet vs Dry)",
        existing: "Throwing food scraps, plastics, and batteries together in one single garbage bag.",
        alternative: "Keep green bin for organic food waste and blue bin for clean recyclables.",
        whyBetter: "Unsegregated organic waste rots anaerobically at open municipal dumps (Ghazipur/Bhalaswa), generating methane fires that burn for days.",
        impact: "Eliminates toxic landfill smoke and enables formal recycling.",
        costSavings: "Free."
      }
    ]
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: '#f0fdf4',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Leaf size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#064e3b' }}>
            {t.lifestyleTitle}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t.lifestyleSubtitle}
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '18px' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="btn"
              style={{
                backgroundColor: isActive ? 'var(--primary)' : '#f8fafc',
                color: isActive ? '#ffffff' : '#334155',
                border: isActive ? 'none' : '1px solid var(--border)',
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommendations Cards */}
      <div className="grid-2" style={{ gap: '16px' }}>
        {recommendations[activeCategory].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                {item.title}
              </h4>

              <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#dc2626', fontWeight: '700' }}>Current Practice: </span>
                <span style={{ color: '#475569' }}>{item.existing}</span>
              </div>

              <div style={{ fontSize: '13px', marginBottom: '10px' }}>
                <span style={{ color: '#16a34a', fontWeight: '700' }}>Recommended Alternative: </span>
                <span style={{ color: '#1e293b', fontWeight: '600' }}>{item.alternative}</span>
              </div>

              <div style={{ fontSize: '13px', color: '#334155', marginBottom: '10px', background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Why better:</strong> {item.whyBetter}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
              <span className="badge badge-good" style={{ fontSize: '12px' }}>
                🌱 {item.impact}
              </span>
              <span className="badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '12px' }}>
                💰 {item.costSavings}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
