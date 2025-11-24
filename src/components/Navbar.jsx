import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const logoImage = new URL('../logo/Madre-Tierra-Logo.png', import.meta.url).href

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const detectBackgroundColor = () => {
      setScrolled(window.scrollY > 100)
      
      // Detect which section is behind the navbar
      const navbarHeight = 80
      const checkPoint = window.scrollY + navbarHeight / 2
      
      // First, check page-level background (div with min-h-screen)
      const pageContainer = document.querySelector('[class*="min-h-screen"]')
      let hasPageLightBg = false
      
      if (pageContainer) {
        const pageClass = pageContainer.className || ''
        hasPageLightBg = pageClass.includes('bg-light') || pageClass.includes('bg-white')
      }
      
      // Find all sections
      const sections = Array.from(document.querySelectorAll('section'))
      
      let currentSection = null
      let minDistance = Infinity
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = window.scrollY + rect.top
        const sectionBottom = sectionTop + rect.height
        
        // Check if check point is within this section
        if (checkPoint >= sectionTop && checkPoint <= sectionBottom) {
          const distance = Math.abs(checkPoint - (sectionTop + sectionBottom) / 2)
          if (distance < minDistance) {
            minDistance = distance
            currentSection = section
          }
        }
      })
      
      // If at the very top, check the first section or page container
      if (window.scrollY < navbarHeight) {
        currentSection = document.querySelector('#home') || 
                        document.querySelector('section:first-of-type')
      }
      
      // Determine background type
      let isLight = false
      
      if (currentSection) {
        const classList = Array.from(currentSection.classList)
        const className = currentSection.className || ''
        
        // Check for light backgrounds
        const hasLightBg = classList.some(cls => 
          cls.includes('bg-light') || 
          cls.includes('bg-white')
        ) || className.includes('bg-light') || className.includes('bg-white')
        
        // Check for dark backgrounds (dark backgrounds take priority)
        const hasDarkBg = classList.some(cls => 
          cls.includes('bg-dark') || 
          cls.includes('from-primary') ||
          cls.includes('from-dark') ||
          cls.includes('bg-gradient-to-br')
        ) || className.includes('bg-dark') || 
           className.includes('from-primary') || 
           className.includes('from-dark') ||
           className.includes('bg-gradient-to-br')
        
        isLight = hasLightBg && !hasDarkBg
      } else if (hasPageLightBg) {
        // Use page background if no section found
        isLight = true
      }
      
      setIsLightBackground(isLight)
    }
    
    // Initial check
    detectBackgroundColor()
    
    // Check on scroll with throttling for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectBackgroundColor()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also check on route change
    const timeoutId = setTimeout(detectBackgroundColor, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [location.pathname])

  const navLinks = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '/selection', label: 'Cigar Selection', isRoute: true },
    { href: '/gallery', label: 'Gallery', isRoute: true },
    { href: '/private-events', label: 'Calendar', isRoute: true },
    { href: '/#about', label: 'About', isRoute: true },
    { href: '/#where-to-buy', label: 'Where To Buy', isRoute: true },
    { href: '/#experience', label: 'Experience', isRoute: true },
    { href: '/#contact', label: 'Contact Us', isRoute: true },
  ]

  const handleLinkClick = (e, link) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    if (link.isRoute) {
      // If link has a hash, navigate with hash
      if (link.href.includes('#')) {
        const [path, hash] = link.href.split('#')
        // Navigate to path with hash
        navigate(`${path}#${hash}`)
      } else {
        // Regular route navigation
        navigate(link.href)
        // Scroll to top for home page
        if (link.href === '/') {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }, 100)
        }
      }
    }
  }

  // Determine navbar colors based on background
  const navBgClass = isLightBackground 
    ? (scrolled ? 'bg-light/98 shadow-lg' : 'bg-light/95')
    : (scrolled ? 'bg-dark/98 shadow-lg' : 'bg-dark/95')
  
  const navTextClass = isLightBackground 
    ? 'text-dark hover:text-secondary' 
    : 'text-light hover:text-secondary'
  
  const navBorderClass = isLightBackground
    ? 'bg-primary'
    : 'bg-secondary'

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <a 
            href="/" 
            className="logo flex items-center group"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img 
              src={logoImage} 
              alt="MadreTierra Cigars" 
              className="h-14 md:h-16 lg:h-20 w-auto object-contain max-w-[280px] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              style={{
                filter: isLightBackground 
                  ? 'drop-shadow(0 2px 4px rgba(1, 68, 33, 0.2)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.15))'
                  : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.3)) drop-shadow(0 0 6px rgba(1, 68, 33, 0.2))'
              }}
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <div className="hidden">
              <h1 className={`text-4xl font-serif font-bold ${isLightBackground ? 'text-primary' : 'text-secondary'}`}>MadreTierra</h1>
              <span className={`text-base font-medium tracking-wider ml-1 ${isLightBackground ? 'text-dark' : 'text-light'}`}>Cigars</span>
            </div>
          </a>
          
          <ul className={`hidden md:flex gap-10 list-none ${
            isMenuOpen ? 'flex' : ''
          }`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${navTextClass} transition-colors duration-300 text-base font-semibold tracking-wider relative group`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isLightBackground ? 'bg-primary' : 'bg-secondary'} transition-all duration-300 group-hover:w-full`}></span>
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 ${isLightBackground ? 'bg-dark' : 'bg-light'} transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`w-6 h-0.5 ${isLightBackground ? 'bg-dark' : 'bg-light'} transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 ${isLightBackground ? 'bg-dark' : 'bg-light'} transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <ul className="flex flex-col gap-4 list-none mb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${navTextClass} transition-colors duration-300 text-base font-semibold tracking-wider`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

