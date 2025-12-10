import { useEffect, useRef, useState } from 'react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import joseSantanaImg from '../EndorsementPicture/JoseSantanaWebDesign.png'

const EndorsementCard = ({ image, title, description, link, index }) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative bg-light rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-72 md:h-80 bg-gradient-to-br from-primary to-tertiary overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/80 to-tertiary/80">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-light/70 text-sm font-serif">Image Placeholder</p>
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-dark/70 text-base leading-relaxed mb-6">
          {description}
        </p>
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 border-2 border-secondary text-secondary font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-secondary hover:text-dark hover:-translate-y-0.5"
        >
          Learn More
        </a>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const EndorsementsPage = () => {
  // Endorsement data - add more endorsed products/services as needed
  const endorsements = [
    {
      image: joseSantanaImg,
      title: 'Jose Santana Web Design',
      description: 'Professional web design services crafting modern, responsive websites that elevate your brand and drive results.',
      link: 'https://josesantana.dev/',
    },
  ]

  return (
    <div className="min-h-screen bg-light">
      <SEO
        title="Endorsements | MadreTierra Cigars"
        description="Discover our curated selection of endorsed products and services. MadreTierra Cigars proudly partners with brands that share our commitment to quality and excellence."
        keywords="endorsements, partnerships, premium products, quality brands, cigar accessories, recommended products"
        url="/endorsements"
      />
      <Navbar />
      
      <section className="pt-40 pb-24 bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              Our Endorsements
            </h1>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto leading-relaxed mb-4">
              Carefully selected products and services that complement the MadreTierra experience.
            </p>
            <p className="text-lg text-dark/60 max-w-2xl mx-auto leading-relaxed">
              We only endorse brands that meet our high standards of quality, craftsmanship, and excellence.
            </p>
          </div>

          {/* Endorsements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {endorsements.map((endorsement, index) => (
              <EndorsementCard
                key={index}
                image={endorsement.image}
                title={endorsement.title}
                description={endorsement.description}
                link={endorsement.link}
                index={index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary to-dark rounded-lg p-12 text-light relative overflow-hidden">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid2' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(212,175,55,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid2)'/%3E%3C/svg%3E")`
              }}></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Partner With Us
                </h2>
                <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                  Interested in becoming an endorsed partner? We're always looking for quality brands that align with our values.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default EndorsementsPage

