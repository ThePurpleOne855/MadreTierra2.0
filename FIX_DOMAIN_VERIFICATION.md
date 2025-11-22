# Fix: Domain Not Verified Error

You're seeing this error:
```
The yourdomain.com domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

## Quick Fix (Testing - Use This Now)

The easiest solution is to use Resend's test domain that doesn't require verification:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `FROM_EMAIL` variable
3. Set it to: `onboarding@resend.dev`
4. **Redeploy** your site
5. Test again - it should work immediately!

## Why This Happened

Resend requires domain verification when using custom domains (like `noreply@yourdomain.com`). The test domain `onboarding@resend.dev` works immediately without verification.

## Two Options:

### Option 1: Use Test Domain (Recommended for Testing)

**Pros:**
- ✅ Works immediately
- ✅ No setup required
- ✅ Perfect for testing

**Cons:**
- ❌ Emails come from `onboarding@resend.dev` instead of your domain
- ❌ Less professional looking

**How to use:**
1. Set `FROM_EMAIL` to `onboarding@resend.dev` in Vercel
2. Redeploy

### Option 2: Verify Your Domain (Recommended for Production)

**Pros:**
- ✅ Professional emails from your domain
- ✅ Better deliverability
- ✅ Branded sender

**Cons:**
- ❌ Requires DNS setup
- ❌ Takes a few minutes to verify

**How to verify your domain:**

1. **Go to Resend Dashboard:**
   - Visit [resend.com/domains](https://resend.com/domains)
   - Sign in to your Resend account

2. **Add Your Domain:**
   - Click **"Add Domain"** button
   - Enter your domain (e.g., `madretierra.com`)
   - Click **"Add"**

3. **Add DNS Records:**
   - Resend will show you DNS records to add
   - Go to your domain registrar (where you bought your domain)
   - Add the DNS records Resend provides:
     - Usually 3 TXT records (SPF, DKIM)
     - Sometimes CNAME records

4. **Verify Domain:**
   - After adding DNS records, wait a few minutes
   - Go back to Resend dashboard
   - Click **"Verify"** next to your domain
   - Wait for verification (usually 1-10 minutes)

5. **Use Verified Domain:**
   - Once verified, update `FROM_EMAIL` in Vercel to:
     - `noreply@yourdomain.com` (or any email using your verified domain)
   - **Redeploy** your site

## Step-by-Step Fix (Using Test Domain - Fastest)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click on your **MadreTierra** project

2. **Open Environment Variables:**
   - Click **Settings** (gear icon)
   - Click **Environment Variables** (left sidebar)

3. **Update FROM_EMAIL:**
   - Find `FROM_EMAIL` in the list
   - Click **Edit** (or **Add** if it doesn't exist)
   - Set Value to: `onboarding@resend.dev`
   - Make sure it's set for **Production, Preview, AND Development**
   - Click **Save**

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

5. **Test:**
   - Visit your website
   - Check your email inbox
   - You should receive notifications!

## Current Configuration

Check your current `FROM_EMAIL` setting:

1. Vercel Dashboard → Settings → Environment Variables
2. Look for `FROM_EMAIL`
3. If it's set to something like `noreply@yourdomain.com` and your domain isn't verified, that's the problem!

**Fix:** Change it to `onboarding@resend.dev` for immediate testing.

## After Fixing

Once you've updated `FROM_EMAIL` to `onboarding@resend.dev` and redeployed:

1. Visit your website
2. Check browser console (F12) - should see `✅ Visit tracked successfully`
3. Check your email inbox - you should receive a notification!

## For Production (Later)

When you're ready for production:

1. Verify your domain in Resend (steps above)
2. Update `FROM_EMAIL` to use your verified domain
3. Redeploy

For now, `onboarding@resend.dev` is perfect for testing!

