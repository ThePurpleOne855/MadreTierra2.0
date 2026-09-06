import { useEffect, useRef, useState } from 'react'

const ITEMS_PER_PAGE = 10

const MediaLightbox = ({ media, isOpen, onClose, mediaName, type, isAudio }) => {
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (type === 'video' && !isAudio && videoRef.current) {
        videoRef.current.play().catch((err) => console.log('Video autoplay prevented:', err))
      } else if (type === 'video' && isAudio && audioRef.current) {
        audioRef.current.load()
      }
    } else {
      document.body.style.overflow = 'unset'
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
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !media) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/95 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-dark/80 hover:bg-dark text-light rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          <span className="text-3xl">×</span>
        </button>

        {type === 'video' ? (
          isAudio ? (
            <div className="max-w-2xl w-full bg-dark/90 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <svg className="w-24 h-24 text-light/80 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                {mediaName && <p className="text-xl text-light font-serif font-semibold">{mediaName}</p>}
              </div>
              <audio ref={audioRef} src={media} controls className="w-full" autoPlay>
                Your browser does not support the audio tag.
              </audio>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={media}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <img src={media} alt={mediaName} className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
        )}

        {mediaName && type !== 'video' && !isAudio && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/80 text-light px-6 py-3 rounded-full">
            <p className="text-lg font-serif font-semibold">{mediaName}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const GalleryItem = ({ media, name, type, onClick, isAudio }) => {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(type !== 'video')

  useEffect(() => {
    if (type !== 'video') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShouldLoadVideo(true)
        })
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [type])

  useEffect(() => {
    if (videoRef.current && shouldLoadVideo && !isAudio) videoRef.current.load()
    if (audioRef.current && shouldLoadVideo && isAudio) audioRef.current.load()
  }, [shouldLoadVideo, isAudio])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative bg-light rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl cursor-pointer aspect-square"
    >
      <div className="relative w-full h-full bg-gradient-to-br from-primary to-tertiary overflow-hidden">
        {type === 'video' ? (
          shouldLoadVideo ? (
            isAudio ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-tertiary">
                <div className="mb-4">
                  <svg className="w-24 h-24 text-light/80 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
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
              <video
                ref={videoRef}
                src={media}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted
                playsInline
                preload="metadata"
                loop
              />
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/50 to-tertiary/50 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-light/50 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-light/50 text-sm font-semibold">Loading...</p>
              </div>
            </div>
          )
        ) : (
          <img
            src={media}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-dark/90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
            {type === 'video' ? (
              <svg className="w-10 h-10 text-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const GalleryGrid = ({ items }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_PAGE)
  const loadMoreRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedItems < items.length) {
          setLoadedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length))
        }
      },
      { threshold: 0.1 }
    )
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
    }
  }, [loadedItems, items.length])

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Images', value: 'image' },
    { label: 'Videos', value: 'video' },
  ]

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.type === filter)
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
    <>
      <p className="text-sm text-dark/60 text-center -mt-8 mb-8">
        Showing {displayedItems.length} of {filteredItems.length} items
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => {
              setFilter(filterOption.value)
              setLoadedItems(ITEMS_PER_PAGE)
            }}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              filter === filterOption.value
                ? 'bg-secondary text-dark shadow-lg'
                : 'bg-dark/5 text-dark hover:bg-dark/10 border border-transparent hover:border-secondary/30'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedItems.map((item) => (
          <GalleryItem
            key={item.id}
            media={item.media}
            name={item.name}
            type={item.type}
            isAudio={item.isAudio || false}
            onClick={() => handleMediaClick(item)}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-dark/60">
            <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-semibold">Loading more...</span>
          </div>
        </div>
      )}

      {displayedItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-dark/70">No items found in this category.</p>
        </div>
      )}

      {!hasMore && displayedItems.length > 0 && (
        <div className="text-center py-8">
          <p className="text-dark/60 text-sm font-semibold">You've reached the end of the gallery</p>
        </div>
      )}

      <MediaLightbox
        media={selectedMedia?.media}
        mediaName={selectedMedia?.name}
        type={selectedMedia?.type}
        isAudio={selectedMedia?.isAudio || false}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
    </>
  )
}

export default GalleryGrid
