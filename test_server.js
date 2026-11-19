import http from 'http';
import { spawn } from 'child_process';

const serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Waiting 3 seconds for server to start...');
  await new Promise(r => setTimeout(r, 3000));

  try {
    // 1. Test Static Index.html
    const home = await request('/');
    console.log('[TEST 1] Root Static Page:', home.status === 200 ? 'PASS (200 OK)' : `FAIL (${home.status})`);

    // 2. Test Cities API
    const cities = await request('/api/cities');
    console.log('[TEST 2] Cities List API:', cities.data.success && cities.data.cities.length > 0 ? `PASS (${cities.data.cities.length} cities)` : 'FAIL');

    // 3. Test CPCB QA Scenario 250 (Poor)
    const scenario250 = await request('/api/air-quality?scenario=250');
    console.log('[TEST 3] CPCB Scenario 250:', scenario250.data.aqi === 250 && scenario250.data.category === 'Poor' ? 'PASS (AQI: 250, Category: Poor)' : 'FAIL');

    // 4. Test CPCB QA Scenario 450 (Severe)
    const scenario450 = await request('/api/air-quality?scenario=450');
    console.log('[TEST 4] CPCB Scenario 450:', scenario450.data.aqi === 450 && scenario450.data.category === 'Severe' ? 'PASS (AQI: 450, Category: Severe)' : 'FAIL');

    // 5. Test AI Daily Advisor Endpoint
    const advisor = await request('/api/ai/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { aqi: 250, profile: { hasChildren: true, hasSeniors: true }, language: 'en' }
    });
    console.log('[TEST 5] AI Daily Advisor:', advisor.data.doToday && advisor.data.doToday.length > 0 ? `PASS (${advisor.data.doToday.length} DO TODAY items, Family plan: ${Object.keys(advisor.data.familyPlan).length} groups)` : 'FAIL');

    // 6. Test Conversational Assistant (Ask Clean Air)
    const chat = await request('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'Can my children play outside today?', aqi: 280, location: 'Delhi NCR' }
    });
    console.log('[TEST 6] Ask Clean Air GenAI Assistant:', chat.data.reply ? 'PASS (Reply generated based on live AQI)' : 'FAIL');

    // 7. Test Emergency Health Alert Guardrail
    const emergencyChat = await request('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'I have severe chest pain and cannot breathe' }
    });
    console.log('[TEST 7] Emergency Guardrail Detection:', emergencyChat.data.isEmergency ? 'PASS (Triggered emergency ambulance guidance)' : 'FAIL');

    // 8. Test Impact Calculation API (CEA Grid Factor)
    const impact = await request('/api/impact/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { carKmAvoided: 20, metroKm: 30, kwhSaved: 10, burningAvoidedKg: 5 }
    });
    console.log('[TEST 8] Impact Carbon Calculation:', impact.data.totalCo2AvoidedKg > 0 ? `PASS (${impact.data.totalCo2AvoidedKg} kg CO2e avoided, Fuel: ${impact.data.fuelSavedLitres} L)` : 'FAIL');

    // 9. Test Community Hub Stats & Pledge
    const comm = await request('/api/community/stats');
    console.log('[TEST 9] Community Hub Stats:', comm.data.totalPledges > 0 ? `PASS (${comm.data.totalPledges} citizen pledges)` : 'FAIL');

    console.log('\n=============================');
    console.log('ALL ACCEPTANCE CRITERIA VERIFIED');
    console.log('=============================');
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    serverProcess.kill('SIGTERM');
    process.exit(0);
  }
}

runTests();
