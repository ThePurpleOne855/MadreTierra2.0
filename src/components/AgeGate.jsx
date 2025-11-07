import { useState, useEffect } from 'react'

const logoImage = new URL('../logo/madre-tierra-cigarslogo.avif', import.meta.url).href

const AgeGate = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showGate, setShowGate] = useState(false)
  const [underAge, setUnderAge] = useState(false)

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified')
    if (ageVerified === 'true') {
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
    } else {
      setShowGate(true)
      document.body.style.overflow = 'hidden'
    }
    setIsChecking(false)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

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

  // Show loading state while checking
  if (isChecking) {
    return null
  }

  // Don't show gate if already verified
  if (isVerified || !showGate) {
    return null
  }

  // Age Gate Modal
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark/95 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-5 bg-light rounded-lg shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(1,68,33,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 p-8 md:p-12 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
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
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Age Verification Required
            </h2>
            <p className="text-xl text-dark/80 mb-2">
              You must be 21 years or older to enter this website.
            </p>
            <p className="text-base text-dark/60">
              By entering this site, you are agreeing to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-6 mb-8">
            <p className="text-base text-dark font-semibold mb-2">
              SURGEON GENERAL'S WARNING:
            </p>
            <p className="text-sm text-dark/80 leading-relaxed">
              Cigar Smoking Can Cause Cancers Of The Mouth And Throat, Even If You Do Not Inhale.
            </p>
          </div>

          {/* Under Age Message */}
          {underAge && (
            <div className="bg-red-500/20 border-2 border-red-500/30 rounded-lg p-6 mb-6">
              <p className="text-lg text-red-700 font-semibold mb-2">
                Access Denied
              </p>
              <p className="text-base text-red-600">
                You must be 21 years or older to access this website. Thank you for your honesty.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

