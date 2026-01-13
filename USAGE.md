# دليل استخدام AI Text Backend

## خطوات التشغيل

### 1. تثبيت المكتبات (إذا لم تكن مثبتة)
```bash
npm install
```

### 2. إعداد API Key
افتح ملف `.env` وأضف مفتاح Hugging Face:
```env
HUGGINGFACE_API_KEY=hf_your_api_key_here
```

### 3. تشغيل السيرفر

**وضع التطوير (مع auto-reload):**
```bash
npm run dev
```

**وضع الإنتاج:**
```bash
npm start
```

السيرفر سيعمل على: `http://localhost:3000`

---

## استخدام الـ API

### 1. Health Check (فحص الحالة)
```bash
GET http://localhost:3000/health
```

**مثال باستخدام curl:**
```bash
curl http://localhost:3000/health
```

**الرد المتوقع:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

---

### 2. تحسين النص (Fix Text)

**Endpoint:**
```
POST http://localhost:3000/api/fix-text
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "helo world, how are you?",
  "tone": "professional"
}
```

**Tone Options:**
- `professional` (افتراضي) - رسمي ومهني
- `friendly` - ودود وودي
- `casual` - عادي ومرتاح

---

## أمثلة الاستخدام

### مثال 1: باستخدام curl
```bash
curl -X POST http://localhost:3000/api/fix-text \
  -H "Content-Type: application/json" \
  -d '{"text": "helo world, how are you?", "tone": "professional"}'
```

### مثال 2: باستخدام JavaScript (Fetch)
```javascript
const response = await fetch('http://localhost:3000/api/fix-text', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'helo world, how are you?',
    tone: 'professional'
  })
});

const data = await response.json();
console.log(data.result);
```

### مثال 3: باستخدام Python (requests)
```python
import requests

url = "http://localhost:3000/api/fix-text"
data = {
    "text": "helo world, how are you?",
    "tone": "professional"
}

response = requests.post(url, json=data)
print(response.json()["result"])
```

### مثال 4: باستخدام Postman
1. افتح Postman
2. اختر POST
3. أدخل URL: `http://localhost:3000/api/fix-text`
4. في تبويب Headers، أضف: `Content-Type: application/json`
5. في تبويب Body، اختر raw و JSON
6. أدخل:
```json
{
  "text": "helo world, how are you?",
  "tone": "professional"
}
```
7. اضغط Send

---

## Response Examples

### نجاح العملية (200 OK)
```json
{
  "result": "Hello world, how are you?"
}
```

### خطأ في التحقق (400 Bad Request)
```json
{
  "error": "Validation error",
  "message": "Text field is required"
}
```

### خطأ في API Key (401 Unauthorized)
```json
{
  "error": "Error",
  "message": "Hugging Face API key is invalid or missing"
}
```

### تجاوز الحد المسموح (429 Too Many Requests)
```json
{
  "error": "Error",
  "message": "Hugging Face API rate limit exceeded. Please try again later."
}
```

---

## أمثلة عملية

### مثال 1: نص احترافي
**Request:**
```json
{
  "text": "i want to apply for this job position",
  "tone": "professional"
}
```

**Response:**
```json
{
  "result": "I would like to apply for this job position"
}
```

### مثال 2: نص ودود
**Request:**
```json
{
  "text": "hey, whats up? wanna hang out?",
  "tone": "friendly"
}
```

**Response:**
```json
{
  "result": "Hey, what's up? Would you like to hang out?"
}
```

### مثال 3: نص عادي
**Request:**
```json
{
  "text": "yo, sup? lets go",
  "tone": "casual"
}
```

**Response:**
```json
{
  "result": "Yo, what's up? Let's go"
}
```

---

## قيود الاستخدام

- **الحد الأقصى لطول النص:** 2000 حرف
- **الـ API Key:** يجب أن يكون صحيح وصالح
- **Rate Limits:** تابع حدود Hugging Face API

---

## استكشاف الأخطاء

### المشكلة: السيرفر لا يعمل
**الحل:**
- تأكد من تثبيت المكتبات: `npm install`
- تأكد من وجود ملف `.env` مع `HUGGINGFACE_API_KEY`
- تأكد من أن البورت 3000 غير مستخدم

### المشكلة: خطأ في API Key
**الحل:**
- تأكد من صحة المفتاح في ملف `.env`
- احصل على مفتاح جديد من: https://huggingface.co/settings/tokens

### المشكلة: النص طويل جداً
**الحل:**
- الحد الأقصى 2000 حرف
- قسّم النص إلى أجزاء أصغر

---

## ملاحظات مهمة

1. **الـ API Key:** لا تشاركه أو ترفعه على GitHub
2. **الـ CORS:** مفعّل لجميع المصادر (يمكن تقييده في الإنتاج)
3. **الـ Environment:** استخدم `NODE_ENV=production` في الإنتاج
