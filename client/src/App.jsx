import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AqiHeroCard from './components/AqiHeroCard';
import DailyActionAdvisor from './components/DailyActionAdvisor';
import FamilyActionPlan from './components/FamilyActionPlan';
import HourlyForecastCard from './components/HourlyForecastCard';
import AskCleanAirVoice from './components/AskCleanAirVoice';
import IndoorAirAssistant from './components/IndoorAirAssistant';
import LifestyleAdvisor from './components/LifestyleAdvisor';
import ImpactTracker from './components/ImpactTracker';
import CommunityHub from './components/CommunityHub';
import FamilyProfileModal from './components/FamilyProfileModal';
import SeniorModeView from './components/SeniorModeView';
import { translations } from './utils/translations';

export default function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cleanair_lang') || 'en';
  });

  const [isSeniorMode, setIsSeniorMode] = useState(() => {
    return localStorage.getItem('cleanair_senior_mode') === 'true';
  });

  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [activeScenario, setActiveScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [airData, setAirData] = useState(null);
  const [advisorData, setAdvisorData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Household Profile from localStorage
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('cleanair_profile');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save language preference
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('cleanair_lang', lang);
  };

  // Save senior mode preference & update body class
  const handleSetSeniorMode = (val) => {
    setIsSeniorMode(val);
    localStorage.setItem('cleanair_senior_mode', String(val));
    if (val) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }
  };

  useEffect(() => {
    if (isSeniorMode) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }
  }, [isSeniorMode]);

  // Fetch Cities Directory
  useEffect(() => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCitiesList(data.cities);
        }
      })
      .catch(err => console.warn('Could not load cities list:', err));
  }, []);

  // Fetch Air Quality & Advisor Data
  const fetchAirData = async (city = selectedCity, scenario = activeScenario, lat = null, lon = null) => {
    setLoading(true);
    try {
      let url = `/api/air-quality?`;
      if (scenario) {
        url += `scenario=${scenario}&`;
      } else if (lat && lon) {
        url += `lat=${lat}&lon=${lon}&`;
      } else {
        url += `city=${city}&`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAirData(data);

        // Fetch AI Advisor recommendations tailored to this AQI and profile
        const advRes = await fetch('/api/ai/advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aqi: data.aqi,
            profile,
            language
          })
        });
        const advData = await advRes.json();
        if (advData.success) {
          setAdvisorData(advData);
        }
      }
    } catch (err) {
      console.error('Error fetching air data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirData(selectedCity, activeScenario);
  }, [selectedCity, activeScenario, profile, language]);

  // GPS Geolocation Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setActiveScenario(null);
        fetchAirData(null, null, latitude, longitude);
      },
      (err) => {
        alert('Could not retrieve your location. Please choose your city from the dropdown.');
      }
    );
  };

  // Scenario Switcher Handler (CPCB Bands testing)
  const handleSelectScenario = (scen) => {
    setActiveScenario(scen);
  };

  // Save Profile Handler
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('cleanair_profile', JSON.stringify(newProfile));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div className="container" style={{ paddingTop: '16px' }}>
        <Header
          language={language}
          setLanguage={handleSetLanguage}
          isSeniorMode={isSeniorMode}
          setIsSeniorMode={handleSetSeniorMode}
          selectedCity={selectedCity}
          onSelectCity={(c) => {
            setSelectedCity(c);
            setActiveScenario(null);
          }}
          onDetectLocation={handleDetectLocation}
          citiesList={citiesList}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          hasProfile={Object.keys(profile).length > 0}
        />
      </div>

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, paddingBottom: '32px' }}>
        
        {isSeniorMode ? (
          /* Senior Citizen View */
          <SeniorModeView
            airData={airData}
            advisorData={advisorData}
            onExitSeniorMode={() => handleSetSeniorMode(false)}
            language={language}
          />
        ) : (
          /* Standard Action Assistant View */
          <>
            {/* 1. Location and Current AQI & Status & Weather & Scenario Tester */}
            <AqiHeroCard
              airData={airData}
              loading={loading}
              onRefresh={() => fetchAirData(selectedCity, activeScenario)}
              onSelectScenario={handleSelectScenario}
              activeScenario={activeScenario}
              language={language}
            />

            {/* 2 & 3. What Should I Do Today? (Hero Central Feature) */}
            <DailyActionAdvisor
              advisorData={advisorData}
              aqi={airData?.aqi || 150}
              language={language}
            />

            {/* 4. Daily Family Action Plan */}
            <FamilyActionPlan
              familyPlan={advisorData?.familyPlan}
              language={language}
            />

            {/* 5. 12-Hour Pollution Outlook & Safest Activity Windows */}
            <HourlyForecastCard
              forecast={airData?.forecast}
              language={language}
            />

            {/* 6. Ask Clean Air - Voice-First GenAI Assistant */}
            <AskCleanAirVoice
              aqi={airData?.aqi || 150}
              location={airData?.location?.city || 'Delhi NCR'}
              language={language}
            />

            {/* 7. Indoor Air Quality Assistant & Smart Ventilation Advisor */}
            <IndoorAirAssistant
              ventilationAdvice={advisorData?.ventilationAdvice}
              language={language}
            />

            {/* 8. Low-Emission Daily Lifestyle Advisor */}
            <LifestyleAdvisor
              language={language}
            />

            {/* 9. My Environmental Impact Tracker */}
            <ImpactTracker
              language={language}
            />

            {/* 10. Community Action Centre */}
            <CommunityHub
              language={language}
            />
          </>
        )}

      </main>

      {/* Family Profile Modal */}
      <FamilyProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        language={language}
      />

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border)', padding: '24px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <div>
            <strong style={{ color: 'var(--primary-dark)' }}>Clean Air Companion</strong> • Built for families, senior citizens, and cleaner communities.
            <p style={{ marginTop: '2px' }}>
              Standard: CPCB National Ambient Air Quality Standards (NAAQS) & Central Electricity Authority (CEA) Emission Factors.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span>WCAG 2.2 AA Accessible</span>
            <span>•</span>
            <span>Offline PWA Enabled</span>
            <span>•</span>
            <span>No Registration Required</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
