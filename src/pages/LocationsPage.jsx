import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LocationCard = ({ name, location, image, index }) => {
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
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-primary to-tertiary overflow-hidden">
        <img
          src={image}
          alt={`${name} - ${location}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary/80 to-tertiary/80">
          <div className="text-center p-4">
            <div className="text-5xl mb-2">📍</div>
            <p className="text-light font-serif text-lg">{name}</p>
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-dark/70 text-sm leading-relaxed">
          {location}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const LocationsPage = () => {
  // Parse filename to extract store name and location
  const parseLocationInfo = (filename) => {
    // Remove .avif extension
    const nameWithoutExt = filename.replace('.avif', '')
    
    // Check if filename contains " - " separator
    if (nameWithoutExt.includes(' - ')) {
      const parts = nameWithoutExt.split(' - ')
      return {
        name: parts[0].trim(),
        location: parts[1].trim()
      }
    }
    
    // If no separator, check if it starts with an address pattern (numbers)
    if (/^\d/.test(nameWithoutExt)) {
      // It's an address without a store name
      return {
        name: 'Retail Location',
        location: nameWithoutExt.trim()
      }
    }
    
    // Default: use entire filename as location
    return {
      name: nameWithoutExt.trim(),
      location: ''
    }
  }

  const locationFiles = [
    '11724 N 56th st, tampa, FL 33617.avif',
    '15 spit brook rd, nashua, NH 03060.avif',
    '317 S Washington Ave Titusville, FL 32796.avif',
    'Ash cigar lounge - 92 NH-125, Kingston, NH 03848.avif',
    "Castro's back room - 132 Bedford center rd ste b, bedford, NH 03110.avif",
    "Castro's Back Room - 972 Elm St, manchester, NH 03101.avif",
    'CigarBox - 5636 Hansel Ave, Pine Castle, FL 32809.avif',
    'F & M cigars - 503 14th st, phenix city, AL 36867.avif',
    'george & dragon english taver - 502 Brevard Ave Cocoa, FL 32922 United States.avif',
    "Grumpy's cigars and lounge - 29 Lowell Rd Hudson, NH 03051.avif",
    "Nicky Blaine's cocktail - 20 N meridian st, indianapolis, IN 46204.avif",
    'PBR miami country bar.avif',
    'Smoke rings 72 cigar & pipe - 925 N Courtenay Pkwy Merritt Island, FL 32953.avif',
    'The Cigar Quarters - 344 E Main St, Haines City, FL 33844.avif',
    'The office cigars Lounge - 36 S Atlantic ave cocoa Beach, FL 32831.avif',
    'Tobacco shack - 162 Newburyport Turnpike, Rowley, MA 01969.avif',
    'two guys smoke shop - 741 lafayette rd, seabrook, NH 03874.avif',
    'two guys smoke shop 304 S. broadway, salem, NH 03079.avif',
  ]

  const locations = locationFiles.map((file, index) => {
    const info = parseLocationInfo(file)
    // Use a simpler path approach that works with Vite
    const imagePath = `/src/Locations/${file}`
    return {
      ...info,
      image: imagePath,
      filename: file
    }
  })

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Group locations by state for filtering
  const getStateFromLocation = (location) => {
    const stateMatch = location.match(/\b([A-Z]{2})\s+\d{5}\b/)
    return stateMatch ? stateMatch[1] : null
  }

  const states = [...new Set(locations.map(loc => getStateFromLocation(loc.location)).filter(Boolean))].sort()

  const filteredLocations = locations.filter(location => {
    const matchesFilter = filter === 'all' || getStateFromLocation(location.location) === filter
    const matchesSearch = searchTerm === '' || 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <section className="py-24 bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              Retail Locations
            </h1>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto leading-relaxed">
              Find MadreTierra Cigars at authorized retailers near you. Visit these premium locations to experience our handcrafted excellence.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by store name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white border-2 border-primary/20 rounded-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-dark placeholder-dark/50 transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-sm font-semibold tracking-wider uppercase text-sm transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-secondary text-dark shadow-lg'
                    : 'bg-dark/5 text-dark hover:bg-dark/10 border-2 border-transparent hover:border-secondary/30'
                }`}
              >
                All Locations
              </button>
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setFilter(state)}
                  className={`px-6 py-3 rounded-sm font-semibold tracking-wider uppercase text-sm transition-all duration-300 ${
                    filter === state
                      ? 'bg-secondary text-dark shadow-lg'
                      : 'bg-dark/5 text-dark hover:bg-dark/10 border-2 border-transparent hover:border-secondary/30'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredLocations.map((location, index) => (
              <LocationCard
                key={index}
                name={location.name}
                location={location.location}
                image={location.image}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredLocations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-dark/70 mb-4">No locations found matching your search.</p>
              <button
                onClick={() => {
                  setFilter('all')
                  setSearchTerm('')
                }}
                className="text-secondary hover:text-tertiary font-semibold transition-colors duration-300"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary to-dark rounded-lg p-12 text-light">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Can't Find a Location?
              </h2>
              <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                Contact us to learn more about becoming an authorized retailer or finding locations near you.
              </p>
              <a
                href="/#about"
                className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default LocationsPage

