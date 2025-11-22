import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'MadreTierra Cigars | Premium Handcrafted Cigars',
  description = 'Discover MadreTierra Cigars - premium handcrafted cigars made with excellence. Experience the finest selection of cigars, from Connecticut to full-bodied options. Visit our authorized retailers or host a private tasting event.',
  keywords = 'cigars, premium cigars, handcrafted cigars, cigar selection, cigar retailers, cigar tastings, Connecticut cigars, full-bodied cigars, cigar lounge, cigar brands',
  image = '/favicon.avif',
  url = '',
  type = 'website',
  siteName = 'MadreTierra Cigars',
  locale = 'en_US',
  structuredData = null,
}) => {
  const siteUrl = 'https://your-domain.vercel.app' // Update this with your actual domain
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MadreTierra Cigars',
    description: 'Premium handcrafted cigars made with excellence',
    url: siteUrl,
    logo: `${siteUrl}/favicon.avif`,
    sameAs: [
      // Add your social media links here when available
      // 'https://www.facebook.com/madretierra',
      // 'https://www.instagram.com/madretierra',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      // Add your contact information
    },
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MadreTierra Cigars" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#014421" />
      <meta name="msapplication-TileColor" content="#014421" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(defaultStructuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO

