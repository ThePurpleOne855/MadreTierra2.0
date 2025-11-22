import { useEffect, useRef, useState } from 'react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Import all gallery images using Vite's glob import
const galleryImagesGlob = import.meta.glob('../GalleryImages/*.{jpg,jpeg,png,avif}', { eager: true, as: 'url' })
// Import all videos/audio files from GalleryImages folder
const galleryVideosGlob = import.meta.glob('../GalleryImages/*.{mp3,mp4,webm,ogg}', { eager: true, as: 'url' })

const MediaLightbox = ({ media, isOpen, onClose, mediaName, type, isAudio }) => {
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Auto-play video when lightbox opens
      if (type === 'video' && !isAudio && videoRef.current) {
        videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err))
      } else if (type === 'video' && isAudio && audioRef.current) {
        // Don't auto-play audio, let user control it
        audioRef.current.load()
      }
    } else {
      document.body.style.overflow = 'unset'
      // Pause video/audio when lightbox closes
      if (type === 'video' && !isAudio && videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      } else if (type === 'video' && isAudio && audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, type, isAudio])

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

  if (!isOpen || !media) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-dark/80 hover:bg-dark text-light rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          <span className="text-3xl">×</span>
        </button>

        {/* Media Content */}
        {type === 'video' ? (
          isAudio ? (
            <div className="max-w-2xl w-full bg-dark/90 rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-6">
                <svg className="w-24 h-24 text-light/80 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                {mediaName && <p className="text-xl text-light font-serif font-semibold">{mediaName}</p>}
              </div>
              <audio
                ref={audioRef}
                src={media}
                controls
                className="w-full"
                autoPlay
              >
                Your browser does not support the audio tag.
              </audio>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={media}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <img
            src={media}
            alt={mediaName}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        )}

        {/* Media Name */}
        {mediaName && type !== 'video' && !isAudio && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/80 text-light px-6 py-3 rounded-full">
            <p className="text-lg font-serif font-semibold">{mediaName}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const GalleryItem = ({ media, name, type, index, onClick, isLoaded, isAudio }) => {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Lazy load videos when they come into view
            if (type === 'video') {
              setShouldLoadVideo(true)
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '200px' } // Start loading 200px before visible
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [type])

  // Handle video load and pause when not visible
  useEffect(() => {
    if (videoRef.current && shouldLoadVideo && !isAudio) {
      // Preload video metadata but don't auto-play
      videoRef.current.load()
    }
    if (audioRef.current && shouldLoadVideo && isAudio) {
      // Preload audio metadata
      audioRef.current.load()
    }
  }, [shouldLoadVideo, isAudio])

  if (!isLoaded) return null

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`group relative bg-light rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer aspect-square ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Media Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-primary to-tertiary overflow-hidden">
        {type === 'video' ? (
          shouldLoadVideo ? (
            <div className="w-full h-full relative">
              {isAudio ? (
                // Audio file (MP3) - show audio player with visual
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-tertiary">
                  <div className="mb-4">
                    <svg className="w-24 h-24 text-light/80 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <audio
                    ref={audioRef}
                    src={media}
                    className="w-full max-w-xs"
                    controls
                    preload="metadata"
                    loop
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ) : (
                // Video file - use video element
                <video
                  ref={videoRef}
                  src={media}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  muted
                  playsInline
                  preload="metadata"
                  loop
                />
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/50 to-tertiary/50 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-light/50 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <p className="text-light/50 text-sm font-semibold">Loading...</p>
              </div>
            </div>
          )
        ) : (
          <>
            <img
              src={media}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary/80 to-tertiary/80">
              <div className="text-center">
                <div className="text-6xl mb-4">🖼️</div>
              </div>
            </div>
          </>
        )}
        
        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* View Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-dark/90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
            {type === 'video' ? (
              <svg className="w-10 h-10 text-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-10 h-10 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/50 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [loadedItems, setLoadedItems] = useState(10) // Load 10 items at a time
  const [allGalleryItems, setAllGalleryItems] = useState([])
  const loadMoreRef = useRef(null)
  const ITEMS_PER_PAGE = 10

  // Combine and process all gallery items
  useEffect(() => {
    const items = []
    
    // Process images from GalleryImages folder
    Object.keys(galleryImagesGlob).forEach((path) => {
      const filename = path.split('/').pop()
      const name = filename.replace(/\.(jpg|jpeg|png|avif)$/i, '')
      items.push({
        id: `img-${filename}`,
        media: galleryImagesGlob[path],
        name: name,
        type: 'image',
        category: 'gallery'
      })
    })
    
    // Process videos/audio files (mp3, mp4, etc.) from GalleryImages folder
    Object.keys(galleryVideosGlob).forEach((path) => {
      const filename = path.split('/').pop()
      // Detect if it's an audio file (mp3, ogg, wav) or video file (mp4, webm)
      const isAudio = /\.(mp3|ogg|wav)$/i.test(filename)
      // Remove file extension and clean up name
      const name = filename.replace(/\.(mp3|mp4|webm|ogg|wav)$/i, '').replace(/VIDEO-?/i, '').trim()
      items.push({
        id: `media-${filename}`,
        media: galleryVideosGlob[path],
        name: name || filename,
        type: 'video', // Keep as 'video' type for UI/filtering, but handle audio differently in rendering
        isAudio: isAudio,
        category: 'gallery'
      })
    })
    
    // Sort items by name/number for better organization
    items.sort((a, b) => {
      const numA = parseInt(a.name.match(/\d+/)?.[0] || '0')
      const numB = parseInt(b.name.match(/\d+/)?.[0] || '0')
      return numA - numB
    })
    
    setAllGalleryItems(items)
    
    // Log for debugging
    console.log('Gallery items loaded:', {
      images: items.filter(i => i.type === 'image').length,
      videos: items.filter(i => i.type === 'video' && !i.isAudio).length,
      audio: items.filter(i => i.isAudio).length,
      total: items.length
    })
  }, [])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedItems < allGalleryItems.length) {
          // Load 10 more items
          setLoadedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, allGalleryItems.length))
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadedItems, allGalleryItems.length])

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Images', value: 'image' },
    { label: 'Videos', value: 'video' },
  ]

  // Filter items first, then slice for lazy loading
  const filteredItems = filter === 'all' 
    ? allGalleryItems 
    : allGalleryItems.filter(item => item.type === filter)

  const displayedItems = filteredItems.slice(0, loadedItems)
  const hasMore = loadedItems < filteredItems.length

  const handleMediaClick = (item) => {
    setSelectedMedia(item)
    setIsLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedMedia(null)
  }

  return (
    <div className="min-h-screen bg-light">
      <SEO
        title="Gallery | MadreTierra Cigars"
        description="Explore our gallery showcasing the craftsmanship and artistry of MadreTierra Cigars. View images and videos of our premium handcrafted cigars, events, and the passion behind every cigar."
        keywords="cigar gallery, cigar photos, cigar videos, premium cigar images, cigar craftsmanship, cigar artistry, MadreTierra gallery"
        url="/gallery"
      />
      <Navbar />
      <section className="py-24 bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
              Gallery
            </h1>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto leading-relaxed">
              Explore our premium collection of handcrafted cigars and brand imagery. Each image and video captures the essence of MadreTierra's commitment to excellence.
            </p>
            <p className="text-sm text-dark/60 mt-4">
              Showing {displayedItems.length} of {filteredItems.length} items
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => {
                  setFilter(filterOption.value)
                  setLoadedItems(ITEMS_PER_PAGE) // Reset to first 10 when filter changes
                }}
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                media={item.media}
                name={item.name}
                type={item.type}
                index={index}
                isLoaded={true}
                isAudio={item.isAudio || false}
                onClick={() => handleMediaClick(item)}
              />
            ))}
          </div>

          {/* Loading More Indicator */}
          {hasMore && (
            <div 
              ref={loadMoreRef}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-2 text-dark/60">
                <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-semibold">Loading more...</span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {displayedItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-dark/70">No items found in this category.</p>
            </div>
          )}

          {/* End of Gallery Message */}
          {!hasMore && displayedItems.length > 0 && (
            <div className="text-center py-8">
              <p className="text-dark/60 text-sm font-semibold">
                You've reached the end of the gallery
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary to-dark rounded-lg p-12 text-light">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Experience the Artistry
              </h2>
              <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                Each image and video tells a story of craftsmanship, tradition, and passion. Visit our selection page to learn more about our premium cigars.
              </p>
              <a
                href="/selection"
                className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
              >
                View Our Selection
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lightbox Modal */}
      <MediaLightbox
        media={selectedMedia?.media}
        mediaName={selectedMedia?.name}
        type={selectedMedia?.type}
        isAudio={selectedMedia?.isAudio || false}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
      
      <Footer />
    </div>
  )
}

export default GalleryPage

