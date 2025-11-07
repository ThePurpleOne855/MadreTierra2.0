import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CigarLightbox = ({ cigar, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !cigar) return null

  const EvaluationSection = ({ title, items }) => (
    <div className="mb-6">
      <h4 className="text-lg font-serif font-bold text-secondary mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="text-secondary mt-1">•</span>
            <span className="text-light/90 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-light rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-dark/80 hover:bg-dark text-light rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-96 md:h-auto bg-gradient-to-br from-primary to-tertiary">
            <img
              src={cigar.image}
              alt={cigar.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-light mb-2">
                {cigar.name}
              </h2>
              <div className="flex items-center gap-4 text-light/90">
                <span className="text-sm">Size: <span className="font-semibold">{cigar.size}</span></span>
                <span className="text-sm">Strength: <span className="font-semibold">{cigar.strength}</span></span>
              </div>
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="p-8 bg-dark text-light">
            <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Evaluation</h3>
            
            <div className="space-y-6">
              {cigar.evaluation?.appearance && (
                <EvaluationSection
                  title="Appearance"
                  items={cigar.evaluation.appearance}
                />
              )}
              
              {cigar.evaluation?.construction && (
                <EvaluationSection
                  title="Construction"
                  items={cigar.evaluation.construction}
                />
              )}
              
              {cigar.evaluation?.draw && (
                <EvaluationSection
                  title="Draw"
                  items={cigar.evaluation.draw}
                />
              )}
              
              {cigar.evaluation?.flavorAroma && (
                <EvaluationSection
                  title="Flavor & Aroma"
                  items={cigar.evaluation.flavorAroma}
                />
              )}
              
              {cigar.evaluation?.smokingExperience && (
                <EvaluationSection
                  title="Smoking Experience"
                  items={cigar.evaluation.smokingExperience}
                />
              )}
              
              {cigar.evaluation?.ashOverall && (
                <EvaluationSection
                  title="Ash & Overall"
                  items={cigar.evaluation.ashOverall}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CigarCard = ({ name, image, strength, size, onClick }) => {
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
      onClick={onClick}
      className={`group relative bg-light rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
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
        <div className="mt-4 text-sm text-secondary font-semibold">
          Click to view details →
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const SelectionPage = () => {
  const cigars = [
    {
      name: 'Broadleaf Toro',
      image: new URL('../MadreTierraSelection/broadleaf toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
      evaluation: {
        appearance: [
          'Rich, dark chocolate brown wrapper with oily sheen',
          'Smooth, even texture with minimal veins',
          'Premium quality wrapper with consistent color throughout'
        ],
        construction: [
          'Firm, well-packed with no soft spots',
          'Even roll with consistent density',
          'Properly applied triple cap'
        ],
        draw: [
          'Excellent draw with perfect resistance',
          'Even burn line throughout',
          'No touch-ups required'
        ],
        flavorAroma: [
          'Rich notes of dark chocolate and espresso',
          'Hints of black pepper and leather',
          'Complex flavor profile that evolves beautifully',
          'Aromatic cedar and earth notes'
        ],
        smokingExperience: [
          'Consistent strength from start to finish',
          'Full-bodied with rich, bold character',
          'Smooth, long finish with lingering complexity'
        ],
        ashOverall: [
          'Firm, white ash that holds well',
          'Excellent overall balance and construction',
          'Premium quality throughout the entire smoke'
        ]
      }
    },
    {
      name: 'Cameroon Toro',
      image: new URL('../MadreTierraSelection/Cameroon toro 6x52 mild-med.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild-Medium',
      evaluation: {
        appearance: [
          'Light brown wrapper with golden highlights',
          'Smooth, silky texture',
          'Elegant appearance with fine veins'
        ],
        construction: [
          'Firm construction with consistent pack',
          'Even roll throughout',
          'Well-crafted cap'
        ],
        draw: [
          'Smooth, effortless draw',
          'Even burn with minimal corrections',
          'Consistent burn rate'
        ],
        flavorAroma: [
          'Delicate notes of cedar and cream',
          'Subtle spice with hints of nutmeg',
          'Sweet, creamy finish',
          'Aromatic with pleasant, mild scent'
        ],
        smokingExperience: [
          'Balanced mild-medium strength',
          'Smooth, approachable body',
          'Clean, pleasant finish'
        ],
        ashOverall: [
          'Light gray, firm ash',
          'Well-balanced overall experience',
          'Quality construction throughout'
        ]
      }
    },
    {
      name: 'Candela Toro',
      image: new URL('../MadreTierraSelection/candela toro 6x52.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
      evaluation: {
        appearance: [
          'Unique bright green wrapper',
          'Smooth, glossy texture',
          'Distinctive appearance with vibrant color'
        ],
        construction: [
          'Firm, well-constructed',
          'Even roll with proper density',
          'Clean cap application'
        ],
        draw: [
          'Easy, open draw',
          'Even burn line',
          'Consistent smoking experience'
        ],
        flavorAroma: [
          'Grassy, herbal notes',
          'Light, fresh flavor profile',
          'Subtle sweetness',
          'Clean, mild aroma'
        ],
        smokingExperience: [
          'Very mild strength',
          'Light, refreshing body',
          'Smooth, clean finish'
        ],
        ashOverall: [
          'Light, firm ash',
          'Unique and enjoyable overall experience',
          'Well-crafted mild cigar'
        ]
      }
    },
    {
      name: 'Connecticut Toro',
      image: new URL('../MadreTierraSelection/Connecticut toro 6x52 mild.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
      evaluation: {
        appearance: [
          'Light golden brown wrapper',
          'Smooth, silky texture',
          'Classic Connecticut shade appearance'
        ],
        construction: [
          'Firm, consistent construction',
          'Even roll throughout',
          'Professional cap work'
        ],
        draw: [
          'Perfect draw resistance',
          'Even, steady burn',
          'No issues with combustion'
        ],
        flavorAroma: [
          'Creamy, buttery notes',
          'Hints of vanilla and almond',
          'Smooth, mild flavor',
          'Pleasant, light aroma'
        ],
        smokingExperience: [
          'Mild, approachable strength',
          'Smooth, creamy body',
          'Clean, pleasant finish'
        ],
        ashOverall: [
          'Light, firm ash',
          'Excellent balance for mild cigar',
          'Quality construction throughout'
        ]
      }
    },
    {
      name: 'Corojo Toro',
      image: new URL('../MadreTierraSelection/corojo toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
      evaluation: {
        appearance: [
          'Dark, rich brown wrapper',
          'Oily, toothy texture',
          'Premium appearance with character'
        ],
        construction: [
          'Very firm, densely packed',
          'Excellent roll quality',
          'Perfect cap application'
        ],
        draw: [
          'Full-bodied draw with good resistance',
          'Even burn throughout',
          'Consistent smoking experience'
        ],
        flavorAroma: [
          'Bold notes of black pepper and spice',
          'Rich earth and leather',
          'Complex, evolving flavors',
          'Strong, aromatic presence'
        ],
        smokingExperience: [
          'Full strength from beginning to end',
          'Rich, full-bodied character',
          'Long, complex finish'
        ],
        ashOverall: [
          'Dense, firm ash',
          'Excellent overall quality',
          'Premium full-bodied experience'
        ]
      }
    },
    {
      name: 'Habano Toro',
      image: new URL('../MadreTierraSelection/Habano Toro 6x52 medium.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Medium',
      evaluation: {
        appearance: [
          'Medium brown wrapper with reddish tint',
          'Smooth texture with slight tooth',
          'Attractive, balanced appearance'
        ],
        construction: [
          'Firm, well-constructed',
          'Even roll with good density',
          'Professional cap work'
        ],
        draw: [
          'Ideal draw resistance',
          'Even burn line',
          'Consistent throughout'
        ],
        flavorAroma: [
          'Spicy notes with cedar and coffee',
          'Balanced sweetness',
          'Medium complexity',
          'Aromatic with pleasant spice'
        ],
        smokingExperience: [
          'Medium strength, well-balanced',
          'Smooth, medium body',
          'Satisfying finish'
        ],
        ashOverall: [
          'Firm, gray-white ash',
          'Well-balanced overall experience',
          'Quality medium-bodied cigar'
        ]
      }
    },
    {
      name: 'La Fuma Ricardo',
      image: new URL('../MadreTierraSelection/la fuma ricardo budget cigar 6x50 mild-medium.avif', import.meta.url).href,
      size: '6x50',
      strength: 'Mild-Medium',
      evaluation: {
        appearance: [
          'Medium brown wrapper',
          'Smooth texture',
          'Clean, consistent appearance'
        ],
        construction: [
          'Good construction for value',
          'Even roll',
          'Proper cap'
        ],
        draw: [
          'Easy draw',
          'Even burn',
          'Consistent smoking'
        ],
        flavorAroma: [
          'Mild, approachable flavors',
          'Notes of wood and light spice',
          'Balanced profile',
          'Pleasant, mild aroma'
        ],
        smokingExperience: [
          'Mild-medium strength',
          'Smooth, approachable body',
          'Clean finish'
        ],
        ashOverall: [
          'Good ash retention',
          'Solid value proposition',
          'Well-made budget option'
        ]
      }
    },
    {
      name: 'Rosado Toro',
      image: new URL('../MadreTierraSelection/rosado toro 6x52 mild.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Mild',
      evaluation: {
        appearance: [
          'Rosado wrapper with reddish-brown hue',
          'Smooth, elegant texture',
          'Beautiful, refined appearance'
        ],
        construction: [
          'Firm, well-constructed',
          'Even roll throughout',
          'Excellent cap work'
        ],
        draw: [
          'Smooth, effortless draw',
          'Even burn line',
          'Perfect combustion'
        ],
        flavorAroma: [
          'Delicate notes of cream and nuts',
          'Subtle spice and sweetness',
          'Smooth, mild flavor',
          'Elegant, refined aroma'
        ],
        smokingExperience: [
          'Mild, smooth strength',
          'Light, creamy body',
          'Clean, elegant finish'
        ],
        ashOverall: [
          'Firm, light ash',
          'Excellent balance',
          'Premium mild cigar experience'
        ]
      }
    },
    {
      name: 'San Andres Toro',
      image: new URL('../MadreTierraSelection/san andres toro 6x52 full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Full',
      evaluation: {
        appearance: [
          'Dark, almost black wrapper',
          'Oily, rich texture',
          'Striking, bold appearance'
        ],
        construction: [
          'Very firm, densely packed',
          'Excellent roll quality',
          'Perfect construction'
        ],
        draw: [
          'Full-bodied draw',
          'Even, steady burn',
          'Consistent throughout'
        ],
        flavorAroma: [
          'Bold notes of dark chocolate and espresso',
          'Rich earth and spice',
          'Intense, complex flavors',
          'Strong, aromatic presence'
        ],
        smokingExperience: [
          'Full strength throughout',
          'Rich, bold body',
          'Long, intense finish'
        ],
        ashOverall: [
          'Dense, firm ash',
          'Excellent overall quality',
          'Premium full-bodied experience'
        ]
      }
    },
    {
      name: 'Sumatra Toro',
      image: new URL('../MadreTierraSelection/sumatra toro 6x52 med-full.avif', import.meta.url).href,
      size: '6x52',
      strength: 'Medium-Full',
      evaluation: {
        appearance: [
          'Dark brown wrapper with slight oil',
          'Smooth texture with fine veins',
          'Attractive, premium appearance'
        ],
        construction: [
          'Firm, well-constructed',
          'Even roll with good density',
          'Professional cap application'
        ],
        draw: [
          'Good draw resistance',
          'Even burn line',
          'Consistent smoking experience'
        ],
        flavorAroma: [
          'Complex notes of coffee and cocoa',
          'Spice with hints of leather',
          'Evolving flavor profile',
          'Rich, aromatic presence'
        ],
        smokingExperience: [
          'Medium-full strength',
          'Rich, full-bodied character',
          'Complex, satisfying finish'
        ],
        ashOverall: [
          'Firm, dense ash',
          'Excellent overall balance',
          'Quality medium-full experience'
        ]
      }
    },
  ]

  const [filter, setFilter] = useState('all')
  const [selectedCigar, setSelectedCigar] = useState(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

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

  const handleCigarClick = (cigar) => {
    setSelectedCigar(cigar)
    setIsLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedCigar(null)
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <section className="py-24 bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              Our Selection
            </h1>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto leading-relaxed mb-4">
              Madre Tierra currently produces 10 unique Toro (6x52) blends: Connecticut, Rosado, Habano, San Andrés, Candela, La Fuma, Pennsylvania Broadleaf, Cameroon, Sumatra, and Corojo.
            </p>
            <p className="text-lg text-dark/60 max-w-2xl mx-auto leading-relaxed">
              Each cigar offers a distinct and memorable flavor profile, yet remains more approachable than many other cigars from the region, making it enjoyable for both seasoned aficionados and newcomers alike.
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
                onClick={() => handleCigarClick(cigar)}
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
                href="/#where-to-buy"
                className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
              >
                Find a Retailer
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lightbox Modal */}
      <CigarLightbox
        cigar={selectedCigar}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
      
      <Footer />
    </div>
  )
}

export default SelectionPage
