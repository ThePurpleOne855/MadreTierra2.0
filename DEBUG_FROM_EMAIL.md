# Debug: FROM_EMAIL Domain Verification Error

You're getting this error:
```
The yourdomain.com domain is not verified
```

But you say you have `FROM_EMAIL` set to `onboarding@resend.dev`.

## Most Likely Cause

The `FROM_EMAIL` environment variable in Vercel is still set to your custom domain (like `noreply@yourdomain.com`) instead of `onboarding@resend.dev`.

## Step 1: Check What's Actually Set in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **MadreTierra** project
3. Go to **Settings** (gear icon) → **Environment Variables**
4. Find `FROM_EMAIL` in the list
5. **Check the value** - What does it say?

### Common Issues:

❌ **Wrong:** `noreply@yourdomain.com` (or any custom domain)
✅ **Correct:** `onboarding@resend.dev`

❌ **Wrong:** `noreply@madretierra.com`
✅ **Correct:** `onboarding@resend.dev`

❌ **Wrong:** Empty or blank
✅ **Correct:** `onboarding@resend.dev`

## Step 2: Check Vercel Function Logs

The logs will show exactly what email is being used:

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click on `/api/visit-notification`
4. Click **View Logs** or check **Invocations**
5. Look for these log messages:
   - `📧 FROM_EMAIL environment variable:` - Shows what Vercel has
   - `📧 Using FROM email:` - Shows what email will be used

**What to look for:**
- If it says `NOT SET (using default)`, the variable isn't set
- If it shows your custom domain, that's the problem!

## Step 3: Verify Environment Variable Settings

Make sure `FROM_EMAIL` is set correctly:

1. **In Vercel Dashboard:**
   - Settings → Environment Variables
   - Find `FROM_EMAIL`
   - Check the value
   - Make sure it's: `onboarding@resend.dev`
   - Make sure it's set for **Production, Preview, AND Development**

2. **Common Mistakes:**
   - Variable set only for Production (not Preview/Development)
   - Typo: `onboarding@resend.com` (should be `.dev`, not `.com`)
   - Extra spaces: ` onboarding@resend.dev ` (remove spaces)
   - Wrong variable name: `FROMEMAIL` (should be `FROM_EMAIL` with underscore)

## Step 4: Update and Redeploy

1. **Update the value:**
   - Go to Vercel → Settings → Environment Variables
   - Click **Edit** on `FROM_EMAIL`
   - Change value to: `onboarding@resend.dev`
   - Make sure it's set for Production, Preview, AND Development
   - Click **Save**

2. **Redeploy (IMPORTANT!):**
   - Environment variables only apply after redeploy
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

3. **Test again:**
   - Visit your website
   - Check Vercel function logs
   - Look for: `📧 Using FROM email: onboarding@resend.dev`

## Step 5: Verify in Logs After Redeploy

After redeploying, check the logs again:

1. Visit your website
2. Go to Vercel → Functions → `/api/visit-notification` → View Logs
3. Look for:
   ```
   📧 FROM_EMAIL environment variable: onboarding@resend.dev
   📧 Using FROM email: onboarding@resend.dev
   ```

If you see your custom domain in the logs, the environment variable wasn't updated correctly.

## Quick Checklist

- [ ] `FROM_EMAIL` exists in Vercel environment variables
- [ ] Value is exactly: `onboarding@resend.dev` (no spaces, correct spelling)
- [ ] Set for Production, Preview, AND Development
- [ ] Redeployed after setting/changing the variable
- [ ] Checked logs to verify what email is being used
- [ ] No typo: `.dev` not `.com`

## Still Getting Error?

If you're still getting the error after checking everything:

1. **Check the actual error in logs:**
   - Vercel → Functions → `/api/visit-notification` → Logs
   - Look for the exact error message
   - It should show what domain is being used

2. **Double-check the value:**
   - Go to Vercel → Settings → Environment Variables
   - Click on `FROM_EMAIL`
   - Copy the exact value
   - Make sure it's `onboarding@resend.dev` (case-sensitive)

3. **Delete and recreate the variable:**
   - Delete `FROM_EMAIL` variable
   - Create it again with value: `onboarding@resend.dev`
   - Set for all environments
   - Redeploy

4. **Check if there are multiple `FROM_EMAIL` variables:**
   - Sometimes there might be duplicates
   - Delete all and create one fresh

## Expected Result

After fixing, you should see in the logs:
```
📧 FROM_EMAIL environment variable: onboarding@resend.dev
📧 Using FROM email: onboarding@resend.dev
✅ Email sent successfully via Resend
```

And you should receive notifications without any domain verification error!

