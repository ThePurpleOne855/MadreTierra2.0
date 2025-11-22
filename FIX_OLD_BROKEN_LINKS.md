# Fix Old/Broken Links in Search Results

This guide will help you remove old/broken links from search engine results and redirect users properly.

## ✅ What's Already Implemented

1. **404 Page Created** - `src/pages/NotFoundPage.jsx`
   - User-friendly error page
   - Links to popular pages
   - Helps users find content

2. **Catch-All Route** - Added to `App.jsx`
   - All unknown URLs redirect to 404 page
   - Prevents blank pages

3. **Basic Redirects** - Added to `vercel.json`
   - Common old URL patterns redirected
   - Permanent redirects (301) for SEO

4. **Updated Sitemap** - `public/sitemap.xml`
   - Updated with your actual domain
   - Only includes current, working pages

## 🔧 Step 1: Add More Redirects (If Needed)

If you know specific old URLs that people are searching for, add them to `vercel.json`:

1. Open `vercel.json`
2. Add redirects in the `redirects` array:

```json
{
  "redirects": [
    {
      "source": "/old-page-name",
      "destination": "/new-page-name",
      "permanent": true
    },
    {
      "source": "/products",
      "destination": "/selection",
      "permanent": true
    },
    {
      "source": "/stores",
      "destination": "/locations",
      "permanent": true
    }
  ]
}
```

**Common redirects you might need:**
- `/products` → `/selection`
- `/stores` → `/locations`
- `/events` → `/private-events`
- `/contact` → `/#contact`
- `/about` → `/#about`

## 🔍 Step 2: Remove Old URLs from Google Search

### Using Google Search Console

1. **Go to Google Search Console:**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Your Property:**
   - Click "Add Property"
   - Enter: `https://www.madretierracigars.com`
   - Verify ownership (DNS, HTML file, or meta tag)

3. **Remove Old URLs:**
   - Go to **Removals** in the left sidebar
   - Click **"New Request"**
   - Enter the old/broken URL you want to remove
   - Select **"Remove this URL"**
   - Click **"Submit Request"**

4. **Bulk Removal (if many URLs):**
   - Use **"Temporary Removals"** for quick removal
   - Or create a **"Removals"** file in your site root
   - Google will process within 24 hours

### Alternative: Update Old URLs

Instead of removing, you can update them:

1. In Google Search Console, go to **URL Inspection**
2. Enter the old URL
3. Click **"Request Indexing"** after fixing the redirect
4. This tells Google the URL has moved

## 📋 Step 3: Create URL Mapping (If You Have Old URLs)

If you have a list of old URLs, create a mapping file:

1. Create `public/_redirects` (for Netlify) or use `vercel.json` (for Vercel)
2. Map old URLs to new ones:

**Example for Vercel (`vercel.json`):**
```json
{
  "redirects": [
    {
      "source": "/old-page-1",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/old-page-2",
      "destination": "/selection",
      "permanent": true
    }
  ]
}
```

## 🔄 Step 4: Submit Updated Sitemap

1. **Go to Google Search Console**
2. Click **"Sitemaps"** in the left sidebar
3. Enter: `https://www.madretierracigars.com/sitemap.xml`
4. Click **"Submit"**
5. This tells Google which pages are current

## 🛠️ Step 5: Monitor and Fix

### Check What's Broken

1. **Google Search Console:**
   - Go to **Coverage** report
   - Look for **"404" errors**
   - See which old URLs are being accessed

2. **Google Analytics (or Vercel Analytics):**
   - Check **"404" page views**
   - See which broken URLs users are trying to access

3. **Add Redirects for Popular Broken URLs:**
   - If many users hit the same broken URL
   - Add a redirect in `vercel.json`
   - Redirect to the closest matching page

## 📝 Step 6: Update External Links

If you control external sites linking to old URLs:

1. **Update your own links:**
   - Social media profiles
   - Business directories
   - Partner websites
   - Email signatures

2. **Contact other sites:**
   - If other sites link to old URLs
   - Politely ask them to update links
   - Provide the new URL

## 🎯 Step 7: Use 301 Redirects (Permanent)

All redirects in `vercel.json` use `"permanent": true`, which creates **301 redirects**:
- ✅ Tells search engines the page moved permanently
- ✅ Transfers SEO value to new page
- ✅ Better than 404 errors

## 📊 Step 8: Monitor Progress

### Check in Google Search Console:

1. **Coverage Report:**
   - Monitor 404 errors decreasing
   - See which pages are indexed

2. **Performance Report:**
   - Check search impressions
   - Monitor click-through rates
   - See if old URLs still appear

3. **Removals:**
   - Check status of removal requests
   - Old URLs should disappear within days/weeks

## ⏱️ Timeline

- **Immediate:** 404 page shows for broken links
- **1-3 days:** Redirects start working
- **1-2 weeks:** Google processes removals
- **2-4 weeks:** Old URLs start disappearing from search
- **1-3 months:** Most old URLs removed from search results

## 🔗 Common Old URL Patterns to Redirect

If your old site had these patterns, add redirects:

```json
{
  "redirects": [
    // Product pages
    { "source": "/product/:slug", "destination": "/selection", "permanent": true },
    { "source": "/products", "destination": "/selection", "permanent": true },
    
    // Store pages
    { "source": "/store/:id", "destination": "/locations", "permanent": true },
    { "source": "/stores", "destination": "/locations", "permanent": true },
    
    // Blog/News
    { "source": "/blog/:slug", "destination": "/", "permanent": true },
    { "source": "/news/:slug", "destination": "/", "permanent": true },
    
    // Old contact/about
    { "source": "/contact-us", "destination": "/#contact", "permanent": true },
    { "source": "/about-us", "destination": "/#about", "permanent": true }
  ]
}
```

## 🚨 Important Notes

1. **Don't remove too aggressively:**
   - Some old URLs might have valuable backlinks
   - Redirect them instead of removing

2. **Keep redirects for at least 6 months:**
   - Search engines need time to update
   - Users might have bookmarked old URLs

3. **Monitor 404 errors:**
   - Add redirects for frequently accessed broken URLs
   - Improves user experience

## ✅ Quick Checklist

- [ ] 404 page created and working
- [ ] Catch-all route added to App.jsx
- [ ] Basic redirects added to vercel.json
- [ ] Sitemap updated with correct domain
- [ ] Google Search Console property added
- [ ] Old URLs submitted for removal
- [ ] Updated sitemap submitted to Google
- [ ] Monitoring 404 errors in Search Console
- [ ] Adding redirects for popular broken URLs

## 🎯 Result

After following these steps:
- ✅ Broken links show friendly 404 page
- ✅ Old URLs redirect to new pages
- ✅ Search engines remove old/broken URLs
- ✅ Users find content easily
- ✅ SEO value preserved through redirects

---

**Remember:** It takes time for search engines to update. Be patient and monitor progress in Google Search Console!

