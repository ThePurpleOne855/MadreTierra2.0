# Troubleshooting Visit Notifications

If you're not receiving email notifications when visitors come to your website, follow these steps:

## Step 1: Check Environment Variables in Vercel

The most common issue is missing or incorrect environment variables.

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **MadreTierra** project
3. Go to **Settings** → **Environment Variables**
4. Verify these three variables are set:

   - ✅ **OWNER_EMAIL** - Your email address (e.g., `your-email@gmail.com`)
   - ✅ **RESEND_API_KEY** - Your Resend API key (starts with `re_`)
   - ✅ **FROM_EMAIL** - Email to send from (e.g., `onboarding@resend.dev` for testing)

5. **Important:** Make sure all variables are set for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. After adding/changing variables, **redeploy** your site:
   - Go to **Deployments** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**

## Step 2: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click on **"Functions"** tab
3. Look for **`/api/visit-notification`**
4. Click on it to view logs
5. Check for error messages

Common errors you might see:

### Error: "Owner email not configured"
- **Fix:** Make sure `OWNER_EMAIL` environment variable is set in Vercel

### Error: "Resend API error" or "Invalid API key"
- **Fix:** Check that `RESEND_API_KEY` is correct in Vercel environment variables
- Try creating a new API key in Resend and updating it

### Error: "Invalid 'from' email"
- **Fix:** For testing, set `FROM_EMAIL` to `onboarding@resend.dev`
- For production, verify your domain in Resend first

## Step 3: Test the API Route Directly

You can test if the API route is working:

1. Open your browser's Developer Console (F12)
2. Go to your website
3. Open the **Console** tab
4. Look for messages like:
   - ✅ "Visit tracked successfully" - This means it's working!
   - ❌ "Visit notification failed" - There's an error

5. Or test directly in the browser console:
   ```javascript
   fetch('/api/visit-notification', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       page: '/test',
       referrer: 'Direct',
       userAgent: 'Test',
       timestamp: new Date().toISOString()
     })
   }).then(r => r.json()).then(console.log)
   ```

## Step 4: Verify Resend Account Setup

1. Go to [resend.com](https://resend.com) and sign in
2. Check **Dashboard** → **API Keys**:
   - Make sure your API key is active
   - Copy the key and verify it matches what's in Vercel

3. Check **Dashboard** → **Emails**:
   - You should see emails being sent (if the API is working)
   - Check for any failed attempts

4. Check **Dashboard** → **Domains** (if using custom domain):
   - Make sure your domain is verified
   - If not verified, use `onboarding@resend.dev` for testing

## Step 5: Check Browser Console for Errors

1. Visit your website
2. Open Developer Tools (F12)
3. Go to **Console** tab
4. Look for any error messages

The VisitorTracker component logs:
- ✅ Success: "Visit tracked successfully"
- ❌ Errors: "Visit notification failed" or "Error tracking visit"

## Step 6: Verify VisitorTracker is Running

The VisitorTracker should run automatically when someone visits. To verify:

1. Open your website
2. Open Developer Console (F12)
3. Check **Network** tab
4. Filter for `/api/visit-notification`
5. Look for a POST request to that endpoint
6. Check the response:
   - Status 200 = Working
   - Status 500 = Server error (check function logs)
   - No request = VisitorTracker not running

## Step 7: Common Issues and Fixes

### Issue: "No emails received"

**Possible causes:**
1. Environment variables not set in Vercel
2. Not redeployed after setting variables
3. Email service not configured
4. Emails going to spam folder

**Solutions:**
- ✅ Check spam/junk folder
- ✅ Verify all environment variables in Vercel
- ✅ Redeploy after changing environment variables
- ✅ Check Vercel function logs for errors

### Issue: "API returns 500 error"

**Check function logs:**
1. Vercel Dashboard → Functions → `/api/visit-notification`
2. Look for specific error messages
3. Common errors:
   - Missing `OWNER_EMAIL` → Set it in Vercel
   - Missing `RESEND_API_KEY` → Set it in Vercel
   - Invalid API key → Create new key in Resend

### Issue: "VisitorTracker not triggering"

**Possible causes:**
1. Session storage blocking duplicate visits (this is normal - one per session)
2. Component not loaded

**Solutions:**
- Clear browser session storage and refresh
- Check browser console for errors
- Verify VisitorTracker is in App.jsx

## Step 8: Manual Test

You can manually trigger a notification to test:

1. Go to your website
2. Open browser console (F12)
3. Clear session storage:
   ```javascript
   sessionStorage.clear()
   ```
4. Refresh the page
5. Check console for "Visit tracked successfully"
6. Check your email inbox

## Quick Checklist

Before asking for help, verify:

- [ ] `OWNER_EMAIL` is set in Vercel environment variables
- [ ] `RESEND_API_KEY` is set in Vercel environment variables  
- [ ] `FROM_EMAIL` is set (use `onboarding@resend.dev` for testing)
- [ ] All variables are set for Production, Preview, AND Development
- [ ] Site was redeployed after setting/changing environment variables
- [ ] Checked spam/junk email folder
- [ ] Checked Vercel function logs for errors
- [ ] Resend API key is valid and active
- [ ] Browser console shows no errors

## Still Not Working?

If you've checked everything above and it's still not working:

1. **Check Vercel function logs** - Most errors will show up there
2. **Test the API route directly** - Use the browser console test code above
3. **Verify Resend account** - Check that emails are being sent in Resend dashboard
4. **Check network tab** - See if the request is even being made

Share the specific error message from the Vercel function logs, and I can help you fix it!

