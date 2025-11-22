# Where to Find Your EmailJS API Keys

## ⚠️ Important: The keys are NOT in your code files!

The API keys are stored in your **EmailJS account** and need to be added to **Vercel environment variables**.

## Step-by-Step: Finding Your Keys

### 1. Go to EmailJS Dashboard
👉 **https://dashboard.emailjs.com/**

Sign in with your EmailJS account (or create one if you don't have it).

---

### 2. Find Your Public Key (API Key)

**Path:** Dashboard → **Account** (top right) → **API Keys** tab

**What you'll see:**
```
┌─────────────────────────────────────┐
│ API Keys                            │
├─────────────────────────────────────┤
│ Public Key:                         │
│ ┌─────────────────────────────────┐│
│ │ abc123xyz789def456ghi789...      ││ ← Copy this!
│ └─────────────────────────────────┘│
│ [Copy]                              │
└─────────────────────────────────────┘
```

**This is your:** `VITE_EMAILJS_PUBLIC_KEY`

---

### 3. Find Your Service ID

**Path:** Dashboard → **Email Services** (left sidebar)

**What you'll see:**
```
┌─────────────────────────────────────┐
│ Email Services                      │
├─────────────────────────────────────┤
│ Service Name: Gmail                 │
│ Service ID: service_abc123         │ ← Copy this!
│ Status: Active                      │
└─────────────────────────────────────┘
```

**This is your:** `VITE_EMAILJS_SERVICE_ID`

**If you don't have a service:**
1. Click **Add New Service**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions
4. Copy the Service ID after creation

---

### 4. Find Your Template ID

**Path:** Dashboard → **Email Templates** (left sidebar)

**What you'll see:**
```
┌─────────────────────────────────────┐
│ Email Templates                     │
├─────────────────────────────────────┤
│ Template Name: Contact Form         │
│ Template ID: template_xyz789       │ ← Copy this!
│ Status: Active                      │
└─────────────────────────────────────┘
```

**This is your:** `VITE_EMAILJS_TEMPLATE_ID`

**If you don't have a template:**
1. Click **Create New Template**
2. Set up your email template with these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
3. Save the template
4. Copy the Template ID

---

## Quick Checklist

Before adding to Vercel, make sure you have:

- [ ] **Public Key** from Account → API Keys
- [ ] **Service ID** from Email Services (create one if needed)
- [ ] **Template ID** from Email Templates (create one if needed)

---

## Still Can't Find Them?

1. **Don't have an EmailJS account?**
   - Sign up at https://dashboard.emailjs.com/
   - Free tier includes 200 emails/month

2. **Can't see the keys?**
   - Make sure you're logged in
   - Check that your account is verified
   - Try refreshing the dashboard

3. **Need to create Service/Template?**
   - Follow the EmailJS setup wizard
   - They'll guide you through the process

---

## Next Step

Once you have all three values, add them to Vercel:
- Go to your Vercel project → Settings → Environment Variables
- Add each one as a key-value pair
- See `EMAILJS_SETUP.md` for detailed instructions

