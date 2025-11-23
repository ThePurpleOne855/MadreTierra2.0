# MadreTierra Cigars - Project Description

## Overview

MadreTierra Cigars is a modern, elegant website for a premium handcrafted cigar brand. The website showcases the brand's selection of fine cigars, provides information about authorized retailers, displays upcoming private events, and offers multiple ways for customers to connect with the brand. Built with React and deployed on Vercel, the site combines sophisticated design with modern web technologies.

## Purpose

The website serves as the digital presence for MadreTierra Cigars, a family-owned and operated brand of fine cigars handmade in Tamboril, Dominican Republic. Since 1982, the brand has been perfecting its craft, and this website represents their introduction to the U.S. market. The site aims to:

- Showcase the premium cigar selection (10 unique Toro blends)
- Provide information about authorized retailers and locations
- Display upcoming private events and tastings
- Connect with customers through a contact form
- Present the brand story and craftsmanship
- Build brand awareness and credibility

## Key Features

### Frontend Features

#### 🎨 **Adaptive Navigation Bar**
- Smart background color detection that adapts to light/dark sections
- Smooth color transitions based on scroll position
- Fixed position with shadow effects on scroll
- Fully responsive mobile menu

#### 🖼️ **Multi-Page Architecture**
- **Home Page**: Hero section, featured content, brand story, retailer information, experience highlights, and contact form
- **Cigar Selection Page**: Interactive gallery showcasing 10 unique cigar blends with filtering by strength (Mild, Medium, Full)
- **Locations Page**: Map and directory of authorized premium cigar retailers
- **Gallery Page**: Visual showcase of cigar imagery and lifestyle content
- **Private Events Page**: Google Calendar integration displaying upcoming events and tastings
- **404 Page**: Custom error page with navigation options

#### 📱 **Age Verification Gate**
- Age gate modal that verifies users are 21+ before accessing the site
- Session-based verification to prevent repeated prompts
- Complies with tobacco advertising regulations

#### 🎭 **Smooth Animations & Interactions**
- Intersection Observer-based fade-in animations
- Smooth scrolling for anchor links
- Hover effects on interactive elements
- Loading transitions and state management

### Backend Features

#### 📧 **Contact Form Integration**
- EmailJS integration for contact form submissions
- Sends notifications to owner
- Optional visitor confirmation emails
- Form validation and error handling

#### 🔔 **Visitor Tracking & Notifications**
- Automated email notifications to site owner when visitors arrive
- Tracks visitor information: page visited, user agent, screen size, language, timezone
- 30-second cooldown to prevent spam
- Resend API integration for reliable email delivery

#### 📅 **Google Calendar Integration**
- Embedded Google Calendar for private events
- Serverless API route for calendar event fetching (available for future use)
- Real-time event display on Private Events page

#### 🔍 **SEO Optimization**
- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social media sharing
- Twitter Card support
- JSON-LD structured data (Schema.org)
- XML sitemap (`sitemap.xml`)
- Robots.txt configuration
- Canonical URLs
- Custom SEO component for page-specific optimization

#### 📊 **Analytics & Performance**
- Vercel Web Analytics integration
- Vercel Speed Insights for performance monitoring
- Performance-optimized builds with Vite

### Additional Features

#### 🔄 **URL Redirects**
- 301 redirects for old URLs (`/home`, `/index.html`, `/index`) to homepage
- Proper handling of legacy links from previous website

#### 🎨 **Design System**
- Custom color palette:
  - **Primary**: `#014421` (Dark Green)
  - **Secondary**: `#D4AF37` (Gold)
  - **Tertiary**: `#7B4F28` (Brown)
  - **Dark**: `#0A0A0A` (Near Black)
  - **Light**: `#F8F8F5` (Off-white/Cream)
- Custom typography: Playfair Display (serif) and Lato (sans-serif)
- Consistent spacing and component styling

## Technology Stack

### Frontend
- **React 18.2.0** - UI library for building component-based interfaces
- **React Router DOM 6.21.0** - Client-side routing
- **TailwindCSS 3.4.0** - Utility-first CSS framework
- **Vite 7.2.4** - Build tool and development server
- **PostCSS & Autoprefixer** - CSS processing

### Backend/API
- **Vercel Serverless Functions** - API routes in `/api` directory
- **Resend 6.5.2** - Email delivery service for visit notifications
- **EmailJS 4.3.1** - Email service for contact form submissions

### SEO & Analytics
- **react-helmet-async 2.0.5** - Dynamic meta tag management
- **@vercel/analytics 1.0.0** - Web analytics
- **@vercel/speed-insights 1.2.0** - Performance monitoring

## Architecture

### Project Structure

