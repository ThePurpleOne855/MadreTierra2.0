import { useState } from 'react'

const LocationCard = ({ name, location, image }) => {
  return (
    <div className="group relative bg-light rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
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
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-dark/70 text-sm leading-relaxed">
          {location}
        </p>
      </div>
    </div>
  )
}

const LocationsGrid = ({ locations, states }) => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
          <LocationCard key={index} name={location.name} location={location.location} image={location.image} />
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
    </>
  )
}

export default LocationsGrid
