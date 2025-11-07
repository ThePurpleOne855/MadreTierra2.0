const Featured = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-primary to-dark relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid2' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(212,175,55,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid2)'/%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-light mb-6">
          The Finest in Premium Tobacco
        </h2>
        <p className="text-xl text-secondary mb-10 leading-relaxed">
          Our expertly blended cigars combine the finest tobaccos from Ecuador and the Dominican Republic, and we proudly manage the entire process from seed to smoke. Each blend is crafted with precision, creating distinct and memorable flavor profiles that honor the art of cigar making.
        </p>
        <a
          href="#where-to-buy"
          className="inline-block px-10 py-4 border-2 border-secondary text-secondary font-bold tracking-wider uppercase text-sm rounded-sm transition-all duration-300 hover:bg-secondary hover:text-dark hover:-translate-y-0.5"
        >
          Learn More
        </a>
      </div>
    </section>
  )
}

export default Featured

