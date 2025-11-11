# FREE Email & Phone Verification Setup Guide

## 📧 EMAIL VERIFICATION (FREE Options)

### **Option 1: Resend (Recommended - Easiest)**
**FREE Tier:** 3,000 emails/month, 100 emails/day

#### Setup Steps:
1. **Sign up:** https://resend.com/
2. **Get API Key:**
   - Go to Dashboard → API Keys
   - Create new API key
   - Copy the key

3. **Install package:**
```bash
npm install resend
```

4. **Create verification endpoint:**
```javascript
// Create a serverless function (Vercel)
// api/send-verification.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;

  try {
    await resend.emails.send({
      from: 'Brototalk <onboarding@resend.dev>', // Use your domain later
      to: email,
      subject: 'Verify your email - Brototalk',
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

5. **Add environment variable to Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = your_api_key

---

### **Option 2: SendGrid (Free 100 emails/day)**

#### Setup:
1. Sign up: https://sendgrid.com/
2. Get API key from Settings → API Keys
3. Install: `npm install @sendgrid/mail`

```javascript
// api/send-verification.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { email, code } = req.body;

  const msg = {
    to: email,
    from: 'noreply@yourdomain.com', // Use verified sender
    subject: 'Verify your email',
    html: `Your code is: <strong>${code}</strong>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

### **Option 3: Gmail SMTP (100% Free)**

```javascript
// Requires nodemailer
npm install nodemailer

// api/send-verification.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // NOT your regular password!
  },
});

export default async function handler(req, res) {
  const { email, code } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your email - Brototalk',
      html: `Your verification code is: <strong>${code}</strong>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**Get Gmail App Password:**
1. Go to Google Account → Security
2. Turn on 2-Step Verification
3. Search for "App passwords"
4. Create new app password
5. Copy the 16-character password

---

## 📱 PHONE/SMS VERIFICATION (FREE Options)

### **Option 1: Twilio (Recommended)**
**FREE Trial:** $15 credit (enough for ~1,000 SMS)

#### Setup:
1. Sign up: https://www.twilio.com/try-twilio
2. Get free trial credits
3. Get credentials:
   - Account SID
   - Auth Token
   - Phone Number (free trial number)

```bash
npm install twilio
```

```javascript
// api/send-sms.js
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  const { phone, code } = req.body;

  try {
    await client.messages.create({
      body: `Your Brototalk verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

### **Option 2: Vonage (Free $2 credit)**

1. Sign up: https://dashboard.nexmo.com/sign-up
2. Get API key and secret

```bash
npm install @vonage/server-sdk
```

```javascript
import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

export default async function handler(req, res) {
  const { phone, code } = req.body;

  try {
    await vonage.sms.send({
      to: phone,
      from: 'Brototalk',
      text: `Your verification code is: ${code}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

### **Option 3: WhatsApp (FREE with Twilio)**

```javascript
// Same Twilio account, WhatsApp sandbox
await client.messages.create({
  from: 'whatsapp:+14155238886', // Twilio sandbox number
  to: `whatsapp:${phone}`,
  body: `Your Brototalk verification code is: ${code}`,
});
```

**Setup WhatsApp Sandbox:**
1. Twilio Console → Messaging → Try WhatsApp
2. Join sandbox by sending message to the number
3. Use the sandbox number for testing

---

## 🔧 UPDATE YOUR CODE

### Update ProfilePage.tsx:

```javascript
const sendEmailVerification = async () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  setGeneratedEmailCode(code);
  setShowEmailVerification(true);
  
  try {
    const response = await fetch('/api/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, code }),
    });
    
    if (response.ok) {
      alert(`Verification code sent to ${formData.email}`);
    } else {
      alert('Failed to send verification code');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending verification code');
  }
};

const sendPhoneVerification = async () => {
  if (!formData.phone || formData.phone.trim() === "") {
    alert("Please enter a phone number first");
    return;
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  setGeneratedPhoneCode(code);
  setShowPhoneVerification(true);

  try {
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formData.phone, code }),
    });
    
    if (response.ok) {
      alert(`Verification code sent to ${formData.phone}`);
    } else {
      alert('Failed to send verification code');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending verification code');
  }
};
```

---

## 📁 PROJECT STRUCTURE

```
your-project/
├── api/
│   ├── send-verification.js  (Email)
│   └── send-sms.js           (Phone)
├── src/
│   └── ProfilePage.tsx       (Updated)
└── .env.local
```

---

## 🔐 ENVIRONMENT VARIABLES

Create `.env.local`:

```bash
# Email (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx
# OR
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
# OR
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxx

# Phone/SMS (choose one)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
# OR
VONAGE_API_KEY=xxxxxxxxxxxxx
VONAGE_API_SECRET=xxxxxxxxxxxxx
```

Add to Vercel:
- Dashboard → Settings → Environment Variables
- Add each variable

---

## 💰 COST COMPARISON

| Service | Free Tier | After Free | Best For |
|---------|-----------|------------|----------|
| **Resend** | 3,000/month | $20/month for 50k | Email (easiest) |
| **SendGrid** | 100/day | $15/month for 40k | Email (reliable) |
| **Gmail SMTP** | 500/day | Free forever | Email (simple) |
| **Twilio SMS** | $15 credit | ~$0.0075/SMS | SMS (USA/Canada) |
| **Vonage SMS** | $2 credit | ~$0.0041/SMS | SMS (International) |
| **Twilio WhatsApp** | Free sandbox | $0.005/msg | WhatsApp testing |

---

## 🚀 RECOMMENDED COMBO (100% FREE to start)

1. **Email:** Resend (3,000/month free)
2. **SMS:** Twilio trial ($15 credit = ~1,000 SMS)
3. **WhatsApp:** Twilio sandbox (free testing)

This gives you everything free for development and testing!

---

## 📝 QUICK START (5 minutes)

1. **Sign up for Resend** (email)
2. **Sign up for Twilio** (SMS/WhatsApp)
3. **Create `/api/send-verification.js`** (email endpoint)
4. **Create `/api/send-sms.js`** (SMS endpoint)
5. **Add env variables to Vercel**
6. **Update ProfilePage.tsx** to call APIs
7. **Deploy to Vercel**

Done! Real verification working! 🎉

---

## 🛡️ SECURITY TIPS

1. **Never expose API keys in frontend code**
2. **Always use serverless functions** (api/ folder)
3. **Add rate limiting** (max 3 attempts per hour)
4. **Expire codes** after 10 minutes
5. **Store codes in database** or memory (not localStorage)
6. **Validate phone format** before sending
7. **Use HTTPS only** (Vercel does this automatically)

---

## 📞 SUPPORT

- Resend: https://resend.com/docs
- Twilio: https://www.twilio.com/docs
- Vercel Serverless: https://vercel.com/docs/functions

---

**Need help implementing? Let me know which services you want to use and I'll help you set them up!**
