# Using Your Verified Domain in Resend

Since you've already verified your domain in Resend, you can use any email address from that verified domain.

## Step 1: Find Your Verified Domain in Resend

1. Go to [resend.com/dashboard](https://resend.com/dashboard)
2. Click on **"Domains"** in the left sidebar
3. Look for your verified domain
   - It should show a green checkmark ✅ or say "Verified"
   - Example: `madretierra.com` or `yourdomain.com`
4. **Copy your verified domain name** (the part after the @ in your email)

## Step 2: Format Your FROM_EMAIL

Once you know your verified domain, you can use any email address with it:

### Format:
```
any-name@your-verified-domain.com
```

### Examples:

If your verified domain is `madretierra.com`, you can use:
- `noreply@madretierra.com`
- `info@madretierra.com`
- `notifications@madretierra.com`
- `hello@madretierra.com`
- `support@madretierra.com`
- Any name before the @ sign works!

If your verified domain is `yourdomain.com`, you can use:
- `noreply@yourdomain.com`
- `info@yourdomain.com`
- etc.

## Step 3: Update FROM_EMAIL in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **MadreTierra** project
3. Go to **Settings** → **Environment Variables**
4. Find `FROM_EMAIL` in the list
5. Click **Edit**
6. Change the value to your verified domain email:
   - Example: `noreply@madretierra.com`
   - Or: `info@madretierra.com`
   - Or: `notifications@madretierra.com`
   - Use whatever name you prefer before the @
7. Make sure it's set for **Production, Preview, AND Development**
8. Click **Save**

## Step 4: Redeploy

**IMPORTANT:** Environment variables only apply after redeploy!

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## Step 5: Test

1. Visit your website
2. Check Vercel function logs:
   - Functions → `/api/visit-notification` → View Logs
   - You should see: `📧 Using FROM email: noreply@yourdomain.com`
3. Check your email inbox
4. You should receive notifications from your verified domain!

## Common Email Names to Use

Here are common email addresses you can use:

- `noreply@yourdomain.com` - For automated notifications
- `info@yourdomain.com` - General information
- `notifications@yourdomain.com` - For notifications
- `hello@yourdomain.com` - Friendly greeting
- `support@yourdomain.com` - Support emails
- `contact@yourdomain.com` - Contact emails

**Any name works** - as long as your domain is verified in Resend, you can use any email address from that domain!

## Verify Your Domain Status

To confirm your domain is verified:

1. Go to [resend.com/domains](https://resend.com/domains)
2. Check if your domain shows:
   - ✅ **Verified** (green checkmark)
   - Status: **Active**
3. If it shows "Pending" or "Unverified", you need to complete the verification first

## If Domain Shows as Verified But Still Getting Errors

If your domain is verified but you still get errors:

1. **Check the exact domain:**
   - Make sure `FROM_EMAIL` uses the exact same domain
   - Example: If domain is `madretierra.com`, use `noreply@madretierra.com`
   - Not: `noreply@www.madretierra.com` (www is different)

2. **Wait a few minutes:**
   - Sometimes verification takes a moment to propagate
   - Wait 5-10 minutes after verification completes

3. **Double-check in Resend:**
   - Go to Resend dashboard → Domains
   - Confirm it says "Verified" (not "Pending")

4. **Check DNS records:**
   - Verify all DNS records are still in place
   - Sometimes they get removed accidentally

## Example: Using Your Verified Domain

If you verified `madretierra.com`:

**In Vercel Environment Variables:**
- Variable Name: `FROM_EMAIL`
- Variable Value: `noreply@madretierra.com` (or `info@madretierra.com`, etc.)

**Result:**
- Emails will be sent from: `noreply@madretierra.com`
- Professional-looking sender address
- Better deliverability

---

**That's it!** Once you update `FROM_EMAIL` to use your verified domain and redeploy, your visit notifications will be sent from your professional domain email address!

