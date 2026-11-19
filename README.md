# CLEAN AIR COMPANION (स्वच्छ वायु साथी / தூய காற்று தோழன்)
### An AI-powered daily action assistant for healthier families and cleaner communities
**Tagline: Know Your Air. Know What to Do. Breathe Better.**

---

## 🌟 Vision & Overview
Clean Air Companion converts real-time environmental measurements into **simple, personalized, practical daily actions**. It is specifically crafted for ordinary families, senior citizens, and residential communities navigating severe winter smog and urban air pollution.

Instead of serving as another passive AQI dashboard or generic chatbot, Clean Air Companion follows the core product philosophy:
> **MONITOR → UNDERSTAND → RECOMMEND → ACT → MEASURE IMPACT**

### Three Fundamental Questions Answered Daily:
1. **How is the air quality around me?**
2. **What should I and my family do differently today?**
3. **How can our everyday choices contribute to cleaner air?**

---

## 🚀 Key Modules & Capabilities

### 1. The Central Feature: AI Daily Action Advisor
The first and most prominent feature users see when launching the app:
- **Today's Air Quality Summary**: Real-time CPCB AQI, category badge (Good, Satisfactory, Moderate, Poor, Very Poor, Severe), individual pollutant concentrations (PM2.5, PM10, NO₂, SO₂, CO, O₃), and weather parameters (temperature, humidity, wind speed & direction).
- **QA Scenario Switcher (CPCB Bands)**: Interactive buttons (`35 Good`, `75 Satisfactory`, `150 Moderate`, `250 Poor`, `350 Very Poor`, `450 Severe`) allowing anyone to evaluate how AI advice dynamically transforms across all official CPCB pollution bands.
- **What Should I Do Today?**: Structured into three distinct categories:
  - **DO TODAY**: Immediate high-priority actions (e.g. N95 respirators, purifier runtimes, cross-ventilation windows).
  - **BETTER ALTERNATIVES**: Practical substitutes (e.g. indoor workouts, public transit shifts, off-peak timing).
  - **AVOID TODAY**: Critical hazards to avoid (e.g. morning jogging during thermal inversion, burning leaves, incense/mosquito coils).
- **Structured Recommendation Cards**: Each action provides:
  - Clear Action Title
  - Why (Simple scientific explanation)
  - Expected Benefit (Quantified health or exposure reduction)
  - Cost (Free, Low Cost, Investment)
  - Priority (High, Medium, Optional)
  - "Explain More" toggle for deeper scientific mechanisms
  - One-touch Voice Read-Aloud ("Listen") button.

### 2. Daily Family Action Plan
Tailored guidance segmented by vulnerability:
- **Children & Toddlers**: High respiratory rates, lung development protection, playground shift schedules.
- **Senior Citizens (60+)**: Cold morning inversion avoidance, cardiovascular and blood pressure precautions.
- **Working Adults & Commuters**: Transit mode shifts, car AC recirculation mode.
- **School & College Students**: PE assembly adjustments, classroom filtration.
- **Outdoor Workers & Staff**: Rotational indoor breaks, mandatory N95 shifts.
- **Cardiovascular & Respiratory Caution**: Clear medical disclaimer, asthma/COPD inhaler accessibility reminder, emergency 108/112 guidance.

### 3. Senior Citizen Mode (सरल मोड / எளிய முறை)
A dedicated, high-contrast, one-click accessible view:
- Extra-large typography (20px - 34px)
- Minimum 52px touch targets
- Simplified, non-technical guidance answering:
  1. *Should I go for a walk?*
  2. *Should I open windows?*
  3. *What should I wear/do?*
- Prominent one-tap Text-to-Speech audio reader on every instruction.

### 4. Smart Air Quality Intelligence & 12-Hour Forecast
- Real-time continuous monitoring station connector with CPCB sub-index breakpoints.
- 12-hour hourly forecast timeline identifying the safest activity window (typically early afternoon 12:30 PM - 3:30 PM) and peak smog hazard window (6:00 AM - 9:00 AM).
- Support for 20+ Indian cities + automatic GPS geolocation.

### 5. Ask Clean Air – Voice-First GenAI Assistant
- Conversational environmental guide with Web Speech API Speech-to-Text (microphone button with pulsing feedback) and Text-to-Speech audio reader.
- Multilingual: English, Hindi (हिंदी), and Tamil (தமிழ்).
- Quick prompt chips for common family concerns.
- Medical safety guardrails: Automatically identifies emergency symptoms (severe breathlessness, chest pain, bluish lips) and directs users to immediate emergency medical care (108/112).

### 6. Indoor Air Quality Assistant & Smart Ventilation Advisor
- Identifies domestic indoor pollution sources (cooking smoke, agarbatti, mosquito coils, dampness, dust).
- **Smart Ventilation Advisor**: Recommends window opening schedules based on ambient inversion and indoor sources, clarifying that HEPA filters particulate matter but does not generate oxygen or remove CO₂.
- **HEPA Purifier CADR & Room Sizing Calculator**: Input room dimensions (sq ft & ceiling height) to calculate recommended CADR in m³/h and CFM for 5 air changes per hour.
- **Interactive Clean Air Checklist**: Persistent household checklist with progress tracking.

### 7. Low-Emission Daily Lifestyle Advisor
Practical sustainable alternatives across:
- **Transportation**: Carpooling, anti-idling, shifting to metro/bus.
- **Household Energy**: 25°C AC setpoint, eliminating standby phantom loads.
- **Cooking**: Electric induction for boiling, kitchen chimney maintenance.
- **Waste Management**: Source segregation, garden leaf composting (zero open burning).

### 8. My Environmental Impact Tracker
- Personal sustainability logger: Track avoided car km, public transit km, electricity saved (kWh), and prevented open burning (kg).
- Transparent emission calculation using official Central Electricity Authority (CEA) India grid baseline (0.82 kg CO₂e/kWh) and CPCB transport emission models.
- Transparent disclaimer stating individual actions reduce collective emissions over time without claiming instantaneous neighborhood AQI drops.

### 9. Community Action Centre
- Residential societies, RWAs, and schools collaborative action hub.
- Real-time Community Clean Air Pledge counter.
- Active campaigns: RWA Clean Commute Challenge, Zero Waste Burning Vigil, Safe School Gate Carpool.
- Confidential "Report Open Waste/Leaf Burning" incident logger.

---

## 🛠️ Technical Architecture

- **Backend**: Node.js & Express (`server.js`)
  - Continuous ambient air monitoring connector with 10-minute caching.
  - CPCB sub-index math engine for PM2.5, PM10, NO₂, SO₂, CO, O₃.
  - Deterministic expert environmental rule engine + GenAI conversational assistant.
  - Official CEA India grid and IPCC emission factor calculation APIs.
  - In-memory community action hub and incident logger.
- **Frontend**: Pure modern client (`public/index.html`, `public/app.js`, `public/style.css`)
  - Zero heavy external runtime dependencies, instantaneous load time on budget smartphones.
  - Progressive Web App (PWA) with `manifest.json` and `sw.js` for full offline availability.
  - WCAG 2.2 AA compliant contrast, touch targets (≥44px), and keyboard accessibility.
  - Native Web Speech API integration for speech-to-text and text-to-speech.

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application Server
```bash
npm start
```
The application will be live at:
```
http://localhost:5000
```

### 3. Run Automated Acceptance Tests
```bash
node test_server.js
```
All 9 core acceptance tests (Static PWA, Cities API, CPCB Scenarios, AI Advisor, Ask Clean Air, Emergency Guardrail, Carbon Impact, Community Hub) will run and verify end-to-end functionality.
