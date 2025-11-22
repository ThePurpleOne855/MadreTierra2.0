# Quick Debug: Visit Notifications Not Working

Follow these steps in order to debug why notifications aren't being sent:

## Step 1: Check Browser Console (5 seconds)

1. Open your website in a browser
2. Press **F12** to open Developer Tools
3. Click on the **Console** tab
4. Refresh the page or visit again
5. Look for these messages:

### ✅ Good Signs:
- `📊 Tracking visit: /` - Tracking started
- `✅ Visit tracked successfully` - API worked
- `✅ Email sent successfully via Resend` - Email sent

### ❌ Bad Signs:
- `❌ Visit notification failed` - API error
- `❌ Error tracking visit` - Network/connection error
- `⚠️ Visit logged (email service not configured)` - No email service set up

**What to do:**
- If you see errors, note the error message and go to Step 2
- If you see "email service not configured", go to Step 3

## Step 2: Check Vercel Function Logs (2 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **MadreTierra** project
3. Click on **Functions** tab (in the top menu)
4. Find **`/api/visit-notification`** in the list
5. Click on it
6. Click **"View Logs"** or check the **"Invocations"** tab
7. Look at the latest function calls

### Look for:
- ✅ `📧 Processing visit notification for: your@email.com` - Function is running
- ✅ `✅ Email sent successfully via Resend` - Email was sent
- ❌ `❌ OWNER_EMAIL environment variable not set` - Missing email config
- ❌ `❌ Resend API error` - Invalid API key or Resend issue
- ❌ `⚠️ VISIT NOTIFICATION (email service not configured)` - No API key set

**Copy the error message** you see and go to the relevant step below.

## Step 3: Verify Environment Variables in Vercel (3 minutes)

The **most common issue** is missing or incorrect environment variables.

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **MadreTierra** project
3. Click **Settings** (gear icon in top navigation)
4. Click **Environment Variables** (left sidebar)
5. Verify these three variables exist:

### Required Variables:

1. **OWNER_EMAIL**
   - **Must be set!**
   - Value: Your email (e.g., `your-email@gmail.com`)
   - **Important:** Must be set for **Production, Preview, AND Development**

2. **RESEND_API_KEY**
   - **Must be set!**
   - Value: Your Resend API key (starts with `re_`)
   - Get it from: [resend.com/dashboard](https://resend.com/dashboard) → API Keys
   - **Important:** Must be set for **Production, Preview, AND Development**

3. **FROM_EMAIL** (Optional but recommended)
   - Value: `onboarding@resend.dev` (for testing)
   - Or: Your verified domain email (e.g., `noreply@yourdomain.com`)
   - **Important:** Must be set for **Production, Preview, AND Development**

### Common Mistakes:
- ❌ Variable set only for Production (not Preview/Development)
- ❌ Typo in variable name (`RESEND_API_KEY` vs `RESEND_API`)
- ❌ Missing `re_` prefix in API key
- ❌ Email address with spaces or invalid format

### After Adding/Changing Variables:

**MUST REDEPLOY!**

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete
5. Test again

## Step 4: Verify Resend Account Setup (2 minutes)

1. Go to [resend.com](https://resend.com) and sign in
2. Check **Dashboard** → **API Keys**:
   - ✅ Your API key exists and is active
   - ✅ It matches what's in Vercel environment variables
   - If not, create a new key and update Vercel
3. Check **Dashboard** → **Emails**:
   - Look for sent emails
   - Check for failed attempts
   - See error messages if any

4. Check **Dashboard** → **Domains** (if using custom domain):
   - ✅ Domain is verified
   - ✅ DNS records are correct
   - If not verified, use `onboarding@resend.dev` for testing

## Step 5: Test the API Directly (1 minute)

You can test the API route directly:

1. Open your website
2. Press **F12** → **Console** tab
3. Paste this code and press Enter:

```javascript
fetch('/api/visit-notification', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    page: '/test',
    referrer: 'Direct Test',
    userAgent: 'Manual Test',
    timestamp: new Date().toISOString(),
    screenWidth: 1920,
    screenHeight: 1080,
    language: 'en-US',
    timezone: 'America/New_York'
  })
})
.then(r => r.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err))
```

4. Check the response:
   - ✅ `success: true` = Working!
   - ❌ `error: ...` = Check the error message
   - ⚠️ `note: ...` = Missing configuration

## Step 6: Check Age Gate Interference

The age gate might be blocking the tracker. Check:

1. Open browser console
2. Look for `AgeGate` messages
3. Make sure the age gate isn't preventing the page from fully loading

The VisitorTracker now waits 3 seconds to ensure the age gate processes first.

## Most Common Issues & Fixes

### Issue: "OWNER_EMAIL environment variable not set"
**Fix:**
- Go to Vercel → Settings → Environment Variables
- Add `OWNER_EMAIL` with your email
- Make sure it's set for all environments (Production, Preview, Development)
- **Redeploy**

### Issue: "email service not configured"
**Fix:**
- Go to Vercel → Settings → Environment Variables
- Add `RESEND_API_KEY` with your Resend API key
- Get key from: [resend.com/dashboard](https://resend.com/dashboard)
- **Redeploy**

### Issue: "Resend API error: Invalid API key"
**Fix:**
- Check your API key in Resend dashboard
- Copy the full key (starts with `re_`)
- Update in Vercel environment variables
- **Redeploy**

### Issue: "Invalid 'from' email"
**Fix:**
- Set `FROM_EMAIL` to `onboarding@resend.dev` for testing
- Or verify your domain in Resend first
- **Redeploy**

## Still Not Working?

If you've checked everything above and it's still not working:

1. **Share the exact error message** from:
   - Browser console (F12 → Console)
   - Vercel function logs (Dashboard → Functions → `/api/visit-notification`)

2. **Verify:**
   - [ ] All 3 environment variables are set in Vercel
   - [ ] Variables are set for Production, Preview, AND Development
   - [ ] Site was redeployed after setting variables
   - [ ] Resend API key is valid and active
   - [ ] Browser console shows tracking attempts

3. **Check:**
   - Vercel function logs for specific errors
   - Resend dashboard for email send attempts
   - Spam/junk email folder

## Expected Behavior

**Every new visitor should:**
1. Trigger tracking after 3 seconds
2. Call `/api/visit-notification` API
3. Send email to you (the owner)
4. You receive email within a few seconds

**Cooldown:** Same visitor won't trigger another notification for 5 minutes (prevents spam).

---

**Quick Test Checklist:**
- [ ] Open website
- [ ] Check browser console (F12) for `📊 Tracking visit`
- [ ] Check console for `✅ Visit tracked successfully`
- [ ] Check Vercel function logs for `✅ Email sent successfully`
- [ ] Check your email inbox (and spam folder)

