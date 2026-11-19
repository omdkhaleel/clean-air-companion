import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, Sun, Wind, ShieldAlert } from 'lucide-react';
import { translations } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speechUtils';

export default function SeniorModeView({
  airData,
  advisorData,
  onExitSeniorMode,
  language
}) {
  const t = translations[language] || translations.en;
  const [readingKey, setReadingKey] = useState(null);

  const {
    aqi = 150,
    category = 'Moderate',
    location = { city: 'Your Area' }
  } = airData || {};

  const handleSpeak = (key, text) => {
    if (readingKey === key) {
      stopSpeaking();
      setReadingKey(null);
    } else {
      setReadingKey(key);
      speakText(text, language, null, () => setReadingKey(null));
    }
  };

  // Plain-language answers for seniors
  let walkAdvice = '';
  let windowAdvice = '';
  let maskAdvice = '';
  let airStatusSimple = '';

  if (aqi <= 50) {
    airStatusSimple = language === 'hi' ? 'हवा बिल्कुल साफ है' : language === 'ta' ? 'காற்று மிகவும் சுத்தமாக உள்ளது' : 'Air is Clean and Fresh';
    walkAdvice = language === 'hi' ? 'हाँ, आप बाहर टहलने जा सकते हैं। कोई खतरा नहीं है।' : language === 'ta' ? 'ஆம், நீங்கள் வெளியில் நடைப்பயிற்சி செல்லலாம். எந்த ஆபத்தும் இல்லை.' : 'YES, it is completely safe to go for your morning or evening walk outdoors.';
    windowAdvice = language === 'hi' ? 'खिड़कियां खुली रखें। ताजी हवा आने दें।' : language === 'ta' ? 'ஜன்னல்களைத் திறந்து வைக்கவும். புதிய காற்று வரட்டும்.' : 'OPEN your windows freely. Let the fresh clean air inside.';
    maskAdvice = language === 'hi' ? 'मास्क लगाने की जरूरत नहीं है।' : language === 'ta' ? 'முகக்கவசம் அணிய வேண்டிய அவசியமில்லை.' : 'NO MASK needed today.';
  } else if (aqi <= 100) {
    airStatusSimple = language === 'hi' ? 'हवा सामान्य है' : language === 'ta' ? 'காற்று சாதாரணமாக உள்ளது' : 'Air is Satisfactory';
    walkAdvice = language === 'hi' ? 'आप टहल सकते हैं। बहुत तेज धूप या भीड़भाड़ वाली सड़कों से बचें।' : language === 'ta' ? 'நீங்கள் நடக்கலாம். வாகன நெரிசல் உள்ள சாலைகளைத் தவிர்க்கவும்.' : 'YES, walking is fine. Avoid busy traffic roads.';
    windowAdvice = language === 'hi' ? 'दोपहर में खिड़कियां खोलें।' : language === 'ta' ? 'மதிய வேளையில் ஜன்னல்களைத் திறக்கவும்.' : 'OPEN windows during afternoon hours (12 PM - 3 PM).';
    maskAdvice = language === 'hi' ? 'सामान्य मास्क जरूरी नहीं, केवल धूल से एलर्जी हो तो पहनें।' : language === 'ta' ? 'தூசி ஒவ்வாமை இருந்தால் மட்டும் முகக்கவசம் அணியவும்.' : 'Mask optional; wear only if sensitive to dust.';
  } else if (aqi <= 200) {
    airStatusSimple = language === 'hi' ? 'हवा में थोड़ा प्रदूषण है' : language === 'ta' ? 'காற்றில் சிறிது மாசு உள்ளது' : 'Air is Moderate (Some Pollution)';
    walkAdvice = language === 'hi' ? 'सुबह जल्दी न टहलें। धूप निकलने के बाद (सुबह 8:30 के बाद) ही टहलें।' : language === 'ta' ? 'அதிகாலையில் நடக்க வேண்டாம். காலை 8:30 மணிக்கு மேல் நடக்கவும்.' : 'DO NOT walk in the early cold morning. Walk after 8:30 AM when the sun is warm.';
    windowAdvice = language === 'hi' ? 'सुबह और शाम खिड़कियां बंद रखें। केवल दोपहर में थोड़ी देर खोलें।' : language === 'ta' ? 'காலை மற்றும் மாலையில் ஜன்னல்களை மூடவும்.' : 'KEEP windows CLOSED in morning and evening. Open briefly in afternoon.';
    maskAdvice = language === 'hi' ? 'सड़क पर जाते समय साधारण या N95 मास्क पहनें।' : language === 'ta' ? 'வெளியில் செல்லும்போது முகக்கவசம் அணியவும்.' : 'Wear a mask if walking near busy vehicle roads.';
  } else if (aqi <= 300) {
    airStatusSimple = language === 'hi' ? 'हवा खराब है (प्रदूषण अधिक है)' : language === 'ta' ? 'காற்று மோசமாக உள்ளது' : 'Air is POOR (High Pollution)';
    walkAdvice = language === 'hi' ? 'बाहर टहलना टालें। घर के अंदर, बालकनी या बरामदे में ही हल्के कदम चलें।' : language === 'ta' ? 'வெளியில் நடக்க வேண்டாம். வீட்டிற்குள்ளேயே நடக்கவும்.' : 'AVOID outdoor walking. Walk inside your living room or corridor.';
    windowAdvice = language === 'hi' ? 'खिड़कियां और दरवाजे बंद रखें।' : language === 'ta' ? 'ஜன்னல்கள் மற்றும் கதவுகளை மூடி வைக்கவும்.' : 'KEEP all windows and doors CLOSED to stop outdoor smoke.';
    maskAdvice = language === 'hi' ? 'बाहर जाना जरूरी हो तो N95 मास्क अवश्य लगाएं।' : language === 'ta' ? 'வெளியில் செல்லும்போது கட்டாயம் N95 முகக்கவசம் அணியவும்.' : 'WEAR N95 MASK if you must step outside.';
  } else {
    airStatusSimple = language === 'hi' ? 'हवा बहुत खतरनाक है (आपातकाल)' : language === 'ta' ? 'காற்று மிகவும் ஆபத்தானது' : 'DANGER: Air is Very Polluted';
    walkAdvice = language === 'hi' ? 'बिल्कुल बाहर न जाएं! घर के अंदर ही रहें।' : language === 'ta' ? 'வெளியில் செல்ல வேண்டாம்! வீட்டிற்குள்ளேயே இருங்கள்.' : 'STRICTLY STAY INDOORS. Do not go outside.';
    windowAdvice = language === 'hi' ? 'खिड़कियां पूरी तरह बंद रखें।' : language === 'ta' ? 'ஜன்னல்களை முழுமையாக மூடி வைக்கவும்.' : 'KEEP ALL WINDOWS STRICTLY CLOSED.';
    maskAdvice = language === 'hi' ? 'बाहर निकलना पड़े तो N95 मास्क अनिवार्य है।' : language === 'ta' ? 'வெளியில் செல்லும்போது N95 முகக்கவசம் கட்டாயம்.' : 'MANDATORY N95 MASK if going out for emergency.';
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      
      {/* Top Bar with Big Exit Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button
          onClick={onExitSeniorMode}
          className="btn btn-outline"
          style={{ fontSize: '18px', padding: '12px 20px', minHeight: '52px', fontWeight: '800' }}
        >
          <ArrowLeft size={22} />
          <span>{t.exitSeniorMode}</span>
        </button>

        <span style={{ fontSize: '16px', fontWeight: '700', color: '#047857' }}>
          {language === 'hi' ? 'सरल मोड सक्रिय है' : language === 'ta' ? 'எளிய முறை இயக்கத்தில் உள்ளது' : 'Senior Mode Active'}
        </span>
      </div>

      {/* Giant Air Quality Card */}
      <div style={{
        backgroundColor: aqi > 200 ? '#fef2f2' : aqi > 100 ? '#fefce8' : '#f0fdf4',
        border: `3px solid ${aqi > 200 ? '#dc2626' : aqi > 100 ? '#ca8a04' : '#16a34a'}`,
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
          {location.city || 'Your City'} • {t.todayAir}
        </span>

        <div style={{ fontSize: '64px', fontWeight: '900', color: aqi > 200 ? '#991b1b' : aqi > 100 ? '#854d0e' : '#14532d', margin: '8px 0' }}>
          {aqi}
        </div>

        <div style={{
          fontSize: '28px',
          fontWeight: '900',
          color: aqi > 200 ? '#b91c1c' : aqi > 100 ? '#a16207' : '#15803d',
          marginBottom: '12px'
        }}>
          {airStatusSimple}
        </div>

        <button
          onClick={() => handleSpeak('main_status', `${location.city}. Today AQI is ${aqi}. ${airStatusSimple}`)}
          className="btn btn-primary"
          style={{ fontSize: '20px', padding: '14px 28px', minHeight: '56px', borderRadius: '12px' }}
        >
          <Volume2 size={24} />
          <span>{readingKey === 'main_status' ? t.reading : t.readAloud}</span>
        </button>
      </div>

      {/* 3 Simple Action Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 1. Walk Advice */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #cbd5e1', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>
              1. क्या मैं टहलने जा सकता हूँ? (Walking Outdoors?)
            </h3>
            <button
              onClick={() => handleSpeak('walk', walkAdvice)}
              className="btn btn-outline"
              style={{ padding: '8px 16px', fontSize: '16px', minHeight: '44px' }}
            >
              <Volume2 size={20} />
              <span>{readingKey === 'walk' ? 'बोल रहे हैं...' : 'सुनें'}</span>
            </button>
          </div>
          <p style={{ fontSize: '22px', fontWeight: '600', color: aqi > 200 ? '#b91c1c' : '#1e293b', lineHeight: 1.5 }}>
            {walkAdvice}
          </p>
        </div>

        {/* 2. Window Advice */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #cbd5e1', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>
              2. क्या खिड़कियां खोलें? (Open Windows?)
            </h3>
            <button
              onClick={() => handleSpeak('windows', windowAdvice)}
              className="btn btn-outline"
              style={{ padding: '8px 16px', fontSize: '16px', minHeight: '44px' }}
            >
              <Volume2 size={20} />
              <span>{readingKey === 'windows' ? 'बोल रहे हैं...' : 'सुनें'}</span>
            </button>
          </div>
          <p style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b', lineHeight: 1.5 }}>
            {windowAdvice}
          </p>
        </div>

        {/* 3. Mask Advice */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #cbd5e1', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>
              3. क्या मास्क पहनें? (Wear a Mask?)
            </h3>
            <button
              onClick={() => handleSpeak('mask', maskAdvice)}
              className="btn btn-outline"
              style={{ padding: '8px 16px', fontSize: '16px', minHeight: '44px' }}
            >
              <Volume2 size={20} />
              <span>{readingKey === 'mask' ? 'बोल रहे हैं...' : 'सुनें'}</span>
            </button>
          </div>
          <p style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b', lineHeight: 1.5 }}>
            {maskAdvice}
          </p>
        </div>

      </div>

      {/* Emergency Contact Reminder */}
      <div style={{ marginTop: '24px', background: '#fee2e2', borderRadius: '16px', border: '2px solid #f87171', padding: '20px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '20px', fontWeight: '900', color: '#991b1b', marginBottom: '6px' }}>
          सांस लेने में तकलीफ हो तो तुरंत डॉक्टर या 108/112 पर कॉल करें
        </h4>
        <p style={{ fontSize: '16px', color: '#7f1d1d' }}>
          If experiencing breathlessness, chest tightness, or cough, consult your doctor immediately.
        </p>
      </div>

    </div>
  );
}
