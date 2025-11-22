# Setup Visit Notification Email System

This guide explains how to set up email notifications so you receive an email every time someone visits your website.

## How It Works

1. When someone visits your website, the `VisitorTracker` component automatically calls `/api/visit-notification`
2. The API route sends an email **to you (the owner)** - **NOT to the visitor**
3. You'll receive an email with visitor information like:
   - Page visited
   - Visit time
   - Referrer (where they came from)
   - IP address
   - Device information

## Step 1: Choose an Email Service

You have two options for sending emails:

### Option A: Resend (Recommended - Easy Setup)

1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your domain or use their test domain
3. Get your API key from the dashboard
4. Set environment variable: `RESEND_API_KEY=your_api_key_here`

### Option B: SendGrid

1. Go to [sendgrid.com](https://sendgrid.com) and create a free account
2. Verify your email/domain
3. Create an API key in the dashboard
4. Set environment variable: `SENDGRID_API_KEY=your_api_key_here`

## Step 2: Set Environment Variables in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

### Required Variables:
- `OWNER_EMAIL` - Your email address where you want to receive notifications
  - Example: `your-email@example.com`

### Email Service Variables (choose one):

**For Resend:**
- `RESEND_API_KEY` - Your Resend API key
- `FROM_EMAIL` - The email address to send from (e.g., `noreply@yourdomain.com` or use Resend's test email)

**For SendGrid:**
- `SENDGRID_API_KEY` - Your SendGrid API key
- `FROM_EMAIL` - The email address to send from (must be verified in SendGrid)

## Step 3: Install Dependencies (if using Resend)

If you're using Resend, you'll need to add it to your package.json:

```bash
npm install resend
```

Or add it manually to `package.json`:

```json
{
  "dependencies": {
    "resend": "^3.0.0"
  }
}
```

## Step 4: Test It

1. Deploy your changes to Vercel
2. Visit your website
3. Check your email inbox - you should receive a notification!

## Important Notes

- **No emails are sent to visitors** - only you (the owner) receive notifications
- Notifications are sent **once per session** (won't spam you if someone navigates between pages)
- The visitor tracking happens automatically in the background
- Visitors won't see any loading indicators or delays

## Troubleshooting

### Not receiving emails?

1. Check your Vercel environment variables are set correctly
2. Check Vercel function logs: Dashboard → Your Project → Functions → View Logs
3. Verify your email service API key is correct
4. Check spam/junk folder
5. Make sure `FROM_EMAIL` is verified in your email service

### Rate Limiting

- Resend free tier: 3,000 emails/month
- SendGrid free tier: 100 emails/day
- For high-traffic sites, consider upgrading your email service plan

## Customization

You can customize the email template in `/api/visit-notification.js` to match your brand colors and styling.

