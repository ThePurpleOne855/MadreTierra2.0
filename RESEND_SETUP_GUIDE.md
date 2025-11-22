# Resend Setup Guide - Visit Notification Emails

This guide will walk you through setting up Resend to receive email notifications when someone visits your website.

## Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Create an account (it's free - no credit card required)
   - You can sign up with email or GitHub

## Step 2: Get Your API Key

1. After signing up, you'll be taken to the Resend dashboard
2. Click on **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Give it a name like "MadreTierra Visit Notifications"
5. Select **"Sending access"** permissions
6. Click **"Create"**
7. **Copy the API key immediately** - you'll only see it once!
   - It will look like: `re_xxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 3: Set Up Your From Email

You have two options:

### Option A: Use Resend's Test Domain (Quick Setup - For Testing)
- For testing, you can use: `onboarding@resend.dev`
- This works immediately without verification
- Perfect for getting started quickly

### Option B: Use Your Own Domain (Recommended for Production)
1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `madretierra.com`)
4. Follow the DNS verification steps:
   - Add the DNS records Resend provides to your domain's DNS settings
   - Wait for verification (usually a few minutes)
5. Once verified, you can use emails like: `noreply@madretierra.com`

## Step 4: Set Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Navigate to your **MadreTierra** project
3. Go to **Settings** (gear icon in top navigation)
4. Click **"Environment Variables"** in the left sidebar
5. Add the following variables:

### Required Variables:

**1. OWNER_EMAIL**
- **Key:** `OWNER_EMAIL`
- **Value:** Your email address (where you want to receive notifications)
  - Example: `your-email@gmail.com`
- **Environment:** Select all (Production, Preview, Development)

**2. RESEND_API_KEY**
- **Key:** `RESEND_API_KEY`
- **Value:** The API key you copied from Resend
  - Example: `re_xxxxxxxxxxxxxxxxxxxxxxxxx`
- **Environment:** Select all (Production, Preview, Development)

**3. FROM_EMAIL (Optional)**
- **Key:** `FROM_EMAIL`
- **Value:** The email address to send from
  - For testing: `onboarding@resend.dev`
  - For production: `noreply@yourdomain.com` (after verifying your domain)
- **Environment:** Select all (Production, Preview, Development)

## Step 5: Deploy to Vercel

1. Commit and push your changes to GitHub (if you haven't already)
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy:
   - Go to your project → **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Select **"Redeploy"**

## Step 6: Test It!

1. Visit your website: `https://your-domain.vercel.app`
2. Wait a few seconds (the tracker runs automatically)
3. Check your email inbox (the email you set in `OWNER_EMAIL`)
4. You should receive an email notification about the visit!

## Troubleshooting

### Not receiving emails?

1. **Check your spam/junk folder** - Sometimes emails end up there
2. **Verify environment variables:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Make sure all three variables are set correctly
   - Make sure they're set for the right environment (Production/Preview/Development)
3. **Check Vercel function logs:**
   - Go to Vercel → Your Project → **Functions** tab
   - Click on `/api/visit-notification`
   - Check the logs for any errors
4. **Verify your Resend API key:**
   - Go to Resend dashboard → API Keys
   - Make sure the key is active
   - Try creating a new key if needed
5. **Test with Resend's test domain:**
   - Make sure `FROM_EMAIL` is set to `onboarding@resend.dev` for testing

### Error: "Invalid API key"

- Double-check that you copied the full API key
- Make sure there are no extra spaces
- Try creating a new API key in Resend dashboard

### Error: "Invalid 'from' email"

- For testing, use: `onboarding@resend.dev`
- For production, verify your domain in Resend first
- Make sure the email format is correct (e.g., `noreply@domain.com`)

### Still not working?

Check the Vercel function logs:
1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on **`/api/visit-notification`**
4. Click **"View Logs"**
5. Look for error messages

## What You'll Receive

When someone visits your website, you'll get an email with:
- 📄 Page visited
- 🕐 Visit time
- 🔗 Referrer (where they came from)
- 💻 IP address
- 📱 Device information (screen size, language, timezone)

## Free Tier Limits

Resend free tier includes:
- ✅ 3,000 emails per month
- ✅ 100 emails per day
- ✅ No credit card required
- ✅ Free forever

This should be plenty for most websites! Each visitor generates one notification email.

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: https://resend.com/contact
- Check your Vercel function logs for specific errors

