import { useEffect, useRef, useState } from 'react'

const CigarCard = ({ name, image, strength, size }) => {
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

  const getStrengthColor = (strength) => {
    if (strength.toLowerCase().includes('mild')) return 'text-green-400'
    if (strength.toLowerCase().includes('medium') || strength.toLowerCase().includes('med')) return 'text-secondary'
    if (strength.toLowerCase().includes('full')) return 'text-red-400'
    return 'text-secondary'
  }

  const getStrengthBadge = (strength) => {
    if (strength.toLowerCase().includes('mild')) return 'bg-green-500/20 text-green-300 border-green-500/30'
    if (strength.toLowerCase().includes('medium') || strength.toLowerCase().includes('med')) return 'bg-secondary/20 text-secondary border-secondary/30'
    if (strength.toLowerCase().includes('full')) return 'bg-red-500/20 text-red-300 border-red-500/30'
    return 'bg-secondary/20 text-secondary border-secondary/30'
  }

  return (
    <div
      ref={cardRef}
      className={`group relative bg-light rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-80 bg-gradient-to-br from-primary to-tertiary overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary/80 to-tertiary/80">
          <div className="text-center">
            <div className="text-6xl mb-4">🚬</div>
            <p className="text-light font-serif text-xl">{name}</p>
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Strength Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${getStrengthBadge(strength)}`}>
          {strength}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-dark/70 text-sm">Size:</span>
            <span className="text-dark font-semibold">{size}</span>
          </div>
          <div className={`text-sm font-semibold ${getStrengthColor(strength)}`}>
            {strength}
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const Selection = () => {
  const cigars = [
    {
      name: 'Broadleaf Toro',
      image: new URL('../MadreTierraSelection/broadleaf toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
    },
    {
      name: 'Cameroon Toro',
      image: new URL('../MadreTierraSelection/Cameroon toro 6x52 mild-med.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild-Medium',
    },
    {
      name: 'Candela Toro',
      image: new URL('../MadreTierraSelection/candela toro 6x52.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
    },
    {
      name: 'Connecticut Toro',
      image: new URL('../MadreTierraSelection/Connecticut toro 6x52 mild.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
    },
    {
      name: 'Corojo Toro',
      image: new URL('../MadreTierraSelection/corojo toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
    },
    {
      name: 'Habano Toro',
      image: new URL('../MadreTierraSelection/Habano Toro 6x52 medium.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Medium',
    },
    {
      name: 'La Fuma Ricardo',
      image: new URL('../MadreTierraSelection/la fuma ricardo budget cigar 6x50 mild-medium.avif', import.meta.url).href,
      size: '6x50',
      strength: 'Mild-Medium',
    },
    {
      name: 'Rosado Toro',
      image: new URL('../MadreTierraSelection/rosado toro 6x52 mild.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
    },
    {
      name: 'San Andres Toro',
      image: new URL('../MadreTierraSelection/san andres toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
    },
    {
      name: 'Sumatra Toro',
      image: new URL('../MadreTierraSelection/sumatra toro 6x52 med-full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Medium-Full',
    },
  ]

  const [filter, setFilter] = useState('all')

  const filteredCigars = filter === 'all' 
    ? cigars 
    : cigars.filter(cigar => {
        const strength = cigar.strength.toLowerCase()
        if (filter === 'mild') return strength.includes('mild')
        if (filter === 'medium') return strength.includes('medium') || strength.includes('med')
        if (filter === 'full') return strength.includes('full')
        return true
      })

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Mild', value: 'mild' },
    { label: 'Medium', value: 'medium' },
    { label: 'Full', value: 'full' },
  ]

  return (
    <section id="selection" className="py-24 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Our Selection
          </h1>
          <p className="text-xl text-dark/70 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of premium handcrafted cigars, each one a testament to our commitment to excellence.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-6 py-3 rounded-sm font-semibold tracking-wider uppercase text-sm transition-all duration-300 ${
                filter === filterOption.value
                  ? 'bg-secondary text-dark shadow-lg'
                  : 'bg-dark/5 text-dark hover:bg-dark/10 border-2 border-transparent hover:border-secondary/30'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Cigars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCigars.map((cigar, index) => (
            <CigarCard
              key={index}
              name={cigar.name}
              image={cigar.image}
              size={cigar.size}
              strength={cigar.strength}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCigars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-dark/70">No cigars found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-primary to-dark rounded-lg p-12 text-light">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Each cigar in our selection is carefully crafted to deliver an exceptional smoking experience.
            </p>
            <a
              href="#where-to-buy"
              className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
            >
              Find a Retailer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Selection

