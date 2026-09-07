import { useState, useEffect } from 'react'
import logoImageMeta from '../logo/Madre-Tierra-Logo.png'

const logoImage = logoImageMeta.src

const AgeGate = ({ currentPath }) => {
  const [isVerified, setIsVerified] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [showGate, setShowGate] = useState(false)
  const [underAge, setUnderAge] = useState(false)

  useEffect(() => {
    // Only show the age gate on the home page ("/")
    if (currentPath !== '/') {
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
      setIsChecking(false)
      return
    }

    const ageVerified = sessionStorage.getItem('ageVerified') === 'true'
    setIsVerified(ageVerified)
    setShowGate(!ageVerified)
    document.body.style.overflow = ageVerified ? 'unset' : 'hidden'
    setIsChecking(false)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [currentPath])

  const handleAgeVerification = (isOver21) => {
    if (isOver21) {
      sessionStorage.setItem('ageVerified', 'true')
      setIsVerified(true)
      setShowGate(false)
      document.body.style.overflow = 'unset'
    } else {
      // User is under 21 - show message and keep gate visible
      setUnderAge(true)
      document.body.style.overflow = 'hidden'
    }
  }

  if (currentPath !== '/' || isChecking || isVerified || !showGate) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-dark">
      {/* Pattern Overlay - matching Hero section */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(212,175,55,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Radial Overlay - matching Hero section */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark/70"></div>

      <div className="relative z-10 max-w-2xl w-full mx-5 bg-light rounded-2xl shadow-2xl overflow-hidden">
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
              className="h-28 md:h-32 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))' }}
              onError={(e) => {
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
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="leaf-rule mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Age verification required
            </h2>
            <p className="text-xl text-dark/80 mb-2 font-light">
              You must be 21 years or older to enter this website.
            </p>
            <p className="text-base text-dark/60 mt-2">
              By entering this site, you are agreeing to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-base text-dark font-semibold mb-2">
              Surgeon General's warning:
            </p>
            <p className="text-sm text-dark/80 leading-relaxed">
              Cigar Smoking Can Cause Cancers Of The Mouth And Throat, Even If You Do Not Inhale.
            </p>
          </div>

          {/* Under Age Message */}
          {underAge && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6 animate-fade-in-up">
              <p className="text-lg text-red-700 font-semibold mb-2">
                Access denied
              </p>
              <p className="text-base text-red-600">
                You must be 21 years or older to access this website. Thank you for your honesty.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={() => handleAgeVerification(true)} className="btn-solid">
              I am 21 or older
            </button>
            <button
              onClick={() => handleAgeVerification(false)}
              className="btn bg-dark/10 text-dark hover:bg-dark/20"
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
