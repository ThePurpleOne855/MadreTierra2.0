import { useEffect, useRef } from 'react'

const RetailerCard = ({ title, description, linkText, linkTo }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="bg-light/5 p-10 border border-secondary/20 rounded transition-all duration-300 opacity-0 translate-y-8 hover:bg-light/10 hover:border-secondary hover:-translate-y-1"
    >
      <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
        {title}
      </h3>
      <p className="text-light mb-6 leading-relaxed">
        {description}
      </p>
      <a
        href={linkTo || "#where-to-buy"}
        className="text-secondary hover:text-light font-bold tracking-wider transition-colors duration-300"
        onClick={(e) => {
          // If it's a route (starts with /), let the router handle it
          if (linkTo && linkTo.startsWith('/')) {
            return // Let default navigation happen
          }
          // Otherwise handle smooth scroll for anchor links
          e.preventDefault()
          const targetId = linkTo ? linkTo.replace('#', '') : 'where-to-buy'
          const section = document.getElementById(targetId)
          if (section) {
            const offsetTop = section.offsetTop - 80
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            })
          }
        }}
      >
        {linkText} →
      </a>
    </div>
  )
}

const WhereToBuy = () => {
  const retailers = [
    {
      title: 'Premium Retailers',
      description: 'Visit our network of authorized premium cigar retailers and lounges.',
      linkText: 'Find a Retailer',
      linkTo: '/locations',
    },
    {
      title: 'Private Events',
      description: 'Experience MadreTierra at exclusive events and tastings.',
      linkText: 'Learn More',
      linkTo: '#where-to-buy',
    },
  ]

  return (
    <section id="where-to-buy" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-light text-center mb-4">
          Where To Buy
        </h2>
        <p className="text-xl text-secondary text-center mb-16">
          Find MadreTierra Cigars at authorized retailers near you
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {retailers.map((retailer, index) => (
            <RetailerCard
              key={index}
              title={retailer.title}
              description={retailer.description}
              linkText={retailer.linkText}
              linkTo={retailer.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhereToBuy

