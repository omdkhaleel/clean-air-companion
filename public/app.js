// Clean Air Companion - Fully Responsive & Modular Engine
// Tagline: Know Your Air. Know What to Do. Breathe Better.

(function () {
  'use strict';

  // --- Translation Dictionary (English, Hindi, Tamil) ---
  const i18n = {
    en: {
      appName: "Clean Air Companion",
      tagline: "Know Your Air. Know What to Do. Breathe Better.",
      seniorMode: "Senior Mode",
      exitSeniorMode: "Exit Senior Mode",
      todayAir: "Today's Air Quality",
      status: "Status",
      updated: "Updated",
      pollutants: "Key Pollutants",
      weather: "Weather & Inversion Factors",
      temp: "Temp",
      humidity: "Humidity",
      wind: "Wind",
      whatToDoToday: "What Should I Do Today?",
      clickToExpandAction: "Click to View Personalized Action Plan",
      clickToMinimizeAction: "Minimize Action Plan",
      doToday: "DO TODAY",
      doTodayDesc: "Immediate protective actions for your lungs and home",
      betterAlternatives: "BETTER ALTERNATIVES",
      betterAlternativesDesc: "Healthier substitutes for workouts and commuting",
      avoidToday: "AVOID TODAY",
      avoidTodayDesc: "Activities that multiply exposure or worsen localized smog",
      familyPlanTitle: "Daily Family Action Plan",
      explainMore: "Explain More",
      hideDetails: "Hide Details",
      readAloud: "Listen",
      reading: "Reading...",
      why: "Why this matters",
      expectedBenefit: "Expected Benefit",
      free: "Free",
      lowCost: "Low Cost",
      investment: "Investment",
      high: "High Priority",
      medium: "Medium Priority",
      optional: "Optional",
      categories: {
        Good: "Good (Minimal Impact)",
        Satisfactory: "Satisfactory (Minor Discomfort to Sensitive)",
        Moderate: "Moderate (Breathing Discomfort with Lung/Heart Conditions)",
        Poor: "Poor (Discomfort to Most on Prolonged Exposure)",
        "Very Poor": "Very Poor (Respiratory Illness on Prolonged Exposure)",
        Severe: "Severe (Health Emergency: Seriously Impacts Healthy & Vulnerable)"
      },
      familyGroups: {
        children: "Children & Toddlers",
        seniors: "Senior Citizens (60+)",
        workingAdults: "Working Adults & Commuters",
        students: "School & College Students",
        outdoorWorkers: "Outdoor Workers & Staff",
        healthPrecautions: "Asthma & Heart Caution"
      },
      indoorTitle: "Indoor Air Assistant",
      smartVentilation: "Smart Ventilation Advisor",
      windowAction: "Window Action Today",
      bestVentHour: "Safest Window Opening Hours",
      purifierCalculator: "HEPA Purifier & Room Sizing Guide",
      roomSize: "Room Area (sq ft)",
      ceilingHeight: "Ceiling Height (ft)",
      calculateCadr: "Calculate CADR",
      cadrResult: "Recommended Clean Air Delivery Rate (CADR)",
      indoorChecklist: "Daily Clean Air Checklist",
      voiceTitle: "Ask Clean Air Assistant",
      askPlaceholder: "Ask in English, Hindi, or Tamil...",
      speakBtn: "Speak",
      listening: "Listening to voice...",
      sendBtn: "Ask CleanAir",
      lifestyleTitle: "Low-Emission Daily Lifestyle",
      impactTitle: "My Environmental Impact",
      communityTitle: "Community Action Centre",
      takePledge: "Take Clean Air Pledge",
      pledgedCount: "Citizens Pledged for Cleaner Skies",
      reportBurning: "Report Open Burning Incident",
      simTitle: "QA Scenario Switcher (CPCB Bands)",
      simDesc: "Inspect AI recommendations under official CPCB test pollution levels:",
      locationLabel: "Select City",
      detectLocation: "Use My Location",
      profileBtn: "Family Profile",
      menuTitle: "Modules & Tools"
    },
    hi: {
      appName: "स्वच्छ वायु साथी",
      tagline: "अपनी हवा को समझें। क्या करना है जानें। बेहतर सांस लें।",
      seniorMode: "सरल मोड",
      exitSeniorMode: "सामान्य मोड",
      todayAir: "आज की वायु गुणवत्ता (AQI)",
      status: "स्थिति",
      updated: "अपडेट",
      pollutants: "प्रमुख प्रदूषक",
      weather: "मौसम व हवा की गति",
      temp: "तापमान",
      humidity: "नमी",
      wind: "हवा",
      whatToDoToday: "मुझे आज क्या करना चाहिए?",
      clickToExpandAction: "दैनिक कार्य योजना देखने के लिए क्लिक करें",
      clickToMinimizeAction: "कार्य योजना संक्षिप्त करें",
      doToday: "आज क्या करें (DO TODAY)",
      doTodayDesc: "फेफड़ों और घर की सुरक्षा के लिए तुरंत जरूरी कदम",
      betterAlternatives: "बेहतर विकल्प (ALTERNATIVES)",
      betterAlternativesDesc: "व्यायाम व आवागमन के सुरक्षित विकल्प",
      avoidToday: "आज क्या न करें (AVOID TODAY)",
      avoidTodayDesc: "प्रदूषण बढ़ाने वाली हानिकारक आदतें",
      familyPlanTitle: "पारिवारिक दैनिक कार्य योजना",
      explainMore: "विस्तार से समझें",
      hideDetails: "संक्षिप्त करें",
      readAloud: "सुनें",
      reading: "पढ़ा जा रहा है...",
      why: "कारण",
      expectedBenefit: "अपेक्षित लाभ",
      free: "मुफ़्त",
      lowCost: "कम खर्च",
      investment: "निवेश",
      high: "अति आवश्यक",
      medium: "मध्यम",
      optional: "वैकल्पिक",
      categories: {
        Good: "अच्छा (न्यूनतम प्रभाव)",
        Satisfactory: "संतोषजनक (संवेदनशील लोगों को हल्का असर)",
        Moderate: "मध्यम (फेफड़े/हृदय रोगियों को सांस में तकलीफ)",
        Poor: "खराब (लंबे समय तक रहने पर सांस में परेशानी)",
        "Very Poor": "बहुत खराब (लंबे समय में सांस की बीमारी का जोखिम)",
        Severe: "गंभीर (स्वास्थ्य आपातकाल: सभी के लिए खतरनाक)"
      },
      familyGroups: {
        children: "बच्चे और छोटे शिशु",
        seniors: "वरिष्ठ नागरिक (60+)",
        workingAdults: "नौकरीपेशा व यात्री",
        students: "स्कूली छात्र",
        outdoorWorkers: "बाहर काम करने वाले कर्मचारी",
        healthPrecautions: "अस्थमा व हृदय संबंधी सावधानी"
      },
      indoorTitle: "घर की हवा सुधार सहायक",
      smartVentilation: "स्मार्ट वेंटिलेशन सलाहकार",
      windowAction: "आज खिड़कियां खोलने की सलाह",
      bestVentHour: "खिड़की खोलने का सुरक्षित समय",
      purifierCalculator: "प्यूरिफायर व कमरा आकार कैलकुलेटर",
      roomSize: "कमरे का क्षेत्रफल (वर्ग फुट)",
      ceilingHeight: "छत की ऊंचाई (फुट)",
      calculateCadr: "CADR निकालें",
      cadrResult: "अनुशंसित CADR दर",
      indoorChecklist: "स्वच्छ इनडोर हवा की चेकलिस्ट",
      voiceTitle: "स्वच्छ वायु AI सहायक",
      askPlaceholder: "हिंदी में पूछें (जैसे: क्या आज बच्चे बाहर खेल सकते हैं?)...",
      speakBtn: "बोलें",
      listening: "आवाज सुनी जा रही है...",
      sendBtn: "उत्तर पाएं",
      lifestyleTitle: "कम उत्सर्जन जीवनशैली",
      impactTitle: "पर्यावरणीय प्रभाव ट्रैकर",
      communityTitle: "सामुदायिक सहभागिता केंद्र",
      takePledge: "स्वच्छ वायु संकल्प लें",
      pledgedCount: "नागरिकों ने संकल्प लिया",
      reportBurning: "कचरा/पत्तियां जलाने की सूचना दें",
      simTitle: "CPCB मानक परीक्षण (Scenario Tester)",
      simDesc: "विभिन्न CPCB प्रदूषण स्तरों पर AI सिफारिशें जांचें:",
      locationLabel: "शहर चुनें",
      detectLocation: "मेरा स्थान खोजें",
      profileBtn: "परिवार प्रोफाइल",
      menuTitle: "मॉड्यूल व टूल्स"
    },
    ta: {
      appName: "தூய காற்று தோழன்",
      tagline: "காற்றை அறிவோம். என்ன செய்ய வேண்டும் என்பதை அறிவோம். நலம் பெறுவோம்.",
      seniorMode: "எளிய முறை",
      exitSeniorMode: "வழக்கமான முறை",
      todayAir: "இன்றைய காற்றின் தரம் (AQI)",
      status: "நிலை",
      updated: "நேரம்",
      pollutants: "முக்கிய மாசுகள்",
      weather: "வானிலை & காற்று",
      temp: "வெப்பம்",
      humidity: "ஈரப்பதம்",
      wind: "காற்று",
      whatToDoToday: "இன்று நான் என்ன செய்ய வேண்டும்?",
      clickToExpandAction: "பாதுகாப்பு திட்டத்தைக் காண கிளிக் செய்க",
      clickToMinimizeAction: "திட்டத்தைச் சுருக்குக",
      doToday: "இன்று செய்ய வேண்டியவை",
      doTodayDesc: "நுரையீரலையும் குடும்பத்தையும் பாதுகாக்க உடனடியாகச் செய்ய வேண்டியவை",
      betterAlternatives: "சிறந்த மாற்று வழிகள்",
      betterAlternativesDesc: "ஆரோக்கியமான மாற்று வழிகள்",
      avoidToday: "இன்று தவிர்க்க வேண்டியவை",
      avoidTodayDesc: "மாசுபாட்டை அதிகரிக்கும் செயல்கள்",
      familyPlanTitle: "குடும்ப தினசரி பாதுகாப்பு திட்டம்",
      explainMore: "மேலும் விவரிக்க",
      hideDetails: "சுருக்குக",
      readAloud: "கேட்க",
      reading: "படிக்கப்படுகிறது...",
      why: "காரணம்",
      expectedBenefit: "எதிர்பார்க்கப்படும் நன்மை",
      free: "இலவசம்",
      lowCost: "குறைந்த செலவு",
      investment: "முதலீடு",
      high: "முன்னுரிமை",
      medium: "நடுத்தரம்",
      optional: "விருப்பம்",
      categories: {
        Good: "நன்று",
        Satisfactory: "திருப்திகரமானது",
        Moderate: "மிதமானது",
        Poor: "மோசமானது",
        "Very Poor": "மிகவும் மோசமானது",
        Severe: "தீவிரமானது"
      },
      familyGroups: {
        children: "குழந்தைகள்",
        seniors: "முதியவர்கள் (60+)",
        workingAdults: "பணியாளர்கள் & பயணிகள்",
        students: "பள்ளி மாணவர்கள்",
        outdoorWorkers: "வெளிப்புற ஊழியர்கள்",
        healthPrecautions: "சுவாச மற்றும் இதய முன்னெச்சரிக்கை"
      },
      indoorTitle: "வீட்டு காற்று வழிகாட்டி",
      smartVentilation: "ஸ்மார்ட் காற்றோட்ட வழிகாட்டி",
      windowAction: "ஜன்னல் திறப்பது குறித்த ஆலோசனை",
      bestVentHour: "ஜன்னல் திறக்க உகந்த நேரம்",
      purifierCalculator: "காற்று சுத்திகரிப்பான் கால்குலேட்டர்",
      roomSize: "அறையின் பரப்பளவு (சதுர அடி)",
      ceilingHeight: "உயரம் (அடி)",
      calculateCadr: "CADR கணக்கிடுக",
      cadrResult: "பரிந்துரைக்கப்பட்ட CADR அளவு",
      indoorChecklist: "தூய காற்று சரிபார்ப்புப் பட்டியல்",
      voiceTitle: "குரல் AI உதவியாளர்",
      askPlaceholder: "தமிழில் கேளுங்கள்...",
      speakBtn: "பேசுக",
      listening: "கேட்கப்படுகிறது...",
      sendBtn: "பதில்",
      lifestyleTitle: "குறைந்த உமிழ்வு வாழ்க்கை",
      impactTitle: "சுற்றுச்சூழல் பங்களிப்பு டிராக்கர்",
      communityTitle: "சமூக செயல் மையம்",
      takePledge: "உறுதிமொழி எடுக்க",
      pledgedCount: "குடிமக்கள் உறுதியளித்தனர்",
      reportBurning: "குப்பை எரிப்பு புகார்",
      simTitle: "CPCB சோதனை முறை",
      simDesc: "அரசு CPCB நிலைகளில் AI ஆலோசனைகள்:",
      locationLabel: "நகரம்",
      detectLocation: "என் இடம்",
      profileBtn: "சுயவிவரம்",
      menuTitle: "கருவிகள்"
    }
  };

  // --- State ---
  let state = {
    language: localStorage.getItem('cleanair_lang') || 'en',
    isSeniorMode: localStorage.getItem('cleanair_senior_mode') === 'true',
    selectedCity: 'delhi',
    activeScenario: null,
    citiesList: [],
    airData: null,
    advisorData: null,
    loading: true,

    // Left Column minimized by default
    isLeftSidebarOpen: false,

    // Left Column Sub-modules minimized by default
    sidebarModulesOpen: {
      qaScenario: false,
      familyPlan: false,
      askCleanAir: false,
      indoorAir: false,
      lifestyle: false,
      impactTracker: false,
      communityHub: false
    },

    // Main Page Content: "What Should I Do Today?" minimized by default
    isMainActionPlanOpen: false,

    // Sub-content sections minimized by default
    actionPillarsOpen: {
      doToday: false,
      betterAlternatives: false,
      avoidToday: false
    },

    isProfileModalOpen: false,
    activeFamilyTab: 'children',
    activeLifestyleCat: 'transport',
    expandedCards: {},
    speakingKey: null,
    isListening: false,
    chatMessages: [],
    speechRecognizer: null,
    checklist: JSON.parse(localStorage.getItem('cleanair_indoor_checklist') || 'null') || [
      { id: 'exhaust', text: 'Run kitchen exhaust fan during and 5 minutes after cooking', done: true },
      { id: 'wetmop', text: 'Wet mop floors with microfiber cloth instead of dry sweeping', done: true },
      { id: 'noincense', text: 'Avoid burning agarbatti and mosquito coils indoors', done: false },
      { id: 'acfilter', text: 'Wash split AC dust filter mesh every 2 weeks', done: false },
      { id: 'doorgap', text: 'Seal exterior door threshold gap with draft stopper', done: true },
      { id: 'cleanroom', text: 'Keep bedroom doors closed to maintain purified air zone', done: false }
    ],
    profile: JSON.parse(localStorage.getItem('cleanair_profile') || '{}'),
    impactInputs: JSON.parse(localStorage.getItem('cleanair_impact_inputs') || 'null') || {
      carKmAvoided: 24,
      metroKm: 40,
      kwhSaved: 18,
      burningAvoidedKg: 8
    },
    impactResults: {
      totalCo2AvoidedKg: 38.6,
      fuelSavedLitres: 3.2,
      treeEquivalentMonths: 21.4
    },
    communityStats: {
      activeCommunities: 34,
      totalPledges: 428,
      campaigns: [
        { id: 'clean-commute', title: 'RWA Clean Commute Challenge', goal: '10,000 km shared transit', progress: 68, activeMembers: 142 },
        { id: 'anti-burning', title: 'Zero Waste Burning Vigil', goal: '100% dry leaf composting', progress: 84, activeMembers: 95 },
        { id: 'school-carpool', title: 'Safe School Gate Carpool Drive', goal: 'Drop morning idling by 50%', progress: 55, activeMembers: 76 }
      ],
      recentReports: [
        { id: 1, locality: 'Sector 50 RWA', city: 'Noida', incident: 'Dry leaves burning in central park', status: 'Resolved by RWA Guard' },
        { id: 2, locality: 'Sarita Vihar Pocket C', city: 'Delhi', incident: 'Garbage dump smouldering near boundary wall', status: 'Reported to Municipal Ward Officer' }
      ]
    },
    hasPledged: false,
    cadrRoomArea: 150,
    cadrCeilingHeight: 10,
    calculatedCadrM3: 212,
    calculatedCadrCfm: 125
  };

  // --- Speech Utilities ---
  function speak(text, key = 'generic') {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (state.speakingKey === key) {
      state.speakingKey = null;
      renderApp();
      return;
    }

    const cleanText = text.replace(/[#*_`]/g, '').replace(/\n+/g, '. ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = state.language === 'hi' ? 'hi-IN' : state.language === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = 0.95;

    state.speakingKey = key;
    renderApp();

    utterance.onend = () => {
      state.speakingKey = null;
      renderApp();
    };
    utterance.onerror = () => {
      state.speakingKey = null;
      renderApp();
    };

    window.speechSynthesis.speak(utterance);
  }

  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognizer = new SpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.lang = state.language === 'hi' ? 'hi-IN' : state.language === 'ta' ? 'ta-IN' : 'en-IN';

    recognizer.onresult = (e) => {
      if (e.results && e.results[0] && e.results[0][0]) {
        const transcript = e.results[0][0].transcript;
        state.isListening = false;
        handleSendMessage(transcript);
      }
    };
    recognizer.onerror = () => {
      state.isListening = false;
      renderApp();
    };
    recognizer.onend = () => {
      state.isListening = false;
      renderApp();
    };
    return recognizer;
  }

  // --- API Calls ---
  async function fetchCities() {
    try {
      const res = await fetch('/api/cities');
      const data = await res.json();
      if (data.success) {
        state.citiesList = data.cities;
        renderApp();
      }
    } catch (e) {}
  }

  async function fetchAirAndAdvisorData(city = state.selectedCity, scenario = state.activeScenario, lat = null, lon = null) {
    state.loading = true;
    renderApp();

    try {
      let url = '/api/air-quality?';
      if (scenario) {
        url += `scenario=${scenario}&`;
      } else if (lat && lon) {
        url += `lat=${lat}&lon=${lon}&`;
      } else {
        url += `city=${city}&`;
      }

      const res = await fetch(url);
      const airData = await res.json();
      if (airData.success) {
        state.airData = airData;

        const advRes = await fetch('/api/ai/advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aqi: airData.aqi,
            profile: state.profile,
            language: state.language
          })
        });
        const advisorData = await advRes.json();
        if (advisorData.success) {
          state.advisorData = advisorData;
        }

        if (state.chatMessages.length === 0) {
          state.chatMessages = [{
            sender: 'ai',
            text: state.language === 'hi'
              ? `नमस्ते! आज ${airData.location?.city || 'शहर'} में AQI ${airData.aqi} है। कोई भी सवाल पूछें।`
              : state.language === 'ta'
              ? `வணக்கம்! இன்று AQI ${airData.aqi} ஆக உள்ளது. பாதுகாப்பு குறித்து என்னிடம் கேளுங்கள்.`
              : `Hello! Today AQI is ${airData.aqi} (${airData.category}). Ask me about masks, ventilation, or children.`
          }];
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      state.loading = false;
      renderApp();
    }
  }

  async function handleSendMessage(customText) {
    const inputEl = document.getElementById('chat-query-input');
    const text = (customText || (inputEl ? inputEl.value : '')).trim();
    if (!text) return;

    if (inputEl) inputEl.value = '';
    state.chatMessages.push({ sender: 'user', text });
    renderApp();

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          aqi: state.airData ? state.airData.aqi : 150,
          location: state.airData?.location?.city || 'Delhi NCR',
          profile: state.profile,
          language: state.language
        })
      });
      const data = await res.json();
      if (data.success) {
        const reply = (state.language === 'hi' && data.reply_hi)
          ? data.reply_hi
          : (state.language === 'ta' && data.reply_ta)
          ? data.reply_ta
          : data.reply;

        state.chatMessages.push({
          sender: 'ai',
          text: reply,
          isEmergency: data.isEmergency
        });
        speak(reply, 'chat_' + Date.now());
      }
    } catch (e) {
      state.chatMessages.push({ sender: 'ai', text: 'Temporary connection issue.' });
    }
    renderApp();
  }

  async function calculateImpact(inputs) {
    try {
      const res = await fetch('/api/impact/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      if (data.success) {
        state.impactResults = data;
        renderApp();
      }
    } catch (e) {}
  }

  // --- Rendering UI ---
  function renderApp() {
    const t = i18n[state.language] || i18n.en;
    const root = document.getElementById('root');
    if (!root) return;

    if (state.isSeniorMode) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }

    if (state.isSeniorMode) {
      root.innerHTML = renderSeniorMode(t);
      bindSeniorEvents(t);
      return;
    }

    root.innerHTML = `
      <div class="app-layout">
        
        <!-- Left Column Sidebar (Minimized by default) -->
        <aside class="left-sidebar ${state.isLeftSidebarOpen ? '' : 'minimized'}" id="left-sidebar-menu">
          ${renderLeftSidebar(t)}
        </aside>

        <!-- Mobile Backdrop when Sidebar is Open -->
        <div class="sidebar-backdrop" id="sidebar-backdrop"></div>

        <!-- Main Content Column -->
        <div class="main-content">
          
          <!-- Top Sticky Navbar (City in Right Corner, Language & Senior Mode Icons Only) -->
          ${renderTopNavbar(t)}

          <!-- Main Body (Realigned by Priority) -->
          <main class="main-body">
            <div class="hero-grid-2">
              ${renderAqiHero(t)}
              ${renderMonthlyAqiTrend(t)}
            </div>
            ${renderDailyAdvisorMinimized(t)}
            ${render12HourSmogOutlook(t)}
            ${renderQuickSidebarNavPills(t)}
          </main>

          <!-- Footer -->
          <footer style="background: #ffffff; border-top: 1px solid var(--border); padding: 18px 16px; margin-top: auto; font-size: 13px; color: var(--text-muted); text-align: center;">
            <strong>${t.appName}</strong> • CPCB NAAQS Standard & CEA Emission Factors • Offline Ready • Free Public Utility
          </footer>

        </div>

        <!-- Profile Modal -->
        ${state.isProfileModalOpen ? renderProfileModal(t) : ''}

      </div>
    `;

    bindEvents(t);
  }

  // --- Top Navbar (Icons Only for Language, Senior Mode, Profile; City on Right Corner) ---
  function renderTopNavbar(t) {
    return `
      <nav class="top-navbar">
        
        <!-- Left: Sidebar Toggle Button + Logo -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <button id="btn-toggle-left-menu" class="btn btn-outline" style="padding: 6px 12px; min-height: 38px; font-weight: 700;" title="Toggle Left Modules Menu">
            <span>☰</span>
            <span style="font-size: 13px;">${t.menuTitle}</span>
          </button>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 22px;">🍃</span>
            <span style="font-weight: 800; font-size: 17px; color: var(--primary-dark); white-space: nowrap;">
              ${t.appName}
            </span>
          </div>
        </div>

        <!-- Right Side: Language (Icon Only), Senior Mode (Icon Only), Profile (Icon Only), City Dropdown -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end;">
          
          <!-- Language Selector (Icon Only) -->
          <div style="position: relative; display: inline-flex; align-items: center;">
            <select id="language-selector" title="Language / भाषा / மொழி" style="cursor: pointer; padding: 6px 10px; border-radius: 8px; border: 1px solid var(--border); background: #ffffff; font-weight: 700; font-size: 14px; min-height: 38px;">
              <option value="en" ${state.language === 'en' ? 'selected' : ''}>🌐 EN</option>
              <option value="hi" ${state.language === 'hi' ? 'selected' : ''}>🌐 HI (हिंदी)</option>
              <option value="ta" ${state.language === 'ta' ? 'selected' : ''}>🌐 TA (தமிழ்)</option>
            </select>
          </div>

          <!-- Senior Mode (Icon Only) -->
          <button id="btn-toggle-senior" class="btn-icon-only" title="${t.seniorMode} (सरल मोड)" aria-label="${t.seniorMode}">
            👓
          </button>

          <!-- Household Profile (Icon Only) -->
          <button id="btn-open-profile" class="btn-icon-only" title="${t.profileBtn}" aria-label="${t.profileBtn}" style="position: relative;">
            👤
            ${Object.keys(state.profile).length > 0 ? `<span style="position: absolute; top: 4px; right: 4px; width: 8px; height: 8px; border-radius: 50%; background-color: var(--primary);"></span>` : ''}
          </button>

          <!-- City Selector in Top Right Corner -->
          <div style="display: inline-flex; align-items: center; gap: 4px; background: #f1f5f9; padding: 2px 8px; border-radius: 8px; border: 1px solid var(--border);">
            <span style="color: var(--primary); font-size: 14px;">📍</span>
            <select id="city-selector" style="background: transparent; border: none; font-weight: 700; color: #1e293b; cursor: pointer; outline: none; padding: 6px 2px; font-size: 13px; max-width: 170px;">
              ${state.citiesList.map(c => `
                <option value="${c.id}" ${state.selectedCity === c.id ? 'selected' : ''}>
                  ${c.name}
                </option>
              `).join('')}
            </select>
            <button id="btn-detect-gps" class="btn btn-outline" style="padding: 2px 6px; min-height: 28px; border: none; background: #e2e8f0; border-radius: 6px;" title="${t.detectLocation}">
              🧭
            </button>
          </div>

        </div>

      </nav>
    `;
  }

  // --- Left Column Sidebar Modules (Each Minimized / Collapsible by default) ---
  function renderLeftSidebar(t) {
    const m = state.sidebarModulesOpen;

    return `
      <div class="sidebar-header">
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 16px; color: #0f172a;">
          <span>📋</span>
          <span>${t.menuTitle}</span>
        </div>
        <button id="btn-close-left-menu" class="btn btn-outline" style="padding: 4px 8px; min-height: 32px; font-size: 13px;" title="Minimize Menu">
          ✕
        </button>
      </div>

      <div class="sidebar-content">
        
        <!-- 1. QA Scenario Switcher (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.qaScenario ? 'expanded' : ''}" id="mod-qa-scenario">
          <div class="sidebar-module-header" data-toggle="qaScenario">
            <span>🛡️ ${t.simTitle}</span>
            <span class="acc-arrow">${m.qaScenario ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">${t.simDesc}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${[
                { val: 35, label: '35 Good', cls: 'badge-good' },
                { val: 75, label: '75 Sat', cls: 'badge-satisfactory' },
                { val: 150, label: '150 Mod', cls: 'badge-moderate' },
                { val: 250, label: '250 Poor', cls: 'badge-poor' },
                { val: 350, label: '350 V.Poor', cls: 'badge-very-poor' },
                { val: 450, label: '450 Severe', cls: 'badge-severe' }
              ].map(item => `
                <button class="badge scenario-btn ${item.cls}" data-scenario="${item.val}" style="cursor: pointer; padding: 5px 10px; font-size: 12px; font-weight: 700; border: ${state.activeScenario === item.val ? '2px solid #0f172a' : '1px solid transparent'};">
                  ${item.label}
                </button>
              `).join('')}
            </div>
            ${state.activeScenario ? `
              <button id="btn-reset-scenario" class="btn btn-outline" style="margin-top: 10px; width: 100%; padding: 4px 8px; font-size: 12px; min-height: 30px;">
                Reset to Live Feed
              </button>
            ` : ''}
          </div>
        </div>

        <!-- 2. Daily Family Action Plan (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.familyPlan ? 'expanded' : ''}" id="mod-family-plan">
          <div class="sidebar-module-header" data-toggle="familyPlan">
            <span>👶 ${t.familyPlanTitle}</span>
            <span class="acc-arrow">${m.familyPlan ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderFamilyPlanModule(t)}
          </div>
        </div>

        <!-- 3. Ask Clean Air Voice Assistant (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.askCleanAir ? 'expanded' : ''}" id="mod-ask-clean-air">
          <div class="sidebar-module-header" data-toggle="askCleanAir">
            <span>🤖 ${t.voiceTitle}</span>
            <span class="acc-arrow">${m.askCleanAir ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderAskCleanAirModule(t)}
          </div>
        </div>

        <!-- 4. Indoor Air Assistant & Ventilation (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.indoorAir ? 'expanded' : ''}" id="mod-indoor-air">
          <div class="sidebar-module-header" data-toggle="indoorAir">
            <span>🏠 ${t.indoorTitle}</span>
            <span class="acc-arrow">${m.indoorAir ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderIndoorAirModule(t)}
          </div>
        </div>

        <!-- 5. Low-Emission Daily Lifestyle (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.lifestyle ? 'expanded' : ''}" id="mod-lifestyle">
          <div class="sidebar-module-header" data-toggle="lifestyle">
            <span>🌱 ${t.lifestyleTitle}</span>
            <span class="acc-arrow">${m.lifestyle ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderLifestyleModule(t)}
          </div>
        </div>

        <!-- 6. Environmental Impact Tracker (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.impactTracker ? 'expanded' : ''}" id="mod-impact-tracker">
          <div class="sidebar-module-header" data-toggle="impactTracker">
            <span>🏆 ${t.impactTitle}</span>
            <span class="acc-arrow">${m.impactTracker ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderImpactModule(t)}
          </div>
        </div>

        <!-- 7. Community Action Centre (Shifted here, minimized by default) -->
        <div class="sidebar-module ${m.communityHub ? 'expanded' : ''}" id="mod-community-hub">
          <div class="sidebar-module-header" data-toggle="communityHub">
            <span>🏢 ${t.communityTitle}</span>
            <span class="acc-arrow">${m.communityHub ? '▲' : '▼'}</span>
          </div>
          <div class="sidebar-module-body">
            ${renderCommunityModule(t)}
          </div>
        </div>

      </div>
    `;
  }

  // --- Main Page Priority 1: Today's Air Quality Hero Card ---
  function renderAqiHero(t) {
    if (state.loading || !state.airData) {
      return `
        <div class="card" style="text-align: center; padding: 30px 16px;">
          <div style="font-size: 28px; margin-bottom: 8px;" class="pulse-mic">🔄</div>
          <h3 style="font-size: 16px; font-weight: 700;">Connecting to Live Environmental Stations...</h3>
          <p style="color: var(--text-muted); font-size: 13px;">Retrieving CPCB particulate and gas sub-indices</p>
        </div>
      `;
    }

    const { aqi, category, categoryDetails = {}, pollutants = {}, weather = {}, location = {}, station, timestamp, isSimulation } = state.airData;

    return `
      <div class="card" style="border-left: 6px solid ${categoryDetails.color || '#eab308'}; padding: 18px;">
        
        <!-- Top Info Strip -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 14px;">
          <div>
            <span style="font-size: 12px; text-transform: uppercase; font-weight: 800; color: var(--text-muted); letter-spacing: 0.05em;">
              ${t.todayAir} • ${location.city || 'India'}
            </span>
            <div style="font-size: 12px; color: #475569; display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span style="font-weight: 600;">${station}</span>
              ${isSimulation ? `<span class="badge badge-moderate" style="font-size: 10px; padding: 1px 6px;">QA Test</span>` : `<span class="badge badge-good" style="font-size: 10px; padding: 1px 6px;">Live CPCB</span>`}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: var(--text-muted);">
              ${t.updated}: ${new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button id="btn-refresh-aqi" class="btn btn-outline" style="padding: 4px 8px; min-height: 28px; font-size: 12px;">
              🔄
            </button>
          </div>
        </div>

        <!-- AQI Meter + Weather -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="min-width: 90px; height: 90px; border-radius: 16px; background-color: ${categoryDetails.bg || '#fef9c3'}; color: ${categoryDetails.text || '#854d0e'}; border: 2px solid ${categoryDetails.color || '#eab308'}; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px;">
              <span style="font-size: 10px; font-weight: 800; text-transform: uppercase;">CPCB AQI</span>
              <span style="font-size: 38px; font-weight: 900; line-height: 1;">${aqi}</span>
            </div>

            <div>
              <span class="badge" style="background: ${categoryDetails.bg}; color: ${categoryDetails.text}; border: 1px solid ${categoryDetails.color}; font-size: 14px; padding: 4px 10px; font-weight: 800;">
                ${state.language === 'hi' ? categoryDetails.hi : state.language === 'ta' ? categoryDetails.ta : category}
              </span>
              <p style="font-size: 13px; color: #334155; font-weight: 600; margin-top: 4px; max-width: 500px;">
                ${t.categories[category] || category}
              </p>
            </div>
          </div>

          <!-- Weather factors -->
          <div style="background: #f8fafc; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--border); display: flex; gap: 14px; align-items: center;">
            <div style="text-align: center;">
              <div style="color: #64748b; font-size: 11px;">🌡 ${t.temp}</div>
              <span style="font-size: 15px; font-weight: 700; color: #1e293b;">${weather.temperature || 22}°C</span>
            </div>
            <div style="text-align: center;">
              <div style="color: #64748b; font-size: 11px;">💧 ${t.humidity}</div>
              <span style="font-size: 15px; font-weight: 700; color: #1e293b;">${weather.humidity || 60}%</span>
            </div>
            <div style="text-align: center;">
              <div style="color: #64748b; font-size: 11px;">💨 ${t.wind}</div>
              <span style="font-size: 15px; font-weight: 700; color: #1e293b;">${weather.windSpeed || 6} km/h</span>
            </div>
          </div>
        </div>

        <!-- Pollutant Sub-indices -->
        <div class="grid-fluid-3" style="gap: 8px; border-top: 1px solid var(--border); padding-top: 10px;">
          <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700;">PM2.5 (Soot)</span>
            <span style="font-size: 13px; font-weight: 800; color: ${pollutants.pm25?.value > 60 ? '#b91c1c' : '#15803d'};">
              ${pollutants.pm25?.value || '--'} µg/m³
            </span>
          </div>

          <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700;">PM10 (Dust)</span>
            <span style="font-size: 13px; font-weight: 800; color: ${pollutants.pm10?.value > 100 ? '#ea580c' : '#15803d'};">
              ${pollutants.pm10?.value || '--'} µg/m³
            </span>
          </div>

          <div style="background: #f1f5f9; padding: 8px 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700;">NO₂ / SO₂ / CO</span>
            <span style="font-size: 12px; font-weight: 700; color: #334155;">
              ${pollutants.no2?.value || 30} / ${pollutants.so2?.value || 12}
            </span>
          </div>
        </div>

      </div>
    `;
  }

  // --- Main Page Priority 1B: Monthly AQI Trend Graph & Insights (Right Side of Today's Air Quality) ---
  function renderMonthlyAqiTrend(t) {
    if (state.loading || !state.airData) {
      return `
        <div class="card" style="text-align: center; padding: 30px 16px;">
          <div style="font-size: 28px; margin-bottom: 8px;" class="pulse-mic">📊</div>
          <h3 style="font-size: 16px; font-weight: 700;">Loading 30-Day Air Quality Trend...</h3>
        </div>
      `;
    }

    const mt = state.airData.monthlyTrend || {
      days: [],
      averageAqi: state.airData.aqi || 150,
      averageCategory: state.airData.category || 'Moderate',
      safeDaysCount: 6,
      badDaysCount: 16,
      insight: "Monthly air quality trend tracking across 30 days."
    };

    const days = mt.days || [];
    const avgAqi = mt.averageAqi || state.airData.aqi;
    const avgCat = mt.averageCategory || state.airData.category;
    const avgCatDetails = state.airData.categoryDetails || {};

    const chartHeight = 85;
    const maxVal = 500;

    const barsSvg = days.map((d, i) => {
      const barH = Math.max(4, Math.round((d.aqi / maxVal) * chartHeight));
      const x = 12 + i * 11;
      const y = chartHeight - barH + 8;
      return `
        <rect class="trend-bar-rect" x="${x}" y="${y}" width="8" height="${barH}" rx="2" fill="${d.color || '#eab308'}">
          <title>${d.date}: AQI ${d.aqi} (${d.category})</title>
        </rect>
      `;
    }).join('');

    return `
      <div class="card" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Header -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 10px;">
          <div>
            <span style="font-size: 12px; text-transform: uppercase; font-weight: 800; color: var(--text-muted); letter-spacing: 0.05em;">
              Monthly Insights • 30 Days
            </span>
            <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px;">
              📈 30-Day AQI Trend Graph
            </h4>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 11px; color: #64748b; font-weight: 600;">Avg:</span>
            <span class="badge" style="background: ${avgCatDetails.bg || '#fef9c3'}; color: ${avgCatDetails.text || '#854d0e'}; border: 1px solid ${avgCatDetails.color || '#eab308'}; font-size: 12px; font-weight: 800; padding: 2px 8px;">
              ${avgAqi} (${avgCat})
            </span>
          </div>
        </div>

        <!-- SVG Trend Chart -->
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 10px; padding: 8px 10px 4px 10px; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b; margin-bottom: 4px;">
            <span>30 Days Ago</span>
            <span style="color: #65a30d; font-weight: 700;">--- CPCB Safe Limit (100)</span>
            <span>Today</span>
          </div>

          <svg viewBox="0 0 355 105" style="width: 100%; height: auto; display: block;" preserveAspectRatio="xMidYMid meet">
            <line x1="10" y1="76" x2="345" y2="76" stroke="#65a30d" stroke-dasharray="3,3" stroke-width="1.2" opacity="0.8" />
            <line x1="10" y1="59" x2="345" y2="59" stroke="#eab308" stroke-dasharray="3,3" stroke-width="1.2" opacity="0.6" />
            <line x1="10" y1="42" x2="345" y2="42" stroke="#f97316" stroke-dasharray="3,3" stroke-width="1.2" opacity="0.6" />
            
            ${barsSvg}
            
            <line x1="10" y1="94" x2="345" y2="94" stroke="#cbd5e1" stroke-width="1" />
          </svg>

          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; margin-top: 2px;">
            <span>${days[0]?.date || 'Day 1'}</span>
            <span>${days[14]?.date || 'Day 15'}</span>
            <span style="font-weight: 700; color: #047857;">${days[29]?.date || 'Today'}</span>
          </div>
        </div>

        <!-- 30-Day Day Breakdown Pills -->
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <div style="flex: 1; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 6px 8px; text-align: center;">
            <span style="font-size: 11px; color: #166534; font-weight: 700;">Clean (≤100)</span>
            <div style="font-size: 15px; font-weight: 900; color: #15803d;">${mt.safeDaysCount || 0} Days</div>
          </div>

          <div style="flex: 1; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 6px 8px; text-align: center;">
            <span style="font-size: 11px; color: #991b1b; font-weight: 700;">Smog (>200)</span>
            <div style="font-size: 15px; font-weight: 900; color: #b91c1c;">${mt.badDaysCount || 0} Days</div>
          </div>
        </div>

        <!-- Actionable Insight Note -->
        <div style="background: #f8fafc; border-left: 3px solid var(--secondary); padding: 8px 10px; border-radius: 6px; font-size: 12px; color: #475569; line-height: 1.4;">
          <strong>Trend Insight:</strong> ${mt.insight || '30-day tracking reveals periodic atmospheric inversion and wind clearing cycles.'}
        </div>

      </div>
    `;
  }

  // --- Main Page Priority 2: "What Should I Do Today?" (Content Minimized by default) ---
  function renderDailyAdvisorMinimized(t) {
    if (!state.advisorData) return '';
    const { interpretation = '', doToday = [], betterAlternatives = [], avoidToday = [] } = state.advisorData;
    const isMainOpen = state.isMainActionPlanOpen;
    const p = state.actionPillarsOpen;

    const renderActionCard = (item, key, borderCol) => {
      const isSpeaking = state.speakingKey === key;
      const isDetailsOpen = !!state.expandedCards[key];
      const fullText = `${item.what}. ${item.why}. Expected benefit: ${item.benefit}. Cost: ${item.cost}.`;

      return `
        <div style="background: #ffffff; border-radius: 10px; border: 1px solid var(--border); border-left: 4px solid ${borderCol}; padding: 12px 14px; margin-bottom: 8px;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 6px; margin-bottom: 6px;">
            <h5 style="font-size: 14px; font-weight: 700; color: #0f172a; flex: 1; line-height: 1.35;">${item.what}</h5>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="badge" style="background: ${item.cost.toLowerCase().includes('free') ? '#dcfce7' : '#e0f2fe'}; color: ${item.cost.toLowerCase().includes('free') ? '#166534' : '#0369a1'}; font-size: 10px;">
                ${item.cost}
              </span>
              <button class="btn btn-speak-item" data-text="${encodeURIComponent(fullText)}" data-key="${key}" style="padding: 2px 6px; min-height: 26px; font-size: 11px;">
                🔊 ${isSpeaking ? t.reading : t.readAloud}
              </button>
            </div>
          </div>
          <p style="font-size: 13px; color: #334155;"><strong style="color: #0f172a;">${t.why}: </strong>${item.why}</p>
          <p style="font-size: 12px; color: #047857; font-weight: 600; margin-top: 3px;"><strong>${t.expectedBenefit}: </strong>${item.benefit}</p>
          <div style="text-align: right; margin-top: 4px;">
            <button class="btn-toggle-explain" data-key="${key}" style="background: transparent; border: none; font-size: 11px; color: var(--secondary); cursor: pointer; font-weight: 600;">
              ${isDetailsOpen ? t.hideDetails + ' ▲' : t.explainMore + ' ▼'}
            </button>
          </div>
          ${isDetailsOpen && item.details ? `
            <div style="margin-top: 6px; padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 12px; color: #475569;">
              ${item.details}
            </div>
          ` : ''}
        </div>
      `;
    };

    return `
      <section class="card" style="border: 1.5px solid #a7f3d0; background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%); padding: 18px;">
        
        <!-- Header Strip: Interpretation + Click to Expand Button -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px;">
          <div>
            <span class="badge badge-good" style="margin-bottom: 4px; font-size: 11px;">Primary Action Hero</span>
            <h3 style="font-size: 20px; font-weight: 800; color: #064e3b;">${t.whatToDoToday}</h3>
          </div>

          <button id="btn-toggle-main-action" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;">
            <span>${isMainOpen ? t.clickToMinimizeAction + ' ▲' : t.clickToExpandAction + ' ▼'}</span>
          </button>
        </div>

        <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 10px; padding: 10px 14px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid var(--primary);">
          "${interpretation}"
        </p>

        <!-- Collapsible Content (Minimized by default, sub-sections also minimized by default) -->
        ${isMainOpen ? `
          <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
            
            <!-- Pillar 1: DO TODAY (Minimized by default) -->
            <div class="expandable-action-card ${p.doToday ? 'open' : ''}" style="border-left: 5px solid #16a34a;">
              <div class="expandable-action-header" data-pillar="doToday" style="background: ${p.doToday ? '#f0fdf4' : '#ffffff'};">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">✅</span>
                  <div>
                    <strong style="font-size: 15px; color: #14532d;">1. ${t.doToday}</strong>
                    <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">(${doToday.length} immediate actions)</span>
                  </div>
                </div>
                <span style="font-size: 13px; font-weight: 700; color: #16a34a;">${p.doToday ? '▲ Close' : '▼ Expand'}</span>
              </div>
              <div class="expandable-action-body">
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${t.doTodayDesc}</p>
                ${doToday.map((it, idx) => renderActionCard(it, `do_${idx}`, '#16a34a')).join('')}
              </div>
            </div>

            <!-- Pillar 2: BETTER ALTERNATIVES (Minimized by default) -->
            <div class="expandable-action-card ${p.betterAlternatives ? 'open' : ''}" style="border-left: 5px solid #0284c7;">
              <div class="expandable-action-header" data-pillar="betterAlternatives" style="background: ${p.betterAlternatives ? '#f0f9ff' : '#ffffff'};">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">🔀</span>
                  <div>
                    <strong style="font-size: 15px; color: #075985;">2. ${t.betterAlternatives}</strong>
                    <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">(${betterAlternatives.length} healthy shifts)</span>
                  </div>
                </div>
                <span style="font-size: 13px; font-weight: 700; color: #0284c7;">${p.betterAlternatives ? '▲ Close' : '▼ Expand'}</span>
              </div>
              <div class="expandable-action-body">
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${t.betterAlternativesDesc}</p>
                ${betterAlternatives.map((it, idx) => renderActionCard(it, `alt_${idx}`, '#0284c7')).join('')}
              </div>
            </div>

            <!-- Pillar 3: AVOID TODAY (Minimized by default) -->
            <div class="expandable-action-card ${p.avoidToday ? 'open' : ''}" style="border-left: 5px solid #dc2626;">
              <div class="expandable-action-header" data-pillar="avoidToday" style="background: ${p.avoidToday ? '#fef2f2' : '#ffffff'};">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">🛑</span>
                  <div>
                    <strong style="font-size: 15px; color: #991b1b;">3. ${t.avoidToday}</strong>
                    <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">(${avoidToday.length} critical hazards)</span>
                  </div>
                </div>
                <span style="font-size: 13px; font-weight: 700; color: #dc2626;">${p.avoidToday ? '▲ Close' : '▼ Expand'}</span>
              </div>
              <div class="expandable-action-body">
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${t.avoidTodayDesc}</p>
                ${avoidToday.map((it, idx) => renderActionCard(it, `avoid_${idx}`, '#dc2626')).join('')}
              </div>
            </div>

          </div>
        ` : ''}

      </section>
    `;
  }

  // --- Main Page Priority 3: 12-Hour Smog Outlook (Accommodated WITHOUT Horizontal Scroll) ---
  function render12HourSmogOutlook(t) {
    if (!state.airData?.forecast) return '';
    const forecast = state.airData.forecast.slice(0, 12);

    return `
      <div class="card" style="padding: 16px;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 800; color: #0f172a;">🕒 12-Hour Smog Outlook & Activity Windows</h4>
            <p style="font-size: 11px; color: var(--text-muted);">Responsive fluid view without horizontal scrolling</p>
          </div>
          <span class="badge badge-good" style="font-size: 11px;">
            ★ Safest Outdoor Window: 12:30 PM - 03:30 PM
          </span>
        </div>

        <!-- 12-Grid fully accommodating within screen -->
        <div class="forecast-grid-12">
          ${forecast.map((item, idx) => {
            const isClean = idx >= 4 && idx <= 7;
            const aqiCol = item.aqi > 250 ? '#dc2626' : item.aqi > 100 ? '#ea580c' : '#16a34a';
            return `
              <div class="forecast-item" style="border-top: 3px solid ${aqiCol}; background: ${isClean ? '#ecfdf5' : '#f8fafc'};">
                <span style="font-size: 11px; font-weight: 700; color: #475569;">${item.time}</span>
                <span style="font-size: 15px; font-weight: 900; color: ${aqiCol}; margin: 2px 0;">${item.aqi}</span>
                <span style="font-size: 9px; color: #64748b;">P${item.pm25}</span>
                ${isClean ? `<span style="font-size: 9px; color: #16a34a; font-weight: 800;">★ Safe</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // --- Quick Launch Pills for Left Sidebar Modules ---
  function renderQuickSidebarNavPills(t) {
    return `
      <div style="background: #ffffff; border-radius: 12px; border: 1px solid var(--border); padding: 14px 16px; margin-top: 10px;">
        <span style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">
          Quick Tools in Left Menu:
        </span>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <button class="btn btn-outline btn-open-left-module" data-mod="qaScenario" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🛡️ QA Scenarios
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="familyPlan" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            👶 Family Plan
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="askCleanAir" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🤖 Ask CleanAir
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="indoorAir" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🏠 Indoor Ventilation
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="lifestyle" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🌱 Low-Emission Lifestyle
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="impactTracker" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🏆 Carbon Impact
          </button>
          <button class="btn btn-outline btn-open-left-module" data-mod="communityHub" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            🏢 Community Hub
          </button>
        </div>
      </div>
    `;
  }

  // --- Sub-Module Renderers (Inside Left Sidebar) ---
  function renderFamilyPlanModule(t) {
    if (!state.advisorData?.familyPlan) return 'Loading...';
    const fp = state.advisorData.familyPlan;
    const tabIcons = { children: '👶', seniors: '👵', workingAdults: '💼', students: '🎒', outdoorWorkers: '👷', healthPrecautions: '❤️' };
    const current = fp[state.activeFamilyTab] || fp.children;

    return `
      <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px;">
        ${Object.keys(fp).map(key => `
          <button class="btn btn-family-tab" data-tab="${key}" style="padding: 4px 8px; font-size: 11px; min-height: 30px; border-radius: 6px; background: ${state.activeFamilyTab === key ? 'var(--primary)' : '#f1f5f9'}; color: ${state.activeFamilyTab === key ? '#ffffff' : '#334155'};">
            ${tabIcons[key]} ${t.familyGroups[key] || key}
          </button>
        `).join('')}
      </div>
      <div style="background: #f8fafc; border-radius: 8px; padding: 10px; border: 1px solid var(--border); font-size: 12px;">
        <strong style="color: #0f172a; display: block; margin-bottom: 4px;">${tabIcons[state.activeFamilyTab]} ${t.familyGroups[state.activeFamilyTab] || current.title}</strong>
        <p style="color: #334155; line-height: 1.4;">${current.guidance}</p>
        <button class="btn btn-outline btn-speak-item" data-text="${encodeURIComponent(current.guidance)}" data-key="fam_${state.activeFamilyTab}" style="margin-top: 6px; padding: 2px 8px; font-size: 11px; min-height: 26px;">
          🔊 Listen
        </button>
      </div>
    `;
  }

  function renderAskCleanAirModule(t) {
    return `
      <div style="max-height: 200px; overflow-y: auto; background: #f8fafc; border-radius: 8px; padding: 8px; border: 1px solid var(--border); margin-bottom: 8px; display: flex; flex-direction: column; gap: 6px;">
        ${state.chatMessages.map((m, idx) => `
          <div style="align-self: ${m.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width: 90%; background: ${m.sender === 'user' ? 'var(--primary)' : '#ffffff'}; color: ${m.sender === 'user' ? '#ffffff' : '#1e293b'}; padding: 6px 10px; border-radius: 8px; font-size: 12px; border: 1px solid var(--border);">
            <p>${m.text}</p>
          </div>
        `).join('')}
      </div>
      <form id="chat-form" style="display: flex; gap: 4px;">
        <button type="button" id="btn-chat-mic" class="btn ${state.isListening ? 'pulse-mic' : ''}" style="background-color: ${state.isListening ? '#dc2626' : 'var(--secondary)'}; color: white; padding: 6px 10px; font-size: 14px; min-height: 34px;">
          ${state.isListening ? '🛑' : '🎤'}
        </button>
        <input type="text" id="chat-query-input" placeholder="${t.askPlaceholder}" style="flex: 1; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 12px;" />
        <button type="submit" class="btn btn-primary" style="padding: 6px 10px; font-size: 12px; min-height: 34px;">${t.sendBtn}</button>
      </form>
    `;
  }

  function renderIndoorAirModule(t) {
    const vent = state.advisorData?.ventilationAdvice || {};
    return `
      <div style="font-size: 12px;">
        <div style="background: #ffffff; padding: 8px 10px; border-radius: 6px; border-left: 3px solid var(--primary); margin-bottom: 8px;">
          <strong>${t.windowAction}: </strong>${vent.windowAction || 'Keep closed during rush hours'}
          <br><span style="color: var(--text-muted);">${t.bestVentHour}: ${vent.bestHour || '12 PM - 3 PM'}</span>
        </div>
        <div style="background: #ecfdf5; padding: 8px; border-radius: 6px; border: 1px solid #a7f3d0; margin-bottom: 8px; text-align: center;">
          <span style="font-weight: 700; color: #065f46;">Recommended CADR: ${state.calculatedCadrM3} m³/hr</span>
          <br><span style="color: #047857;">For ${state.cadrRoomArea} sq ft room</span>
        </div>
        <strong style="display: block; margin-bottom: 4px;">Household Checklist:</strong>
        ${state.checklist.slice(0, 3).map(it => `
          <div class="btn-toggle-checklist" data-id="${it.id}" style="display: flex; align-items: center; gap: 6px; padding: 4px 6px; background: #ffffff; border-radius: 4px; border: 1px solid var(--border); margin-bottom: 4px; cursor: pointer;">
            <span>${it.done ? '☑' : '☐'}</span>
            <span style="text-decoration: ${it.done ? 'line-through' : 'none'};">${it.text}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderLifestyleModule(t) {
    return `
      <div style="font-size: 12px;">
        <div style="background: #ffffff; padding: 8px; border-radius: 6px; border: 1px solid var(--border); margin-bottom: 6px;">
          <strong style="color: var(--primary-dark);">🚌 Shift 2 Days Commute to Metro</strong>
          <p style="color: #64748b;">Cuts 25 kg CO₂e/month and avoids street-level soot.</p>
        </div>
        <div style="background: #ffffff; padding: 8px; border-radius: 6px; border: 1px solid var(--border);">
          <strong style="color: var(--primary-dark);">⚡ 25°C AC Setpoint</strong>
          <p style="color: #64748b;">Saves 18% electricity and reduces thermal power emissions.</p>
        </div>
      </div>
    `;
  }

  function renderImpactModule(t) {
    const res = state.impactResults;
    return `
      <div style="font-size: 12px; text-align: center;">
        <div style="background: #f0fdf4; padding: 10px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 6px;">
          <div style="font-size: 20px; font-weight: 900; color: #14532d;">${res.totalCo2AvoidedKg} kg CO₂e</div>
          <span style="color: #16a34a; font-weight: 700;">Emissions Avoided</span>
        </div>
        <span style="color: var(--text-muted); font-size: 11px;">Calculated using Central Electricity Authority factor (0.82 kg/kWh).</span>
      </div>
    `;
  }

  function renderCommunityModule(t) {
    return `
      <div style="font-size: 12px;">
        <div style="background: #1e293b; color: white; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 8px;">
          <div style="font-size: 18px; font-weight: 900;">${state.communityStats.totalPledges} Pledges</div>
          <span style="font-size: 11px; color: #94a3b8;">Across 34 residential communities</span>
        </div>
        <button id="btn-take-pledge" class="btn btn-primary" style="width: 100%; padding: 6px; font-size: 12px; min-height: 32px;">
          ${state.hasPledged ? '✓ Pledged' : t.takePledge}
        </button>
      </div>
    `;
  }

  // --- Senior Citizen View ---
  function renderSeniorMode(t) {
    const aqi = state.airData ? state.airData.aqi : 150;
    const city = state.airData?.location?.city || 'Your City';

    let simpleStatus = '';
    let walkAdvice = '';
    let windowAdvice = '';
    let maskAdvice = '';

    if (aqi <= 50) {
      simpleStatus = state.language === 'hi' ? 'हवा बिल्कुल साफ है' : state.language === 'ta' ? 'காற்று சுத்தமாக உள்ளது' : 'Air is Clean and Fresh';
      walkAdvice = state.language === 'hi' ? 'हाँ, आप बाहर टहलने जा सकते हैं। कोई खतरा नहीं है।' : state.language === 'ta' ? 'ஆம், நீங்கள் நடைப்பயிற்சி செல்லலாம்.' : 'YES, it is safe to walk outdoors today.';
      windowAdvice = state.language === 'hi' ? 'खिड़कियां खुली रखें।' : state.language === 'ta' ? 'ஜன்னல்களைத் திறந்து வைக்கலாம்.' : 'OPEN windows freely. Let fresh air in.';
      maskAdvice = state.language === 'hi' ? 'मास्क की जरूरत नहीं है।' : state.language === 'ta' ? 'முகக்கவசம் தேவையில்லை.' : 'NO MASK needed today.';
    } else if (aqi <= 100) {
      simpleStatus = state.language === 'hi' ? 'हवा सामान्य है' : state.language === 'ta' ? 'காற்று சாதாரணமாக உள்ளது' : 'Air is Satisfactory';
      walkAdvice = state.language === 'hi' ? 'आप टहल सकते हैं। बहुत व्यस्त सड़कों से बचें।' : state.language === 'ta' ? 'நீங்கள் நடக்கலாம்.' : 'YES, walking is safe. Avoid traffic roads.';
      windowAdvice = state.language === 'hi' ? 'दोपहर में खिड़कियां खोलें।' : state.language === 'ta' ? 'மதிய வேளையில் ஜன்னல்களைத் திறக்கவும்.' : 'OPEN windows in afternoon (12 PM - 3 PM).';
      maskAdvice = state.language === 'hi' ? 'मास्क जरूरी नहीं है।' : state.language === 'ta' ? 'முகக்கவசம் கட்டாயமில்லை.' : 'Mask optional.';
    } else if (aqi <= 200) {
      simpleStatus = state.language === 'hi' ? 'हवा में थोड़ा प्रदूषण है' : state.language === 'ta' ? 'காற்றில் சிறிது மாசு உள்ளது' : 'Moderate Pollution';
      walkAdvice = state.language === 'hi' ? 'सुबह जल्दी न टहलें। सुबह 8:30 के बाद धूप में टहलें।' : state.language === 'ta' ? 'காலை 8:30 மணிக்கு மேல் நடக்கவும்.' : 'DO NOT walk in early morning chill. Walk after 8:30 AM.';
      windowAdvice = state.language === 'hi' ? 'सुबह-शाम खिड़कियां बंद रखें।' : state.language === 'ta' ? 'காலை மாலையில் மூடவும்.' : 'KEEP windows CLOSED in morning & evening.';
      maskAdvice = state.language === 'hi' ? 'सड़क पर जाते समय मास्क पहनें।' : state.language === 'ta' ? 'முகக்கவசம் அணியவும்.' : 'Wear a mask on roads.';
    } else if (aqi <= 300) {
      simpleStatus = state.language === 'hi' ? 'हवा खराब है (प्रदूषण अधिक है)' : state.language === 'ta' ? 'காற்று மோசமாக உள்ளது' : 'Air is POOR (High Pollution)';
      walkAdvice = state.language === 'hi' ? 'बाहर टहलना टालें। घर के अंदर चलें।' : state.language === 'ta' ? 'வெளியில் நடக்க வேண்டாம்.' : 'AVOID outdoor walking. Walk indoors.';
      windowAdvice = state.language === 'hi' ? 'खिड़कियां बंद रखें।' : state.language === 'ta' ? 'ஜன்னல்களை மூடி வைக்கவும்.' : 'KEEP all windows CLOSED.';
      maskAdvice = state.language === 'hi' ? 'बाहर निकलना पड़े तो N95 मास्क अवश्य लगाएं।' : state.language === 'ta' ? 'N95 முகக்கவசம் கட்டாயம்.' : 'WEAR N95 MASK if stepping outside.';
    } else {
      simpleStatus = state.language === 'hi' ? 'हवा बहुत खतरनाक है' : state.language === 'ta' ? 'காற்று மிகவும் ஆபத்தானது' : 'DANGER: Air is Hazardous';
      walkAdvice = state.language === 'hi' ? 'बिल्कुल बाहर न जाएं!' : state.language === 'ta' ? 'வீட்டிற்குள்ளேயே இருங்கள்.' : 'STRICTLY STAY INDOORS.';
      windowAdvice = state.language === 'hi' ? 'खिड़कियां पूरी तरह बंद रखें।' : state.language === 'ta' ? 'ஜன்னல்களைத் திறக்க வேண்டாம்.' : 'KEEP ALL WINDOWS STRICTLY CLOSED.';
      maskAdvice = state.language === 'hi' ? 'N95 मास्क अनिवार्य है।' : state.language === 'ta' ? 'N95 முகக்கவசம் அணியவும்.' : 'MANDATORY N95 MASK.';
    }

    return `
      <div style="max-width: 780px; margin: 0 auto; padding: 20px 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <button id="btn-exit-senior" class="btn btn-outline" style="font-size: 16px; padding: 10px 18px; min-height: 48px; font-weight: 800;">
            ← ${t.exitSeniorMode}
          </button>
          <span style="font-size: 16px; font-weight: 700; color: #047857;">👓 ${t.seniorMode}</span>
        </div>

        <div style="background-color: ${aqi > 200 ? '#fef2f2' : aqi > 100 ? '#fefce8' : '#f0fdf4'}; border: 3px solid ${aqi > 200 ? '#dc2626' : aqi > 100 ? '#ca8a04' : '#16a34a'}; border-radius: 20px; padding: 24px; margin-bottom: 20px; text-align: center;">
          <span style="font-size: 16px; font-weight: 700; color: #475569; text-transform: uppercase;">${city} • AQI</span>
          <div style="font-size: 64px; font-weight: 900; color: ${aqi > 200 ? '#991b1b' : aqi > 100 ? '#854d0e' : '#14532d'}; margin: 4px 0;">
            ${aqi}
          </div>
          <div style="font-size: 26px; font-weight: 900; color: ${aqi > 200 ? '#b91c1c' : aqi > 100 ? '#a16207' : '#15803d'}; margin-bottom: 14px;">
            ${simpleStatus}
          </div>
          <button class="btn btn-primary btn-speak-item" data-text="${city}. Today AQI is ${aqi}. ${simpleStatus}" data-key="s_main" style="font-size: 18px; padding: 12px 24px; min-height: 52px; border-radius: 10px;">
            🔊 ${t.readAloud}
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #ffffff; border-radius: 14px; border: 2px solid #cbd5e1; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px;">
              <h3 style="font-size: 20px; font-weight: 900;">1. क्या मैं टहलने जा सकता हूँ? (Walking?)</h3>
              <button class="btn btn-outline btn-speak-item" data-text="${walkAdvice}" data-key="s_walk" style="padding: 6px 12px; font-size: 14px; min-height: 38px;">🔊</button>
            </div>
            <p style="font-size: 19px; font-weight: 600; color: ${aqi > 200 ? '#b91c1c' : '#1e293b'};">${walkAdvice}</p>
          </div>

          <div style="background: #ffffff; border-radius: 14px; border: 2px solid #cbd5e1; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px;">
              <h3 style="font-size: 20px; font-weight: 900;">2. क्या खिड़कियां खोलें? (Windows?)</h3>
              <button class="btn btn-outline btn-speak-item" data-text="${windowAdvice}" data-key="s_win" style="padding: 6px 12px; font-size: 14px; min-height: 38px;">🔊</button>
            </div>
            <p style="font-size: 19px; font-weight: 600; color: #1e293b;">${windowAdvice}</p>
          </div>

          <div style="background: #ffffff; border-radius: 14px; border: 2px solid #cbd5e1; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px;">
              <h3 style="font-size: 20px; font-weight: 900;">3. क्या मास्क पहनें? (Mask?)</h3>
              <button class="btn btn-outline btn-speak-item" data-text="${maskAdvice}" data-key="s_mask" style="padding: 6px 12px; font-size: 14px; min-height: 38px;">🔊</button>
            </div>
            <p style="font-size: 19px; font-weight: 600; color: #1e293b;">${maskAdvice}</p>
          </div>
        </div>
      </div>
    `;
  }

  // --- Profile Modal ---
  function renderProfileModal(t) {
    const p = state.profile;
    return `
      <div class="modal-overlay" id="profile-modal-backdrop">
        <div class="modal-content">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">
            <h3 style="font-size: 17px; font-weight: 800; color: #0f172a;">👤 ${t.profileBtn} (Optional)</h3>
            <button id="btn-close-profile" style="background: transparent; border: none; font-size: 18px; cursor: pointer;">✕</button>
          </div>

          <form id="profile-form">
            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 6px;">Household Members</label>
              <div style="display: flex; gap: 8px;">
                <label style="flex: 1; display: flex; align-items: center; gap: 6px; padding: 8px; background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; font-size: 12px; cursor: pointer;">
                  <input type="checkbox" id="prof-children" ${p.hasChildren !== false ? 'checked' : ''} />
                  <span>Children</span>
                </label>
                <label style="flex: 1; display: flex; align-items: center; gap: 6px; padding: 8px; background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; font-size: 12px; cursor: pointer;">
                  <input type="checkbox" id="prof-seniors" ${p.hasSeniors !== false ? 'checked' : ''} />
                  <span>Seniors (60+)</span>
                </label>
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Commute Mode</label>
              <select id="prof-commute" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px;">
                <option value="metro" ${p.commuteMode === 'metro' ? 'selected' : ''}>Metro / Train</option>
                <option value="bus" ${p.commuteMode === 'bus' ? 'selected' : ''}>Public Bus</option>
                <option value="car" ${p.commuteMode === 'car' ? 'selected' : ''}>Solo Car</option>
                <option value="two_wheeler" ${p.commuteMode === 'two_wheeler' ? 'selected' : ''}>2-Wheeler</option>
                <option value="wfh" ${p.commuteMode === 'wfh' ? 'selected' : ''}>Work From Home</option>
              </select>
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Air Purifier Available</label>
              <select id="prof-purifier" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px;">
                <option value="none" ${p.hasAirPurifier === 'none' ? 'selected' : ''}>No Purifier</option>
                <option value="hepa" ${p.hasAirPurifier === 'hepa' || p.hasAirPurifier === true ? 'selected' : ''}>True HEPA Purifier</option>
                <option value="diy" ${p.hasAirPurifier === 'diy' ? 'selected' : ''}>DIY Fan Filter</option>
              </select>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <button type="button" id="btn-cancel-profile" class="btn btn-outline" style="padding: 6px 12px; font-size: 12px;">Skip</button>
              <button type="submit" class="btn btn-primary" style="padding: 6px 14px; font-size: 12px;">Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // --- Event Bindings ---
  function bindEvents(t) {
    // Left Sidebar toggle
    const toggleLeftBtn = document.getElementById('btn-toggle-left-menu');
    const closeLeftBtn = document.getElementById('btn-close-left-menu');
    const backdrop = document.getElementById('sidebar-backdrop');
    const handleToggleSidebar = () => {
      state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
      renderApp();
    };
    if (toggleLeftBtn) toggleLeftBtn.onclick = handleToggleSidebar;
    if (closeLeftBtn) closeLeftBtn.onclick = handleToggleSidebar;
    if (backdrop) backdrop.onclick = handleToggleSidebar;

    // Left Sidebar Accordion headers toggle (Mutual exclusion: expands clicked, minimizes current)
    document.querySelectorAll('.sidebar-module-header').forEach(header => {
      header.onclick = () => {
        const key = header.getAttribute('data-toggle');
        const wasOpen = !!state.sidebarModulesOpen[key];
        // Minimize all other items
        Object.keys(state.sidebarModulesOpen).forEach(k => {
          state.sidebarModulesOpen[k] = false;
        });
        // If it was not open, open it
        if (!wasOpen) {
          state.sidebarModulesOpen[key] = true;
        }
        renderApp();
      };
    });

    // Quick launch pills to open left module (Minimizes all others, expands target)
    document.querySelectorAll('.btn-open-left-module').forEach(btn => {
      btn.onclick = () => {
        const modKey = btn.getAttribute('data-mod');
        state.isLeftSidebarOpen = true;
        Object.keys(state.sidebarModulesOpen).forEach(k => {
          state.sidebarModulesOpen[k] = false;
        });
        state.sidebarModulesOpen[modKey] = true;
        renderApp();
        const target = document.getElementById(`mod-${modKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      };
    });

    // Main action plan expand/collapse
    const toggleMainAction = document.getElementById('btn-toggle-main-action');
    if (toggleMainAction) {
      toggleMainAction.onclick = () => {
        state.isMainActionPlanOpen = !state.isMainActionPlanOpen;
        renderApp();
      };
    }

    // Action Pillars expand/collapse
    document.querySelectorAll('.expandable-action-header').forEach(hdr => {
      hdr.onclick = () => {
        const pillar = hdr.getAttribute('data-pillar');
        state.actionPillarsOpen[pillar] = !state.actionPillarsOpen[pillar];
        renderApp();
      };
    });

    // City selector in top right corner
    const citySel = document.getElementById('city-selector');
    if (citySel) {
      citySel.onchange = (e) => {
        state.selectedCity = e.target.value;
        state.activeScenario = null;
        fetchAirAndAdvisorData(state.selectedCity, null);
      };
    }

    // GPS location
    const gpsBtn = document.getElementById('btn-detect-gps');
    if (gpsBtn) {
      gpsBtn.onclick = () => {
        if (!navigator.geolocation) {
          alert("Geolocation not supported.");
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            state.activeScenario = null;
            fetchAirAndAdvisorData(null, null, pos.coords.latitude, pos.coords.longitude);
          },
          () => alert("Could not detect location.")
        );
      };
    }

    // Language selector (Icon Only in navbar)
    const langSel = document.getElementById('language-selector');
    if (langSel) {
      langSel.onchange = (e) => {
        state.language = e.target.value;
        localStorage.setItem('cleanair_lang', state.language);
        fetchAirAndAdvisorData(state.selectedCity, state.activeScenario);
      };
    }

    // Senior Mode toggle (Icon Only)
    const seniorBtn = document.getElementById('btn-toggle-senior');
    if (seniorBtn) {
      seniorBtn.onclick = () => {
        state.isSeniorMode = true;
        localStorage.setItem('cleanair_senior_mode', 'true');
        renderApp();
      };
    }

    // Profile modal toggle (Icon Only)
    const profBtn = document.getElementById('btn-open-profile');
    if (profBtn) {
      profBtn.onclick = () => {
        state.isProfileModalOpen = true;
        renderApp();
      };
    }

    // Refresh AQI
    const refBtn = document.getElementById('btn-refresh-aqi');
    if (refBtn) {
      refBtn.onclick = () => {
        fetchAirAndAdvisorData(state.selectedCity, state.activeScenario);
      };
    }

    // Scenario buttons (Inside Left Column)
    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.onclick = () => {
        const sc = parseInt(btn.getAttribute('data-scenario'), 10);
        state.activeScenario = sc;
        fetchAirAndAdvisorData(null, sc);
      };
    });

    const resetScenBtn = document.getElementById('btn-reset-scenario');
    if (resetScenBtn) {
      resetScenBtn.onclick = () => {
        state.activeScenario = null;
        fetchAirAndAdvisorData(state.selectedCity, null);
      };
    }

    // Read aloud buttons
    document.querySelectorAll('.btn-speak-item').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.getAttribute('data-text') || '');
        const key = btn.getAttribute('data-key') || 'item';
        speak(text, key);
      };
    });

    // Expand details
    document.querySelectorAll('.btn-toggle-explain').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-key');
        state.expandedCards[key] = !state.expandedCards[key];
        renderApp();
      };
    });

    // Family tab inside sidebar
    document.querySelectorAll('.btn-family-tab').forEach(btn => {
      btn.onclick = () => {
        state.activeFamilyTab = btn.getAttribute('data-tab');
        renderApp();
      };
    });

    // Chat form
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        handleSendMessage();
      };
    }

    // Chat mic
    const micBtn = document.getElementById('btn-chat-mic');
    if (micBtn) {
      micBtn.onclick = () => {
        if (!state.speechRecognizer) {
          state.speechRecognizer = setupSpeechRecognition();
        }
        if (!state.speechRecognizer) {
          alert("Speech recognition not supported in browser.");
          return;
        }
        if (state.isListening) {
          state.speechRecognizer.stop();
          state.isListening = false;
        } else {
          state.isListening = true;
          try {
            state.speechRecognizer.start();
          } catch (e) {
            state.isListening = false;
          }
        }
        renderApp();
      };
    }

    // Checklist item toggle
    document.querySelectorAll('.btn-toggle-checklist').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        state.checklist = state.checklist.map(it => it.id === id ? { ...it, done: !it.done } : it);
        localStorage.setItem('cleanair_indoor_checklist', JSON.stringify(state.checklist));
        renderApp();
      };
    });

    // Community pledge
    const pledgeBtn = document.getElementById('btn-take-pledge');
    if (pledgeBtn && !state.hasPledged) {
      pledgeBtn.onclick = async () => {
        try {
          const res = await fetch('/api/community/pledge', { method: 'POST' });
          const data = await res.json();
          if (data.success) {
            state.communityStats.totalPledges = data.totalPledges;
          }
        } catch (e) {}
        state.hasPledged = true;
        renderApp();
      };
    }

    // Profile modal
    const closeProf = document.getElementById('btn-close-profile');
    const cancelProf = document.getElementById('btn-cancel-profile');
    const backdropProf = document.getElementById('profile-modal-backdrop');
    const handleCloseModal = () => {
      state.isProfileModalOpen = false;
      renderApp();
    };
    if (closeProf) closeProf.onclick = handleCloseModal;
    if (cancelProf) cancelProf.onclick = handleCloseModal;
    if (backdropProf) {
      backdropProf.onclick = (e) => {
        if (e.target === backdropProf) handleCloseModal();
      };
    }

    const profForm = document.getElementById('profile-form');
    if (profForm) {
      profForm.onsubmit = (e) => {
        e.preventDefault();
        state.profile = {
          hasChildren: document.getElementById('prof-children').checked,
          hasSeniors: document.getElementById('prof-seniors').checked,
          commuteMode: document.getElementById('prof-commute').value,
          hasAirPurifier: document.getElementById('prof-purifier').value
        };
        localStorage.setItem('cleanair_profile', JSON.stringify(state.profile));
        state.isProfileModalOpen = false;
        fetchAirAndAdvisorData(state.selectedCity, state.activeScenario);
      };
    }
  }

  function bindSeniorEvents(t) {
    const exitBtn = document.getElementById('btn-exit-senior');
    if (exitBtn) {
      exitBtn.onclick = () => {
        state.isSeniorMode = false;
        localStorage.setItem('cleanair_senior_mode', 'false');
        renderApp();
      };
    }

    document.querySelectorAll('.btn-speak-item').forEach(btn => {
      btn.onclick = () => {
        const text = btn.getAttribute('data-text');
        const key = btn.getAttribute('data-key');
        speak(text, key);
      };
    });
  }

  // --- Init ---
  window.addEventListener('DOMContentLoaded', () => {
    fetchCities();
    fetchAirAndAdvisorData(state.selectedCity, null);
    calculateImpact(state.impactInputs);
  });

})();
