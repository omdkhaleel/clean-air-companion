import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, Bot, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { translations } from '../utils/translations';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speechUtils';

export default function AskCleanAirVoice({
  aqi,
  location,
  language
}) {
  const t = translations[language] || translations.en;
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: language === 'hi' 
        ? `नमस्ते! मैं आपका स्वच्छ वायु सहायक हूँ। आज ${location} में AQI ${aqi} है। आप मुझसे मास्क, बच्चों के बाहर खेलने, या खिड़की खोलने के बारे में बोलकर या लिखकर पूछ सकते हैं।`
        : language === 'ta'
        ? `வணக்கம்! நான் உங்கள் தூய காற்று உதவியாளர். இன்று ${location} இல் AQI ${aqi} ஆக உள்ளது. குழந்தைகள் விளையாடுவது அல்லது ஜன்னல் திறப்பது பற்றி என்னிடம் கேளுங்கள்.`
        : `Hello! I am your Clean Air Assistant. Current AQI in ${location} is ${aqi}. How can I help protect you and your family today? Ask me about outdoor play, morning walks, or window ventilation.`
    }
  ]);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);

  useEffect(() => {
    const recognizer = createSpeechRecognizer(
      language,
      (transcript) => {
        setQuery(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      },
      (err) => {
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
    setSpeechRecognizer(recognizer);

    return () => {
      stopSpeaking();
      if (recognizer) recognizer.abort();
    };
  }, [language]);

  const toggleMic = () => {
    if (!speechRecognizer) {
      alert("Voice recognition is not supported in this browser. You can type your query in the box below!");
      return;
    }

    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        speechRecognizer.start();
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleSendQuery = async (textToSend) => {
    const text = (textToSend || query).trim();
    if (!text) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          aqi,
          location,
          language
        })
      });

      const data = await res.json();
      if (data.success) {
        const replyText = (language === 'hi' && data.reply_hi) 
          ? data.reply_hi 
          : (language === 'ta' && data.reply_ta) 
          ? data.reply_ta 
          : data.reply;

        setMessages([...newMessages, {
          sender: 'ai',
          text: replyText,
          isEmergency: data.isEmergency
        }]);

        // Auto-read response for convenience
        speakText(replyText, language);
      }
    } catch (err) {
      setMessages([...newMessages, {
        sender: 'ai',
        text: 'Sorry, I encountered a temporary connection issue. Please check your network or try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const presetChips = [
    { en: "Can my children play outside today?", hi: "क्या आज बच्चे बाहर खेल सकते हैं?", ta: "குழந்தைகள் இன்று வெளியில் விளையாடலாமா?" },
    { en: "Is it safe for elderly parents to go walking?", hi: "क्या बुजुर्गों का सुबह टहलना सुरक्षित है?", ta: "முதியவர்கள் நடைப்பயிற்சி செல்வது பாதுகாப்பானதா?" },
    { en: "Should I open my bedroom windows today?", hi: "क्या आज घर की खिड़कियां खोलनी चाहिए?", ta: "இன்று படுக்கையறை ஜன்னல்களைத் திறக்கலாமா?" },
    { en: "How can I improve air quality without an air purifier?", hi: "बिना एयर प्यूरिफायर के घर की हवा कैसे सुधारें?", ta: "பியூரிஃபையர் இல்லாமல் காற்றை எப்படித் தூய்மையாக்குவது?" },
    { en: "Which air purifier CADR is right for my room?", hi: "मेरे कमरे के लिए कौन सा प्यूरिफायर CADR सही है?", ta: "என் அறைக்கு ஏற்ற ஏர் பியூரிஃபையர் அளவு எது?" }
  ];

  return (
    <div className="card" style={{ marginBottom: '24px', border: '1.5px solid #bae6fd', backgroundColor: '#f0f9ff' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          backgroundColor: '#0284c7',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Bot size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0369a1' }}>
            {t.voiceTitle}
          </h3>
          <p style={{ fontSize: '13px', color: '#0284c7' }}>
            {t.voiceSubtitle}
          </p>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {presetChips.map((chip, idx) => {
          const chipText = chip[language] || chip.en;
          return (
            <button
              key={idx}
              onClick={() => {
                setQuery(chipText);
                handleSendQuery(chipText);
              }}
              className="badge"
              style={{
                background: '#ffffff',
                border: '1px solid #bae6fd',
                color: '#0369a1',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={12} color="#0284c7" />
              <span>{chipText}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Log */}
      <div style={{
        maxHeight: '280px',
        overflowY: 'auto',
        background: '#ffffff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #e0f2fe',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: m.sender === 'user' ? 'var(--primary)' : m.isEmergency ? '#fee2e2' : '#f8fafc',
              color: m.sender === 'user' ? '#ffffff' : m.isEmergency ? '#991b1b' : '#1e293b',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: 1.5,
              border: m.isEmergency ? '1.5px solid #f87171' : '1px solid #e2e8f0',
              position: 'relative'
            }}
          >
            {m.isEmergency && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', marginBottom: '4px' }}>
                <AlertCircle size={16} />
                <span>URGENT HEALTH ALERT</span>
              </div>
            )}
            <p style={{ whiteSpace: 'pre-line' }}>{m.text}</p>
            {m.sender === 'ai' && (
              <button
                onClick={() => speakText(m.text, language)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: 'var(--secondary)',
                  fontWeight: '600'
                }}
              >
                <Volume2 size={12} />
                <span>Read Aloud</span>
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: 'flex-start', background: '#f8fafc', padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <RefreshCw size={14} className="pulse-mic" />
            <span>Consulting Clean Air Knowledge Base...</span>
          </div>
        )}
      </div>

      {/* Input Box with Big Mic & Send Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery();
        }}
        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
      >
        <button
          type="button"
          onClick={toggleMic}
          className={`btn ${isListening ? 'pulse-mic' : ''}`}
          style={{
            backgroundColor: isListening ? '#dc2626' : 'var(--secondary)',
            color: 'white',
            padding: '12px',
            borderRadius: '12px',
            minWidth: '50px'
          }}
          title={isListening ? "Listening... click to stop" : t.speakBtn}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isListening ? t.listening : t.askPlaceholder}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            border: isListening ? '2px solid #ef4444' : '1px solid #cbd5e1',
            fontSize: '15px',
            outline: 'none',
            backgroundColor: '#ffffff'
          }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '12px 18px', borderRadius: '12px' }}
        >
          <Send size={18} />
          <span>{t.sendBtn}</span>
        </button>
      </form>

      <p style={{ fontSize: '11px', color: '#64748b', marginTop: '10px', textAlign: 'center' }}>
        Scientific guidance derived from CPCB, WHO, and MoHFW protocols. Does not substitute doctor consultation.
      </p>

    </div>
  );
}
