# EmailJS Setup Guide for Vercel

## Problem
If emails are not sending after deploying to Vercel, it's most likely because the environment variables are not configured in your Vercel project.

## Solution: Configure Environment Variables in Vercel

### Step 1: Get Your EmailJS Credentials

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign in to your account
3. You'll need three values:
   - **Public Key** (found in Account > API Keys)
   - **Service ID** (found in Email Services)
   - **Template ID** (found in Email Templates)

### Step 2: Add Environment Variables in Vercel (Key-Value Format)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New** button (you'll add each variable one at a time)

#### Add Variable 1: Public Key
- **Key:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** Paste your EmailJS Public Key (from EmailJS Dashboard → Account → API Keys)
- **Environments:** Select ☑ Production, ☑ Preview (and ☑ Development if you want it locally)
- Click **Save**

#### Add Variable 2: Service ID
- **Key:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** Paste your EmailJS Service ID (from EmailJS Dashboard → Email Services)
- **Environments:** Select ☑ Production, ☑ Preview (and ☑ Development if you want it locally)
- Click **Save**

#### Add Variable 3: Template ID
- **Key:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** Paste your EmailJS Template ID (from EmailJS Dashboard → Email Templates)
- **Environments:** Select ☑ Production, ☑ Preview (and ☑ Development if you want it locally)
- Click **Save**

**Important Notes:**
- Use **Key-Value** format (not import)
- Variable names MUST start with `VITE_` (this is required for Vite to expose them to client-side code)
- Copy the exact values from your EmailJS dashboard (no extra spaces)
- Make sure to enable for **Production** and **Preview** environments

### Step 3: Redeploy Your Application

After adding the environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on your latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger a new deployment

### Step 4: Verify the Setup

1. Open your deployed website
2. Open the browser's Developer Console (F12)
3. Try submitting the contact form
4. Check the console for any error messages

If you see errors about missing environment variables, double-check that:
- The variable names are exactly: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
- They are set for the correct environment (Production/Preview)
- You've redeployed after adding them

## Troubleshooting

### Error: "EmailJS configuration is missing"
- **Cause:** Environment variables are not set in Vercel
- **Solution:** Follow Step 2 above to add the variables

### Error: "EmailJS Service ID is missing"
- **Cause:** `VITE_EMAILJS_SERVICE_ID` is not set or has the wrong name
- **Solution:** Check the variable name in Vercel (must start with `VITE_`)

### Error: "EmailJS Template ID is missing"
- **Cause:** `VITE_EMAILJS_TEMPLATE_ID` is not set or has the wrong name
- **Solution:** Check the variable name in Vercel (must start with `VITE_`)

### Emails still not sending after setup
1. Check the browser console for detailed error messages
2. Verify your EmailJS service is active and has available quota
3. Check that your EmailJS template has the correct variable names:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`

## Local Development Setup

For local development, create a `.env` file in the project root:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

**Note:** The `.env` file is already in `.gitignore` so it won't be committed to your repository.

## Need Help?

If you're still experiencing issues:
1. Check the browser console for detailed error messages
2. Verify all three environment variables are set correctly in Vercel
3. Make sure you've redeployed after adding the variables
4. Check your EmailJS dashboard to ensure your service and template are properly configured

