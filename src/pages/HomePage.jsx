import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import About from '../components/About'
import WhereToBuy from '../components/WhereToBuy'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    // Handle hash scrolling when navigating to home page with hash
    if (location.hash) {
      setTimeout(() => {
        const target = document.querySelector(location.hash)
        if (target) {
          const offsetTop = target.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location])

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@type': 'Organization',
    name: 'MadreTierra Cigars',
    description: 'Premium handcrafted cigars made with excellence. Experience the finest selection of cigars, from Connecticut to full-bodied options.',
    url: 'https://your-domain.vercel.app',
    logo: 'https://your-domain.vercel.app/favicon.avif',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://your-domain.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className="App">
      <SEO
        title="MadreTierra Cigars | Premium Handcrafted Cigars"
        description="Discover MadreTierra Cigars - premium handcrafted cigars made with excellence. Experience the finest selection of cigars, from Connecticut to full-bodied options. Visit our authorized retailers or host a private tasting event."
        keywords="cigars, premium cigars, handcrafted cigars, cigar selection, Connecticut cigars, full-bodied cigars, cigar retailers, cigar tastings, premium tobacco"
        url="/"
        structuredData={structuredData}
      />
      <Navbar />
      <Hero />
      <Featured />
      <About />
      <WhereToBuy />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage

