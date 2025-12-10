import { useEffect, useRef } from 'react'
import craftsmanshipImg from '../ExperiencePictures/Craftmanship.jpeg'
import premiumTobaccoImg from '../ExperiencePictures/PremiumTobacoPicture.jpeg'
import excellenceImg from '../ExperiencePictures/Experience Picture.jpeg'

const ExperienceItem = ({ image, title, description }) => {
  const itemRef = useRef(null)

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

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={itemRef}
      className="text-center p-10 opacity-0 translate-y-8 transition-all duration-500"
    >
      <div className="mb-6 flex justify-center">
        <img 
          src={image} 
          alt={title} 
          className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-secondary/30"
        />
      </div>
      <h3 className="text-2xl font-serif font-bold text-primary mb-4">
        {title}
      </h3>
      <p className="text-dark leading-relaxed">
        {description}
      </p>
    </div>
  )
}

const Experience = () => {
  const experiences = [
    {
      image: craftsmanshipImg,
      title: 'Craftsmanship',
      description: 'Every cigar is hand-rolled by master artisans with decades of experience.',
    },
    {
      image: premiumTobaccoImg,
      title: 'Premium Tobacco',
      description: 'Sourced from the world\'s finest growing regions and aged to perfection.',
    },
    {
      image: excellenceImg,
      title: 'Excellence',
      description: 'Uncompromising quality in every blend, every wrapper, every draw.',
    },
  ]

  return (
    <section id="experience" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary text-center mb-16">
          The Madre Tierra Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              image={exp.image}
              title={exp.title}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

