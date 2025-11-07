const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-primary to-dark">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(212,175,55,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark/70"></div>
      
      <div className="relative z-10 max-w-4xl px-5 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-light mb-4 tracking-wide">
          Evolution of an Icon
        </h1>
        <p className="text-xl md:text-2xl text-secondary mb-10 font-light tracking-wide">
          Handcrafted Excellence Since Our Inception
        </p>
        <a
          href="/selection"
          className="inline-block px-10 py-4 bg-secondary text-dark font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-tertiary hover:text-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30"
        >
          Explore Our Collection
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

