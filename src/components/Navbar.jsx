import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const logoImage = new URL('../logo/madre-tierra-cigarslogo.avif', import.meta.url).href

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '/selection', label: 'Cigar Selection', isRoute: true },
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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/98 shadow-lg' : 'bg-dark/95'
    }`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <a 
            href="/" 
            className="logo flex items-center"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img 
              src={logoImage} 
              alt="MadreTierra Cigars" 
              className="h-10 md:h-14 w-auto object-contain max-w-[200px]"
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
              }}
            />
            <div className="hidden">
              <h1 className="text-4xl font-serif font-bold text-secondary">MadreTierra</h1>
              <span className="text-base text-light font-medium tracking-wider ml-1">Cigars</span>
            </div>
          </a>
          
          <ul className={`hidden md:flex gap-10 list-none ${
            isMenuOpen ? 'flex' : ''
          }`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-light hover:text-secondary transition-colors duration-300 text-base font-semibold tracking-wider relative group"
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-light transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-light transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-light transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-light hover:text-secondary transition-colors duration-300 text-base font-semibold tracking-wider"
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

