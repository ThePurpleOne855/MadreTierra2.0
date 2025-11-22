# SEO Setup Guide for MadreTierra Cigars Website

This guide explains all the SEO improvements that have been implemented for your website.

## ✅ What's Already Implemented

### 1. **Meta Tags Component**
- Created `src/components/SEO.jsx` - Dynamic SEO component
- Supports all major meta tags (title, description, keywords, Open Graph, Twitter Cards)
- Automatically includes structured data (JSON-LD)

### 2. **SEO Added to All Pages**
- ✅ Homepage - Full SEO with structured data
- ✅ Selection Page - Page-specific SEO
- ✅ Locations Page - Page-specific SEO  
- ✅ Gallery Page - Ready for SEO component
- ✅ Private Events Page - Page-specific SEO

### 3. **Sitemap**
- Created `public/sitemap.xml` - Lists all your pages for search engines
- Includes priority and change frequency for each page

### 4. **Robots.txt**
- Created `public/robots.txt` - Tells search engines which pages to crawl
- Points to your sitemap location

### 5. **Enhanced HTML**
- Updated `index.html` with comprehensive meta tags
- Added theme colors
- Improved basic SEO tags

## 🔧 What You Need to Update

### 1. **Update Your Domain in SEO Component**

1. Open `src/components/SEO.jsx`
2. Find this line (around line 14):
   ```javascript
   const siteUrl = 'https://your-domain.vercel.app' // Update this with your actual domain
   ```
3. Replace `https://your-domain.vercel.app` with your actual domain:
   - Example: `https://madretierra.com`
   - Example: `https://madretierra.vercel.app`

### 2. **Update Sitemap**

1. Open `public/sitemap.xml`
2. Replace all instances of `https://your-domain.vercel.app` with your actual domain
3. Update `<lastmod>` dates to current date when you make changes

### 3. **Update Robots.txt**

1. Open `public/robots.txt`
2. Replace `https://your-domain.vercel.app` with your actual domain

### 4. **Add Social Media Links (Optional)**

1. Open `src/components/SEO.jsx`
2. Find the `defaultStructuredData` section
3. Add your social media links to the `sameAs` array:
   ```javascript
   sameAs: [
     'https://www.facebook.com/madretierra',
     'https://www.instagram.com/madretierra',
     'https://www.twitter.com/madretierra',
   ],
   ```

## 📝 Page-Specific SEO Settings

Each page has optimized SEO settings. You can customize them in each page file:

### Homepage (`src/pages/HomePage.jsx`)
- Title: "MadreTierra Cigars | Premium Handcrafted Cigars"
- Focus: Brand introduction, premium cigars

### Selection Page (`src/pages/SelectionPage.jsx`)
- Title: "Cigar Selection | MadreTierra Cigars"
- Focus: 10 unique blends, cigar varieties

### Locations Page (`src/pages/LocationsPage.jsx`)
- Title: "Find a Retailer | MadreTierra Cigars Locations"
- Focus: Authorized retailers, store locator

### Private Events Page (`src/pages/PrivateEventsPage.jsx`)
- Title: "Private Events & Tastings | MadreTierra Cigars"
- Focus: Event booking, private tastings

### Gallery Page
- Add SEO component when ready (similar to other pages)

## 🚀 Next Steps for Better SEO

### 1. **Add Image Alt Tags**
Make sure all images have descriptive alt text:
```jsx
<img src="..." alt="MadreTierra Broadleaf Toro cigar on wooden table" />
```

### 2. **Submit Sitemap to Search Engines**
Once deployed:
- **Google Search Console**: https://search.google.com/search-console
  - Add your site
  - Submit sitemap: `https://your-domain.com/sitemap.xml`
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
  - Add your site
  - Submit sitemap

### 3. **Add Structured Data for Products**
Add product schema for individual cigars (if needed):
```javascript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Broadleaf Toro",
  "description": "...",
  "brand": "MadreTierra Cigars",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock"
  }
}
```

### 4. **Add Contact Information**
Update structured data with your business contact info:
- Address
- Phone number
- Email
- Business hours

### 5. **Create Blog or Content Section**
- Regular content helps with SEO
- Share cigar knowledge, tasting notes, events

### 6. **Optimize Images**
- Use descriptive filenames: `madretierra-broadleaf-toro-6x52.jpg`
- Compress images for faster loading
- Use modern formats (WebP, AVIF) where possible

### 7. **Get Backlinks**
- List your website in cigar directories
- Partner with cigar review sites
- Get featured in cigar publications

### 8. **Monitor Performance**
- Use Google Search Console to track:
  - Search rankings
  - Click-through rates
  - Indexing status
  - Search queries

## 🔍 Testing Your SEO

### 1. **Google Rich Results Test**
- Visit: https://search.google.com/test/rich-results
- Enter your URL
- Check for errors or warnings

### 2. **Google Mobile-Friendly Test**
- Visit: https://search.google.com/test/mobile-friendly
- Test your site's mobile responsiveness

### 3. **PageSpeed Insights**
- Visit: https://pagespeed.web.dev/
- Test page load speed
- Get optimization recommendations

### 4. **Meta Tags Checker**
- Visit: https://metatags.io/
- Preview how your site appears in search results
- Test Open Graph tags

## 📊 SEO Checklist

- [ ] Update domain in `SEO.jsx`
- [ ] Update domain in `sitemap.xml`
- [ ] Update domain in `robots.txt`
- [ ] Add social media links (optional)
- [ ] Add contact information to structured data
- [ ] Verify all images have alt text
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test with Google Rich Results Test
- [ ] Monitor performance in Search Console

## 🎯 SEO Best Practices Implemented

✅ **Meta Tags**: Title, description, keywords on all pages
✅ **Open Graph**: Social media sharing optimization
✅ **Twitter Cards**: Twitter sharing optimization
✅ **Structured Data**: JSON-LD schema markup
✅ **Canonical URLs**: Prevent duplicate content
✅ **Sitemap**: Help search engines index your site
✅ **Robots.txt**: Control crawler access
✅ **Mobile Responsive**: Mobile-friendly design
✅ **Fast Loading**: Optimized performance
✅ **HTTPS Ready**: Secure connection (via Vercel)

## 🔗 Useful Tools

- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Google Analytics**: https://analytics.google.com (already have Vercel Analytics)
- **Schema Markup Validator**: https://validator.schema.org/
- **Meta Tags Preview**: https://metatags.io/

## 📈 Expected Results

After implementing and submitting your sitemap:
- **2-4 weeks**: Search engines start indexing your pages
- **1-3 months**: Pages start appearing in search results
- **3-6 months**: Organic traffic starts increasing

Remember: SEO is a long-term strategy. Consistency and quality content are key!

---

**Note**: Don't forget to update all domain references from `your-domain.vercel.app` to your actual domain before deploying!

