import logoImage from '../logo/Madre-Tierra-Logo.png'
import veteranLogo from '../logo/VeteranOwnedBusinessLogo.png'
import dominicanFlag from '../logo/DominicanFlagTransparent.png'
import backgroundImage from '../Background/background2.png'

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-dark/60"></div>
      
      <div className="relative z-10 max-w-6xl px-5 animate-fade-in-up">
        {/* Horizontal Logo Layout */}
        <div className="mb-6 flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Left: Dominican Flag */}
          <img 
            src={dominicanFlag} 
            alt="Dominican Republic" 
            className="h-20 sm:h-28 md:h-40 lg:h-52 w-auto object-contain brightness-110 hover:brightness-125 hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{
              animationDelay: '0.2s',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.3))',
              transform: 'translateY(-8px)'
            }}
          />
          
          {/* Center: MadreTierra Logo */}
          <img 
            src={logoImage} 
            alt="MadreTierra Cigars" 
            className="h-24 sm:h-32 md:h-44 lg:h-56 w-auto object-contain max-w-[90%] transition-all duration-500 hover:scale-105"
            style={{
              filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 25px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 12px rgba(1, 68, 33, 0.4))',
              animation: 'fadeInScale 1s ease-out'
            }}
            onError={(e) => {
              // Fallback to text if image fails to load
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'block'
            }}
          />
          <h1 className="hidden text-5xl md:text-7xl font-serif font-bold text-light tracking-wide">
            MadreTierra Cigars
          </h1>
          
          {/* Right: Veteran Owned Business Logo */}
          <img 
            src={veteranLogo} 
            alt="Veteran Owned Business" 
            className="h-20 sm:h-28 md:h-40 lg:h-52 w-auto object-contain brightness-110 hover:brightness-125 hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{
              animationDelay: '0.2s',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.3))',
              transform: 'translateY(-8px)'
            }}
          />
        </div>
        
        <p className="text-xl md:text-2xl text-secondary mb-10 font-bold tracking-wide">
          The Best Cigars You Have Never Smoked!
        </p>
        <a
          href="/selection"
          className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
        >
          Explore our cigar selection
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-0.5 h-8 bg-secondary animate-bounce"></div>
      </div>
    </section>
  )
}

export default Hero