```
MadreTierra2.0/
├── api/                          # Serverless API routes
│   ├── visit-notification.js     # Visitor tracking endpoint
│   ├── calendar-events.js        # Google Calendar API (available)
│   ├── contact.js                # Contact form API (available)
│   └── hello.js                  # Example API route
├── public/                       # Static assets
│   ├── favicon.avif
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/               # React components
│   │   ├── About.jsx
│   │   ├── AgeGate.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Featured.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Locations.jsx
│   │   ├── Navbar.jsx            # Adaptive navigation
│   │   ├── SEO.jsx               # SEO component
│   │   ├── Selection.jsx
│   │   ├── VisitorTracker.jsx   # Visit tracking component
│   │   └── WhereToBuy.jsx
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx
│   │   ├── SelectionPage.jsx
│   │   ├── LocationsPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── PrivateEventsPage.jsx
│   │   └── NotFoundPage.jsx     # 404 page
│   ├── GalleryImages/            # Gallery assets
│   ├── Locations/                # Location images
│   ├── MadreTierraSelection/     # Cigar product images
│   ├── NewSelection/             # Additional selection images
│   ├── logo/                     # Brand logo
│   ├── Paragraphs_scripts/       # Content text files
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── vercel.json                   # Vercel deployment config
└── vite.config.js                # Vite configuration
```

### Component Architecture

The application follows a component-based architecture:

- **Layout Components**: Navbar, Footer, AgeGate (app-level wrappers)
- **Page Components**: Individual route pages that compose section components
- **Section Components**: Reusable sections (Hero, About, Contact, etc.)
- **Utility Components**: SEO, VisitorTracker (cross-cutting concerns)

## API Routes

### Active Routes

1. **`/api/visit-notification`** (POST)
   - Tracks website visits
   - Sends email notifications to site owner
   - Collects visitor metadata (device, location, page visited)

### Available Routes (Ready for Integration)

1. **`/api/calendar-events`** (GET)
   - Fetches Google Calendar events
   - Can be integrated for dynamic event listings

2. **`/api/contact`** (POST)
   - Handles contact form submissions
   - Can replace EmailJS if needed

## Environment Variables

The project uses environment variables for configuration:

### Frontend (Vite)
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID for owner notifications
- `VITE_EMAILJS_VISITOR_TEMPLATE_ID` - EmailJS template ID for visitor confirmations (optional)

### Backend (Vercel)
- `OWNER_EMAIL` - Email address to receive visit notifications
- `RESEND_API_KEY` - Resend API key for email delivery
- `FROM_EMAIL` - Sender email address (must be verified domain or onboarding@resend.dev)
- `GOOGLE_CALENDAR_ID` - Google Calendar ID (optional, for calendar events API)
- `GOOGLE_API_KEY` - Google API key (optional, for calendar events API)

## Deployment

### Platform
- **Vercel** - Serverless hosting platform
- Automatic deployments from Git repository
- Serverless functions in `/api` directory

### Build Process
1. `npm run build` - Creates production build using Vite
2. Static assets are optimized and bundled
3. Serverless functions are deployed as API routes

### Configuration
- `vercel.json` handles redirects and rewrites
- SPA routing configured for React Router
- 301 redirects for legacy URLs

## Design Philosophy

The website follows an elegant, sophisticated design philosophy:

- **Premium Feel**: Dark backgrounds, gold accents, and refined typography
- **Accessibility**: Clear contrast ratios, readable fonts, semantic HTML
- **Performance**: Optimized images, lazy loading, efficient code splitting
- **Responsiveness**: Mobile-first approach with breakpoints for all devices
- **User Experience**: Smooth animations, intuitive navigation, clear call-to-actions

## Content Management

### Cigar Selection
- 10 unique Toro (6x52) blends
- Categorized by strength: Mild, Medium, Full
- Product images in `MadreTierraSelection/`
- Detailed descriptions for each blend

### Locations
- Authorized premium cigar retailers
- Location images in `Locations/` directory
- Interactive map integration capability

### Gallery
- Visual showcase of cigar imagery
- Lifestyle photography
- Video content support

### Private Events
- Google Calendar integration
- Event management through Google Calendar
- Real-time calendar display

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Future Enhancements

Potential features for future development:

- E-commerce integration for direct sales
- User accounts and authentication
- Newsletter subscription functionality
- Product reviews and ratings
- Advanced search functionality
- Multi-language support
- Blog/News section
- Event RSVP functionality

## Maintenance

### Regular Updates
- Content updates (events, locations, products)
- Image asset management
- SEO optimization
- Performance monitoring
- Security updates

### Monitoring
- Vercel Analytics for traffic insights
- Speed Insights for performance tracking
- Error tracking and logging
- Visitor notification system for engagement tracking

## License

© 2025 MadreTierra Cigars. All rights reserved.

---

**Last Updated**: January 2025
**Version**: 2.0
**Developer**: Built with React, Vite, and TailwindCSS


