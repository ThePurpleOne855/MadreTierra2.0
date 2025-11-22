# Vercel Web Analytics & Speed Insights Setup

This guide explains how to enable and view analytics for your MadreTierra Cigars website.

## ✅ What's Already Installed

I've already added the analytics code to your project:

1. **@vercel/analytics** - Web Analytics package
2. **@vercel/speed-insights** - Speed Insights package (performance tracking)
3. **Analytics components** added to `App.jsx`

## 🚀 How to Enable Analytics in Vercel

### Step 1: Deploy to Vercel

Make sure your project is deployed to Vercel:
1. Push your changes to GitHub (if connected)
2. Vercel will automatically deploy, OR
3. Manually deploy via Vercel CLI: `vercel --prod`

### Step 2: Enable Web Analytics in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **MadreTierra** project
3. Click on **"Settings"** (gear icon in the top navigation)
4. Click on **"Analytics"** in the left sidebar
5. Toggle **"Web Analytics"** to **ON**
6. Toggle **"Speed Insights"** to **ON** (optional but recommended)

That's it! Analytics will start collecting data automatically.

## 📊 What You'll See in Analytics

### Web Analytics Dashboard

Once enabled, you can view:

- **Page Views** - Total visits to your site
- **Unique Visitors** - Number of unique users
- **Top Pages** - Most visited pages
- **Top Referrers** - Where visitors are coming from
- **Countries** - Visitor locations
- **Devices** - Desktop, Mobile, Tablet breakdown
- **Browsers** - Which browsers visitors use
- **Operating Systems** - Windows, Mac, iOS, Android, etc.

### Speed Insights Dashboard

Performance metrics:

- **Web Vitals** - Core performance metrics
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- **Performance Score** - Overall speed score
- **Real User Monitoring** - Actual performance from real visitors

## 📍 Where to View Analytics

1. Go to your Vercel project dashboard
2. Click on the **"Analytics"** tab
3. You'll see:
   - **Web Analytics** section
   - **Speed Insights** section

## ⚙️ Advanced Configuration

### Custom Domain Analytics

If you have a custom domain:
1. Analytics automatically works with your custom domain
2. No additional configuration needed
3. Data will be attributed to your custom domain

### Filtering Data

You can filter analytics data by:
- Date range
- Page paths
- Referrers
- Countries
- Devices

## 🔒 Privacy

**Vercel Analytics is privacy-focused:**
- ✅ GDPR compliant
- ✅ No cookies required
- ✅ Privacy-friendly (no personal data collection)
- ✅ Open-source and transparent
- ✅ No user tracking

## 📈 Free Tier

**Vercel Analytics is free for:**
- All Vercel projects
- Unlimited page views
- Full analytics dashboard
- Speed Insights included

## 🐛 Troubleshooting

### Analytics not showing data?

1. **Make sure it's enabled in Vercel:**
   - Settings → Analytics → Toggle ON

2. **Wait a few minutes:**
   - Data may take a few minutes to appear after enabling

3. **Check deployment:**
   - Make sure your latest code with Analytics is deployed
   - Check that `<Analytics />` and `<SpeedInsights />` are in `App.jsx`

4. **Verify package installation:**
   ```bash
   npm list @vercel/analytics @vercel/speed-insights
   ```

5. **Check browser console:**
   - Look for any errors in the browser console
   - Analytics should load silently without errors

### Still not working?

1. Check Vercel deployment logs
2. Verify the packages are in `package.json`:
   ```json
   {
     "dependencies": {
       "@vercel/analytics": "^x.x.x",
       "@vercel/speed-insights": "^x.x.x"
     }
   }
   ```
3. Make sure components are in `App.jsx`:
   ```jsx
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/react'
   
   // ... in your return statement:
   <Analytics />
   <SpeedInsights />
   ```

## 📱 Mobile App

You can also view analytics on the go:
- Download the Vercel mobile app
- View analytics from your phone
- Get notifications about your site performance

## 🎯 Best Practices

1. **Enable both Web Analytics and Speed Insights** for comprehensive data
2. **Check analytics regularly** to understand your audience
3. **Use Speed Insights** to identify performance bottlenecks
4. **Filter data** to understand specific visitor segments

## 🔗 Useful Links

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**Note:** Analytics will start collecting data automatically once enabled in the Vercel dashboard. The code is already integrated into your project!

