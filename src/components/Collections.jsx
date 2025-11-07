import { useEffect, useRef } from 'react'

const CollectionCard = ({ title, description, reverse = false }) => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
      className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 min-h-[500px] shadow-2xl transition-all duration-500 opacity-0 translate-y-8 hover:-translate-y-1"
    >
      <div className={`relative bg-gradient-to-br from-primary to-tertiary overflow-hidden ${
        reverse ? 'md:order-2' : ''
      }`}>
        <div className="absolute inset-0 bg-dark/30 transition-all duration-300 hover:bg-dark/10"></div>
      </div>
      <div className={`p-12 md:p-16 bg-light flex flex-col justify-center ${
        reverse ? 'md:order-1' : ''
      }`}>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
          {title}
        </h2>
        <p className="text-lg text-dark mb-8 leading-relaxed">
          {description}
        </p>
        <a
          href="/selection"
          className="text-primary hover:text-tertiary font-bold text-base tracking-wider uppercase transition-colors duration-300 inline-block"
        >
          Explore <span className="text-secondary">{title}</span> →
        </a>
      </div>
    </div>
  )
}

const Collections = () => {
  const collections = [
    {
      title: 'Reserva',
      description: 'Reserva cigars showcase our finest aged tobaccos, delivering unparalleled complexity and depth for the discerning connoisseur.',
    },
    {
      title: 'Heritage',
      description: 'Timeless blends that honor our rich tradition, hand-crafted to be enjoyed with those important to you.',
      reverse: true,
    },
    {
      title: 'Selección',
      description: 'A masterful balance of flavor and premium quality, crafted for those who appreciate the finer things in life.',
    },
    {
      title: 'Especial',
      description: 'Sophisticated smoking experiences highlighted by refined tobacco selections from the finest regions.',
      reverse: true,
    },
  ]

  return (
    <section id="cigars" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-5">
        {collections.map((collection, index) => (
          <CollectionCard
            key={index}
            title={collection.title}
            description={collection.description}
            reverse={collection.reverse}
          />
        ))}
      </div>
    </section>
  )
}

export default Collections

