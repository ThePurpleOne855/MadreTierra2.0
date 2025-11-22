import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <SEO
        title="Page Not Found | MadreTierra Cigars"
        description="The page you're looking for doesn't exist. Explore our premium cigar selection, find retailers, or browse our gallery."
        url="/404"
        robots="noindex, follow"
      />
      <Navbar />
      <section className="py-24 bg-dark min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-secondary mb-4">
              404
            </h1>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-light mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Our website has been redesigned, so some old links may no longer work.
            </p>
          </div>

          <div className="bg-light/5 border border-secondary/20 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-serif font-bold text-secondary mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/"
                className="p-4 bg-light/10 hover:bg-light/20 border border-secondary/20 hover:border-secondary rounded transition-all duration-300 text-light"
              >
                <div className="font-serif font-bold text-secondary mb-2">Home</div>
                <div className="text-sm text-light/80">Return to homepage</div>
              </Link>
              <Link
                to="/selection"
                className="p-4 bg-light/10 hover:bg-light/20 border border-secondary/20 hover:border-secondary rounded transition-all duration-300 text-light"
              >
                <div className="font-serif font-bold text-secondary mb-2">Cigar Selection</div>
                <div className="text-sm text-light/80">Browse our premium cigars</div>
              </Link>
              <Link
                to="/locations"
                className="p-4 bg-light/10 hover:bg-light/20 border border-secondary/20 hover:border-secondary rounded transition-all duration-300 text-light"
              >
                <div className="font-serif font-bold text-secondary mb-2">Find a Retailer</div>
                <div className="text-sm text-light/80">Locate authorized retailers</div>
              </Link>
              <Link
                to="/gallery"
                className="p-4 bg-light/10 hover:bg-light/20 border border-secondary/20 hover:border-secondary rounded transition-all duration-300 text-light"
              >
                <div className="font-serif font-bold text-secondary mb-2">Gallery</div>
                <div className="text-sm text-light/80">View our cigar gallery</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
            >
              Go to Homepage
            </Link>
            <Link
              to="/selection"
              className="inline-block px-10 py-4 bg-primary text-light font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-secondary hover:text-dark hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Cigar Selection
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default NotFoundPage

