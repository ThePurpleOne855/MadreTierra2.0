import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const logoImage = new URL('../logo/madre-tierra-cigarslogo.avif', import.meta.url).href

const AgeGate = () => {
  const location = useLocation()
  const [isVerified, setIsVerified] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showGate, setShowGate] = useState(false)
  const [underAge, setUnderAge] = useState(false)

  useEffect(() => {
    // Only show age gate on the home page ("/")
    const isHomePage = location.pathname === '/'
    
    // For development/testing: Set to true to always show the age gate
    // This clears the localStorage so the gate will always show for testing
    const FORCE_SHOW_FOR_TESTING = true // Set to false in production
    
    if (FORCE_SHOW_FOR_TESTING) {
      localStorage.removeItem('ageVerified')
      console.log('AgeGate: Cleared localStorage for testing')
    }
    
    // If not on home page, don't show the gate
    if (!isHomePage) {
      console.log('AgeGate: Not on home page, hiding gate')
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
      setIsChecking(false)
      return
    }
    
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified')
    
    console.log('AgeGate: ageVerified from localStorage:', ageVerified)
    console.log('AgeGate: Current pathname:', location.pathname)
    
    if (ageVerified === 'true') {
      console.log('AgeGate: User already verified, hiding gate')
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
    } else {
      console.log('AgeGate: User not verified, showing gate')
      setIsVerified(false)
      setShowGate(true)
      document.body.style.overflow = 'hidden'
    }
    setIsChecking(false)

    return () => {
      // Cleanup: reset overflow if component unmounts
      document.body.style.overflow = 'unset'
    }
  }, [location.pathname])

  const handleAgeVerification = (isOver21) => {
    if (isOver21) {
      localStorage.setItem('ageVerified', 'true')
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
    } else {
      // User is under 21 - show message and keep gate visible
      setUnderAge(true)
      // Keep body scroll locked
      document.body.style.overflow = 'hidden'
    }
  }

  // Only show age gate on home page
  if (location.pathname !== '/') {
    return null
  }

  // Show loading state while checking
  if (isChecking) {
    console.log('AgeGate: Still checking...')
    return null
  }

  // Don't show gate if already verified
  if (isVerified || !showGate) {
    console.log('AgeGate: Not showing - isVerified:', isVerified, 'showGate:', showGate)
    return null
  }
  
  console.log('AgeGate: Rendering age gate modal')

  // Age Gate Modal
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-dark">
      {/* Pattern Overlay - matching Hero section */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(212,175,55,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Radial Overlay - matching Hero section */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark/70"></div>

      <div className="relative z-10 max-w-2xl w-full mx-5 bg-light rounded-lg shadow-2xl overflow-hidden">
        {/* Inner Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(1,68,33,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 p-8 md:p-12 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <img 
              src={logoImage} 
              alt="MadreTierra Cigars" 
              className="h-20 md:h-24 w-auto object-contain"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <div style={{ display: 'none' }}>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-2">MadreTierra</h1>
              <span className="text-lg text-dark/70 tracking-wider">Cigars</span>
            </div>
          </div>

          {/* Age Verification Question */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 tracking-wide">
              Age Verification Required
            </h2>
            <p className="text-xl text-dark/80 mb-2 font-light tracking-wide">
              You must be 21 years or older to enter this website.
            </p>
            <p className="text-base text-dark/60 mt-2">
              By entering this site, you are agreeing to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-sm p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-base text-dark font-semibold mb-2 tracking-wider uppercase">
              SURGEON GENERAL'S WARNING:
            </p>
            <p className="text-sm text-dark/80 leading-relaxed">
              Cigar Smoking Can Cause Cancers Of The Mouth And Throat, Even If You Do Not Inhale.
            </p>
          </div>

          {/* Under Age Message */}
          {underAge && (
            <div className="bg-red-500/20 border-2 border-red-500/30 rounded-sm p-6 mb-6 animate-fade-in-up">
              <p className="text-lg text-red-700 font-semibold mb-2 tracking-wider uppercase">
                Access Denied
              </p>
              <p className="text-base text-red-600">
                You must be 21 years or older to access this website. Thank you for your honesty.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => handleAgeVerification(true)}
              className="px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
            >
              I am 21 or older
            </button>
            <button
              onClick={() => handleAgeVerification(false)}
              className="px-10 py-4 bg-dark/10 text-dark border-2 border-dark/20 font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-dark/20 hover:border-dark/30"
            >
              I am under 21
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgeGate

