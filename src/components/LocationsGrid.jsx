import { useState } from 'react'

const formatPhone = (phone) => {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (digits.length !== 10) return phone
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const getWebsiteLabel = (website) => {
  try {
    return new URL(website).hostname.replace(/^www\./, '')
  } catch {
    return website
  }
}

const LeaveSiteConfirm = ({ location, onCancel, onConfirm }) => {
  if (!location) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative max-w-md w-full bg-light rounded-2xl shadow-2xl p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-serif font-bold text-primary mb-3">
          Leaving MadreTierra Cigars
        </h3>
        <p className="text-dark/70 mb-2">
          You're about to visit <span className="font-semibold text-dark">{location.name}</span>'s website:
        </p>
        <p className="text-secondary font-semibold mb-6 break-words">
          {getWebsiteLabel(location.website)}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onCancel} className="btn bg-dark/10 text-dark hover:bg-dark/20">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-solid">
            Continue to site
          </button>
        </div>
      </div>
    </div>
  )
}

const LocationCard = ({ name, location, image, phone, website, onVisitWebsite }) => {
  const displayPhone = formatPhone(phone)
  const ImageWrapper = website ? 'button' : 'div'

  return (
    <div className="group relative bg-light rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <ImageWrapper
        type={website ? 'button' : undefined}
        className={`relative w-full h-64 block bg-gradient-to-br from-primary to-tertiary overflow-hidden text-left ${website ? 'cursor-pointer' : ''}`}
        onClick={website ? onVisitWebsite : undefined}
        aria-label={website ? `Visit ${name}'s website` : undefined}
      >
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
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {website && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 bg-dark/80 text-light text-sm font-semibold rounded-full">
              Visit website
            </span>
          </div>
        )}
      </ImageWrapper>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-dark/70 text-sm leading-relaxed">
          {location}
        </p>
        {displayPhone && (
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="inline-block mt-2 text-secondary hover:text-tertiary font-semibold text-sm transition-colors duration-300"
          >
            {displayPhone}
          </a>
        )}
      </div>
    </div>
  )
}

const LocationsGrid = ({ locations, states }) => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [pendingLocation, setPendingLocation] = useState(null)

  const getStateFromLocation = (location) => {
    const stateMatch = location.match(/\b([A-Z]{2})\s+\d{5}\b/)
    return stateMatch ? stateMatch[1] : null
  }

  const filteredLocations = locations.filter((location) => {
    const matchesFilter = filter === 'all' || getStateFromLocation(location.location) === filter
    const matchesSearch =
      searchTerm === '' ||
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleConfirmVisit = () => {
    if (pendingLocation) {
      window.open(pendingLocation.website, '_blank', 'noopener,noreferrer')
    }
    setPendingLocation(null)
  }

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-12 space-y-6">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by store name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-primary/20 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-dark placeholder-dark/50 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              filter === 'all'
                ? 'bg-secondary text-dark shadow-lg'
                : 'bg-dark/5 text-dark hover:bg-dark/10 border border-transparent hover:border-secondary/30'
            }`}
          >
            All Locations
          </button>
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setFilter(state)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === state
                  ? 'bg-secondary text-dark shadow-lg'
                  : 'bg-dark/5 text-dark hover:bg-dark/10 border border-transparent hover:border-secondary/30'
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
            phone={location.phone}
            website={location.website}
            onVisitWebsite={() => setPendingLocation(location)}
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

      <LeaveSiteConfirm
        location={pendingLocation}
        onCancel={() => setPendingLocation(null)}
        onConfirm={handleConfirmVisit}
      />
    </>
  )
}

export default LocationsGrid
