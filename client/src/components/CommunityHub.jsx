import React, { useState, useEffect } from 'react';
import { Building2, Users, Flame, AlertTriangle, CheckCircle, Send, HeartHandshake } from 'lucide-react';
import { translations } from '../utils/translations';

export default function CommunityHub({ language }) {
  const t = translations[language] || translations.en;

  const [communityData, setCommunityData] = useState({
    activeCommunities: 34,
    totalPledges: 428,
    campaigns: [],
    recentReports: []
  });

  const [hasPledged, setHasPledged] = useState(false);
  const [reportLocality, setReportLocality] = useState('');
  const [reportCity, setReportCity] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/community/stats');
      const data = await res.json();
      if (data.success) {
        setCommunityData(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTakePledge = async () => {
    if (hasPledged) return;
    try {
      const res = await fetch('/api/community/pledge', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCommunityData(prev => ({ ...prev, totalPledges: data.totalPledges }));
        setHasPledged(true);
      }
    } catch (e) {
      setHasPledged(true);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportLocality || !reportDetails) return;

    try {
      const res = await fetch('/api/community/report-burning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locality: reportLocality,
          city: reportCity,
          details: reportDetails
        })
      });
      const data = await res.json();
      if (data.success) {
        setReportSuccess(true);
        setReportLocality('');
        setReportCity('');
        setReportDetails('');
        fetchStats();
        setTimeout(() => setReportSuccess(false), 5000);
      }
    } catch (err) {}
  };

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Building2 size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e3a8a' }}>
            {t.communityTitle}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {t.communitySubtitle}
          </p>
        </div>
      </div>

      {/* Top Banner: Pledge Counter & Action */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: '14px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
            Collective Action Network
          </span>
          <div style={{ fontSize: '32px', fontWeight: '900', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{communityData.totalPledges}</span>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#cbd5e1' }}>{t.pledgedCount}</span>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Together across {communityData.activeCommunities} active RWAs, schools & apartment societies
          </p>
        </div>

        <button
          onClick={handleTakePledge}
          disabled={hasPledged}
          className="btn"
          style={{
            backgroundColor: hasPledged ? '#10b981' : '#059669',
            color: '#ffffff',
            padding: '12px 20px',
            fontSize: '15px',
            fontWeight: '700',
            borderRadius: '10px'
          }}
        >
          {hasPledged ? <CheckCircle size={18} /> : <HeartHandshake size={18} />}
          <span>{hasPledged ? "Pledge Recorded! Thank you" : t.takePledge}</span>
        </button>
      </div>

      {/* Two columns: Campaigns & Report Burning */}
      <div className="grid-2" style={{ gap: '20px' }}>
        
        {/* Left: Active Campaigns */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--primary)" />
            <span>Active Community Initiatives</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {communityData.campaigns.map((camp) => (
              <div
                key={camp.id}
                style={{
                  background: '#f8fafc',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{camp.title}</span>
                  <span className="badge badge-good" style={{ fontSize: '11px' }}>{camp.activeMembers} Members</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Goal: {camp.goal}</p>

                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${camp.progress}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-dark)' }}>{camp.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Report Open Burning / Pollution Hotspot */}
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={18} color="#dc2626" />
            <span>{t.reportBurning}</span>
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Notice burning of dry leaves or garbage? Log an alert for RWA and ward intervention.
          </p>

          {reportSuccess ? (
            <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '14px', textAlign: 'center' }}>
              <CheckCircle size={24} style={{ margin: '0 auto 6px' }} />
              <strong>Report Successfully Logged!</strong>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Notification sent to the community vigilance coordinator.</p>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Locality / Society Name (e.g., Sector 15 Pocket B)"
                value={reportLocality}
                onChange={(e) => setReportLocality(e.target.value)}
                required
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />

              <input
                type="text"
                placeholder="City (e.g., Gurugram, Delhi, Pune)"
                value={reportCity}
                onChange={(e) => setReportCity(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />

              <textarea
                placeholder="What is burning? (e.g., Garden leaf pile near boundary wall, smouldering plastic dump)"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                required
                rows={2}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'vertical' }}
              />

              <button
                type="submit"
                className="btn btn-secondary"
                style={{ padding: '10px', fontSize: '13px', borderRadius: '8px', alignSelf: 'flex-start' }}
              >
                <Send size={14} />
                <span>Submit Confidential Alert</span>
              </button>
            </form>
          )}

          {/* Recent Incident Log */}
          {communityData.recentReports && communityData.recentReports.length > 0 && (
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Recent Community Actions
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                {communityData.recentReports.slice(0, 2).map((rep) => (
                  <div key={rep.id} style={{ fontSize: '12px', color: '#475569', background: '#ffffff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <strong>{rep.locality} ({rep.city}):</strong> {rep.incident} • <span style={{ color: '#059669', fontWeight: '600' }}>{rep.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
