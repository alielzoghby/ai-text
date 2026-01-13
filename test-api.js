// ملف اختبار بسيط للـ API
// استخدم: node test-api.js

const API_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 اختبار AI Text Backend API\n');

  // اختبار 1: Health Check
  console.log('1️⃣ اختبار Health Check...');
  try {
    const healthResponse = await fetch(`${API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
  } catch (error) {
    console.error('❌ Health Check failed:', error.message);
    console.log('\n⚠️  تأكد من تشغيل السيرفر أولاً: npm run dev');
    return;
  }

  console.log('\n');

  // اختبار 2: Fix Text - Professional
  console.log('2️⃣ اختبار تحسين النص (Professional)...');
  try {
    const fixResponse = await fetch(`${API_URL}/api/fix-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'helo world, how are you? i want to apply for this job',
        tone: 'professional'
      })
    });

    const fixData = await fixResponse.json();
    
    if (fixResponse.ok) {
      console.log('✅ النص الأصلي:', 'helo world, how are you? i want to apply for this job');
      console.log('✅ النص المحسّن:', fixData.result);
    } else {
      console.error('❌ خطأ:', fixData);
    }
  } catch (error) {
    console.error('❌ فشل الاختبار:', error.message);
  }

  console.log('\n');

  // اختبار 3: Fix Text - Friendly
  console.log('3️⃣ اختبار تحسين النص (Friendly)...');
  try {
    const fixResponse = await fetch(`${API_URL}/api/fix-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'hey, whats up? wanna hang out later?',
        tone: 'friendly'
      })
    });

    const fixData = await fixResponse.json();
    
    if (fixResponse.ok) {
      console.log('✅ النص الأصلي:', 'hey, whats up? wanna hang out later?');
      console.log('✅ النص المحسّن:', fixData.result);
    } else {
      console.error('❌ خطأ:', fixData);
    }
  } catch (error) {
    console.error('❌ فشل الاختبار:', error.message);
  }

  console.log('\n✅ انتهى الاختبار!');
}

// تشغيل الاختبار
testAPI();
